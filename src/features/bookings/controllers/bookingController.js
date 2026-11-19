const Booking = require('../models/bookingModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Room = require('../../rooms/models/roomModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const {
    ACTIVE_STATUSES,
    isValidId,
    prepareBooking,
    buildAvailability,
    populateBooking,
    formatBooking,
    formatBookingReceipt,
    nextReference,
    staySnapshotFor,
} = require('../services/bookingService');
const { resolveBooking } = require('../bookingMode');
const { normalizeGuest } = require('../quote');
const { listActive, resolvePayment } = require('../../payments/paymentMethods');
const { publicPolicies } = require('../../advertisements/listingPolicies');

const findMyBooking = async (req) => {
    if (!isValidId(req.params.id)) throw new APIError('errors.invalidBookingId', 400);

    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new APIError('errors.bookingNotFound', 404);
    if (String(booking.user) !== String(req.user._id)) throw new APIError('errors.forbidden', 403);

    return booking;
};

/**
 * GET /bookings/booked-dates/:advertisementId?room=&month=
 * Upcoming bookings and provider closures, plus a calendar of available days.
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

    const hasRooms = Boolean(await Room.exists({ hotel: ad._id, active: true }));
    const booking = resolveBooking(room || ad, { requiresRoom: hasRooms && !room });
    const data = await buildAvailability({
        ad,
        roomDoc: room,
        booking,
        roomId,
        hasRooms,
        query: req.query,
    });

    SuccessResponse.ok(res, { data });
};

/**
 * GET /bookings/check?advertisement=&room=&startDate=&endDate=
 * Hourly (same day): ?date=2026-11-13&startTime=17:00&endTime=19:00
 * Tells whether the slot is free and what it would cost. Saves nothing.
 */
exports.checkBooking = async (req, res) => {
    const { ad, room, start, end, price, available, unavailableReason } = await prepareBooking(req.query);
    const policies = publicPolicies(ad.policies);

    SuccessResponse.ok(res, {
        data: {
            available,
            unavailableReason,
            advertisementId: ad._id,
            roomId: room ? room._id : null,
            startDate: start,
            endDate: end,
            ...price,
            ...(policies ? { policies } : {}),
            paymentMethods: await listActive(req.locale),
        },
    });
};

/**
 * POST /bookings
 */
exports.createBooking = async (req, res) => {
    const guestDetails = normalizeGuest(req.body, req.user);
    const payment = await resolvePayment(req.body);
    const { ad, room, start, end, price, available, unavailableReason } = await prepareBooking({ ...req.body, guestDetails });
    if (!available) {
        throw new APIError(unavailableReason === 'closed' ? 'errors.bookingClosed' : 'errors.bookingDateConflict', 400);
    }

    const { notes } = req.body;

    const booking = await Booking.create({
        reference: await nextReference(),
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
        priceBreakdown: price.quote,
        staySnapshot: staySnapshotFor({ ad, room, quote: price.quote }),
        addOns: price.quote.selectedAddOns.map((item) => ({
            addOn: item.id,
            title: item.title,
            titleAr: item.titleAr || '',
            description: item.description,
            descriptionAr: item.descriptionAr || '',
            price: item.price,
            category: item.category,
        })),
        guestDetails,
        acceptedTerms: payment.accepted,
        paymentMethod: payment.method,
        paymentMethodLabel: payment.label,
        paymentMethodLabelAr: payment.labelAr,
        notes: notes ? String(notes).trim() : '',
    });

    const populated = await populateBooking(Booking.findById(booking._id));

    SuccessResponse.created(res, {
        message: req.t('messages.bookingCreated'),
        data: { booking: formatBooking(populated, req.locale, req.localeExact) },
    });
};

/**
 * GET /bookings/my?status=
 */
exports.getMyBookings = async (req, res) => {
    const filter = { user: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const bookings = await Booking.find(filter)
        .populate('advertisement', 'title titleAr image location locationAr address addressAr')
        .populate('room', 'title titleAr roomNumber image')
        .sort({ createdAt: -1 });

    SuccessResponse.ok(res, {
        results: bookings.length,
        data: { bookings: bookings.map((booking) => formatBookingReceipt(booking, req.locale)) },
    });
};

/**
 * GET /bookings/:id
 */
exports.getMyBooking = async (req, res) => {
    const booking = await findMyBooking(req);
    const populated = await populateBooking(Booking.findById(booking._id));

    SuccessResponse.ok(res, {
        data: { booking: formatBooking(populated, req.locale, req.localeExact) },
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
        data: { booking: formatBooking(populated, req.locale, req.localeExact) },
    });
};
