const User = require('../auth/models/userModel');
const APIError = require('../../utils/apiError');

const TOKEN_KEYS = ['fcmToken', 'fcm_token', 'deviceToken'];
const MAX_TOKENS = 8;

const parseFcmToken = (body = {}) => {
    const source = body || {};
    const key = TOKEN_KEYS.find((name) => Object.prototype.hasOwnProperty.call(source, name));
    if (!key) return { token: '', provided: false, invalid: false };

    const raw = source[key];
    if (raw === null || raw === undefined || String(raw).trim() === '') {
        return { token: '', provided: false, invalid: false };
    }
    if (typeof raw !== 'string') return { token: '', provided: true, invalid: true };

    const token = raw.trim();
    if (token.length < 20 || token.length > 4096 || /\s/.test(token)) {
        return { token: '', provided: true, invalid: true };
    }
    return { token, provided: true, invalid: false };
};

const saveFcmToken = async (userId, token) => {
    await User.updateMany(
        { _id: { $ne: userId }, fcmTokens: token },
        { $pull: { fcmTokens: token } }
    );

    await User.updateOne({ _id: userId }, { $addToSet: { fcmTokens: token } });

    const current = await User.findById(userId).select('+fcmTokens');
    if (!current) return false;
    if ((current.fcmTokens || []).length > MAX_TOKENS) {
        const tokens = current.fcmTokens.filter((item) => item && item !== token);
        tokens.push(token);
        await User.updateOne({ _id: userId }, { $set: { fcmTokens: tokens.slice(-MAX_TOKENS) } });
    }
    return true;
};

const removeFcmToken = async (userId, token) => {
    if (!userId || !token) return;
    await User.updateOne({ _id: userId }, { $pull: { fcmTokens: token } });
};

const linkFcmToken = async (userId, body) => {
    const parsed = parseFcmToken(body);
    if (parsed.invalid) throw new APIError('errors.invalidFcmToken', 400);
    if (!parsed.token) return false;
    await saveFcmToken(userId, parsed.token);
    return true;
};

module.exports = {
    parseFcmToken,
    saveFcmToken,
    removeFcmToken,
    linkFcmToken,
};
