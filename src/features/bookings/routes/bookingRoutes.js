const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
    checkAvailability,
    getHotelAvailableRooms,
    getScheduleSlots,
    calculatePrice,
    cancelBooking,
    confirmBooking,
    completeBooking,
} = require('../controllers/bookingController');

const { protect } = require('../../auth/middleware/authMiddleware');
const {
    validateBookingId,
    validateAvailabilityQuery,
    validateCreateBooking,
    validateUpdateBooking,
} = require('../middleware/bookingMiddleware');

// Public availability, schedule and estimation endpoints
router.get('/check-availability/:advertisementId', validateAvailabilityQuery, checkAvailability);
router.get('/hotel/:hotelId/available-rooms', getHotelAvailableRooms);
router.get('/schedule/:advertisementId', getScheduleSlots);
router.get('/yacht/:advertisementId/slots', getScheduleSlots);
router.get('/golf-car/:advertisementId/slots', getScheduleSlots);
router.post('/calculate-price', calculatePrice);
router.post('/estimate', calculatePrice);

// Protected booking operations
router.use(protect);

router.get('/', getAll);
router.get('/:id', validateBookingId, getOne);
router.post('/', validateCreateBooking, create);
router.patch('/:id', validateUpdateBooking, update);
router.patch('/:id/cancel', validateBookingId, cancelBooking);
router.patch('/:id/confirm', validateBookingId, confirmBooking);
router.patch('/:id/complete', validateBookingId, completeBooking);
router.delete('/:id', validateBookingId, remove);

module.exports = router;
