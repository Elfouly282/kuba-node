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
const { uploadFields } = require('../../../middleware/uploadMiddleware');

const roomImagesUpload = uploadFields([
    { name: 'images', maxCount: 3 },
    { name: 'image', maxCount: 1 },
], 'rooms');

// Hotel-scoped endpoints
router.get('/hotel/:hotelId/available', getAvailableRoomsForHotel);
router.get('/hotel/:hotelId', getRoomsByHotel);
router.post('/hotel/:hotelId', protect, ...roomImagesUpload, createRoom);

// Individual Room endpoints
router.get('/:id', getRoomById);
router.patch('/:id', protect, ...roomImagesUpload, updateRoom);
router.put('/:id', protect, ...roomImagesUpload, updateRoom);
router.delete('/:id', protect, deleteRoom);

module.exports = router;
