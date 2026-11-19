const mongoose = require('mongoose');
const BlockedPeriod = require('./models/blockedPeriodModel');
const Room = require('../rooms/models/roomModel');
const APIError = require('../../utils/apiError');
const { clockInZone, normalizeTime } = require('./quote');
const {
    DATE_ONLY,
    MONTH_ONLY,
    text,
    cairoDay,
    zonedDate,
    addDays,
    dayBounds,
    monthBounds,
    eachDay,
} = require('./cairoTime');

const KIND = {
    hour: 'hours',
    hours: 'hours',
    day: 'days',
    days: 'days',
    month: 'month',
    months: 'month',
};

const formatBlock = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    const block = {
        id: obj.id || obj._id,
        kind: obj.kind,
        roomId: obj.room || null,
        startsAt: obj.startsAt,
        endsAt: obj.endsAt,
        note: obj.note || '',
    };

    if (obj.kind === 'hours') {
        block.date = obj.date;
        block.startTime = obj.startTime;
        block.endTime = obj.endTime;
    } else if (obj.kind === 'month') {
        block.month = obj.month;
        block.startDay = obj.startDay;
        block.endDay = obj.endDay;
    } else {
        block.startDay = obj.startDay;
        block.endDay = obj.endDay;
    }

    return block;
};

const parseBlock = (input = {}) => {
    const kind = KIND[text(input.kind || input.type).toLowerCase()];
    if (!kind) throw new APIError('validation.invalidBlockKind', 400);

    const note = text(input.note || input.reason).slice(0, 200);

    if (kind === 'hours') {
        const date = text(input.date || input.day || input.startDate).slice(0, 10);
        const startTime = normalizeTime(text(input.startTime));
        const endTime = normalizeTime(text(input.endTime));
        const startsAt = zonedDate(date, startTime);
        const endsAt = zonedDate(date, endTime);
        if (!DATE_ONLY.test(date) || !startTime || !endTime || !startsAt || !endsAt) {
            throw new APIError('validation.hourlyTimesRequired', 400);
        }
        if (endsAt <= startsAt) throw new APIError('validation.sameDayEndAfterStart', 400);

        return {
            kind,
            date,
            startTime,
            endTime,
            startDay: '',
            endDay: '',
            month: '',
            note,
            startsAt,
            endsAt,
        };
    }

    if (kind === 'month') {
        const month = text(input.month).slice(0, 7);
        if (!MONTH_ONLY.test(month)) throw new APIError('validation.invalidMonth', 400);
        const bounds = monthBounds(month);
        if (!bounds.start || !bounds.end) throw new APIError('validation.invalidMonth', 400);

        return {
            kind,
            date: '',
            startTime: '',
            endTime: '',
            startDay: bounds.startDay,
            endDay: bounds.endDay,
            month,
            note,
            startsAt: bounds.start,
            endsAt: bounds.end,
        };
    }

    const startDay = text(input.startDay || input.startDate || input.date).slice(0, 10);
    const endDay = text(input.endDay || input.endDate || startDay).slice(0, 10);
    if (!DATE_ONLY.test(startDay) || !DATE_ONLY.test(endDay) || endDay < startDay) {
        throw new APIError('validation.invalidDateRange', 400);
    }

    const startsAt = zonedDate(startDay, '00:00');
    const endsAt = zonedDate(addDays(endDay, 1), '00:00');
    if (!startsAt || !endsAt || endsAt <= startsAt) throw new APIError('validation.invalidDateRange', 400);

    return {
        kind: 'days',
        date: '',
        startTime: '',
        endTime: '',
        startDay,
        endDay,
        month: '',
        note,
        startsAt,
        endsAt,
    };
};

const assertBlockStillOpen = (block) => {
    if (!block?.endsAt || block.endsAt <= new Date()) {
        throw new APIError('validation.blockInPast', 400);
    }
    return block;
};

const assertBlockRoom = async (ad, roomId) => {
    const id = text(roomId);
    if (!id) return null;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new APIError('errors.invalidRoomId', 400);

    const room = await Room.findById(id).select('hotel');
    if (!room) throw new APIError('errors.roomNotFound', 404);
    if (String(room.hotel) !== String(ad._id)) {
        throw new APIError('errors.roomDoesNotBelongToHotel', 400);
    }
    return room._id;
};

const scopeFilter = (advertisementId, roomId) => {
    const filter = { advertisement: advertisementId };
    if (roomId) filter.$or = [{ room: null }, { room: roomId }];
    else filter.room = null;
    return filter;
};

const listUpcomingBlocks = (advertisementId, roomId) => BlockedPeriod.find({
    ...scopeFilter(advertisementId, roomId),
    endsAt: { $gt: new Date() },
}).sort({ startsAt: 1 });

const listManagedBlocks = (advertisementId) => BlockedPeriod.find({
    advertisement: advertisementId,
    endsAt: { $gt: new Date() },
}).sort({ startsAt: 1 });

const findOverlappingClosure = ({ ad, room, start, end }) => BlockedPeriod.findOne({
    ...scopeFilter(ad._id, room ? room._id : null),
    startsAt: { $lt: end },
    endsAt: { $gt: start },
}).select('kind');

const roomsClosedForStay = async ({ advertisementId, start, end }) => {
    const blocks = await BlockedPeriod.find({
        advertisement: advertisementId,
        startsAt: { $lt: end },
        endsAt: { $gt: start },
    }).select('room');

    return {
        listingClosed: blocks.some((block) => !block.room),
        roomIds: new Set(blocks.filter((block) => block.room).map((block) => String(block.room))),
    };
};

const resolveCalendarWindow = (query = {}) => {
    const month = text(query.month).slice(0, 7);
    if (MONTH_ONLY.test(month)) {
        const bounds = monthBounds(month);
        return { from: bounds.startDay, to: bounds.endDay };
    }

    const from = text(query.from).slice(0, 10);
    const to = text(query.to).slice(0, 10);
    if (DATE_ONLY.test(from) && DATE_ONLY.test(to) && from <= to) {
        if (eachDay(from, to).length >= 370) throw new APIError('validation.invalidDateRange', 400);
        return { from, to };
    }

    const bounds = monthBounds(cairoDay(new Date()).slice(0, 7));
    return { from: bounds.startDay, to: bounds.endDay };
};

const clipWindow = (start, end, dayStart, dayEnd) => {
    const from = start > dayStart ? start : dayStart;
    const to = end < dayEnd ? end : dayEnd;
    if (!(from < to)) return null;
    return {
        startTime: from <= dayStart ? '00:00' : clockInZone(from),
        endTime: to >= dayEnd ? '24:00' : clockInZone(to),
    };
};

const coversWholeDay = (ranges) => ranges.some((range) => range.startTime === '00:00' && range.endTime === '24:00');

const buildCalendar = ({ fromDay, toDay, blocks, bookings, mode }) => {
    const today = cairoDay(new Date());
    const hourly = mode === 'hourly';

    const days = eachDay(fromDay, toDay).map((date) => {
        if (date < today) {
            return { date, status: 'past', available: false, closedHours: [], bookedHours: [] };
        }

        const bounds = dayBounds(date);
        const closedHours = [];
        let fullClosure = false;

        blocks.forEach((block) => {
            if (!(block.startsAt < bounds.end && block.endsAt > bounds.start)) return;
            if (block.kind === 'hours') {
                const clip = clipWindow(new Date(block.startsAt), new Date(block.endsAt), bounds.start, bounds.end);
                if (clip) closedHours.push(clip);
            } else {
                fullClosure = true;
            }
        });

        const bookedHours = [];
        let nightTaken = false;
        bookings.forEach((booking) => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            if (!(start < bounds.end && end > bounds.start)) return;

            if (hourly) {
                const clip = clipWindow(start, end, bounds.start, bounds.end);
                if (clip) bookedHours.push(clip);
                return;
            }

            const startDay = cairoDay(start);
            const endDay = cairoDay(end);
            const occupies = startDay === endDay ? date === startDay : date >= startDay && date < endDay;
            if (occupies) nightTaken = true;
        });

        let status = 'available';
        if (!hourly) {
            if (fullClosure || closedHours.length) status = 'closed';
            else if (nightTaken) status = 'booked';
        } else if (fullClosure || coversWholeDay(closedHours)) {
            status = 'closed';
        } else if (coversWholeDay(bookedHours)) {
            status = 'booked';
        } else if (closedHours.length || bookedHours.length) {
            status = 'partial';
        }

        return {
            date,
            status,
            available: status === 'available' || status === 'partial',
            closedHours,
            bookedHours,
        };
    });

    return { from: fromDay, to: toDay, days };
};

module.exports = {
    formatBlock,
    parseBlock,
    assertBlockStillOpen,
    assertBlockRoom,
    listUpcomingBlocks,
    listManagedBlocks,
    findOverlappingClosure,
    roomsClosedForStay,
    resolveCalendarWindow,
    buildCalendar,
};
