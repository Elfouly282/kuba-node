const express = require('express');
const router = express.Router();

const {
    getWishlist,
    toggleWishlist,
    clearWishlist,
} = require('../controllers/wishlistController');

const { protect } = require('../../auth/middleware/authMiddleware');
const {
    validateWishlistInput,
    validateAdvertisementParam,
} = require('../middleware/wishlistMiddleware');

router.use(protect);

// 1. Toggle Wishlist (Add if absent, Remove if present)
router.post('/toggle', validateWishlistInput, toggleWishlist);
router.post('/:advertisementId/toggle', validateAdvertisementParam, toggleWishlist);
router.post('/:advertisementId', validateAdvertisementParam, toggleWishlist);
router.post('/', validateWishlistInput, toggleWishlist);

// 2. Get User Wishlist
router.get('/', getWishlist);

// 3. Clear Wishlist
router.delete('/clear', clearWishlist);
router.delete('/', clearWishlist);

module.exports = router;
