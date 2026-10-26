const express = require('express');
const router = express.Router();

const {
    signUp,
    login,
    logout,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    changePassword,
    getMe,
    updateProfile,
    deleteAccount,
    googleLogin,
    selectCity,
    selectRegion,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
const {
    validateSignUp,
    validateLogin,
    validateSelectRegion,
    validateChangePassword,
    validateForgotPassword,
    validateVerifyResetOtp,
    validateResetPassword,
    validateResendVerification,
} = require('../middleware/authValidationMiddleware');

router.post('/signup', validateSignUp, signUp);
router.post('/login', validateLogin, login);
router.post('/google', googleLogin);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', validateResendVerification, resendVerificationEmail);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/verify-reset-otp', validateVerifyResetOtp, verifyResetOtp);
router.patch('/reset-password/:token', validateResetPassword, resetPassword);

router.post('/logout', protect, logout);
router.patch('/change-password', protect, validateChangePassword, changePassword);
router.get('/me', protect, getMe);
router.patch('/update-profile', protect, updateProfile);
router.post('/select-city', protect, selectCity);
router.patch('/select-city', protect, selectCity);
router.post('/select-region', protect, validateSelectRegion, selectRegion);
router.patch('/select-region', protect, validateSelectRegion, selectRegion);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
