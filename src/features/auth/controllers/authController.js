const crypto = require('crypto');
const User = require('../models/userModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Booking = require('../../bookings/models/bookingModel');
const Banner = require('../../banners/models/bannerModel');
const APIError = require('../../../utils/apiError');
const { generateToken } = require('../../../utils/generateToken');
const { sendVerificationEmail, sendPasswordResetOtpEmail } = require('../../../utils/sendEmail');
const { deleteImageFile } = require('../../../utils/imageUrl');

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const randomToken = () => {
    const raw = crypto.randomBytes(32).toString('base64url');
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
    try {
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

        res.status(201).json({
            status: 'success',
            message: req.t('messages.signUpSuccess'),
            token: generateToken({ id: user._id }),
            data: { user: clean(user) },
        });
    } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(new APIError('errors.missingFields', 400));

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail }).select('+password').populate('region', 'name image');
        if (!user || !(await user.comparePassword(password))) return next(new APIError('errors.invalidCredentials', 401));
        if (user.provider !== 'local') return next(new APIError('errors.useGoogleLogin', 400));

        res.status(200).json({
            status: 'success',
            message: req.t('messages.loginSuccess'),
            token: generateToken({ id: user._id }),
            data: { user: clean(user) },
        });
    } catch (err) { next(err); }
};

exports.selectCity = async (req, res, next) => {
    try {
        const mongoose = require('mongoose');
        const cityId = req.body.cityId || req.body.city;
        if (!cityId) return next(new APIError('validation.cityRequired', 400));
        if (!mongoose.Types.ObjectId.isValid(cityId)) return next(new APIError('errors.invalidCityId', 400));

        const City = require('../../cities/models/cityModel');
        const city = await City.findById(cityId);
        if (!city) return next(new APIError('errors.cityNotFound', 404));

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { city: city._id },
            { new: true }
        ).populate('city', 'name image').populate('region', 'name image');

        if (!user) return next(new APIError('errors.userNotFound', 404));

        res.status(200).json({
            status: 'success',
            message: req.t('messages.citySelected'),
            data: { user: clean(user) },
        });
    } catch (err) { next(err); }
};

exports.selectRegion = async (req, res, next) => {
    try {
        const mongoose = require('mongoose');
        const regionId = req.body.regionId || req.body.region;
        if (!regionId) return next(new APIError('validation.regionRequired', 400));
        if (!mongoose.Types.ObjectId.isValid(regionId)) return next(new APIError('errors.invalidRegionId', 400));

        const Region = require('../../regions/models/regionModel');
        const City = require('../../cities/models/cityModel');
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
        ).populate('city', 'name image').populate('region', 'name image');

        if (!user) return next(new APIError('errors.userNotFound', 404));

        res.status(200).json({
            status: 'success',
            message: req.t('messages.regionSelected'),
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

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail }).select('+emailVerificationToken +emailVerificationExpires');

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

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        const response = { status: 'success', message: req.t('messages.passwordResetEmailSent') };

        if (!user || user.provider !== 'local') return res.status(200).json(response);

        const otp = String(Math.floor(100000 + Math.random() * 900000));

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

        res.status(200).json(response);
    } catch (err) { next(err); }
};

exports.verifyResetOtp = async (req, res, next) => {
    try {
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

        res.status(200).json({
            status: 'success',
            message: req.t('messages.otpVerified'),
            resetToken: raw,
        });
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
            token: generateToken({ id: user._id }),
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
            token: generateToken({ id: user._id }),
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
        const userId = req.user._id;
        const user = await User.findById(userId).setOptions({ includeInactive: true });
        if (!user) return next(new APIError('errors.userNotFound', 404));

        await deleteUserData(userId);

        res.status(200).json({
            status: 'success',
            message: req.t('messages.accountDeleted'),
        });
    } catch (err) { next(err); }
};

exports.googleLogin = async (req, res, next) => {
    try {
        let firebaseToken = req.body.firebaseIdToken || req.headers.authorization?.split(' ')[1];
        if (!firebaseToken) return next(new APIError('errors.tokenRequired', 401));

        const admin = require('../../../../admin/config/firebase');
        const decoded = await admin.auth().verifyIdToken(firebaseToken);

        res.status(200).json({
            status: 'success',
            message: req.t('messages.loginSuccess'),
            token: generateToken({ uid: decoded.uid }),
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
