const { normalizeTime } = require('./quote');

const CAIRO = 'Africa/Cairo';
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const MONTH_ONLY = /^\d{4}-(?:0[1-9]|1[0-2])$/;

const text = (value) => (value === undefined || value === null ? '' : String(value).trim());

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

const addDays = (day, count) => {
    const [year, month, date] = day.split('-').map(Number);
    const shifted = new Date(Date.UTC(year, month - 1, date + count));
    const y = shifted.getUTCFullYear();
    const m = String(shifted.getUTCMonth() + 1).padStart(2, '0');
    const d = String(shifted.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

const dayBounds = (day) => ({
    start: zonedDate(day, '00:00'),
    end: zonedDate(addDays(day, 1), '00:00'),
});

const monthBounds = (month) => {
    const [year, monthNumber] = month.split('-').map(Number);
    const startDay = `${month}-01`;
    const nextMonth = monthNumber === 12
        ? `${year + 1}-01-01`
        : `${year}-${String(monthNumber + 1).padStart(2, '0')}-01`;

    return {
        startDay,
        endDay: addDays(nextMonth, -1),
        start: zonedDate(startDay, '00:00'),
        end: zonedDate(nextMonth, '00:00'),
    };
};

const eachDay = (fromDay, toDay) => {
    const days = [];
    let cursor = fromDay;
    while (cursor <= toDay && days.length < 370) {
        days.push(cursor);
        cursor = addDays(cursor, 1);
    }
    return days;
};

module.exports = {
    CAIRO,
    DATE_ONLY,
    MONTH_ONLY,
    text,
    cairoDay,
    zonedDate,
    addDays,
    dayBounds,
    monthBounds,
    eachDay,
};
