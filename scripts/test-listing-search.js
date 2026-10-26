const {
    listingCapacity,
    stayRequirement,
    findFreeSlot,
    measureGap,
    matchAvailability,
    searchAdvertisements,
} = require('../src/features/search/listingSearch');

let failed = 0;

const assert = (condition, message) => {
    if (!condition) {
        failed += 1;
        console.error('FAIL:', message);
    }
};

const day = (iso) => new Date(`${iso}T00:00:00.000Z`);
const hoursBetween = (start, end) => (end.getTime() - start.getTime()) / (60 * 60 * 1000);

assert(listingCapacity({ guests_count: 6 }) === 6, 'guests_count capacity');
assert(listingCapacity({ max_passengers: 12 }) === 12, 'max_passengers capacity');
assert(listingCapacity({ passengers: '4 ركاب' }) === 4, 'string passenger capacity');
assert(listingCapacity({ guests_count: 2, max_passengers: 10 }) === 10, 'uses the largest capacity');
assert(listingCapacity({ bedrooms: 3, has_pool: true }) === null, 'ignores unrelated attributes');
assert(listingCapacity(null) === null, 'missing attributes have no capacity');

const windowStart = day('2026-11-01');
const windowEnd = day('2026-11-11');
const openSlot = findFreeSlot([], windowStart, windowEnd, 2 * 24 * 60 * 60 * 1000);
assert(openSlot && openSlot.start.getTime() === windowStart.getTime(), 'open window starts at the search start');
assert(openSlot && openSlot.end.getTime() === windowEnd.getTime(), 'open window returns the whole free gap');

const blocked = findFreeSlot([
    { startDate: day('2026-11-01'), endDate: day('2026-11-11') },
], windowStart, windowEnd, 24 * 60 * 60 * 1000);
assert(blocked === null, 'fully booked window is not available');

const afterBooking = findFreeSlot([
    { startDate: day('2026-11-01'), endDate: day('2026-11-04') },
    { startDate: day('2026-11-08'), endDate: day('2026-11-09') },
], windowStart, windowEnd, 2 * 24 * 60 * 60 * 1000);
assert(afterBooking && afterBooking.start.getTime() === day('2026-11-04').getTime(), 'earliest gap starts when the first booking ends');
assert(afterBooking && afterBooking.end.getTime() === day('2026-11-08').getTime(), 'earliest gap ends at the next booking');

const tooShort = findFreeSlot([
    { startDate: day('2026-11-03'), endDate: day('2026-11-09') },
], windowStart, windowEnd, 3 * 24 * 60 * 60 * 1000);
assert(tooShort === null, 'gaps shorter than the requested stay are rejected');

const touching = findFreeSlot([
    { startDate: day('2026-10-20'), endDate: day('2026-11-01') },
    { startDate: day('2026-11-11'), endDate: day('2026-11-20') },
], windowStart, windowEnd, 10 * 24 * 60 * 60 * 1000);
assert(touching && touching.start.getTime() === windowStart.getTime(), 'checkout at window start does not block the stay');

const nights = stayRequirement('per_night', null, windowStart, windowEnd);
assert(nights.units === 10, 'omitted duration means the whole window');
const requested = stayRequirement('per_night', 3, windowStart, windowEnd);
assert(requested.units === 3 && requested.ms === 3 * 24 * 60 * 60 * 1000, 'explicit duration is measured in nights');
const hourly = stayRequirement('per_hour', 5, windowStart, windowEnd);
assert(hourly.units === 5 && hourly.ms === 5 * 60 * 60 * 1000, 'hourly listings measure duration in hours');

const ad = {
    pricing: { pricingUnit: 'per_night', minDuration: 2 },
};
const matched = matchAvailability(ad, [
    { startDate: day('2026-11-02'), endDate: day('2026-11-04') },
], windowStart, windowEnd, 3);
assert(matched && matched.duration === 7, 'available duration is the free gap inside the window');
assert(matched && matched.requestedDuration === 3, 'response keeps the requested duration');

const belowMinimum = matchAvailability(
    { pricing: { pricingUnit: 'per_night', minDuration: 4 } },
    [],
    windowStart,
    windowEnd,
    2
);
assert(belowMinimum === null, 'stay shorter than minDuration is excluded');

assert(measureGap(windowStart, day('2026-11-03'), 'per_night') === 2, 'two calendar days are two nights');
const fiveHoursLater = new Date('2026-11-01T05:00:00.000Z');
assert(hoursBetween(windowStart, fiveHoursLater) === 5, 'hour fixture');
assert(measureGap(windowStart, fiveHoursLater, 'per_hour') === 5, 'hour gap is measured in hours');

const expectError = async (query, key) => {
    try {
        await searchAdvertisements(query, { strict: true, defaultPublic: true });
        assert(false, `expected ${key}`);
    } catch (err) {
        assert(err.key === key, `expected ${key} but got ${err.key || err.message}`);
    }
};

(async () => {
    await expectError({ guests: 'many' }, 'validation.invalidGuests');
    await expectError({ guests: 1.5 }, 'validation.invalidGuests');
    await expectError({ duration: 0 }, 'validation.invalidDuration');
    await expectError({ startDate: '2026-11-01' }, 'validation.datesRequired');
    await expectError({ startDate: '2026-11-10', endDate: '2026-11-01' }, 'validation.invalidDateRange');
    await expectError({ category: 'not-an-id' }, 'errors.invalidCategoryId');
    await expectError({ city: 'not-an-id' }, 'errors.invalidCityId');
    await expectError({ regions: ['not-an-id'] }, 'errors.invalidRegionId');

    if (failed) {
        console.error(`${failed} assertion(s) failed`);
        process.exit(1);
    }
    console.log('listing search checks passed');
    process.exit(0);
})();
