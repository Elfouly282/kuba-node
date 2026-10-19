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
const { protect, restrictTo } = require('../../auth/middleware/authMiddleware');
const {
    validateBannerId,
    validateCreateBanner,
    validateUpdateBanner,
} = require('../middleware/bannerMiddleware');

router.get('/', getAll);
router.get('/:id', validateBannerId, getOne);

router.post('/', protect, restrictTo('admin'), ...uploadSingle('image', 'banners'), validateCreateBanner, create);
router.patch('/:id', protect, restrictTo('admin'), validateBannerId, ...uploadSingle('image', 'banners'), validateUpdateBanner, update);
router.put('/:id', protect, restrictTo('admin'), validateBannerId, ...uploadSingle('image', 'banners'), validateUpdateBanner, update);
router.delete('/:id', protect, restrictTo('admin'), validateBannerId, remove);

module.exports = router;
