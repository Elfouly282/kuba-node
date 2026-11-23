const mongoose = require('mongoose');
const User = require('../auth/models/userModel');
const City = require('../cities/models/cityModel');
const Region = require('../regions/models/regionModel');
const Notification = require('./models/notificationModel');
const { getImageUrl } = require('../../utils/imageUrl');

const TARGETS = ['user', 'users', 'city', 'region'];
const MAX_SELECTED_USERS = 300;
const FCM_BATCH = 500;
const INVALID_TOKEN_CODES = new Set([
    'messaging/invalid-registration-token',
    'messaging/registration-token-not-registered',
]);

const fail = (key, statusCode, vars) => {
    const error = new Error(key);
    error.key = key;
    error.statusCode = statusCode;
    error.vars = vars;
    error.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    error.isOperational = true;
    return error;
};

const asList = (value) => {
    if (value === undefined || value === null || value === '') return [];
    if (Array.isArray(value)) return value.flatMap(asList);
    const text = String(value).trim();
    if (!text) return [];
    if (text.startsWith('[')) {
        try {
            return asList(JSON.parse(text));
        } catch (_) {
            return [];
        }
    }
    return text.split(',').map((item) => item.trim()).filter(Boolean);
};

const uniqueIds = (value) => {
    const ids = [];
    const seen = new Set();
    for (const item of asList(value)) {
        const id = String(item);
        if (!mongoose.Types.ObjectId.isValid(id) || seen.has(id)) continue;
        seen.add(id);
        ids.push(id);
    }
    return ids;
};

const cleanText = (value, max) => String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);

const resolveTarget = async (input = {}) => {
    const target = String(input.target || input.targetType || '').trim();
    if (!TARGETS.includes(target)) throw fail('errors.invalidNotificationTarget', 400);

    if (target === 'user' || target === 'users') {
        const ids = uniqueIds(input.userIds || input.userId || input.users);
        if (!ids.length) throw fail('errors.notificationUsersRequired', 400);
        if (target === 'user' && ids.length !== 1) throw fail('errors.notificationUsersRequired', 400);
        if (ids.length > MAX_SELECTED_USERS) {
            throw fail('errors.notificationTooManyUsers', 400, { max: MAX_SELECTED_USERS });
        }
        const found = await User.countDocuments({ _id: { $in: ids } });
        if (found !== ids.length) throw fail('errors.userNotFound', 404);
        return { target, userIds: ids, cityId: null, regionId: null };
    }

    if (target === 'city') {
        const cityId = String(input.cityId || input.city || '').trim();
        if (!mongoose.Types.ObjectId.isValid(cityId)) throw fail('errors.invalidCityId', 400);
        const city = await City.findById(cityId).select('_id');
        if (!city) throw fail('errors.cityNotFound', 404);
        return { target, userIds: [], cityId, regionId: null };
    }

    const regionId = String(input.regionId || input.region || '').trim();
    if (!mongoose.Types.ObjectId.isValid(regionId)) throw fail('errors.invalidRegionId', 400);
    const region = await Region.findById(regionId).select('_id');
    if (!region) throw fail('errors.regionNotFound', 404);
    return { target, userIds: [], cityId: null, regionId };
};

const audienceFilter = ({ target, userIds, cityId, regionId }) => {
    if (target === 'user' || target === 'users') return { _id: { $in: userIds } };
    if (target === 'city') return { city: cityId };
    return { region: regionId };
};

const loadAudience = async (targetInfo) => {
    const filter = audienceFilter(targetInfo);
    const matchedUsers = await User.countDocuments(filter);
    const users = await User.find({ ...filter, 'fcmTokens.0': { $exists: true } })
        .select('+fcmTokens name email')
        .lean();

    const tokens = [];
    const seen = new Set();
    for (const user of users) {
        for (const token of user.fcmTokens || []) {
            if (!token || seen.has(token)) continue;
            seen.add(token);
            tokens.push(token);
        }
    }

    return {
        matchedUsers,
        withToken: users.length,
        skippedNoToken: Math.max(0, matchedUsers - users.length),
        tokens,
    };
};

const previewAudience = async (input) => {
    const targetInfo = await resolveTarget(input);
    const audience = await loadAudience(targetInfo);
    return {
        targetType: targetInfo.target,
        matchedUsers: audience.matchedUsers,
        withToken: audience.withToken,
        skippedNoToken: audience.skippedNoToken,
        devices: audience.tokens.length,
    };
};

const publicImageUrl = (req, stored) => {
    if (!stored) return '';
    if (/^https?:\/\//i.test(stored)) return stored;
    const path = getImageUrl(stored);
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    const forwarded = req.get('x-forwarded-proto') || req.protocol || 'https';
    const proto = String(forwarded).split(',')[0].trim();
    const host = req.get('host');
    return `${proto}://${host}${path.startsWith('/') ? path : `/${path}`}`;
};

const presentNotification = (doc, req) => {
    const obj = doc.toObject ? doc.toObject() : doc;
    const city = obj.city && typeof obj.city === 'object' ? obj.city : null;
    const region = obj.region && typeof obj.region === 'object' ? obj.region : null;
    return {
        id: obj._id,
        title: obj.title,
        body: obj.body,
        image: obj.image ? publicImageUrl(req, obj.image) : '',
        targetType: obj.targetType,
        userIds: obj.userIds || [],
        city: city ? { id: city._id, name: city.name, nameAr: city.nameAr } : obj.city || null,
        region: region ? { id: region._id, name: region.name, nameAr: region.nameAr } : obj.region || null,
        stats: obj.stats,
        status: obj.status,
        createdAt: obj.createdAt,
    };
};

const dropInvalidTokens = async (tokens) => {
    if (!tokens.length) return;
    await User.updateMany(
        { fcmTokens: { $in: tokens } },
        { $pull: { fcmTokens: { $in: tokens } } }
    );
};

const dispatch = async (tokens, payload) => {
    let messaging;
    try {
        messaging = require('../../../admin/config/firebase').messaging();
    } catch (err) {
        console.error('FCM INIT ERROR:', err);
        throw fail('errors.notificationSendFailed', 500);
    }

    let sent = 0;
    let failed = 0;
    const invalid = [];

    for (let offset = 0; offset < tokens.length; offset += FCM_BATCH) {
        const batch = tokens.slice(offset, offset + FCM_BATCH);
        let response;
        try {
            response = await messaging.sendEachForMulticast({ tokens: batch, ...payload });
        } catch (err) {
            console.error('FCM SEND ERROR:', err);
            throw fail('errors.notificationSendFailed', 500);
        }
        response.responses.forEach((item, index) => {
            if (item.success) {
                sent += 1;
                return;
            }
            failed += 1;
            const code = item.error?.code || '';
            if (INVALID_TOKEN_CODES.has(code)) invalid.push(batch[index]);
        });
    }

    await dropInvalidTokens(invalid);
    return { sent, failed };
};

const sendNotification = async ({ input, image, sentBy, req }) => {
    const title = cleanText(input.title, 120);
    const body = cleanText(input.body, 1000);
    if (!title) throw fail('errors.notificationTitleRequired', 400);
    if (!body) throw fail('errors.notificationBodyRequired', 400);

    const targetInfo = await resolveTarget(input);
    const audience = await loadAudience(targetInfo);
    if (!audience.matchedUsers) throw fail('errors.noNotificationAudience', 404);
    if (!audience.tokens.length) {
        throw fail('errors.noNotificationDevices', 400, { matched: audience.matchedUsers });
    }

    const imageUrl = publicImageUrl(req, image);
    const data = {
        type: 'admin',
        title,
        body,
        image: imageUrl || '',
        targetType: targetInfo.target,
    };
    const payload = {
        notification: {
            title,
            body,
            ...(imageUrl ? { imageUrl } : {}),
        },
        data,
        android: {
            priority: 'high',
            notification: {
                sound: 'default',
                ...(imageUrl ? { imageUrl } : {}),
            },
        },
        apns: {
            payload: {
                aps: {
                    sound: 'default',
                    ...(imageUrl ? { mutableContent: 1 } : {}),
                },
            },
            ...(imageUrl ? { fcmOptions: { imageUrl } } : {}),
        },
    };

    const delivery = await dispatch(audience.tokens, payload);
    const status = delivery.sent === 0 ? 'failed' : (delivery.failed > 0 ? 'partial' : 'sent');

    const notification = await Notification.create({
        title,
        body,
        image: image || '',
        targetType: targetInfo.target,
        userIds: targetInfo.userIds,
        city: targetInfo.cityId,
        region: targetInfo.regionId,
        sentBy: mongoose.Types.ObjectId.isValid(sentBy) ? sentBy : null,
        stats: {
            matchedUsers: audience.matchedUsers,
            withToken: audience.withToken,
            skippedNoToken: audience.skippedNoToken,
            devices: audience.tokens.length,
            sent: delivery.sent,
            failed: delivery.failed,
        },
        status,
    });

    const saved = await Notification.findById(notification._id)
        .populate('city', 'name nameAr')
        .populate('region', 'name nameAr');

    return presentNotification(saved, req);
};

const listNotifications = async (req) => {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 50);
    const skip = (page - 1) * limit;
    const [total, rows] = await Promise.all([
        Notification.countDocuments(),
        Notification.find()
            .populate('city', 'name nameAr')
            .populate('region', 'name nameAr')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
    ]);

    return {
        results: rows.length,
        total,
        page,
        totalPages: Math.ceil(total / limit) || 1,
        notifications: rows.map((row) => presentNotification(row, req)),
    };
};

const listRecipients = async () => {
    const users = await User.find({ 'fcmTokens.0': { $exists: true } })
        .select('name email phone city region')
        .populate('city', 'name nameAr')
        .populate('region', 'name nameAr')
        .sort({ name: 1, email: 1 })
        .lean();

    return users.map((user) => ({
        id: user._id,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city && typeof user.city === 'object'
            ? { id: user.city._id, name: user.city.name || '', nameAr: user.city.nameAr || '' }
            : null,
        region: user.region && typeof user.region === 'object'
            ? { id: user.region._id, name: user.region.name || '', nameAr: user.region.nameAr || '' }
            : null,
    }));
};

module.exports = {
    previewAudience,
    sendNotification,
    listNotifications,
    listRecipients,
    publicImageUrl,
};
