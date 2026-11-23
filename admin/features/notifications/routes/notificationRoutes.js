const express = require('express');
const router = express.Router();
const { preview, list, send } = require('../controllers/notificationController');
const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.use(protectAdmin, requireAdmin);

router.get('/audience', preview);
router.get('/', list);
router.post('/', ...uploadSingle('image', 'notifications'), send);

module.exports = router;
