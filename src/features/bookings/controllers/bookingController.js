const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse, FailResponse } = require('../../../utils/apiResponse');

const { checkBookingOverlap } = require('../middleware/bookingMiddleware');

const formatBooking = (doc) => {
    if (!doc) return null;
    return typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
};

exports.checkAvailability = async (req, res, next) => {
    const { advertisementId } = req.params;
    const start = req.bookingDates ? req.bookingDates.start : new Date(req.query.startDate);
    const end = req.bookingDates ? req.bookingDates.end : new Date(req.query.endDate);

    if (!req.bookingDates) {
        if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }
        if (!req.query.startDate || !req.query.endDate) {
            return next(new APIError('validation.datesRequired', 400));
        }
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
            return next(new APIError('validation.invalidDateRange', 400));
        }
    }

    const isOverlapping = await checkBookingOverlap(advertisementId, start, end);

    SuccessResponse.ok(res, {
        data: {
            available: !isOverlapping,
            advertisementId,
            startDate: start,
            endDate: end,
        },
    });
};

exports.getAll = async (req, res) => {
    const filter = {};

    if (req.user && req.user.role !== 'admin') {
        if (req.user.role === 'owner' || req.user.role === 'advertiser') {
            const ownedAds = await Advertisement.find({ owner: req.user._id }).select('_id');
            const ownedAdIds = ownedAds.map((a) => a._id);
            filter.advertisement = { $in: ownedAdIds };
        } else {
            filter.user = req.user._id;
        }
    } else if (req.query.user && mongoose.Types.ObjectId.isValid(req.query.user)) {
        filter.user = req.query.user;
    }

    if (req.query.advertisement && mongoose.Types.ObjectId.isValid(req.query.advertisement)) {
        if (req.user && (req.user.role === 'owner' || req.user.role === 'advertiser')) {
            const isOwned = await Advertisement.exists({ _id: req.query.advertisement, owner: req.user._id });
            if (!isOwned) {
                return SuccessResponse.ok(res, { results: 0, data: { bookings: [] } });
            }
        }
        filter.advertisement = req.query.advertisement;
    }

    if (req.query.status) {
        filter.status = req.query.status;
    }

    const bookings = await Booking.find(filter)
        .populate('advertisement', 'title price pricing image images location category region unitType')
        .populate('user', 'name email phone')
        .sort({ createdAt: -1 });

    SuccessResponse.ok(res, {
        results: bookings.length,
        data: { bookings: bookings.map(formatBooking) },
    });
};

exports.getOne = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBookingId', 400));
    }

    const booking = await Booking.findById(req.params.id)
        .populate('advertisement', 'title price pricing image images location category region unitType')
        .populate('user', 'name email phone');

    if (!booking) {
        return next(new APIError('errors.bookingNotFound', 404));
    }

    if (req.user && req.user.role !== 'admin') {
        if (req.user.role === 'owner' || req.user.role === 'advertiser') {
            const isOwned = await Advertisement.exists({
                _id: booking.advertisement?._id || booking.advertisement,
                owner: req.user._id,
            });
            if (!isOwned) {
                return next(new APIError('errors.forbidden', 403));
            }
        } else if (String(booking.user?._id || booking.user) !== String(req.user._id)) {
            return next(new APIError('errors.forbidden', 403));
        }
    }

    SuccessResponse.ok(res, {
        data: { booking: formatBooking(booking) },
    });
};

exports.create = async (req, res, next) => {
    const { advertisement: adId, startDate, endDate, notes } = req.body;

    let ad = req.bookingAd;
    let start = req.bookingDates?.start;
    let end = req.bookingDates?.end;

    if (!ad) {
        if (!adId || !mongoose.Types.ObjectId.isValid(adId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }
        ad = await Advertisement.findById(adId);
        if (!ad) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }
        if (!ad.active) {
            return next(new APIError('errors.advertisementInactive', 400));
        }
        start = new Date(startDate);
        end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
            return next(new APIError('validation.invalidDateRange', 400));
        }
        const isOverlap = await checkBookingOverlap(ad._id, start, end);
        if (isOverlap) {
            return next(new APIError('errors.bookingDateConflict', 400));
        }
    }

    const pricingUnit = ad.pricing?.pricingUnit || 'per_night';
    const unitPrice = ad.pricing?.finalPrice || ad.price || 0;

    let duration = 1;
    const diffMs = end.getTime() - start.getTime();

    if (pricingUnit === 'per_hour') {
        duration = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));
    } else if (pricingUnit === 'per_day' || pricingUnit === 'per_night') {
        duration = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    } else if (pricingUnit === 'per_trip' || pricingUnit === 'fixed') {
        duration = 1;
    }

    const minDuration = ad.pricing?.minDuration || 1;
    if (duration < minDuration) {
        return FailResponse.badRequest(res, {
            message: `Minimum booking duration is ${minDuration} (${pricingUnit}). Requested: ${duration}.`,
        });
    }

    const totalPrice = Math.round(unitPrice * duration * 100) / 100;

    const booking = await Booking.create({
        advertisement: ad._id,
        user: req.user?._id,
        startDate: start,
        endDate: end,
        duration,
        pricingUnit,
        unitPrice,
        totalPrice,
        notes: notes ? String(notes).trim() : '',
        status: 'pending',
        paymentStatus: 'unpaid',
    });

    const populated = await Booking.findById(booking._id)
        .populate('advertisement', 'title price pricing image location')
        .populate('user', 'name email phone');

    SuccessResponse.created(res, {
        message: req.t ? req.t('messages.bookingCreated') : 'Booking created successfully.',
        data: { booking: formatBooking(populated) },
    });
};

exports.update = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBookingId', 400));
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return next(new APIError('errors.bookingNotFound', 404));
    }

    if (req.user && req.user.role !== 'admin') {
        if (req.user.role === 'owner' || req.user.role === 'advertiser') {
            const isOwned = await Advertisement.exists({
                _id: booking.advertisement?._id || booking.advertisement,
                owner: req.user._id,
            });
            if (!isOwned) {
                return next(new APIError('errors.forbidden', 403));
            }
            if (req.body.status) {
                const allowedStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
                if (!allowedStatuses.includes(req.body.status)) {
                    return next(new APIError('validation.invalidBookingStatus', 400));
                }
                booking.status = req.body.status;
            }
            if (req.body.paymentStatus) {
                booking.paymentStatus = req.body.paymentStatus;
            }
            if (req.body.notes !== undefined) {
                booking.notes = req.body.notes;
            }
        } else {
            if (String(booking.user) !== String(req.user._id)) {
                return next(new APIError('errors.forbidden', 403));
            }
            if (req.body.status && req.body.status !== 'cancelled') {
                return next(new APIError('errors.forbidden', 403));
            }
            if (req.body.status) booking.status = req.body.status;
        }
    } else {
        if (req.body.status) booking.status = req.body.status;
        if (req.body.paymentStatus) booking.paymentStatus = req.body.paymentStatus;
        if (req.body.notes !== undefined) booking.notes = req.body.notes;
    }

    await booking.save();

    const populated = await Booking.findById(booking._id)
        .populate('advertisement', 'title price pricing image images location')
        .populate('user', 'name email phone');

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.bookingUpdated') : 'Booking updated successfully.',
        data: { booking: formatBooking(populated) },
    });
};

exports.remove = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBookingId', 400));
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return next(new APIError('errors.bookingNotFound', 404));
    }

    if (req.user && req.user.role !== 'admin') {
        if (req.user.role === 'owner' || req.user.role === 'advertiser') {
            const isOwned = await Advertisement.exists({
                _id: booking.advertisement?._id || booking.advertisement,
                owner: req.user._id,
            });
            if (!isOwned) {
                return next(new APIError('errors.forbidden', 403));
            }
        } else if (String(booking.user) !== String(req.user._id)) {
            return next(new APIError('errors.forbidden', 403));
        }
    }

    await booking.deleteOne();

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.bookingDeleted') : 'Booking cancelled successfully.',
    });
};

exports.checkBookingOverlap = checkBookingOverlap;
exports.formatBooking = formatBooking;
