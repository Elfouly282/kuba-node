const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
    checkAvailability,
} = require('../controllers/bookingController');

const { protect } = require('../../auth/middleware/authMiddleware');
const {
    validateBookingId,
    validateAvailabilityQuery,
    validateCreateBooking,
    validateUpdateBooking,
} = require('../middleware/bookingMiddleware');

router.get('/check-availability/:advertisementId', validateAvailabilityQuery, checkAvailability);

router.use(protect);

router.get('/', getAll);
router.get('/:id', validateBookingId, getOne);
router.post('/', validateCreateBooking, create);
router.patch('/:id', validateUpdateBooking, update);
router.delete('/:id', validateBookingId, remove);

module.exports = router;
