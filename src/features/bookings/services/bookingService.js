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

const parseDates = ({ startDate, endDate } = {}) => {
    if (!startDate || !endDate) {
        throw new APIError('validation.datesRequired', 400);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
        throw new APIError('validation.invalidDateRange', 400);
    }
    if (start < new Date()) {
        throw new APIError('validation.startDateInPast', 400);
    }

    return { start, end };
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

    if (ad.isHotel && !roomDoc && await Room.exists({ hotel: ad._id, active: true })) {
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
    const { start, end } = parseDates(input);
    const { ad, room } = await findBookable(input);
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
    priceStay: calculatePrice,
    nextReference,
    staySnapshotFor,
};
