const express = require('express');
const router = express.Router();

const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
} = require('../controllers/wishlistController');

const { protect } = require('../../auth/middleware/authMiddleware');
const {
    validateWishlistInput,
    validateAdvertisementParam,
} = require('../middleware/wishlistMiddleware');

router.use(protect);

router.get('/', getWishlist);
router.post('/toggle', validateWishlistInput, toggleWishlist);
router.delete('/clear', clearWishlist);

router.post('/:advertisementId/toggle', validateAdvertisementParam, toggleWishlist);
router.post('/:advertisementId', validateAdvertisementParam, addToWishlist);
router.delete('/:advertisementId', validateAdvertisementParam, removeFromWishlist);

router.post('/', validateWishlistInput, addToWishlist);
router.delete('/', removeFromWishlist);

module.exports = router;
