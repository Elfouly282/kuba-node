const crypto = require('crypto');
const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Room = require('../../rooms/models/roomModel');
const APIError = require('../../../utils/apiError');
const { getImageUrl } = require('../../../utils/imageUrl');
const { buildRoomDetails, buildRoomDetailsHtml } = require('../../rooms/roomDetails');
const {
    readGuests,
    parseAddOnIds,
    assertCapacity,
    buildQuote,
    presentConfirmation,
    normalizeTime,
} = require('../quote');

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const CAIRO = 'Africa/Cairo';

// Bookings in these statuses block their time slot
const ACTIVE_STATUSES = ['pending', 'confirmed'];

const RENTAL_TYPE_BY_UNIT = {
    per_hour: 'hourly',
    per_day: 'daily',
    per_night: 'per_night',
    per_trip: 'per_trip',
    fixed: 'fixed',
};

const BOOKING_TYPES = ['hotel', 'chalet', 'yacht', 'golf_car', 'apartment', 'villa'];

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const text = (value) => (value === undefined || value === null ? '' : String(value).trim());

const isDateOnly = (value) => DATE_ONLY.test(text(value));

const cairoDay = (date) => new Intl.DateTimeFormat('en-CA', {
    timeZone: CAIRO,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
}).format(date);

// Wall-clock time in Africa/Cairo, so 17:00 is 5pm in Egypt.
const zonedDate = (day, time) => {
    const datePart = text(day).slice(0, 10);
    const clock = normalizeTime(text(time).replace(/^(\d{1,2}:\d{2}):\d{2}$/, '$1'));
    if (!DATE_ONLY.test(datePart) || !clock) return null;

    const utcGuess = new Date(`${datePart}T${clock}:00Z`);
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
        timeZone: CAIRO,
        hourCycle: 'h23',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).formatToParts(utcGuess).map((part) => [part.type, part.value]));

    const hour = parts.hour === '24' ? 0 : Number(parts.hour);
    const asUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), hour, Number(parts.minute), Number(parts.second));
    const parsed = new Date(utcGuess.getTime() - (asUtc - utcGuess.getTime()));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const assertFutureRange = (start, end) => {
    if (!(start instanceof Date) || !(end instanceof Date) || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
        throw new APIError('validation.invalidDateRange', 400);
    }
    if (start < new Date()) {
        throw new APIError('validation.startDateInPast', 400);
    }
    return { start, end };
};

/**
 * Hourly rentals (golf car, yacht per hour) are one day.
 * Tomorrow 17:00–19:00 is date + startTime + endTime, and that day is both the start and the end.
 */
const parseHourlySameDay = ({ day, startTime, endTime, durationRaw, hasDuration }) => {
    if (!startTime || (!endTime && !hasDuration)) {
        throw new APIError('validation.hourlyTimesRequired', 400);
    }

    const start = zonedDate(day, startTime);
    if (!start) throw new APIError('validation.hourlyTimesRequired', 400);

    let end = null;
    if (endTime) {
        end = zonedDate(day, endTime);
        if (!end) throw new APIError('validation.hourlyTimesRequired', 400);
        if (end <= start) throw new APIError('validation.sameDayEndAfterStart', 400);
    } else {
        const hours = Number(durationRaw);
        if (!Number.isFinite(hours) || hours <= 0) throw new APIError('validation.invalidDuration', 400);
        end = new Date(start.getTime() + (hours * HOUR_MS));
        if (cairoDay(start) !== cairoDay(end)) throw new APIError('validation.hourlySameDay', 400);
    }

    return assertFutureRange(start, end);
};

const parseDates = (input = {}, pricingUnit) => {
    const hourly = pricingUnit === 'per_hour';
    const startTime = text(input.startTime);
    const endTime = text(input.endTime);
    const day = text(input.date || input.bookingDate);
    const durationRaw = input.durationHours ?? input.hours;
    const hasDuration = text(durationRaw) !== '';
    const startDate = text(input.startDate);
    const endDate = text(input.endDate);
    const timedRange = startDate && !isDateOnly(startDate) && endDate && !isDateOnly(endDate);
    const sameCalendarDay = isDateOnly(startDate) && isDateOnly(endDate) && startDate === endDate;
    const wantsSameDayHours = hourly && !timedRange && (day || startTime || endTime || hasDuration || sameCalendarDay);

    if (wantsSameDayHours) {
        return parseHourlySameDay({
            day: day || startDate || endDate,
            startTime,
            endTime,
            durationRaw,
            hasDuration,
        });
    }

    if (!startDate || !endDate) {
        throw new APIError('validation.datesRequired', 400);
    }

    return assertFutureRange(new Date(startDate), new Date(endDate));
};

/**
 * Resolves what is being booked: an advertisement, or a room inside a hotel.
 * Sending only `room` is enough; its hotel becomes the advertisement.
 */
const findBookable = async ({ advertisement, room } = {}) => {
    let adId = advertisement;
    let roomDoc = null;

    if (room) {
        if (!isValidId(room)) throw new APIError('errors.invalidRoomId', 400);

        roomDoc = await Room.findById(room);
        if (!roomDoc) throw new APIError('errors.roomNotFound', 404);
        if (!roomDoc.active) throw new APIError('errors.roomInactive', 400);
        if (adId && String(adId) !== String(roomDoc.hotel)) {
            throw new APIError('errors.roomDoesNotBelongToHotel', 400);
        }

        adId = roomDoc.hotel;
    }

    if (!adId || !isValidId(adId)) throw new APIError('errors.invalidAdvertisementId', 400);

    const ad = await Advertisement.findById(adId);
    if (!ad) throw new APIError('errors.advertisementNotFound', 404);
    if (!ad.active) throw new APIError('errors.advertisementInactive', 400);

    if (!roomDoc && await Room.exists({ hotel: ad._id, active: true })) {
        throw new APIError('validation.roomRequired', 400);
    }

    return { ad, room: roomDoc };
};

const getBookingType = (ad) => {
    if (ad.isHotel) return 'hotel';
    const type = String(ad.type || '').toLowerCase();
    if (type.includes('golf')) return 'golf_car';
    return BOOKING_TYPES.includes(type) ? type : 'general';
};

/**
 * One pricing rule for everything: duration is counted in the listing's own
 * pricing unit (hours, days or nights), then multiplied by the unit price.
 */
const chargedRate = (source, pricingUnit) => {
    const pricing = source.pricing || {};
    const finalPrice = Number(pricing.finalPrice || source.price || 0);
    if (pricingUnit === 'per_hour') return Number(pricing.pricePerHour || finalPrice);
    if (pricingUnit === 'per_day') return Number(pricing.pricePerDay || finalPrice);
    return finalPrice;
};

const calculatePrice = ({ ad, room, start, end, addOnIds = [], guests = { adults: 1, children: 0, rooms: 1 } }) => {
    const source = room || ad;
    const pricingUnit = source.pricing?.pricingUnit || 'per_night';
    const unitPrice = chargedRate(source, pricingUnit);
    const basePrice = Number(source.pricing?.basePrice || unitPrice);
    const discounted = source.pricing?.discountType === 'percentage' || source.pricing?.discountType === 'fixed';
    const listUnit = discounted && basePrice > unitPrice ? basePrice : unitPrice;

    const diffMs = end.getTime() - start.getTime();
    let duration = 1;
    if (pricingUnit === 'per_hour') duration = Math.ceil(diffMs / HOUR_MS);
    if (pricingUnit === 'per_day' || pricingUnit === 'per_night') duration = Math.ceil(diffMs / DAY_MS);

    const quote = buildQuote({
        ad,
        room,
        duration,
        pricingUnit,
        chargedUnit: unitPrice,
        listUnit,
        currency: source.pricing?.currency || 'EGP',
        addOnIds,
        guests,
        start,
        end,
    });

    return {
        bookingType: getBookingType(ad),
        rentalType: RENTAL_TYPE_BY_UNIT[pricingUnit] || 'per_night',
        pricingUnit,
        duration,
        minDuration: room ? 1 : Number(ad.pricing?.minDuration) || 1,
        unitPrice: quote.unitPrice,
        totalPrice: quote.total,
        currency: quote.currency,
        quote,
    };
};

const isSlotTaken = async ({ ad, room, start, end }) => {
    const query = {
        status: { $in: ACTIVE_STATUSES },
        startDate: { $lt: end },
        endDate: { $gt: start },
    };

    if (room) {
        query.room = room._id;
    } else {
        query.advertisement = ad._id;
    }

    return Boolean(await Booking.exists(query));
};

/**
 * Runs every check a booking needs and returns the computed price.
 * Used by both the "check" endpoint and the "create" endpoint so they always agree.
 */
const prepareBooking = async (input) => {
    const { ad, room } = await findBookable(input);
    const pricingUnit = (room || ad).pricing?.pricingUnit || 'per_night';
    const { start, end } = parseDates(input, pricingUnit);
    const guests = readGuests(input);
    assertCapacity(room, guests);
    const price = calculatePrice({
        ad,
        room,
        start,
        end,
        addOnIds: parseAddOnIds(input),
        guests,
    });

    if (price.duration < price.minDuration) {
        throw new APIError('validation.minDurationNotMet', 400, {
            minDuration: price.minDuration,
            unit: price.pricingUnit,
        });
    }

    const available = !(await isSlotTaken({ ad, room, start, end }));

    return { ad, room, start, end, price, available };
};

const populateBooking = (query) => query
    .populate('advertisement', 'title price pricing image images location category region unitType owner isHotel type')
    .populate('room', 'title roomNumber roomType price pricing capacity beds bathrooms area amenities image images')
    .populate('user', 'name email phone');

const formatBooking = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };

    ['advertisement', 'room'].forEach((field) => {
        const ref = obj[field];
        if (!ref || typeof ref !== 'object') return;
        if (ref.image) ref.image = getImageUrl(ref.image);
        if (Array.isArray(ref.images)) {
            ref.images = ref.images.map(getImageUrl).filter(Boolean);
            if (field === 'room') ref.images = ref.images.slice(0, 3);
        }
        if (field === 'room') {
            ref.details = buildRoomDetails(ref);
            ref.detailsHtml = buildRoomDetailsHtml(ref.details);
        }
    });

    if (obj.staySnapshot?.image) obj.staySnapshot.image = getImageUrl(obj.staySnapshot.image) || '';
    obj.confirmation = presentConfirmation(obj);

    return obj;
};

const receiptImage = (value) => getImageUrl(value) || '';

const receiptLine = (line) => {
    if (!line || line.amount === undefined || line.amount === null) return null;
    const row = {
        label: line.label || '',
        amount: line.amount,
    };
    if (line.quantityLabel) row.quantityLabel = line.quantityLabel;
    return row;
};

// Customer list is a receipt: reference, stay, guest, price lines and payment.
// Internal quote fields, the account user, and the raw listing documents stay out.
const formatBookingReceipt = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };

    if (obj.staySnapshot?.image) obj.staySnapshot.image = receiptImage(obj.staySnapshot.image);
    if (obj.advertisement && typeof obj.advertisement === 'object' && obj.advertisement.image) {
        obj.advertisement.image = receiptImage(obj.advertisement.image);
    }
    if (obj.room && typeof obj.room === 'object' && obj.room.image) {
        obj.room.image = receiptImage(obj.room.image);
    }

    const confirmation = presentConfirmation(obj);
    const ad = obj.advertisement && typeof obj.advertisement === 'object' ? obj.advertisement : {};
    const room = obj.room && typeof obj.room === 'object' ? obj.room : null;
    const guest = confirmation.guest || {};
    const stay = confirmation.stay || {};
    const payment = confirmation.payment || {};

    const receipt = {
        id: obj.id,
        reference: confirmation.reference || '',
        status: obj.status,
        bookingType: obj.bookingType,
        createdAt: obj.createdAt,
        image: stay.image || room?.image || ad.image || '',
        property: {
            title: stay.propertyTitle || ad.title || '',
            location: ad.location || ad.address || '',
        },
        room: room ? {
            title: room.title || stay.title || '',
            roomNumber: room.roomNumber || '',
        } : null,
        guest: {
            bookingFor: guest.bookingFor || 'me',
            name: guest.name || '',
            email: guest.email || '',
            phoneCountryCode: guest.phoneCountryCode || '',
            phone: guest.phone || '',
            adults: guest.adults ?? 1,
            children: guest.children ?? 0,
            arrivalFrom: guest.arrivalFrom || '',
            arrivalTo: guest.arrivalTo || '',
        },
        stay: {
            title: stay.title || '',
            checkIn: stay.checkIn,
            checkOut: stay.checkOut,
            checkInTime: stay.checkInTime || '',
            checkOutTime: stay.checkOutTime || '',
            duration: stay.nights,
            pricingUnit: stay.pricingUnit,
            breakfastIncluded: Boolean(stay.breakfastIncluded),
        },
        payment: {
            status: payment.status,
            method: payment.method,
            methodLabel: payment.methodLabel || '',
            amount: payment.amount,
            currency: payment.currency || 'EGP',
        },
        lines: (confirmation.price?.lines || []).map(receiptLine).filter(Boolean),
        cancellation: confirmation.cancellation?.freeUntil
            ? { freeUntil: confirmation.cancellation.freeUntil }
            : null,
    };

    if (obj.notes) receipt.notes = obj.notes;
    if (obj.status === 'cancelled' && obj.cancellationReason) {
        receipt.cancellationReason = obj.cancellationReason;
    }

    return receipt;
};

const nextReference = async () => {
    for (let attempt = 0; attempt < 8; attempt += 1) {
        const reference = `AZR-${crypto.randomInt(100000, 1000000)}`;
        const taken = await Booking.exists({ reference });
        if (!taken) return reference;
    }
    throw new APIError('errors.somethingWentWrong', 500);
};

const staySnapshotFor = ({ ad, room, quote }) => ({
    propertyTitle: ad.title || '',
    title: room?.title || ad.title || '',
    image: (room && (room.image || room.images?.[0])) || ad.image || '',
    bedType: room?.beds?.bedType || '',
    bedCount: room?.beds?.count ?? null,
    area: room?.area ?? null,
    amenities: Array.isArray(room?.amenities) ? [...room.amenities] : [],
    breakfastIncluded: Boolean(quote.breakfastIncluded),
    checkInTime: quote.schedule?.checkInTime || '',
    checkOutTime: quote.schedule?.checkOutTime || '',
});

module.exports = {
    ACTIVE_STATUSES,
    isValidId,
    prepareBooking,
    populateBooking,
    formatBooking,
    formatBookingReceipt,
    priceStay: calculatePrice,
    nextReference,
    staySnapshotFor,
};
