const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Room = require('../../rooms/models/roomModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse, FailResponse } = require('../../../utils/apiResponse');
const { getImageUrl } = require('../../../utils/imageUrl');
const { parseBookingWindow, checkBookingOverlap } = require('../middleware/bookingMiddleware');

const formatBooking = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };

    if (obj.advertisement && typeof obj.advertisement === 'object') {
        if (obj.advertisement.image) obj.advertisement.image = getImageUrl(obj.advertisement.image);
        if (Array.isArray(obj.advertisement.images)) {
            obj.advertisement.images = obj.advertisement.images.map((img) => getImageUrl(img)).filter(Boolean);
        }
    }

    if (obj.room && typeof obj.room === 'object') {
        if (obj.room.image) obj.room.image = getImageUrl(obj.room.image);
        if (Array.isArray(obj.room.images)) {
            obj.room.images = obj.room.images.map((img) => getImageUrl(img)).filter(Boolean);
        }
    }

    return obj;
};

/**
 * Determines duration, unit price, total price and booking type based on property and rental mode
 */
const determineBookingPricing = ({ ad, room, start, end, rentalTypeInput }) => {
    const diffMs = end.getTime() - start.getTime();

    // Case 1: Hotel Room Booking
    if (room) {
        const nights = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        const unitPrice = room.pricing?.finalPrice || room.price || 0;
        const minDuration = 1;
        const totalPrice = Math.round(unitPrice * nights * 100) / 100;

        return {
            bookingType: 'hotel',
            rentalType: 'per_night',
            pricingUnit: 'per_night',
            duration: nights,
            minDuration,
            unitPrice,
            totalPrice,
            currency: room.pricing?.currency || 'EGP',
        };
    }

    // Determine bookingType from advertisement
    let adType = (ad.type || '').toLowerCase();
    if (ad.isHotel || adType === 'hotel' || adType === 'resort') {
        adType = 'hotel';
    } else if (adType === 'chalet') {
        adType = 'chalet';
    } else if (adType === 'yacht') {
        adType = 'yacht';
    } else if (adType === 'golf_car' || adType.includes('golf')) {
        adType = 'golf_car';
    } else if (adType === 'villa') {
        adType = 'villa';
    } else if (adType === 'apartment') {
        adType = 'apartment';
    } else {
        adType = 'general';
    }

    const defaultUnit = ad.pricing?.pricingUnit || 'per_night';
    const currency = ad.pricing?.currency || 'EGP';
    const minDuration = Number(ad.pricing?.minDuration) || 1;

    const isFullDay = rentalTypeInput === 'full_day';
    const isHourly = rentalTypeInput === 'hourly' || (!rentalTypeInput && defaultUnit === 'per_hour');

    // Case 2: Full Day Rental (Yacht / Golf Car / Daily)
    if (isFullDay) {
        const fullDayPrice = ad.pricing?.fullDayPrice
            || ad.pricing?.pricePerDay
            || (defaultUnit === 'per_day' ? (ad.pricing?.finalPrice || ad.price) : (ad.pricing?.finalPrice || ad.price) * 8);

        return {
            bookingType: adType,
            rentalType: 'full_day',
            pricingUnit: 'per_day',
            duration: 1,
            minDuration: 1,
            unitPrice: fullDayPrice,
            totalPrice: fullDayPrice,
            currency,
        };
    }

    // Case 3: Hourly Rental (Yacht / Golf Car)
    if (isHourly) {
        const hours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));
        const hourlyPrice = ad.pricing?.pricePerHour
            || (defaultUnit === 'per_hour' ? (ad.pricing?.finalPrice || ad.price) : Math.round(((ad.pricing?.finalPrice || ad.price) / 8) * 100) / 100);
        const totalPrice = Math.round(hourlyPrice * hours * 100) / 100;

        return {
            bookingType: adType,
            rentalType: 'hourly',
            pricingUnit: 'per_hour',
            duration: hours,
            minDuration,
            unitPrice: hourlyPrice,
            totalPrice,
            currency,
        };
    }

    // Case 4: Chalet / Villa / Apartment / Per Night or Per Day
    if (defaultUnit === 'per_day' || defaultUnit === 'per_night' || adType === 'chalet' || adType === 'villa' || adType === 'apartment') {
        const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        const unitPrice = ad.pricing?.pricePerDay || ad.pricing?.finalPrice || ad.price || 0;
        const pricingUnit = defaultUnit === 'per_day' ? 'per_day' : 'per_night';
        const totalPrice = Math.round(unitPrice * days * 100) / 100;

        return {
            bookingType: adType,
            rentalType: pricingUnit,
            pricingUnit,
            duration: days,
            minDuration,
            unitPrice,
            totalPrice,
            currency,
        };
    }

    if (defaultUnit === 'per_trip' || defaultUnit === 'fixed') {
        const unitPrice = ad.pricing?.finalPrice || ad.price || 0;
        return {
            bookingType: adType,
            rentalType: defaultUnit,
            pricingUnit: defaultUnit,
            duration: 1,
            minDuration: 1,
            unitPrice,
            totalPrice: unitPrice,
            currency,
        };
    }

    // Fallback: per_night
    const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const unitPrice = ad.pricing?.finalPrice || ad.price || 0;
    return {
        bookingType: adType,
        rentalType: 'per_night',
        pricingUnit: 'per_night',
        duration: days,
        minDuration,
        unitPrice,
        totalPrice: Math.round(unitPrice * days * 100) / 100,
        currency,
    };
};

/**
 * Check availability for single asset (Chalet, Yacht, Golf Car, or Room)
 */
exports.checkAvailability = async (req, res, next) => {
    try {
        const { advertisementId } = req.params;
        const roomId = req.query.room || req.query.roomId || null;

        if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const ad = await Advertisement.findById(advertisementId);
        if (!ad) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        let room = null;
        if (roomId) {
            if (!mongoose.Types.ObjectId.isValid(roomId)) {
                return next(new APIError('errors.invalidRoomId', 400));
            }
            room = await Room.findById(roomId);
            if (!room) {
                return next(new APIError('errors.roomNotFound', 404));
            }
        }

        const parsed = req.bookingDates || parseBookingWindow(req.query);
        if (!parsed) {
            if (!req.query.startDate && !req.query.date) {
                return next(new APIError('validation.datesRequired', 400));
            }
            return next(new APIError('validation.invalidDateRange', 400));
        }

        const { start, end, rentalType } = parsed;

        const isOverlapping = await checkBookingOverlap({
            advertisementId: ad._id,
            roomId: room ? room._id : null,
            startDate: start,
            endDate: end,
        });

        const pricing = determineBookingPricing({
            ad,
            room,
            start,
            end,
            rentalTypeInput: rentalType,
        });

        SuccessResponse.ok(res, {
            data: {
                available: !isOverlapping,
                advertisementId: ad._id,
                roomId: room ? room._id : null,
                bookingType: pricing.bookingType,
                rentalType: pricing.rentalType,
                startDate: start,
                endDate: end,
                duration: pricing.duration,
                pricingUnit: pricing.pricingUnit,
                unitPrice: pricing.unitPrice,
                totalPrice: pricing.totalPrice,
                currency: pricing.currency,
                minDuration: pricing.minDuration,
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Returns available rooms for a hotel within a date window
 */
exports.getHotelAvailableRooms = async (req, res, next) => {
    const { getAvailableRoomsForHotel } = require('../../rooms/controllers/roomController');
    return getAvailableRoomsForHotel(req, res, next);
};

/**
 * Returns schedule slots and booked intervals for Yacht / Golf Car on a specific date
 */
exports.getScheduleSlots = async (req, res, next) => {
    try {
        const { advertisementId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const ad = await Advertisement.findById(advertisementId);
        if (!ad) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        const dateStr = req.query.date || new Date().toISOString().split('T')[0];
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj.getTime())) {
            return next(new APIError('validation.invalidDateRange', 400));
        }

        // Start and end of the chosen day in UTC
        const dayStart = new Date(dateObj);
        dayStart.setUTCHours(0, 0, 0, 0);

        const dayEnd = new Date(dateObj);
        dayEnd.setUTCHours(23, 59, 59, 999);

        // Fetch all confirmed or pending bookings overlapping this day
        const bookings = await Booking.find({
            advertisement: ad._id,
            status: { $in: ['pending', 'confirmed'] },
            startDate: { $lt: dayEnd },
            endDate: { $gt: dayStart },
        }).sort({ startDate: 1 });

        const isFullDayBooked = bookings.some((b) => (
            b.rentalType === 'full_day'
            || (b.startDate <= dayStart && b.endDate >= dayEnd)
        ));

        const bookedSlots = bookings.map((b) => {
            const startH = String(b.startDate.getUTCHours()).padStart(2, '0');
            const startM = String(b.startDate.getUTCMinutes()).padStart(2, '0');
            const endH = String(b.endDate.getUTCHours()).padStart(2, '0');
            const endM = String(b.endDate.getUTCMinutes()).padStart(2, '0');

            return {
                id: b._id,
                from: `${startH}:${startM}`,
                to: `${endH}:${endM}`,
                startDate: b.startDate,
                endDate: b.endDate,
                duration: b.duration,
                rentalType: b.rentalType,
            };
        });

        // Price details
        const hourlyPrice = ad.pricing?.pricePerHour
            || (ad.pricing?.pricingUnit === 'per_hour' ? (ad.pricing?.finalPrice || ad.price) : Math.round(((ad.pricing?.finalPrice || ad.price) / 8) * 100) / 100);

        const fullDayPrice = ad.pricing?.fullDayPrice
            || ad.pricing?.pricePerDay
            || (ad.pricing?.pricingUnit === 'per_day' ? (ad.pricing?.finalPrice || ad.price) : (ad.pricing?.finalPrice || ad.price) * 8);

        SuccessResponse.ok(res, {
            data: {
                advertisementId: ad._id,
                title: ad.title,
                type: ad.type,
                date: dateStr,
                isFullDayAvailable: !isFullDayBooked && bookings.length === 0,
                bookedSlotsCount: bookedSlots.length,
                bookedSlots,
                pricing: {
                    hourlyPrice,
                    fullDayPrice,
                    minDuration: ad.pricing?.minDuration || 1,
                    currency: ad.pricing?.currency || 'EGP',
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Calculates price estimate before booking without saving
 */
exports.calculatePrice = async (req, res, next) => {
    try {
        const { advertisement: adId, room: roomId } = req.body;
        const targetAdId = adId || req.query.advertisement;
        const targetRoomId = roomId || req.query.room;

        if (!targetAdId || !mongoose.Types.ObjectId.isValid(targetAdId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const ad = await Advertisement.findById(targetAdId);
        if (!ad) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        let room = null;
        if (targetRoomId) {
            if (!mongoose.Types.ObjectId.isValid(targetRoomId)) {
                return next(new APIError('errors.invalidRoomId', 400));
            }
            room = await Room.findById(targetRoomId);
            if (!room) {
                return next(new APIError('errors.roomNotFound', 404));
            }
        }

        const parsed = parseBookingWindow(req.body) || parseBookingWindow(req.query);
        if (!parsed) {
            return next(new APIError('validation.datesRequired', 400));
        }

        const { start, end, rentalType } = parsed;

        const isOverlapping = await checkBookingOverlap({
            advertisementId: ad._id,
            roomId: room ? room._id : null,
            startDate: start,
            endDate: end,
        });

        const pricing = determineBookingPricing({
            ad,
            room,
            start,
            end,
            rentalTypeInput: rentalType,
        });

        SuccessResponse.ok(res, {
            data: {
                available: !isOverlapping,
                advertisementId: ad._id,
                roomId: room ? room._id : null,
                bookingType: pricing.bookingType,
                rentalType: pricing.rentalType,
                startDate: start,
                endDate: end,
                duration: pricing.duration,
                pricingUnit: pricing.pricingUnit,
                unitPrice: pricing.unitPrice,
                totalPrice: pricing.totalPrice,
                currency: pricing.currency,
                minDuration: pricing.minDuration,
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new booking (Hotel with Room, Chalet, Yacht hourly/full_day, Golf Car hourly/daily)
 */
exports.create = async (req, res, next) => {
    try {
        const {
            advertisement: adId,
            room: roomId,
            notes,
            guestDetails,
            paymentMethod,
        } = req.body;

        let ad = req.bookingAd;
        let room = req.bookingRoom;
        let start = req.bookingDates?.start;
        let end = req.bookingDates?.end;
        let rentalType = req.bookingDates?.rentalType;

        // If not validated through validateCreateBooking middleware
        if (!ad) {
            if (roomId) {
                if (!mongoose.Types.ObjectId.isValid(roomId)) {
                    return next(new APIError('errors.invalidRoomId', 400));
                }
                room = await Room.findById(roomId);
                if (!room) {
                    return next(new APIError('errors.roomNotFound', 404));
                }
                if (!room.active) {
                    return next(new APIError('errors.roomInactive', 400));
                }
            }

            const targetAdId = adId || (room ? room.hotel : null);
            if (!targetAdId || !mongoose.Types.ObjectId.isValid(targetAdId)) {
                return next(new APIError('errors.invalidAdvertisementId', 400));
            }

            ad = await Advertisement.findById(targetAdId);
            if (!ad) {
                return next(new APIError('errors.advertisementNotFound', 404));
            }
            if (!ad.active) {
                return next(new APIError('errors.advertisementInactive', 400));
            }

            const parsedWindow = parseBookingWindow(req.body);
            if (!parsedWindow) {
                return next(new APIError('validation.invalidDateRange', 400));
            }

            start = parsedWindow.start;
            end = parsedWindow.end;
            rentalType = parsedWindow.rentalType;

            const isOverlap = await checkBookingOverlap({
                advertisementId: ad._id,
                roomId: room ? room._id : null,
                startDate: start,
                endDate: end,
            });

            if (isOverlap) {
                return next(new APIError('errors.bookingDateConflict', 400));
            }
        }

        const pricing = determineBookingPricing({
            ad,
            room,
            start,
            end,
            rentalTypeInput: rentalType,
        });

        if (pricing.duration < pricing.minDuration) {
            return FailResponse.badRequest(res, {
                message: `Minimum booking duration is ${pricing.minDuration} (${pricing.pricingUnit}). Requested: ${pricing.duration}.`,
            });
        }

        const booking = await Booking.create({
            bookingType: pricing.bookingType,
            advertisement: ad._id,
            room: room ? room._id : null,
            rentalType: pricing.rentalType,
            user: req.user?._id,
            startDate: start,
            endDate: end,
            duration: pricing.duration,
            pricingUnit: pricing.pricingUnit,
            unitPrice: pricing.unitPrice,
            totalPrice: pricing.totalPrice,
            guestDetails: guestDetails || {},
            paymentMethod: paymentMethod || 'cash',
            notes: notes ? String(notes).trim() : '',
            status: 'pending',
            paymentStatus: 'unpaid',
        });

        const populated = await Booking.findById(booking._id)
            .populate('advertisement', 'title price pricing image images location category region unitType owner isHotel type')
            .populate('room', 'title roomNumber roomType price pricing capacity beds image images')
            .populate('user', 'name email phone');

        SuccessResponse.created(res, {
            message: req.t ? req.t('messages.bookingCreated') : 'Booking created successfully.',
            data: { booking: formatBooking(populated) },
        });
    } catch (err) {
        next(err);
    }
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

    if (req.query.room && mongoose.Types.ObjectId.isValid(req.query.room)) {
        filter.room = req.query.room;
    }

    if (req.query.bookingType) {
        filter.bookingType = req.query.bookingType;
    }

    if (req.query.rentalType) {
        filter.rentalType = req.query.rentalType;
    }

    if (req.query.status) {
        filter.status = req.query.status;
    }

    const bookings = await Booking.find(filter)
        .populate('advertisement', 'title price pricing image images location category region unitType isHotel type')
        .populate('room', 'title roomNumber roomType price pricing capacity beds image images')
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
        .populate('advertisement', 'title price pricing image images location category region unitType isHotel type')
        .populate('room', 'title roomNumber roomType price pricing capacity beds image images')
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
            if (req.body.cancellationReason !== undefined) {
                booking.cancellationReason = req.body.cancellationReason;
            }
        } else {
            if (String(booking.user) !== String(req.user._id)) {
                return next(new APIError('errors.forbidden', 403));
            }
            if (req.body.status && req.body.status !== 'cancelled') {
                return next(new APIError('errors.forbidden', 403));
            }
            if (req.body.status) booking.status = req.body.status;
            if (req.body.cancellationReason) booking.cancellationReason = req.body.cancellationReason;
        }
    } else {
        if (req.body.status) booking.status = req.body.status;
        if (req.body.paymentStatus) booking.paymentStatus = req.body.paymentStatus;
        if (req.body.notes !== undefined) booking.notes = req.body.notes;
        if (req.body.cancellationReason !== undefined) booking.cancellationReason = req.body.cancellationReason;
    }

    await booking.save();

    const populated = await Booking.findById(booking._id)
        .populate('advertisement', 'title price pricing image images location')
        .populate('room', 'title roomNumber roomType price pricing capacity beds image images')
        .populate('user', 'name email phone');

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.bookingUpdated') : 'Booking updated successfully.',
        data: { booking: formatBooking(populated) },
    });
};

/**
 * Dedicated cancel booking endpoint
 */
exports.cancelBooking = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBookingId', 400));
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return next(new APIError('errors.bookingNotFound', 404));
        }

        if (req.user && req.user.role !== 'admin') {
            const isOwner = await Advertisement.exists({
                _id: booking.advertisement,
                owner: req.user._id,
            });
            const isCustomer = String(booking.user) === String(req.user._id);

            if (!isOwner && !isCustomer) {
                return next(new APIError('errors.forbidden', 403));
            }
        }

        booking.status = 'cancelled';
        if (req.body.cancellationReason || req.body.reason) {
            booking.cancellationReason = req.body.cancellationReason || req.body.reason;
        }

        await booking.save();

        SuccessResponse.ok(res, {
            message: req.t ? req.t('messages.bookingCancelled') : 'Booking cancelled successfully.',
            data: { booking: formatBooking(booking) },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Dedicated confirm booking endpoint (Admin / Owner)
 */
exports.confirmBooking = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBookingId', 400));
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return next(new APIError('errors.bookingNotFound', 404));
        }

        if (req.user && req.user.role !== 'admin') {
            const isOwner = await Advertisement.exists({
                _id: booking.advertisement,
                owner: req.user._id,
            });
            if (!isOwner) {
                return next(new APIError('errors.forbidden', 403));
            }
        }

        booking.status = 'confirmed';
        await booking.save();

        SuccessResponse.ok(res, {
            message: req.t ? req.t('messages.bookingConfirmed') : 'Booking confirmed successfully.',
            data: { booking: formatBooking(booking) },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Dedicated complete booking endpoint (Admin / Owner)
 */
exports.completeBooking = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBookingId', 400));
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return next(new APIError('errors.bookingNotFound', 404));
        }

        if (req.user && req.user.role !== 'admin') {
            const isOwner = await Advertisement.exists({
                _id: booking.advertisement,
                owner: req.user._id,
            });
            if (!isOwner) {
                return next(new APIError('errors.forbidden', 403));
            }
        }

        booking.status = 'completed';
        await booking.save();

        SuccessResponse.ok(res, {
            message: req.t ? req.t('messages.bookingCompleted') : 'Booking completed successfully.',
            data: { booking: formatBooking(booking) },
        });
    } catch (err) {
        next(err);
    }
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
exports.determineBookingPricing = determineBookingPricing;
