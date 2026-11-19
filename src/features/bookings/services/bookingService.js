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
} = require('../quote');
const { presentReceiptLine } = require('../../../../utils/localize');
const { snapshotPolicies } = require('../../advertisements/listingPolicies');
const { DATE_ONLY, cairoDay, zonedDate } = require('../cairoTime');
const {
    findOverlappingClosure,
    listUpcomingBlocks,
    formatBlock,
    resolveCalendarWindow,
    buildCalendar,
} = require('../blockedPeriods');

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

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

    const closure = await findOverlappingClosure({ ad, room, start, end });
    const taken = await isSlotTaken({ ad, room, start, end });
    const available = !closure && !taken;

    return {
        ad,
        room,
        start,
        end,
        price,
        available,
        unavailableReason: available ? null : (closure ? 'closed' : 'booked'),
    };
};

/**
 * Booked ranges, provider closures, and a month calendar for the booking screen.
 * Pass ?month=YYYY-MM or ?from=&to= to move the calendar. Defaults to the current month.
 * ?room= limits both bookings and closures to that room, and still includes listing-wide closures.
 */
const buildAvailability = async ({ ad, roomDoc, booking, roomId, hasRooms, query }) => {
    const scopeRoom = roomDoc ? roomDoc._id : null;
    const bookings = await Booking.find({
        advertisement: ad._id,
        room: roomId || null,
        status: { $in: ACTIVE_STATUSES },
        endDate: { $gt: new Date() },
    })
        .select('startDate endDate')
        .sort({ startDate: 1 });

    const closed = await listUpcomingBlocks(ad._id, scopeRoom);
    const window = resolveCalendarWindow(query);
    const closedPeriods = closed.map(formatBlock);

    return {
        advertisementId: ad._id,
        hasRooms,
        roomId: scopeRoom,
        pricingUnit: booking.pricingUnit,
        booking,
        bookedDates: bookings.map((item) => ({ startDate: item.startDate, endDate: item.endDate })),
        closedPeriods,
        unavailable: [
            ...bookings.map((item) => ({
                startDate: item.startDate,
                endDate: item.endDate,
                reason: 'booked',
            })),
            ...closedPeriods.map((item) => ({
                startDate: item.startsAt,
                endDate: item.endsAt,
                reason: 'closed',
                kind: item.kind,
                id: item.id,
            })),
        ],
        calendar: buildCalendar({
            fromDay: window.from,
            toDay: window.to,
            blocks: closed,
            bookings,
            mode: booking.mode,
        }),
    };
};

const populateBooking = (query) => query
    .populate('advertisement', 'title titleAr price pricing image images location locationAr address addressAr category region unitType owner isHotel type')
    .populate('room', 'title titleAr description descriptionAr roomNumber roomType price pricing capacity beds bathrooms area amenities amenitiesAr image images')
    .populate('user', 'name email phone');

const formatBooking = (doc, locale = 'en', exact = false) => {
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
            ref.details = buildRoomDetails(ref, locale, exact);
            ref.detailsHtml = buildRoomDetailsHtml(ref.details, locale);
        }
    });

    if (obj.staySnapshot?.image) obj.staySnapshot.image = getImageUrl(obj.staySnapshot.image) || '';
    obj.confirmation = presentConfirmation(obj);

    return obj;
};

const receiptImage = (value) => getImageUrl(value) || '';

const receiptLine = (line, locale) => presentReceiptLine(line, locale);

// Customer list is a receipt: reference, stay, guest, price lines and payment.
// Internal quote fields, the account user, and the raw listing documents stay out.
const formatBookingReceipt = (doc, locale = 'en') => {
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
            title: locale === 'ar'
                ? (stay.propertyTitleAr || ad.titleAr || stay.propertyTitle || ad.title || '')
                : (stay.propertyTitle || ad.title || stay.propertyTitleAr || ad.titleAr || ''),
            location: locale === 'ar'
                ? (ad.locationAr || ad.addressAr || ad.location || ad.address || '')
                : (ad.location || ad.address || ad.locationAr || ad.addressAr || ''),
        },
        room: room ? {
            title: locale === 'ar'
                ? (room.titleAr || stay.titleAr || room.title || stay.title || '')
                : (room.title || stay.title || room.titleAr || stay.titleAr || ''),
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
            title: locale === 'ar' ? (stay.titleAr || stay.title || '') : (stay.title || stay.titleAr || ''),
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
        lines: (confirmation.price?.lines || []).map((line) => receiptLine(line, locale)).filter(Boolean),
        cancellation: confirmation.cancellation?.freeUntil
            ? { freeUntil: confirmation.cancellation.freeUntil }
            : null,
        policies: confirmation.policies || undefined,
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
    propertyTitleAr: ad.titleAr || '',
    title: room?.title || ad.title || '',
    titleAr: room?.titleAr || ad.titleAr || '',
    image: (room && (room.image || room.images?.[0])) || ad.image || '',
    bedType: room?.beds?.bedType || '',
    bedTypeAr: room?.beds?.bedTypeAr || '',
    bedCount: room?.beds?.count ?? null,
    area: room?.area ?? null,
    amenities: Array.isArray(room?.amenities) ? [...room.amenities] : [],
    amenitiesAr: Array.isArray(room?.amenitiesAr) ? [...room.amenitiesAr] : [],
    breakfastIncluded: Boolean(quote.breakfastIncluded),
    checkInTime: quote.schedule?.checkInTime || '',
    checkOutTime: quote.schedule?.checkOutTime || '',
    policies: snapshotPolicies(ad.policies),
});

module.exports = {
    ACTIVE_STATUSES,
    isValidId,
    prepareBooking,
    buildAvailability,
    populateBooking,
    formatBooking,
    formatBookingReceipt,
    priceStay: calculatePrice,
    nextReference,
    staySnapshotFor,
};
