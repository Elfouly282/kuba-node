const express = require('express');
const router = express.Router();

const {
    getAll,
    search,
    getOne,
    create,
    update,
    remove,
    assignOwner,
    removeOwner,
    addImages,
    deleteImage,
    setMainImage,
} = require('../controllers/advertisementController');

const { uploadMultiple, uploadFields } = require('../../../middleware/uploadMiddleware');
const { protectAdmin, requireAdmin, maybeAuth } = require('../../../middleware/authMiddleware');

router.get('/', maybeAuth, getAll);
router.get('/search', maybeAuth, search);
router.post('/search', maybeAuth, search);
router.get('/:id', maybeAuth, getOne);
const advertisementUploads = uploadFields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 4 },
], 'advertisements');

router.post('/', protectAdmin, ...advertisementUploads, create);
router.patch('/:id', protectAdmin, ...advertisementUploads, update);
router.put('/:id', protectAdmin, ...advertisementUploads, update);
router.delete('/:id', protectAdmin, remove);

// Owner management (Super Admin only)
router.post('/:id/owner', protectAdmin, requireAdmin, assignOwner);
router.delete('/:id/owner', protectAdmin, requireAdmin, removeOwner);

// Image management (Admin or Owner)
router.post('/:id/images', protectAdmin, ...uploadMultiple('images', 4, 'advertisements'), addImages);
router.delete('/:id/images', protectAdmin, deleteImage);
router.patch('/:id/set-main-image', protectAdmin, setMainImage);

module.exports = router;
