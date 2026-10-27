const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Room = require('../../rooms/models/roomModel');
const APIError = require('../../../utils/apiError');

/**
 * Parses flexible booking window inputs:
 * 1) startDate & endDate (ISO or date strings)
 * 2) date + startTime + durationHours / duration / endTime (Hourly for Yacht / Golf Car)
 * 3) date (or startDate) + rentalType: 'full_day'
 */
const parseBookingWindow = (input = {}) => {
    let {
        startDate,
        endDate,
        date,
        startTime,
        endTime,
        duration,
        durationHours,
        rentalType,
        fullDay,
        isFullDay,
    } = input;

    let start = null;
    let end = null;
    let inferredRentalType = rentalType || null;

    if (fullDay === true || isFullDay === true || fullDay === 'true' || isFullDay === 'true') {
        inferredRentalType = 'full_day';
    }

    const startRaw = startDate || input.start || input.from || input.checkIn;
    const endRaw = endDate || input.end || input.to || input.checkOut;
    const dateRaw = date || (inferredRentalType === 'full_day' || inferredRentalType === 'hourly' ? startRaw : null);
    const hoursCount = Number(durationHours || input.hours || duration || 1);

    // Case 1: Date + startTime (hourly)
    if (dateRaw && (startTime || inferredRentalType === 'hourly') && !endRaw) {
        const timePart = startTime || '10:00';
        const [hStr, mStr] = timePart.split(':');
        const hours = parseInt(hStr, 10) || 0;
        const minutes = parseInt(mStr, 10) || 0;

        const baseDate = new Date(dateRaw);
        if (isNaN(baseDate.getTime())) return null;

        start = new Date(baseDate);
        start.setUTCHours(hours, minutes, 0, 0);

        if (endTime) {
            const [endHStr, endMStr] = endTime.split(':');
            const endH = parseInt(endHStr, 10) || 0;
            const endM = parseInt(endMStr, 10) || 0;
            end = new Date(baseDate);
            end.setUTCHours(endH, endM, 0, 0);
        } else {
            end = new Date(start.getTime() + hoursCount * 60 * 60 * 1000);
        }
        inferredRentalType = 'hourly';
    }
    // Case 2: Full Day on a specific date
    else if (dateRaw && inferredRentalType === 'full_day' && !endRaw) {
        const baseDate = new Date(dateRaw);
        if (isNaN(baseDate.getTime())) return null;

        start = new Date(baseDate);
        start.setUTCHours(0, 0, 0, 0);

        end = new Date(baseDate);
        end.setUTCHours(23, 59, 59, 999);
        inferredRentalType = 'full_day';
    }
    // Case 3: Standard startDate and endDate
    else if (startRaw && endRaw) {
        start = new Date(startRaw);
        end = new Date(endRaw);
    }
    else if (startRaw && inferredRentalType === 'full_day') {
        const baseDate = new Date(startRaw);
        if (isNaN(baseDate.getTime())) return null;

        start = new Date(baseDate);
        start.setUTCHours(0, 0, 0, 0);

        end = new Date(baseDate);
        end.setUTCHours(23, 59, 59, 999);
        inferredRentalType = 'full_day';
    }

    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
        return null;
    }

    return { start, end, rentalType: inferredRentalType };
};

/**
 * Universal overlap check: supports ad or room, and handles hourly / daily / full_day
 */
const checkBookingOverlap = async (adOrOptions, startArg, endArg, excludeIdArg) => {
    let advertisementId, roomId, startDate, endDate, excludeBookingId;

    if (adOrOptions && typeof adOrOptions === 'object' && !(adOrOptions instanceof mongoose.Types.ObjectId)) {
        advertisementId = adOrOptions.advertisementId || adOrOptions.advertisement;
        roomId = adOrOptions.roomId || adOrOptions.room || null;
        startDate = adOrOptions.startDate;
        endDate = adOrOptions.endDate;
        excludeBookingId = adOrOptions.excludeBookingId || null;
    } else {
        advertisementId = adOrOptions;
        startDate = startArg;
        endDate = endArg;
        excludeBookingId = excludeIdArg || null;
        roomId = null;
    }

    const query = {
        status: { $in: ['pending', 'confirmed'] },
        startDate: { $lt: endDate },
        endDate: { $gt: startDate },
    };

    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    if (roomId) {
        query.room = roomId;
    } else {
        query.advertisement = advertisementId;
    }

    const overlap = await Booking.findOne(query);
    return Boolean(overlap);
};

const validateBookingId = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBookingId', 400));
    }
    next();
};

const validateAvailabilityQuery = (req, _res, next) => {
    const { advertisementId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    const parsed = parseBookingWindow(req.query);
    if (!parsed) {
        if (!req.query.startDate && !req.query.date) {
            return next(new APIError('validation.datesRequired', 400));
        }
        return next(new APIError('validation.invalidDateRange', 400));
    }

    req.bookingDates = parsed;
    next();
};

const validateCreateBooking = async (req, res, next) => {
    const { advertisement: adId, room: roomId } = req.body;

    let targetAdId = adId;
    let roomDoc = null;

    // If roomId is provided, look up the room
    if (roomId) {
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return next(new APIError('errors.invalidRoomId', 400));
        }
        roomDoc = await Room.findById(roomId);
        if (!roomDoc) {
            return next(new APIError('errors.roomNotFound', 404));
        }
        if (!roomDoc.active) {
            return next(new APIError('errors.roomInactive', 400));
        }

        // Auto-fill or verify advertisement from room.hotel
        if (!targetAdId) {
            targetAdId = roomDoc.hotel;
        } else if (String(targetAdId) !== String(roomDoc.hotel)) {
            return next(new APIError('errors.roomDoesNotBelongToHotel', 400));
        }
    }

    if (!targetAdId || !mongoose.Types.ObjectId.isValid(targetAdId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    const ad = await Advertisement.findById(targetAdId);
    if (!ad) {
        return next(new APIError('errors.advertisementNotFound', 404));
    }

    if (!ad.active) {
        return next(new APIError('errors.advertisementInactive', 400));
    }

    const parsedWindow = parseBookingWindow(req.body);
    if (!parsedWindow) {
        if (!req.body.startDate && !req.body.date) {
            return next(new APIError('validation.datesRequired', 400));
        }
        return next(new APIError('validation.invalidDateRange', 400));
    }

    const { start, end, rentalType } = parsedWindow;

    // Check overlap
    const isOverlap = await checkBookingOverlap({
        advertisementId: ad._id,
        roomId: roomDoc ? roomDoc._id : null,
        startDate: start,
        endDate: end,
    });

    if (isOverlap) {
        return next(new APIError('errors.bookingDateConflict', 400));
    }

    req.bookingAd = ad;
    req.bookingRoom = roomDoc;
    req.bookingDates = { start, end, rentalType };
    next();
};

const validateUpdateBooking = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBookingId', 400));
    }
    next();
};

module.exports = {
    parseBookingWindow,
    checkBookingOverlap,
    validateBookingId,
    validateAvailabilityQuery,
    validateCreateBooking,
    validateUpdateBooking,
};
