const express = require('express');
const router = express.Router();

const {
    getBookedDates,
    checkBooking,
    createBooking,
    getMyBookings,
    getMyBooking,
    cancelMyBooking,
} = require('../controllers/bookingController');

const { protect } = require('../../auth/middleware/authMiddleware');

router.get('/booked-dates/:advertisementId', getBookedDates);
router.get('/check', checkBooking);

router.use(protect);

router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/:id', getMyBooking);
router.patch('/:id/cancel', cancelMyBooking);

module.exports = router;
