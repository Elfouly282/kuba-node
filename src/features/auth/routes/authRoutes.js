const express = require('express');
const router = express.Router();

const {
    signUp,
    login,
    logout,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    changePassword,
    getMe,
    updateProfile,
    deleteAccount,
    googleLogin,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// ── Public routes ────────────────────────────────────────────────────────────
router.post('/signup', signUp);
router.post('/login', login);
router.post('/google', googleLogin);

router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// ── Protected routes (JWT required) ─────────────────────────────────────────
router.post('/logout', protect, logout);
router.patch('/change-password', protect, changePassword);
router.get('/me', protect, getMe);
router.patch('/update-profile', protect, updateProfile);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
