const Booking = require('../models/bookingModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Room = require('../../rooms/models/roomModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const {
    ACTIVE_STATUSES,
    isValidId,
    prepareBooking,
    populateBooking,
    formatBooking,
} = require('../services/bookingService');
const { resolveBooking } = require('../bookingMode');

const findMyBooking = async (req) => {
    if (!isValidId(req.params.id)) throw new APIError('errors.invalidBookingId', 400);

    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new APIError('errors.bookingNotFound', 404);
    if (String(booking.user) !== String(req.user._id)) throw new APIError('errors.forbidden', 403);

    return booking;
};

/**
 * GET /bookings/booked-dates/:advertisementId?room=
 * Upcoming taken slots, so the app can disable them in its calendar.
 */
exports.getBookedDates = async (req, res) => {
    const { advertisementId } = req.params;
    const roomId = req.query.room || null;

    if (!isValidId(advertisementId)) throw new APIError('errors.invalidAdvertisementId', 400);
    if (roomId && !isValidId(roomId)) throw new APIError('errors.invalidRoomId', 400);

    const ad = await Advertisement.findById(advertisementId).select('pricing isHotel');
    if (!ad) throw new APIError('errors.advertisementNotFound', 404);

    const room = roomId ? await Room.findById(roomId).select('pricing hotel') : null;
    if (roomId && !room) throw new APIError('errors.roomNotFound', 404);
    if (room && String(room.hotel) !== String(ad._id)) {
        throw new APIError('errors.roomDoesNotBelongToHotel', 400);
    }

    const booking = resolveBooking(room || ad, { requiresRoom: Boolean(ad.isHotel) && !room });

    const bookings = await Booking.find({
        advertisement: ad._id,
        room: roomId,
        status: { $in: ACTIVE_STATUSES },
        endDate: { $gt: new Date() },
    })
        .select('startDate endDate')
        .sort({ startDate: 1 });

    SuccessResponse.ok(res, {
        data: {
            advertisementId: ad._id,
            roomId,
            pricingUnit: booking.pricingUnit,
            booking,
            bookedDates: bookings.map((b) => ({ startDate: b.startDate, endDate: b.endDate })),
        },
    });
};

/**
 * GET /bookings/check?advertisement=&room=&startDate=&endDate=
 * Tells whether the slot is free and what it would cost. Saves nothing.
 */
exports.checkBooking = async (req, res) => {
    const { ad, room, start, end, price, available } = await prepareBooking(req.query);

    SuccessResponse.ok(res, {
        data: {
            available,
            advertisementId: ad._id,
            roomId: room ? room._id : null,
            startDate: start,
            endDate: end,
            ...price,
        },
    });
};

/**
 * POST /bookings
 */
exports.createBooking = async (req, res) => {
    const { ad, room, start, end, price, available } = await prepareBooking(req.body);
    if (!available) throw new APIError('errors.bookingDateConflict', 400);

    const { guestDetails, paymentMethod, notes } = req.body;

    const booking = await Booking.create({
        bookingType: price.bookingType,
        rentalType: price.rentalType,
        pricingUnit: price.pricingUnit,
        advertisement: ad._id,
        room: room ? room._id : null,
        user: req.user._id,
        startDate: start,
        endDate: end,
        duration: price.duration,
        unitPrice: price.unitPrice,
        totalPrice: price.totalPrice,
        guestDetails: guestDetails || {},
        paymentMethod: paymentMethod || 'cash',
        notes: notes ? String(notes).trim() : '',
    });

    const populated = await populateBooking(Booking.findById(booking._id));

    SuccessResponse.created(res, {
        message: req.t('messages.bookingCreated'),
        data: { booking: formatBooking(populated) },
    });
};

/**
 * GET /bookings/my?status=
 */
exports.getMyBookings = async (req, res) => {
    const filter = { user: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const bookings = await populateBooking(Booking.find(filter)).sort({ createdAt: -1 });

    SuccessResponse.ok(res, {
        results: bookings.length,
        data: { bookings: bookings.map(formatBooking) },
    });
};

/**
 * GET /bookings/:id
 */
exports.getMyBooking = async (req, res) => {
    const booking = await findMyBooking(req);
    const populated = await populateBooking(Booking.findById(booking._id));

    SuccessResponse.ok(res, {
        data: { booking: formatBooking(populated) },
    });
};

/**
 * PATCH /bookings/:id/cancel
 */
exports.cancelMyBooking = async (req, res) => {
    const booking = await findMyBooking(req);
    if (!ACTIVE_STATUSES.includes(booking.status)) {
        throw new APIError('errors.bookingCannotBeCancelled', 400);
    }

    booking.status = 'cancelled';
    const reason = req.body?.reason || req.body?.cancellationReason;
    if (reason) booking.cancellationReason = String(reason).trim();
    await booking.save();

    const populated = await populateBooking(Booking.findById(booking._id));

    SuccessResponse.ok(res, {
        message: req.t('messages.bookingCancelled'),
        data: { booking: formatBooking(populated) },
    });
};
