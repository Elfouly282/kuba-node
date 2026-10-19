const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const APIError = require('../../../utils/apiError');

const { checkBookingOverlap } = require('../middleware/bookingMiddleware');

const formatBooking = (doc) => {
    if (!doc) return null;
    return typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
};

exports.checkAvailability = async (req, res, next) => {
    try {
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

        res.status(200).json({
            status: 'success',
            data: {
                available: !isOverlapping,
                advertisementId,
                startDate: start,
                endDate: end,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const filter = {};

        // Normal users only see their own bookings; admins see all
        if (req.user && req.user.role !== 'admin') {
            filter.user = req.user._id;
        } else if (req.query.user && mongoose.Types.ObjectId.isValid(req.query.user)) {
            filter.user = req.query.user;
        }

        if (req.query.advertisement && mongoose.Types.ObjectId.isValid(req.query.advertisement)) {
            filter.advertisement = req.query.advertisement;
        }

        if (req.query.status) {
            filter.status = req.query.status;
        }

        const bookings = await Booking.find(filter)
            .populate('advertisement', 'title price pricing image location category region unitType')
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: { bookings: bookings.map(formatBooking) },
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBookingId', 400));
        }

        const booking = await Booking.findById(req.params.id)
            .populate('advertisement', 'title price pricing image location category region unitType')
            .populate('user', 'name email phone');

        if (!booking) {
            return next(new APIError('errors.bookingNotFound', 404));
        }

        // Check ownership if not admin
        if (req.user && req.user.role !== 'admin' && String(booking.user?._id || booking.user) !== String(req.user._id)) {
            return next(new APIError('errors.forbidden', 403));
        }

        res.status(200).json({
            status: 'success',
            data: { booking: formatBooking(booking) },
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
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

        // Calculate duration and unit price based on pricing unit
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
            return res.status(400).json({
                status: 'fail',
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

        res.status(201).json({
            status: 'success',
            message: req.t ? req.t('messages.bookingCreated') : 'Booking created successfully.',
            data: { booking: formatBooking(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBookingId', 400));
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return next(new APIError('errors.bookingNotFound', 404));
        }

        // Only admin can change status to confirmed/completed, user can only cancel their own
        if (req.user.role !== 'admin') {
            if (String(booking.user) !== String(req.user._id)) {
                return next(new APIError('errors.forbidden', 403));
            }
            if (req.body.status && req.body.status !== 'cancelled') {
                return next(new APIError('errors.forbidden', 403));
            }
        }

        if (req.body.status) booking.status = req.body.status;
        if (req.body.paymentStatus && req.user.role === 'admin') booking.paymentStatus = req.body.paymentStatus;
        if (req.body.notes !== undefined) booking.notes = req.body.notes;

        await booking.save();

        const populated = await Booking.findById(booking._id)
            .populate('advertisement', 'title price pricing image location')
            .populate('user', 'name email phone');

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.bookingUpdated') : 'Booking updated successfully.',
            data: { booking: formatBooking(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBookingId', 400));
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return next(new APIError('errors.bookingNotFound', 404));
        }

        if (req.user.role !== 'admin' && String(booking.user) !== String(req.user._id)) {
            return next(new APIError('errors.forbidden', 403));
        }

        await booking.deleteOne();

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.bookingDeleted') : 'Booking cancelled successfully.',
        });
    } catch (err) {
        next(err);
    }
};

exports.checkBookingOverlap = checkBookingOverlap;
exports.formatBooking = formatBooking;
