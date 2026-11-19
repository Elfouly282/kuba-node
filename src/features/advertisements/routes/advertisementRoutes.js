const express = require('express');
const router = express.Router();

const {
    getAll,
    search,
    getOne,
    create,
    update,
    remove,
} = require('../controllers/advertisementController');

const { uploadFields } = require('../../../middleware/uploadMiddleware');
const { protect, restrictTo } = require('../../auth/middleware/authMiddleware');
const buildBlockedPeriodRoutes = require('../../bookings/routes/blockedPeriodRoutes');
const {
    validateAdvertisementId,
    validateCreateAdvertisement,
    validateUpdateAdvertisement,
} = require('../middleware/advertisementMiddleware');
const {
    toggleWishlist,
} = require('../../wishlist/controllers/wishlistController');
const {
    createRoom,
    getRoomsByHotel,
    getAvailableRoomsForHotel,
} = require('../../rooms/controllers/roomController');

router.get('/', getAll);
router.get('/search', search);
router.post('/search', search);
router.get('/:id', validateAdvertisementId, getOne);
router.use(buildBlockedPeriodRoutes(protect));

router.post('/:id/wishlist', protect, validateAdvertisementId, toggleWishlist);
router.post('/:id/wishlist/toggle', protect, validateAdvertisementId, toggleWishlist);

// Hotel Rooms
router.get('/:id/rooms', validateAdvertisementId, getRoomsByHotel);
router.get('/:id/available-rooms', validateAdvertisementId, getAvailableRoomsForHotel);
router.post('/:id/rooms', protect, validateAdvertisementId, ...uploadFields([
    { name: 'images', maxCount: 3 },
    { name: 'image', maxCount: 1 },
], 'rooms'), createRoom);

const advertisementUploads = uploadFields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 4 },
], 'advertisements');

router.post('/', protect, restrictTo('admin'), ...advertisementUploads, validateCreateAdvertisement, create);
router.patch('/:id', protect, restrictTo('admin'), validateAdvertisementId, ...advertisementUploads, validateUpdateAdvertisement, update);
router.put('/:id', protect, restrictTo('admin'), validateAdvertisementId, ...advertisementUploads, validateUpdateAdvertisement, update);
router.delete('/:id', protect, restrictTo('admin'), validateAdvertisementId, remove);

module.exports = router;
