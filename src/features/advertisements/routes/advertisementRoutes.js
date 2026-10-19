const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
} = require('../controllers/advertisementController');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protect, restrictTo } = require('../../auth/middleware/authMiddleware');
const {
    validateAdvertisementId,
    validateCreateAdvertisement,
    validateUpdateAdvertisement,
} = require('../middleware/advertisementMiddleware');

router.get('/', getAll);
router.get('/:id', validateAdvertisementId, getOne);
router.post('/', protect, restrictTo('admin'), ...uploadSingle('image', 'advertisements'), validateCreateAdvertisement, create);
router.patch('/:id', protect, restrictTo('admin'), validateAdvertisementId, ...uploadSingle('image', 'advertisements'), validateUpdateAdvertisement, update);
router.put('/:id', protect, restrictTo('admin'), validateAdvertisementId, ...uploadSingle('image', 'advertisements'), validateUpdateAdvertisement, update);
router.delete('/:id', protect, restrictTo('admin'), validateAdvertisementId, remove);

module.exports = router;
