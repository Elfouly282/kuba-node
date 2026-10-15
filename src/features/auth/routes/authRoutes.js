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

// ─── Temporary SMTP diagnostic — REMOVE before going live ───────────────────
if (process.env.NODE_ENV !== 'production') {
    router.get('/debug/smtp', async (_req, res) => {
        const nodemailer = require('nodemailer');
        const port = Number(process.env.EMAIL_PORT) || 465;
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port,
            secure: port === 465,
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
            tls: { rejectUnauthorized: false },
        });
        try {
            await transporter.verify();
            res.json({ status: 'ok', message: 'SMTP connection verified successfully' });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message, code: err.code });
        }
    });
}
// ────────────────────────────────────────────────────────────────────────────

router.post('/signup', signUp);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.post('/logout', protect, logout);
router.patch('/change-password', protect, changePassword);
router.get('/me', protect, getMe);
router.patch('/update-profile', protect, updateProfile);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
