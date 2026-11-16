const crypto = require('crypto');
const ms = require('ms');
const mongoose = require('mongoose');
const { pick } = require('lodash');
const User = require('../models/userModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Booking = require('../../bookings/models/bookingModel');
const Banner = require('../../banners/models/bannerModel');
const City = require('../../cities/models/cityModel');
const Region = require('../../regions/models/regionModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const { generateToken } = require('../../../utils/generateToken');
const { sendVerificationEmail, sendPasswordResetOtpEmail } = require('../../../utils/sendEmail');
const { deleteImageFile } = require('../../../utils/imageUrl');

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const randomToken = () => {
    const raw = crypto.randomBytes(32).toString('base64url');
    return { raw, hashed: hashToken(raw) };
};

const expiresIn = (envKey, fallback) =>
    new Date(Date.now() + (ms(process.env[envKey] || fallback) || ms(fallback)));

const clean = (user) => {
    const obj = user.toObject();
    ['password', 'emailVerificationToken', 'emailVerificationExpires',
        'passwordResetToken', 'passwordResetExpires', 'active', '__v'].forEach(k => delete obj[k]);
    return obj;
};

const authToken = (user) => generateToken({
    id: user._id,
    role: user.role || 'user',
});

const deleteUserData = async (userId) => {
    if (!userId) return;

    const user = await User.findById(userId).setOptions({ includeInactive: true });
    if (user && user.avatar) {
        deleteImageFile(user.avatar);
    }

    const ads = await Advertisement.find({ owner: userId });
    const adIds = ads.map((ad) => ad._id);

    for (const ad of ads) {
        if (ad.image) deleteImageFile(ad.image);
        if (Array.isArray(ad.images)) {
            ad.images.forEach((img) => deleteImageFile(img));
        }
    }

    if (adIds.length > 0) {
        const banners = await Banner.find({ advertisementId: { $in: adIds } });
        for (const banner of banners) {
            if (banner.image) deleteImageFile(banner.image);
        }
        await Banner.deleteMany({ advertisementId: { $in: adIds } });

        await Booking.deleteMany({ advertisement: { $in: adIds } });

        await Advertisement.deleteMany({ owner: userId });
    }

    await Booking.deleteMany({ user: userId });

    await User.findByIdAndDelete(userId);
};

exports.deleteUserData = deleteUserData;

exports.signUp = async (req, res, next) => {
    const { name, email, phone, password, confirmPassword, acceptTerms } = req.body;
    if (!email || !password || !confirmPassword) return next(new APIError('errors.missingFields', 400));
    if (password !== confirmPassword) return next(new APIError('errors.passwordsDoNotMatch', 400));
    if (!acceptTerms) return next(new APIError('errors.mustAcceptTerms', 400));

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail }).setOptions({ includeInactive: true });
    if (existingUser) {
        if (existingUser.active === false) {
            await deleteUserData(existingUser._id);
        } else {
            return next(new APIError('errors.emailAlreadyExists', 400));
        }
    }

    const { raw, hashed } = randomToken();

    const user = await User.create({
        name: name || null,
        email: normalizedEmail,
        phone: phone || null,
        password,
        provider: 'local',
        emailVerificationToken: hashed,
        emailVerificationExpires: expiresIn('EMAIL_VERIFICATION_EXPIRE', '24h'),
    });

    sendVerificationEmail(user.email, user.name, raw, req.locale).catch(console.error);

    SuccessResponse.created(res, {
        message: req.t('messages.signUpSuccess'),
        data: { user: clean(user) },
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new APIError('errors.missingFields', 400));

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password').populate('region', 'name nameAr');
    if (!user || !(await user.comparePassword(password))) return next(new APIError('errors.invalidCredentials', 401));
    if (user.provider !== 'local') return next(new APIError('errors.useGoogleLogin', 400));
    if (!user.isEmailVerified) return next(new APIError('errors.emailNotVerified', 403));

    SuccessResponse.ok(res, {
        message: req.t('messages.loginSuccess'),
        token: authToken(user),
        data: { user: clean(user) },
    });
};

exports.selectCity = async (req, res, next) => {
    const cityId = req.body.cityId || req.body.city;
    if (!cityId) return next(new APIError('validation.cityRequired', 400));
    if (!mongoose.Types.ObjectId.isValid(cityId)) return next(new APIError('errors.invalidCityId', 400));

    const city = await City.findById(cityId);
    if (!city) return next(new APIError('errors.cityNotFound', 404));

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { city: city._id },
        { new: true }
    ).populate('city', 'name nameAr image').populate('region', 'name nameAr');

    if (!user) return next(new APIError('errors.userNotFound', 404));

    SuccessResponse.ok(res, {
        message: req.t('messages.citySelected'),
        data: { user: clean(user) },
    });
};

exports.selectRegion = async (req, res, next) => {
    const regionId = req.body.regionId || req.body.region;
    if (!regionId) return next(new APIError('validation.regionRequired', 400));
    if (!mongoose.Types.ObjectId.isValid(regionId)) return next(new APIError('errors.invalidRegionId', 400));

    const region = await Region.findById(regionId);
    let updateObj = {};

    if (region) {
        updateObj.region = region._id;
        if (region.city) updateObj.city = region.city;
    } else {
        const city = await City.findById(regionId);
        if (city) {
            updateObj.city = city._id;
        } else {
            return next(new APIError('errors.regionNotFound', 404));
        }
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        updateObj,
        { new: true }
    ).populate('city', 'name nameAr image').populate('region', 'name nameAr');

    if (!user) return next(new APIError('errors.userNotFound', 404));

    SuccessResponse.ok(res, {
        message: req.t('messages.regionSelected'),
        data: { user: clean(user) },
    });
};

exports.logout = (_req, res) => {
    SuccessResponse.ok(res, { message: 'messages.logoutSuccess' });
};

exports.verifyEmail = async (req, res, next) => {
    const user = await User.findOne({
        emailVerificationToken: hashToken(req.params.token),
        emailVerificationExpires: { $gt: Date.now() },
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) return next(new APIError('errors.invalidOrExpiredToken', 400));

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });

    SuccessResponse.ok(res, { message: req.t('messages.emailVerified') });
};

exports.resendVerificationEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(new APIError('errors.missingFields', 400));

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) return SuccessResponse.ok(res, { message: req.t('messages.verificationEmailSent') });
    if (user.isEmailVerified) return next(new APIError('errors.emailAlreadyVerified', 400));

    const { raw, hashed } = randomToken();
    user.emailVerificationToken = hashed;
    user.emailVerificationExpires = expiresIn('EMAIL_VERIFICATION_EXPIRE', '24h');
    await user.save({ validateBeforeSave: false });

    await sendVerificationEmail(user.email, user.name, raw, req.locale);

    SuccessResponse.ok(res, { message: req.t('messages.verificationEmailSent') });
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(new APIError('errors.missingFields', 400));

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    const sendResetNotice = () => SuccessResponse.ok(res, {
        message: req.t('messages.passwordResetEmailSent'),
    });

    if (!user || user.provider !== 'local') return sendResetNotice();

    const otp = String(crypto.randomInt(100000, 1000000));

    user.passwordResetOtp = hashToken(otp);
    user.passwordResetOtpExpires = expiresIn('PASSWORD_RESET_EXPIRE', '10m');
    await user.save({ validateBeforeSave: false });

    try {
        await sendPasswordResetOtpEmail(user.email, user.name, otp, req.locale);
    } catch (emailErr) {
        console.error('[forgotPassword] SMTP error:', emailErr);
        user.passwordResetOtp = undefined;
        user.passwordResetOtpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new APIError('errors.emailSendFailed', 500));
    }

    sendResetNotice();
};

exports.verifyResetOtp = async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) return next(new APIError('errors.missingFields', 400));

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail })
        .select('+passwordResetOtp +passwordResetOtpExpires');

    if (
        !user ||
        !user.passwordResetOtp ||
        user.passwordResetOtp !== hashToken(String(otp)) ||
        user.passwordResetOtpExpires < Date.now()
    ) {
        return next(new APIError('errors.invalidOrExpiredOtp', 400));
    }

    const { raw, hashed } = randomToken();
    user.passwordResetToken = hashed;
    user.passwordResetExpires = expiresIn('PASSWORD_RESET_EXPIRE', '10m');
    user.passwordResetOtp = undefined;
    user.passwordResetOtpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    SuccessResponse.ok(res, {
        message: req.t('messages.otpVerified'),
        resetToken: raw,
    });
};

exports.resetPassword = async (req, res, next) => {
    const { password } = req.body;
    if (!password) return next(new APIError('errors.missingFields', 400));

    const user = await User.findOne({
        passwordResetToken: hashToken(req.params.token),
        passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) return next(new APIError('errors.invalidOrExpiredToken', 400));

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.isEmailVerified = true;
    await user.save();

    SuccessResponse.ok(res, {
        message: req.t('messages.passwordResetSuccess'),
        token: authToken(user),
    });
};

exports.changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return next(new APIError('errors.missingFields', 400));
    if (currentPassword === newPassword) return next(new APIError('errors.samePassword', 400));

    const user = await User.findById(req.user._id).select('+password');
    if (!user) return next(new APIError('errors.userNotFound', 404));
    if (!(await user.comparePassword(currentPassword))) return next(new APIError('errors.wrongCurrentPassword', 401));

    user.password = newPassword;
    await user.save();

    SuccessResponse.ok(res, {
        message: req.t('messages.passwordChanged'),
        token: authToken(user),
    });
};

const presentUser = (user) => {
    const obj = user?.toObject ? clean(user) : { ...(user || {}) };
    if (obj.firebaseUid) obj.uid = obj.firebaseUid;
    if (obj.avatar && !obj.picture) obj.picture = obj.avatar;
    return obj;
};

exports.getMe = (req, res) => {
    SuccessResponse.ok(res, { data: { user: presentUser(req.user) } });
};

exports.updateProfile = async (req, res, next) => {
    const updates = pick(req.body, ['name', 'avatar']);

    if (!Object.keys(updates).length) return next(new APIError('errors.noUpdatableFields', 400));

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    if (!user) return next(new APIError('errors.userNotFound', 404));

    SuccessResponse.ok(res, {
        message: req.t('messages.profileUpdated'),
        data: { user: clean(user) },
    });
};

exports.deleteAccount = async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId).setOptions({ includeInactive: true });
    if (!user) return next(new APIError('errors.userNotFound', 404));

    await deleteUserData(userId);

    SuccessResponse.ok(res, {
        message: req.t('messages.accountDeleted'),
    });
};

const explicitGoogleName = (decoded) => {
    const raw = String(decoded.name || decoded.displayName || '').trim();
    return raw.length >= 2 ? raw.slice(0, 50) : '';
};

const normalizeGoogleName = (decoded) => {
    const explicit = explicitGoogleName(decoded);
    if (explicit) return explicit;
    const local = String(decoded.email || '').split('@')[0].trim();
    if (local.length >= 2) return local.slice(0, 50);
    return 'User';
};

const isGooglePhoto = (url) => !url || /googleusercontent\.com/.test(String(url));

const resolveCityId = async (cityId) => {
    if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) return null;
    const city = await City.findById(cityId).select('_id');
    return city ? city._id : null;
};

const upsertGoogleUser = async (decoded, cityId) => {
    const email = String(decoded.email || '').toLowerCase().trim();
    if (!decoded.uid || !email) throw new APIError('errors.missingFields', 400);

    const name = normalizeGoogleName(decoded);
    const picture = decoded.picture || decoded.photoURL || null;
    const city = await resolveCityId(cityId);

    let user = await User.findOne({ firebaseUid: decoded.uid })
        .setOptions({ includeInactive: true })
        .select('+active');

    if (!user) {
        user = await User.findOne({ email })
            .setOptions({ includeInactive: true })
            .select('+active');
    }

    if (user) {
        if (user.active === false) throw new APIError('errors.userDisabled', 403);

        user.firebaseUid = decoded.uid;
        user.email = email;
        user.isEmailVerified = true;
        const googleName = explicitGoogleName(decoded);
        if (googleName) user.name = googleName;
        else if (!user.name) user.name = name;
        if (picture && isGooglePhoto(user.avatar)) user.avatar = picture;
        if (user.provider !== 'local') user.provider = 'google';
        if (city) user.city = city;

        try {
            await user.save({ validateBeforeSave: false });
        } catch (err) {
            if (err.code === 11000) throw new APIError('errors.emailAlreadyExists', 400);
            throw err;
        }
        return user;
    }

    try {
        return await User.create({
            name,
            email,
            firebaseUid: decoded.uid,
            avatar: picture,
            provider: 'google',
            isEmailVerified: true,
            ...(city ? { city } : {}),
        });
    } catch (err) {
        if (err.code === 11000) throw new APIError('errors.emailAlreadyExists', 400);
        throw err;
    }
};

exports.upsertGoogleUser = upsertGoogleUser;

exports.googleLogin = async (req, res, next) => {
    try {
        let firebaseToken = req.body.firebaseIdToken || req.headers.authorization?.split(' ')[1];
        if (!firebaseToken) return next(new APIError('errors.tokenRequired', 401));

        const admin = require('../../../../admin/config/firebase');
        const decoded = await admin.auth().verifyIdToken(firebaseToken);
        const saved = await upsertGoogleUser(decoded, req.query.city || req.body.city || req.body.cityId);
        const user = await User.findById(saved._id).populate('city', 'name nameAr image').populate('region', 'name nameAr');
        const presented = presentUser(user);

        SuccessResponse.ok(res, {
            message: req.t('messages.loginSuccess'),
            token: authToken(user),
            data: {
                uid: decoded.uid,
                email: presented.email,
                name: presented.name,
                picture: presented.picture || decoded.picture || null,
                user: presented,
            },
        });
    } catch (err) {
        const map = {
            'auth/id-token-expired': new APIError('errors.firebaseTokenExpired', 401),
            'auth/id-token-revoked': new APIError('errors.firebaseTokenRevoked', 401),
            'auth/user-disabled': new APIError('errors.userDisabled', 403),
            'auth/argument-error': new APIError('errors.invalidFirebaseToken', 401),
            'auth/invalid-id-token': new APIError('errors.invalidFirebaseToken', 401),
        };
        next(map[err.code] || (err.code?.startsWith('auth/') ? new APIError('errors.invalidFirebaseToken', 401) : err));
    }
};
