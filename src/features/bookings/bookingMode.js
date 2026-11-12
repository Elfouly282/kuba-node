const MODE_BY_UNIT = {
    per_hour: 'hourly',
    per_night: 'stay',
    per_day: 'stay',
    per_trip: 'trip',
    fixed: 'trip',
};

/**
 * Tells the app which booking screen to open.
 * stay    → check-in / check-out dates (hotel, room, chalet, apartment, or a daily rental)
 * hourly  → one calendar day, plus a start time and an end time on that same day
 *           (yacht or golf car priced per hour). sameDay is true: tomorrow 17:00–19:00
 *           is a valid booking, the start day and the end day are the same day.
 * trip    → one booking with no duration picker
 * requiresRoom is true when the advertisement has bookable rooms:
 * pick a room from the available-rooms search, then use the same stay screen.
 */
const resolveBooking = (source, { requiresRoom = false } = {}) => {
    const pricing = source?.pricing && typeof source.pricing === 'object' ? source.pricing : {};
    const pricingUnit = pricing.pricingUnit || 'per_night';
    const minDuration = Number(pricing.minDuration);
    const mode = MODE_BY_UNIT[pricingUnit] || 'stay';

    return {
        mode,
        requiresRoom: Boolean(requiresRoom),
        pricingUnit,
        minDuration: Number.isFinite(minDuration) && minDuration >= 1 ? minDuration : 1,
        sameDay: mode === 'hourly',
    };
};

module.exports = { resolveBooking, MODE_BY_UNIT };
