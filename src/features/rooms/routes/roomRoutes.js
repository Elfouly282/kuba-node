const express = require('express');
const router = express.Router();

const {
    createRoom,
    getRoomsByHotel,
    getAvailableRoomsForHotel,
    getRoomById,
    updateRoom,
    deleteRoom,
} = require('../controllers/roomController');

const { protect } = require('../../auth/middleware/authMiddleware');
const { uploadSingle } = require('../../../middleware/uploadMiddleware');

// Hotel-scoped endpoints
router.get('/hotel/:hotelId/available', getAvailableRoomsForHotel);
router.get('/hotel/:hotelId', getRoomsByHotel);
router.post('/hotel/:hotelId', protect, ...uploadSingle('image', 'rooms'), createRoom);

// Individual Room endpoints
router.get('/:id', getRoomById);
router.patch('/:id', protect, ...uploadSingle('image', 'rooms'), updateRoom);
router.put('/:id', protect, ...uploadSingle('image', 'rooms'), updateRoom);
router.delete('/:id', protect, deleteRoom);

module.exports = router;
