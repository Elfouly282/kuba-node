const mongoose = require('mongoose');
const APIError = require('../../../utils/apiError');

/**
 * Validates sign up request payload.
 */
const validateSignUp = (req, _res, next) => {
    const { email, password, confirmPassword, acceptTerms } = req.body;
    if (!email || !password || !confirmPassword) {
        return next(new APIError('errors.missingFields', 400));
    }
    if (password !== confirmPassword) {
        return next(new APIError('errors.passwordsDoNotMatch', 400));
    }
    if (!acceptTerms) {
        return next(new APIError('errors.mustAcceptTerms', 400));
    }
    next();
};

/**
 * Validates login request payload.
 */
const validateLogin = (req, _res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new APIError('errors.missingFields', 400));
    }
    next();
};

/**
 * Validates select region request payload.
 */
const validateSelectRegion = (req, _res, next) => {
    const regionId = req.body.regionId || req.body.region;
    if (!regionId) {
        return next(new APIError('validation.regionRequired', 400));
    }
    if (!mongoose.Types.ObjectId.isValid(regionId)) {
        return next(new APIError('errors.invalidRegionId', 400));
    }
    req.body.regionId = regionId;
    next();
};

/**
 * Validates change password payload.
 */
const validateChangePassword = (req, _res, next) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return next(new APIError('errors.missingFields', 400));
    }
    if (currentPassword === newPassword) {
        return next(new APIError('errors.samePassword', 400));
    }
    next();
};

/**
 * Validates forgot password payload.
 */
const validateForgotPassword = (req, _res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new APIError('errors.missingFields', 400));
    }
    next();
};

/**
 * Validates reset OTP verification payload.
 */
const validateVerifyResetOtp = (req, _res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return next(new APIError('errors.missingFields', 400));
    }
    next();
};

/**
 * Validates reset password payload.
 */
const validateResetPassword = (req, _res, next) => {
    if (!req.params.token) {
        return next(new APIError('errors.invalidOrExpiredToken', 400));
    }
    if (!req.body.password) {
        return next(new APIError('errors.missingFields', 400));
    }
    next();
};

/**
 * Validates resend email verification payload.
 */
const validateResendVerification = (req, _res, next) => {
    if (!req.body.email) {
        return next(new APIError('errors.missingFields', 400));
    }
    next();
};

module.exports = {
    validateSignUp,
    validateLogin,
    validateSelectRegion,
    validateChangePassword,
    validateForgotPassword,
    validateVerifyResetOtp,
    validateResetPassword,
    validateResendVerification,
};
