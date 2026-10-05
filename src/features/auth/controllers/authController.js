const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const admin = require('../../../../admin/config/firebase');
const User = require('../models/userModel');
const APIError = require('../../../utils/apiError');
const generateToken = require('../../../utils/generateToken');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../../../utils/sendEmail');

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Generate a cryptographically random hex token and its SHA-256 hash. */
const createToken = () => {
    const raw = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.createHash('sha256').update(raw).digest('hex');
    return { raw, hashed };
};

/** ms representation of a duration string like "24h" or "10m". */
const durationToMs = (str) => {
    const unit = str.slice(-1);
    const value = parseInt(str.slice(0, -1), 10);
    const map = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
    return value * (map[unit] || 3_600_000);
};

/** Strip sensitive fields before sending the user object in a response. */
const sanitizeUser = (user) => {
    const obj = user.toObject ? user.toObject() : { ...user };
    delete obj.password;
    delete obj.emailVerificationToken;
    delete obj.emailVerificationExpires;
    delete obj.passwordResetToken;
    delete obj.passwordResetExpires;
    delete obj.active;
    delete obj.__v;
    return obj;
};

/** Map Firebase Admin SDK error codes to APIError instances. */
const mapFirebaseAuthError = (err) => {
    switch (err.code) {
        case 'auth/id-token-expired':
            return new APIError('errors.firebaseTokenExpired', 401);
        case 'auth/id-token-revoked':
            return new APIError('errors.firebaseTokenRevoked', 401);
        case 'auth/user-disabled':
            return new APIError('errors.userDisabled', 403);
        case 'auth/argument-error':
        case 'auth/invalid-id-token':
            return new APIError('errors.invalidFirebaseToken', 401);
        default:
            return err.code?.startsWith('auth/')
                ? new APIError('errors.invalidFirebaseToken', 401)
                : null;
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. Sign Up
// ─────────────────────────────────────────────────────────────────────────────
exports.signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new APIError('errors.missingFields', 400));
        }

        // Check for existing account
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return next(new APIError('errors.emailAlreadyExists', 400));
        }

        // Build email-verification token
        const { raw, hashed } = createToken();
        const expires = new Date(Date.now() + durationToMs(process.env.EMAIL_VERIFICATION_EXPIRE || '24h'));

        // Create user (password hashed by pre-save hook)
        const user = await User.create({
            name,
            email,
            password,
            provider: 'local',
            emailVerificationToken: hashed,
            emailVerificationExpires: expires,
        });

        // Send verification email (non-blocking — don't fail signup if mail fails)
        try {
            await sendVerificationEmail({ to: user.email, name: user.name, token: raw, locale: req.locale });
        } catch (mailErr) {
            console.error('Verification email failed:', mailErr.message);
        }

        const token = generateToken({ id: user._id, email: user.email });

        res.status(201).json({
            status: 'success',
            message: req.t('messages.signUpSuccess'),
            token,
            data: { user: sanitizeUser(user) },
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Login
// ─────────────────────────────────────────────────────────────────────────────
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new APIError('errors.missingFields', 400));
        }

        // Explicitly select password (field has select:false in schema)
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return next(new APIError('errors.invalidCredentials', 401));
        }

        if (user.provider !== 'local') {
            return next(new APIError('errors.useGoogleLogin', 400));
        }

        const token = generateToken({ id: user._id, email: user.email });

        res.status(200).json({
            status: 'success',
            message: req.t('messages.loginSuccess'),
            token,
            data: { user: sanitizeUser(user) },
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Logout  (stateless JWT — client discards token; we just confirm)
// ─────────────────────────────────────────────────────────────────────────────
exports.logout = (_req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'messages.logoutSuccess',
    });
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Verify Email   GET /verify-email/:token
// ─────────────────────────────────────────────────────────────────────────────
exports.verifyEmail = async (req, res, next) => {
    try {
        const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            emailVerificationToken: hashed,
            emailVerificationExpires: { $gt: Date.now() },
        }).select('+emailVerificationToken +emailVerificationExpires');

        if (!user) {
            return next(new APIError('errors.invalidOrExpiredToken', 400));
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(200).json({
            status: 'success',
            message: req.t('messages.emailVerified'),
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Resend Verification Email
// ─────────────────────────────────────────────────────────────────────────────
exports.resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new APIError('errors.missingFields', 400));
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select(
            '+emailVerificationToken +emailVerificationExpires'
        );

        if (!user) {
            // Don't reveal whether the email exists
            return res.status(200).json({
                status: 'success',
                message: req.t('messages.verificationEmailSent'),
            });
        }

        if (user.isEmailVerified) {
            return next(new APIError('errors.emailAlreadyVerified', 400));
        }

        const { raw, hashed } = createToken();
        const expires = new Date(Date.now() + durationToMs(process.env.EMAIL_VERIFICATION_EXPIRE || '24h'));

        user.emailVerificationToken = hashed;
        user.emailVerificationExpires = expires;
        await user.save({ validateBeforeSave: false });

        await sendVerificationEmail({ to: user.email, name: user.name, token: raw, locale: req.locale });

        res.status(200).json({
            status: 'success',
            message: req.t('messages.verificationEmailSent'),
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Forgot Password
// ─────────────────────────────────────────────────────────────────────────────
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new APIError('errors.missingFields', 400));
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        // Always respond the same way — don't reveal whether the email exists
        if (!user || user.provider !== 'local') {
            return res.status(200).json({
                status: 'success',
                message: req.t('messages.passwordResetEmailSent'),
            });
        }

        const { raw, hashed } = createToken();
        const expires = new Date(Date.now() + durationToMs(process.env.PASSWORD_RESET_EXPIRE || '10m'));

        user.passwordResetToken = hashed;
        user.passwordResetExpires = expires;
        await user.save({ validateBeforeSave: false });

        try {
            await sendPasswordResetEmail({ to: user.email, name: user.name, token: raw, locale: req.locale });
        } catch (mailErr) {
            // Roll back tokens so the user can try again
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new APIError('errors.emailSendFailed', 500));
        }

        res.status(200).json({
            status: 'success',
            message: req.t('messages.passwordResetEmailSent'),
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Reset Password   PATCH /reset-password/:token
// ─────────────────────────────────────────────────────────────────────────────
exports.resetPassword = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return next(new APIError('errors.missingFields', 400));
        }

        const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashed,
            passwordResetExpires: { $gt: Date.now() },
        }).select('+passwordResetToken +passwordResetExpires');

        if (!user) {
            return next(new APIError('errors.invalidOrExpiredToken', 400));
        }

        user.password = password;  // pre-save hook will hash it
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        const token = generateToken({ id: user._id, email: user.email });

        res.status(200).json({
            status: 'success',
            message: req.t('messages.passwordResetSuccess'),
            token,
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Change Password  (requires protect middleware)
// ─────────────────────────────────────────────────────────────────────────────
exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return next(new APIError('errors.missingFields', 400));
        }

        // Re-fetch with password (it's select:false)
        const user = await User.findById(req.user._id).select('+password');

        if (!user) {
            return next(new APIError('errors.userNotFound', 404));
        }

        if (!(await user.comparePassword(currentPassword))) {
            return next(new APIError('errors.wrongCurrentPassword', 401));
        }

        if (currentPassword === newPassword) {
            return next(new APIError('errors.samePassword', 400));
        }

        user.password = newPassword;
        await user.save();

        const token = generateToken({ id: user._id, email: user.email });

        res.status(200).json({
            status: 'success',
            message: req.t('messages.passwordChanged'),
            token,
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Get Current User / Me  (requires protect middleware)
// ─────────────────────────────────────────────────────────────────────────────
exports.getMe = async (req, res, next) => {
    try {
        // For local users req.user is already the full document from protect()
        // For Firebase users req.user is the lightweight object
        const user = req.user.toObject ? sanitizeUser(req.user) : req.user;

        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. Update Profile  (requires protect middleware)
// ─────────────────────────────────────────────────────────────────────────────
exports.updateProfile = async (req, res, next) => {
    try {
        // Only allow safe fields to be updated via this endpoint
        const ALLOWED = ['name', 'avatar'];
        const updates = {};
        ALLOWED.forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return next(new APIError('errors.noUpdatableFields', 400));
        }

        const user = await User.findByIdAndUpdate(req.user._id, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return next(new APIError('errors.userNotFound', 404));
        }

        res.status(200).json({
            status: 'success',
            message: req.t('messages.profileUpdated'),
            data: { user: sanitizeUser(user) },
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. Delete Account  (requires protect middleware)
// ─────────────────────────────────────────────────────────────────────────────
exports.deleteAccount = async (req, res, next) => {
    try {
        // Soft-delete: set active = false (query middleware hides them automatically)
        await User.findByIdAndUpdate(req.user._id, { active: false });

        res.status(200).json({
            status: 'success',
            message: req.t('messages.accountDeleted'),
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. Google / Firebase SSO Login  (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────
exports.googleLogin = async (req, res, next) => {
    try {
        let firebaseIdToken = req.body.firebaseIdToken;
        if (!firebaseIdToken) {
            const authHeader = req.headers.authorization;
            if (authHeader?.startsWith('Bearer ')) {
                firebaseIdToken = authHeader.split(' ')[1];
            }
        }

        if (!firebaseIdToken) {
            return next(new APIError('errors.tokenRequired', 401));
        }

        const decodedToken = await admin.auth().verifyIdToken(firebaseIdToken);

        const jwtToken = generateToken({
            uid: decodedToken.uid,
            email: decodedToken.email,
        });

        res.status(200).json({
            status: 'success',
            message: req.t('messages.loginSuccess'),
            token: jwtToken,
            data: {
                uid: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture,
            },
        });
    } catch (err) {
        const mapped = mapFirebaseAuthError(err);
        if (mapped) return next(mapped);
        next(err);
    }
};
