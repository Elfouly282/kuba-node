const APIError = require('../../utils/apiError');

const PAYMENT_METHODS = ['cash', 'card', 'wallet', 'online', 'instapay', 'fawry', 'meeza'];
const TERMS_REQUIRED = new Set(['instapay', 'fawry', 'meeza']);
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

const normalizeTime = (value) => {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (TIME.test(raw)) return raw;

    const match = raw.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return null;

    let hours = Number(match[1]);
    const minutes = match[2];
    const meridiem = match[3].toUpperCase();
    if (hours < 1 || hours > 12 || Number(minutes) > 59) return null;
    if (meridiem === 'AM') hours = hours === 12 ? 0 : hours;
    else hours = hours === 12 ? 12 : hours + 12;

    return `${String(hours).padStart(2, '0')}:${minutes}`;
};

const PAYMENT_LABELS = {
    cash: 'Cash',
    card: 'Card',
    wallet: 'Wallet',
    online: 'Online',
    instapay: 'InstaPay',
    fawry: 'Fawry',
    meeza: 'Meeza',
};

const money = (value) => Math.round((Number(value) || 0) * 100) / 100;

const paymentMethodOptions = () => ([
    { key: 'instapay', label: 'InstaPay', subtitle: '' },
    { key: 'fawry', label: 'Fawry', subtitle: 'Cash & retail' },
    { key: 'meeza', label: 'Meeza', subtitle: 'Wallet' },
]);

const pickNumber = (...values) => {
    const found = values.find((value) => value !== undefined && value !== null && value !== '');
    const n = Number(found);
    return Number.isFinite(n) ? n : 0;
};

const pickText = (...values) => {
    const found = values.find((value) => value !== undefined && value !== null && String(value).trim() !== '');
    return found === undefined ? '' : String(found).trim();
};

const pickBool = (primary, fallback) => {
    if (typeof primary === 'boolean') return primary;
    if (typeof fallback === 'boolean') return fallback;
    return false;
};

const plain = (value) => (value && typeof value.toObject === 'function' ? value.toObject() : (value || {}));

const mergeStay = (ad, room) => {
    const hotelStay = plain(ad?.stay);
    const roomStay = plain(room?.stay);
    const roomAddOns = Array.isArray(roomStay.addOns) && roomStay.addOns.length ? roomStay.addOns : null;

    return {
        cleaningFee: pickNumber(roomStay.cleaningFee, hotelStay.cleaningFee, 0),
        serviceFeePercent: Math.min(100, pickNumber(roomStay.serviceFeePercent, hotelStay.serviceFeePercent, 0)),
        taxPercent: Math.min(100, pickNumber(roomStay.taxPercent, hotelStay.taxPercent, 0)),
        taxLabel: pickText(roomStay.taxLabel, hotelStay.taxLabel, 'VAT'),
        checkInTime: pickText(roomStay.checkInTime, hotelStay.checkInTime),
        checkOutTime: pickText(roomStay.checkOutTime, hotelStay.checkOutTime),
        freeCancellationDays: (() => {
            const raw = [roomStay.freeCancellationDays, hotelStay.freeCancellationDays]
                .find((value) => value !== undefined && value !== null && value !== '');
            if (raw === undefined) return null;
            const days = Number(raw);
            return Number.isFinite(days) && days >= 0 ? Math.round(days) : null;
        })(),
        breakfastIncluded: pickBool(roomStay.breakfastIncluded, hotelStay.breakfastIncluded),
        addOns: roomAddOns || hotelStay.addOns || [],
    };
};

const quantityName = (pricingUnit, quantity) => {
    const names = {
        per_night: ['night', 'nights'],
        per_day: ['day', 'days'],
        per_hour: ['hour', 'hours'],
        per_trip: ['trip', 'trips'],
        fixed: ['booking', 'bookings'],
    };
    const pair = names[pricingUnit] || ['unit', 'units'];
    return quantity === 1 ? pair[0] : pair[1];
};

const percentText = (value) => {
    const n = money(value);
    return Number.isInteger(n) ? String(n) : String(n);
};

const cancellationDeadline = (start, daysBefore) => {
    if (!start || daysBefore === null || daysBefore === undefined) return null;
    return new Date(Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth(),
        start.getUTCDate() - daysBefore,
        21,
        59,
        0,
        0
    )).toISOString();
};

const readGuests = (input = {}) => {
    const source = input.guestDetails && typeof input.guestDetails === 'object' ? input.guestDetails : input;
    const adults = Number(source.adults ?? input.adults ?? 1);
    const children = Number(source.children ?? input.children ?? 0);

    if (!Number.isInteger(adults) || adults < 1) throw new APIError('validation.invalidGuests', 400);
    if (!Number.isInteger(children) || children < 0) throw new APIError('validation.invalidGuests', 400);

    return { adults, children, rooms: 1 };
};

const parseAddOnIds = (input = {}) => {
    const raw = input.addOns ?? input.addOn;
    if (raw === undefined || raw === null || raw === '') return [];

    const list = Array.isArray(raw) ? raw : String(raw).split(',');
    const ids = list.map((item) => {
        if (item && typeof item === 'object') return String(item.id || item._id || '').trim();
        return String(item || '').trim();
    }).filter(Boolean);

    return [...new Set(ids)];
};

const assertCapacity = (room, guests) => {
    if (!room) return;
    const listed = Number(room.capacity?.maxGuests);
    const fallback = (Number(room.capacity?.adults) || 0) + (Number(room.capacity?.children) || 0);
    const maxGuests = listed || fallback || 2;
    if (guests.adults + guests.children > maxGuests) {
        throw new APIError('validation.tooManyGuests', 400, { maxGuests });
    }
};

const assertPayment = (body = {}) => {
    const method = body.paymentMethod || 'cash';
    if (!PAYMENT_METHODS.includes(method)) throw new APIError('validation.invalidPaymentMethod', 400);

    const accepted = body.acceptedTerms === true || body.acceptedTerms === 'true';
    if (TERMS_REQUIRED.has(method) && !accepted) throw new APIError('validation.termsRequired', 400);

    return { method, accepted };
};

const normalizeGuest = (input = {}, user = {}) => {
    const guests = readGuests(input);
    const source = input.guestDetails && typeof input.guestDetails === 'object' ? input.guestDetails : {};
    const bookingFor = source.bookingFor === 'someone_else' || input.bookingFor === 'someone_else'
        ? 'someone_else'
        : 'me';

    let email = String(source.email || input.email || '').trim().toLowerCase();
    if (!email && user.email) email = String(user.email).trim().toLowerCase();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) throw new APIError('validation.emailInvalid', 400);

    const phone = String(source.phone || input.phone || '').trim();
    const phoneCountryCode = String(
        source.phoneCountryCode || input.phoneCountryCode || (phone ? '+20' : '')
    ).trim();

    let firstName = String(source.firstName || input.firstName || '').trim();
    let lastName = String(source.lastName || input.lastName || '').trim();
    let fullName = [firstName, lastName].filter(Boolean).join(' ');
    if (!fullName) fullName = String(source.fullName || input.fullName || '').trim();

    if (!firstName && !lastName && fullName) {
        const parts = fullName.split(/\s+/);
        firstName = parts.shift() || '';
        lastName = parts.join(' ');
    }

    if (!fullName && bookingFor === 'me' && user.name) {
        fullName = String(user.name).trim();
        const parts = fullName.split(/\s+/);
        firstName = parts.shift() || '';
        lastName = parts.join(' ');
    }

    const arrival = source.arrival || input.arrival || {};
    const arrivalFrom = normalizeTime(source.arrivalFrom || arrival.from || input.arrivalFrom || '');
    const arrivalTo = normalizeTime(source.arrivalTo || arrival.to || input.arrivalTo || '');
    if (arrivalFrom === null || arrivalTo === null) throw new APIError('validation.invalidArrivalTime', 400);
    if ((arrivalFrom || arrivalTo) && (!arrivalFrom || !arrivalTo || arrivalFrom >= arrivalTo)) {
        throw new APIError('validation.invalidArrivalTime', 400);
    }

    return {
        ...guests,
        bookingFor,
        email,
        phoneCountryCode,
        phone,
        firstName,
        lastName,
        fullName,
        nationalIdOrPassport: String(source.nationalIdOrPassport || input.nationalIdOrPassport || '').trim(),
        arrivalFrom,
        arrivalTo,
    };
};

const buildQuote = ({
    ad,
    room,
    duration,
    pricingUnit,
    chargedUnit,
    listUnit,
    currency,
    addOnIds = [],
    guests = { adults: 1, children: 0, rooms: 1 },
    start,
}) => {
    const stay = mergeStay(ad, room);
    const roomSubtotal = money(chargedUnit * duration);
    const listAmount = money(Math.max(chargedUnit, listUnit) * duration);
    const discountAmount = money(Math.max(0, listAmount - roomSubtotal));
    const cleaningFee = money(stay.cleaningFee);
    const serviceFee = money(roomSubtotal * stay.serviceFeePercent / 100);
    const taxes = money(roomSubtotal * stay.taxPercent / 100);

    const catalog = (stay.addOns || []).filter((item) => item && item.active !== false);
    const byId = new Map(catalog.map((item) => [String(item._id || item.id), item]));
    const selected = addOnIds.map((id) => {
        const found = byId.get(String(id));
        if (!found) throw new APIError('validation.invalidAddOn', 400);
        return found;
    });

    const selectedAddOns = selected.map((item) => ({
        id: String(item._id || item.id),
        title: item.title,
        description: item.description || '',
        price: money(item.price),
        category: item.category || 'extra',
    }));

    const lines = [{
        key: 'room',
        label: 'Room total',
        unitPrice: discountAmount > 0 ? money(listUnit) : money(chargedUnit),
        quantity: duration,
        unit: pricingUnit,
        quantityLabel: `${duration} ${quantityName(pricingUnit, duration)}`,
        amount: discountAmount > 0 ? listAmount : roomSubtotal,
    }];

    if (discountAmount > 0) {
        lines.push({ key: 'discount', label: 'Discount', amount: -discountAmount });
    }
    if (cleaningFee > 0) {
        lines.push({ key: 'cleaning', label: 'Cleaning fee', amount: cleaningFee });
    }
    if (serviceFee > 0) {
        lines.push({
            key: 'service',
            label: `Service fee (${percentText(stay.serviceFeePercent)}%)`,
            percent: stay.serviceFeePercent,
            amount: serviceFee,
        });
    }
    if (taxes > 0) {
        lines.push({
            key: 'tax',
            label: `Taxes (${stay.taxLabel} ${percentText(stay.taxPercent)}%)`,
            percent: stay.taxPercent,
            taxLabel: stay.taxLabel,
            amount: taxes,
        });
    }
    selectedAddOns.forEach((item) => {
        lines.push({
            key: 'addon',
            id: item.id,
            label: item.title,
            description: item.description,
            category: item.category,
            amount: item.price,
        });
    });

    const total = money(lines.reduce((sum, line) => sum + line.amount, 0));
    const addOnsTotal = money(selectedAddOns.reduce((sum, item) => sum + item.price, 0));
    const taxesAndService = money(serviceFee + taxes);
    const beforeAddOns = money(total - addOnsTotal);
    const stayMode = pricingUnit === 'per_night' || pricingUnit === 'per_day';

    return {
        currency: currency || 'EGP',
        duration,
        pricingUnit,
        unitPrice: money(chargedUnit),
        roomSubtotal,
        discount: discountAmount,
        cleaningFee,
        serviceFeePercent: stay.serviceFeePercent,
        serviceFee,
        taxPercent: stay.taxPercent,
        taxLabel: stay.taxLabel,
        taxes,
        taxesAndService,
        addOnsTotal,
        total,
        lines,
        summary: {
            room: roomSubtotal,
            charges: money(cleaningFee + taxesAndService),
            taxesAndService,
            addOns: addOnsTotal,
            discount: discountAmount,
            beforeAddOns,
            total,
        },
        availableAddOns: catalog.map((item) => ({
            id: String(item._id || item.id),
            title: item.title,
            description: item.description || '',
            price: money(item.price),
            category: item.category || 'extra',
            selected: selectedAddOns.some((chosen) => chosen.id === String(item._id || item.id)),
        })),
        selectedAddOns,
        guests,
        breakfastIncluded: stay.breakfastIncluded,
        schedule: {
            checkInTime: stay.checkInTime || (stayMode ? '15:00' : ''),
            checkOutTime: stay.checkOutTime || (stayMode ? '12:00' : ''),
        },
        cancellation: stay.freeCancellationDays === null ? null : {
            daysBefore: stay.freeCancellationDays,
            freeUntil: cancellationDeadline(start, stay.freeCancellationDays),
        },
    };
};

const legacyQuote = (booking) => {
    const amount = money(booking.totalPrice);
    return {
        currency: 'EGP',
        duration: booking.duration,
        pricingUnit: booking.pricingUnit,
        unitPrice: money(booking.unitPrice),
        roomSubtotal: amount,
        discount: 0,
        cleaningFee: 0,
        serviceFeePercent: 0,
        serviceFee: 0,
        taxPercent: 0,
        taxLabel: 'VAT',
        taxes: 0,
        taxesAndService: 0,
        addOnsTotal: 0,
        total: amount,
        lines: [{
            key: 'room',
            label: 'Room total',
            unitPrice: money(booking.unitPrice),
            quantity: booking.duration,
            unit: booking.pricingUnit,
            amount,
        }],
        summary: {
            room: amount,
            charges: 0,
            taxesAndService: 0,
            addOns: 0,
            discount: 0,
            beforeAddOns: amount,
            total: amount,
        },
        availableAddOns: [],
        selectedAddOns: [],
        guests: {
            adults: booking.guestDetails?.adults || 1,
            children: booking.guestDetails?.children || 0,
            rooms: 1,
        },
        breakfastIncluded: false,
        schedule: { checkInTime: '', checkOutTime: '' },
        cancellation: null,
    };
};

const presentConfirmation = (booking) => {
    const quote = booking.priceBreakdown && booking.priceBreakdown.total !== undefined
        ? booking.priceBreakdown
        : legacyQuote(booking);
    const guest = booking.guestDetails || {};
    const stay = booking.staySnapshot || {};
    const ad = booking.advertisement && typeof booking.advertisement === 'object' ? booking.advertisement : {};
    const room = booking.room && typeof booking.room === 'object' ? booking.room : null;
    const name = guest.fullName || [guest.firstName, guest.lastName].filter(Boolean).join(' ');

    return {
        reference: booking.reference || '',
        status: booking.status,
        acceptedTerms: Boolean(booking.acceptedTerms),
        payment: {
            status: booking.paymentStatus,
            method: booking.paymentMethod,
            methodLabel: PAYMENT_LABELS[booking.paymentMethod] || booking.paymentMethod || '',
            amount: quote.total,
            currency: quote.currency || 'EGP',
        },
        guest: {
            bookingFor: guest.bookingFor || 'me',
            name,
            firstName: guest.firstName || '',
            lastName: guest.lastName || '',
            email: guest.email || '',
            phoneCountryCode: guest.phoneCountryCode || '',
            phone: guest.phone || '',
            adults: guest.adults ?? quote.guests?.adults ?? 1,
            children: guest.children ?? quote.guests?.children ?? 0,
            rooms: 1,
            arrivalFrom: guest.arrivalFrom || '',
            arrivalTo: guest.arrivalTo || '',
        },
        stay: {
            propertyTitle: stay.propertyTitle || ad.title || '',
            title: stay.title || room?.title || ad.title || '',
            image: stay.image || room?.image || ad.image || '',
            bedType: stay.bedType || room?.beds?.bedType || '',
            bedCount: stay.bedCount ?? room?.beds?.count ?? null,
            area: stay.area ?? room?.area ?? null,
            amenities: stay.amenities || room?.amenities || [],
            nights: quote.duration,
            pricingUnit: quote.pricingUnit,
            breakfastIncluded: stay.breakfastIncluded ?? quote.breakfastIncluded ?? false,
            checkIn: booking.startDate,
            checkOut: booking.endDate,
            checkInTime: stay.checkInTime || quote.schedule?.checkInTime || '',
            checkOutTime: stay.checkOutTime || quote.schedule?.checkOutTime || '',
        },
        price: quote,
        cancellation: quote.cancellation || null,
    };
};

module.exports = {
    PAYMENT_METHODS,
    paymentMethodOptions,
    readGuests,
    parseAddOnIds,
    assertCapacity,
    assertPayment,
    normalizeGuest,
    buildQuote,
    presentConfirmation,
};
