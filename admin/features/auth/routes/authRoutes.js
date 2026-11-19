const express = require('express');
const router = express.Router();
const { login, getMe, googleLogin, appleLogin } = require('../controllers/authController');
const { protectAdmin } = require('../../../middleware/authMiddleware');

router.post('/login', login);
router.post('/google', googleLogin);
router.post('/apple', appleLogin);
router.get('/me', protectAdmin, getMe);

module.exports = router;
