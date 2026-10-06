const crypto = require('crypto');
const admin = require('../../../../admin/config/firebase');
const User = require('../models/userModel');
const APIError = require('../../../utils/apiError');
const generateToken = require('../../../utils/generateToken');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../../../utils/sendEmail');

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const randomToken = () => {
    const raw = crypto.randomBytes(32).toString('hex');
    return { raw, hashed: hashToken(raw) };
};

const expiresIn = (envKey, fallback) => {
    const str = process.env[envKey] || fallback;
    const unit = str.slice(-1);
    const val = parseInt(str);
    const ms = { s: 1e3, m: 6e4, h: 36e5, d: 864e5 };
    return new Date(Date.now() + val * (ms[unit] || 36e5));
};

const clean = (user) => {
    const obj = user.toObject();
    ['password', 'emailVerificationToken', 'emailVerificationExpires',
        'passwordResetToken', 'passwordResetExpires', 'active', '__v'].forEach(k => delete obj[k]);
    return obj;
};

exports.signUp = async (req, res, next) => {
    try {
        const { name, email, phone, password, confirmPassword, acceptTerms } = req.body;
        if (!email || !password || !confirmPassword) return next(new APIError('errors.missingFields', 400));
        if (password !== confirmPassword) return next(new APIError('errors.passwordsDoNotMatch', 400));
        if (!acceptTerms) return next(new APIError('errors.mustAcceptTerms', 400));

        if (await User.findOne({ email })) return next(new APIError('errors.emailAlreadyExists', 400));

        const { raw, hashed } = randomToken();

        const user = await User.create({
            name: name || null,
            email,
            phone: phone || null,
            password,
            provider: 'local',
            emailVerificationToken: hashed,
            emailVerificationExpires: expiresIn('EMAIL_VERIFICATION_EXPIRE', '24h'),
        });

        sendVerificationEmail(user.email, user.name, raw, req.locale).catch(console.error);

        res.status(201).json({
            status: 'success',
            message: req.t('messages.signUpSuccess'),
            token: generateToken({ id: user._id, email: user.email }),
            data: { user: clean(user) },
        });
    } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(new APIError('errors.missingFields', 400));

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) return next(new APIError('errors.invalidCredentials', 401));
        if (user.provider !== 'local') return next(new APIError('errors.useGoogleLogin', 400));

        res.status(200).json({
            status: 'success',
            message: req.t('messages.loginSuccess'),
            token: generateToken({ id: user._id, email: user.email }),
            data: { user: clean(user) },
        });
    } catch (err) { next(err); }
};

exports.logout = (_req, res) => {
    res.status(200).json({ status: 'success', message: 'messages.logoutSuccess' });
};

exports.verifyEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({
            emailVerificationToken: hashToken(req.params.token),
            emailVerificationExpires: { $gt: Date.now() },
        }).select('+emailVerificationToken +emailVerificationExpires');

        if (!user) return next(new APIError('errors.invalidOrExpiredToken', 400));

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(200).json({ status: 'success', message: req.t('messages.emailVerified') });
    } catch (err) { next(err); }
};

exports.resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return next(new APIError('errors.missingFields', 400));

        const user = await User.findOne({ email }).select('+emailVerificationToken +emailVerificationExpires');

        if (!user) return res.status(200).json({ status: 'success', message: req.t('messages.verificationEmailSent') });
        if (user.isEmailVerified) return next(new APIError('errors.emailAlreadyVerified', 400));

        const { raw, hashed } = randomToken();
        user.emailVerificationToken = hashed;
        user.emailVerificationExpires = expiresIn('EMAIL_VERIFICATION_EXPIRE', '24h');
        await user.save({ validateBeforeSave: false });

        await sendVerificationEmail(user.email, user.name, raw, req.locale);

        res.status(200).json({ status: 'success', message: req.t('messages.verificationEmailSent') });
    } catch (err) { next(err); }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return next(new APIError('errors.missingFields', 400));

        const user = await User.findOne({ email });
        const response = { status: 'success', message: req.t('messages.passwordResetEmailSent') };

        if (!user || user.provider !== 'local') return res.status(200).json(response);

        const { raw, hashed } = randomToken();
        user.passwordResetToken = hashed;
        user.passwordResetExpires = expiresIn('PASSWORD_RESET_EXPIRE', '10m');
        await user.save({ validateBeforeSave: false });

        try {
            await sendPasswordResetEmail(user.email, user.name, raw, req.locale);
        } catch {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new APIError('errors.emailSendFailed', 500));
        }

        res.status(200).json(response);
    } catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
    try {
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
        await user.save();

        res.status(200).json({
            status: 'success',
            message: req.t('messages.passwordResetSuccess'),
            token: generateToken({ id: user._id, email: user.email }),
        });
    } catch (err) { next(err); }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) return next(new APIError('errors.missingFields', 400));
        if (currentPassword === newPassword) return next(new APIError('errors.samePassword', 400));

        const user = await User.findById(req.user._id).select('+password');
        if (!user) return next(new APIError('errors.userNotFound', 404));
        if (!(await user.comparePassword(currentPassword))) return next(new APIError('errors.wrongCurrentPassword', 401));

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            status: 'success',
            message: req.t('messages.passwordChanged'),
            token: generateToken({ id: user._id, email: user.email }),
        });
    } catch (err) { next(err); }
};

exports.getMe = (req, res) => {
    const user = req.user.toObject ? clean(req.user) : req.user;
    res.status(200).json({ status: 'success', data: { user } });
};

exports.updateProfile = async (req, res, next) => {
    try {
        const allowed = ['name', 'avatar'];
        const updates = Object.fromEntries(allowed.filter(k => req.body[k] !== undefined).map(k => [k, req.body[k]]));

        if (!Object.keys(updates).length) return next(new APIError('errors.noUpdatableFields', 400));

        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
        if (!user) return next(new APIError('errors.userNotFound', 404));

        res.status(200).json({
            status: 'success',
            message: req.t('messages.profileUpdated'),
            data: { user: clean(user) },
        });
    } catch (err) { next(err); }
};

exports.deleteAccount = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { active: false });
        res.status(200).json({ status: 'success', message: req.t('messages.accountDeleted') });
    } catch (err) { next(err); }
};

exports.googleLogin = async (req, res, next) => {
    try {
        let firebaseToken = req.body.firebaseIdToken || req.headers.authorization?.split(' ')[1];
        if (!firebaseToken) return next(new APIError('errors.tokenRequired', 401));

        const decoded = await admin.auth().verifyIdToken(firebaseToken);

        res.status(200).json({
            status: 'success',
            message: req.t('messages.loginSuccess'),
            token: generateToken({ uid: decoded.uid, email: decoded.email }),
            data: { uid: decoded.uid, email: decoded.email, name: decoded.name, picture: decoded.picture },
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
