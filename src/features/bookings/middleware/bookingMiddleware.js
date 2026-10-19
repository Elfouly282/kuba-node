const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const APIError = require('../../../utils/apiError');

/**
 * Checks if there is an overlapping confirmed/pending booking for the given dates.
 */
const checkBookingOverlap = async (advertisementId, startDate, endDate, excludeBookingId = null) => {
    const query = {
        advertisement: advertisementId,
        status: { $in: ['pending', 'confirmed'] },
        $or: [
            {
                startDate: { $lt: endDate },
                endDate: { $gt: startDate },
            },
        ],
    };

    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    const overlap = await Booking.findOne(query);
    return Boolean(overlap);
};

/**
 * Validates MongoDB ObjectId in route params.
 */
const validateBookingId = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBookingId', 400));
    }
    next();
};

/**
 * Validates query parameters for checking availability.
 */
const validateAvailabilityQuery = (req, _res, next) => {
    const { advertisementId } = req.params;
    const { startDate, endDate } = req.query;

    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    if (!startDate || !endDate) {
        return next(new APIError('validation.datesRequired', 400));
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
        return next(new APIError('validation.invalidDateRange', 400));
    }

    req.bookingDates = { start, end };
    next();
};

/**
 * Validates payload for creating a booking.
 */
const validateCreateBooking = async (req, res, next) => {
    try {
        const { advertisement: adId, startDate, endDate } = req.body;

        if (!adId || !mongoose.Types.ObjectId.isValid(adId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const ad = await Advertisement.findById(adId);
        if (!ad) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        if (!ad.active) {
            return next(new APIError('errors.advertisementInactive', 400));
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
            return next(new APIError('validation.invalidDateRange', 400));
        }

        const isOverlap = await checkBookingOverlap(ad._id, start, end);
        if (isOverlap) {
            return next(new APIError('errors.bookingDateConflict', 400));
        }

        req.bookingAd = ad;
        req.bookingDates = { start, end };
        next();
    } catch (err) {
        next(err);
    }
};

/**
 * Validates booking update authorization and payload.
 */
const validateUpdateBooking = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBookingId', 400));
    }
    next();
};

module.exports = {
    checkBookingOverlap,
    validateBookingId,
    validateAvailabilityQuery,
    validateCreateBooking,
    validateUpdateBooking,
};
