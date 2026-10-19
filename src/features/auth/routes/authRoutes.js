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
    selectRegion,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.patch('/reset-password/:token', resetPassword);

router.post('/logout', protect, logout);
router.patch('/change-password', protect, changePassword);
router.get('/me', protect, getMe);
router.patch('/update-profile', protect, updateProfile);
router.post('/select-region', protect, selectRegion);
router.patch('/select-region', protect, selectRegion);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
