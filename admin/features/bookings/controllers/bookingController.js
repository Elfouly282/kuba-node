const Booking = require('../../../../src/features/bookings/models/bookingModel');
const Advertisement = require('../../../../src/features/advertisements/models/advertisementModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../../src/utils/apiResponse');
const {
    isValidId,
    populateBooking,
    formatBooking,
} = require('../../../../src/features/bookings/services/bookingService');

const STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'];
const PAYMENT_STATUSES = ['unpaid', 'paid', 'refunded'];

const isAdmin = (user) => user.role === 'admin';

const getOwnedAdIds = async (user) => {
    const ads = await Advertisement.find({ owner: user._id }).select('_id');
    return ads.map((ad) => ad._id);
};

// Admins manage every booking; owners only bookings on their own listings
const findManagedBooking = async (req) => {
    if (!isValidId(req.params.id)) throw new APIError('errors.invalidBookingId', 400);

    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new APIError('errors.bookingNotFound', 404);

    if (!isAdmin(req.user)) {
        const owned = await Advertisement.exists({ _id: booking.advertisement, owner: req.user._id });
        if (!owned) throw new APIError('errors.forbidden', 403);
    }

    return booking;
};

exports.getAll = async (req, res) => {
    const filter = {};

    if (!isAdmin(req.user)) {
        filter.advertisement = { $in: await getOwnedAdIds(req.user) };
    } else if (isValidId(req.query.user)) {
        filter.user = req.query.user;
    }

    if (isValidId(req.query.advertisement)) {
        const allowed = isAdmin(req.user)
            || filter.advertisement.$in.some((id) => String(id) === String(req.query.advertisement));
        if (!allowed) return SuccessResponse.ok(res, { results: 0, data: { bookings: [] } });
        filter.advertisement = req.query.advertisement;
    }

    if (isValidId(req.query.room)) filter.room = req.query.room;
    if (req.query.bookingType) filter.bookingType = req.query.bookingType;
    if (req.query.status) filter.status = req.query.status;

    const bookings = await populateBooking(Booking.find(filter)).sort({ createdAt: -1 });

    SuccessResponse.ok(res, {
        results: bookings.length,
        data: { bookings: bookings.map(formatBooking) },
    });
};

exports.getOne = async (req, res) => {
    const booking = await findManagedBooking(req);
    const populated = await populateBooking(Booking.findById(booking._id));

    SuccessResponse.ok(res, {
        data: { booking: formatBooking(populated) },
    });
};

exports.update = async (req, res) => {
    const booking = await findManagedBooking(req);
    const { status, paymentStatus, notes, cancellationReason } = req.body;

    if (status !== undefined) {
        if (!STATUSES.includes(status)) throw new APIError('validation.invalidBookingStatus', 400);
        booking.status = status;
    }
    if (paymentStatus !== undefined) {
        if (!PAYMENT_STATUSES.includes(paymentStatus)) throw new APIError('validation.invalidBookingStatus', 400);
        booking.paymentStatus = paymentStatus;
    }
    if (notes !== undefined) booking.notes = notes;
    if (cancellationReason !== undefined) booking.cancellationReason = cancellationReason;

    await booking.save();
    const populated = await populateBooking(Booking.findById(booking._id));

    SuccessResponse.ok(res, {
        message: req.t('messages.bookingUpdated'),
        data: { booking: formatBooking(populated) },
    });
};

exports.remove = async (req, res) => {
    const booking = await findManagedBooking(req);
    await booking.deleteOne();

    SuccessResponse.ok(res, {
        message: req.t('messages.bookingDeleted'),
    });
};
