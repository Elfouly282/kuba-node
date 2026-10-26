const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
} = require('../controllers/bannerController');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', protectAdmin, requireAdmin, getOne);
router.post('/', protectAdmin, requireAdmin, ...uploadSingle('image', 'banners'), create);
router.patch('/:id', protectAdmin, requireAdmin, ...uploadSingle('image', 'banners'), update);
router.put('/:id', protectAdmin, requireAdmin, ...uploadSingle('image', 'banners'), update);
router.delete('/:id', protectAdmin, requireAdmin, remove);

module.exports = router;
