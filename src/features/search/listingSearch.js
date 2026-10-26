const mongoose = require('mongoose');
const Advertisement = require('../advertisements/models/advertisementModel');
const Booking = require('../bookings/models/bookingModel');
const Category = require('../categories/models/categoryModel');
const City = require('../cities/models/cityModel');
const Region = require('../regions/models/regionModel');
const UnitType = require('../unit-types/models/unitTypeModel');
const APIError = require('../../utils/apiError');
const { isPointInPolygon, getPolygonBoundingBox } = require('../../utils/geospatial');

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const CAPACITY_KEYS = ['guests_count', 'max_passengers', 'passengers', 'guests', 'guest_count', 'guestcount', 'capacity'];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parseIdList = (...values) => {
    const ids = [];
    const push = (value) => {
        if (value == null || value === '') return;
        if (Array.isArray(value)) {
            value.forEach(push);
            return;
        }
        String(value).split(',').forEach((part) => {
            const id = part.trim();
            if (id) ids.push(id);
        });
    };
    values.forEach(push);
    return [...new Set(ids)];
};

const firstDefined = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const listingCapacity = (attributes) => {
    if (!attributes || typeof attributes !== 'object') return null;
    const values = [];

    Object.keys(attributes).forEach((key) => {
        const normalized = key.toLowerCase();
        const relevant = CAPACITY_KEYS.includes(normalized) || /guest|passenger|capacity/.test(normalized);
        if (!relevant) return;

        const raw = attributes[key];
        if (typeof raw === 'number' && Number.isFinite(raw)) {
            values.push(raw);
            return;
        }
        if (typeof raw === 'string') {
            const match = raw.match(/(\d+(?:\.\d+)?)/);
            if (match) values.push(Number(match[1]));
        }
    });

    if (!values.length) return null;
    return Math.max(...values);
};

const stayRequirement = (pricingUnit, duration, windowStart, windowEnd) => {
    const windowMs = new Date(windowEnd).getTime() - new Date(windowStart).getTime();
    const unit = pricingUnit || 'per_night';

    if (unit === 'per_hour') {
        const units = duration == null ? windowMs / HOUR_MS : Number(duration);
        return { units, ms: units * HOUR_MS };
    }

    if (unit === 'per_trip' || unit === 'fixed') {
        if (duration == null) return { units: 1, ms: 1 };
        const units = Number(duration);
        return { units, ms: units * DAY_MS };
    }

    const units = duration == null ? windowMs / DAY_MS : Number(duration);
    return { units, ms: units * DAY_MS };
};

const measureGap = (start, end, pricingUnit) => {
    const ms = new Date(end).getTime() - new Date(start).getTime();
    if (pricingUnit === 'per_hour') return Math.round((ms / HOUR_MS) * 100) / 100;
    const days = ms / DAY_MS;
    if (pricingUnit === 'per_trip' || pricingUnit === 'fixed') {
        return days >= 1 ? Math.round(days * 100) / 100 : 1;
    }
    return Math.round(days * 100) / 100;
};

/**
 * Earliest continuous free gap inside the window that is at least requiredMs long.
 * The returned range is the whole gap, clipped to the window.
 */
const findFreeSlot = (bookings, windowStart, windowEnd, requiredMs) => {
    const startMs = new Date(windowStart).getTime();
    const endMs = new Date(windowEnd).getTime();
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) return null;
    if (!Number.isFinite(requiredMs) || requiredMs <= 0) return null;

    const blocks = (bookings || [])
        .map((booking) => ({
            start: new Date(booking.startDate).getTime(),
            end: new Date(booking.endDate).getTime(),
        }))
        .filter((block) => (
            Number.isFinite(block.start)
            && Number.isFinite(block.end)
            && block.start < endMs
            && block.end > startMs
        ))
        .sort((a, b) => a.start - b.start || a.end - b.end);

    let cursor = startMs;
    const consider = (gapStart, gapEnd) => {
        if (gapEnd - gapStart >= requiredMs) {
            return { start: new Date(gapStart), end: new Date(gapEnd) };
        }
        return null;
    };

    for (const block of blocks) {
        const blockStart = Math.max(block.start, startMs);
        const blockEnd = Math.min(block.end, endMs);
        if (blockStart > cursor) {
            const slot = consider(cursor, blockStart);
            if (slot) return slot;
        }
        if (blockEnd > cursor) cursor = blockEnd;
    }

    return consider(cursor, endMs);
};

const matchAvailability = (ad, bookings, windowStart, windowEnd, duration) => {
    const pricingUnit = ad.pricing?.pricingUnit || 'per_night';
    const minDuration = Number(ad.pricing?.minDuration) || 1;
    const requirement = stayRequirement(pricingUnit, duration, windowStart, windowEnd);
    if (requirement.units + 1e-9 < minDuration) return null;

    const slot = findFreeSlot(bookings, windowStart, windowEnd, requirement.ms);
    if (!slot) return null;

    return {
        available: true,
        startDate: slot.start,
        endDate: slot.end,
        duration: measureGap(slot.start, slot.end, pricingUnit),
        pricingUnit,
        requestedDuration: duration == null ? Math.round(requirement.units * 100) / 100 : duration,
        minDuration,
    };
};

const parsePositiveNumber = (value, integer) => {
    if (value === undefined || value === null || value === '') return undefined;
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return { invalid: true };
    if (integer && !Number.isInteger(num)) return { invalid: true };
    return { value: num };
};

const parseDateValue = (value) => {
    if (value === undefined || value === null || value === '') return undefined;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return { invalid: true };
    return { value: date };
};

const readSearchParams = (query) => {
    const guestsRaw = firstDefined(query.guests, query.guestsCount, query.guestCount);
    const guestsParsed = parsePositiveNumber(guestsRaw, true);
    if (guestsParsed && guestsParsed.invalid) {
        throw new APIError('validation.invalidGuests', 400);
    }

    const durationRaw = firstDefined(query.duration, query.nights, query.hours);
    const durationParsed = parsePositiveNumber(durationRaw, false);
    if (durationParsed && durationParsed.invalid) {
        throw new APIError('validation.invalidDuration', 400);
    }

    const startRaw = firstDefined(query.startDate, query.from, query.availableFrom);
    const endRaw = firstDefined(query.endDate, query.to, query.availableTo);
    const startParsed = parseDateValue(startRaw);
    const endParsed = parseDateValue(endRaw);
    if ((startParsed && startParsed.invalid) || (endParsed && endParsed.invalid)) {
        throw new APIError('validation.invalidDateRange', 400);
    }
    if ((startParsed && !endParsed) || (!startParsed && endParsed)) {
        throw new APIError('validation.datesRequired', 400);
    }
    if (startParsed && endParsed && endParsed.value <= startParsed.value) {
        throw new APIError('validation.invalidDateRange', 400);
    }

    const searchText = firstDefined(query.search, query.q);
    const text = searchText ? String(searchText).trim() : '';

    return {
        categories: parseIdList(query.category, query.categories, query.categoryId),
        guests: guestsParsed ? guestsParsed.value : null,
        cities: parseIdList(query.city, query.cities, query.cityId),
        regions: parseIdList(query.region, query.regions, query.regionId),
        startDate: startParsed ? startParsed.value : null,
        endDate: endParsed ? endParsed.value : null,
        duration: durationParsed ? durationParsed.value : null,
        search: text || null,
    };
};

const assertIds = (ids, invalidKey, strict) => {
    if (!strict) return ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
    ids.forEach((id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new APIError(invalidKey, 400);
        }
    });
    return ids;
};

const combineOr = (clauses) => {
    if (!clauses.length) return null;
    if (clauses.length === 1) return clauses[0];
    return { $or: clauses };
};

const placeMatchClause = async (doc, field) => {
    if (doc.points && doc.points.length >= 3) {
        const bbox = getPolygonBoundingBox(doc.points);
        if (bbox) {
            const geoCandidates = await Advertisement.find({
                latitude: { $gte: bbox.minLat, $lte: bbox.maxLat },
                longitude: { $gte: bbox.minLng, $lte: bbox.maxLng },
            }).select('_id latitude longitude');

            const matchedIds = geoCandidates
                .filter((ad) => isPointInPolygon(
                    { latitude: ad.latitude, longitude: ad.longitude },
                    doc.points
                ))
                .map((ad) => ad._id);

            if (matchedIds.length > 0) {
                return { $or: [{ [field]: doc._id }, { _id: { $in: matchedIds } }] };
            }
        }
    }
    return { [field]: doc._id };
};

const resolveCities = async (ids, { strict }) => {
    const validIds = assertIds(ids, 'errors.invalidCityId', strict);
    const clauses = [];

    for (const id of validIds) {
        const city = await City.findById(id);
        if (!city) {
            if (strict) throw new APIError('errors.cityNotFound', 400);
            clauses.push({ city: id });
            continue;
        }
        clauses.push(await placeMatchClause(city, 'city'));
    }

    return combineOr(clauses);
};

const resolveRegions = async (ids, { strict }) => {
    const validIds = assertIds(ids, 'errors.invalidRegionId', strict);
    const clauses = [];

    for (const id of validIds) {
        const region = await Region.findById(id);
        if (region) {
            clauses.push(await placeMatchClause(region, 'region'));
            continue;
        }

        if (!strict) {
            const city = await City.findById(id);
            if (city) {
                clauses.push(await placeMatchClause(city, 'city'));
                continue;
            }
            clauses.push({ region: id });
            continue;
        }

        throw new APIError('errors.regionNotFound', 400);
    }

    return combineOr(clauses);
};

const resolveCategories = async (ids, { strict }) => {
    const validIds = assertIds(ids, 'errors.invalidCategoryId', strict);
    if (!validIds.length) return null;

    if (strict) {
        const found = await Category.countDocuments({ _id: { $in: validIds } });
        if (found !== validIds.length) {
            throw new APIError('errors.categoryNotFound', 400);
        }
    }

    if (validIds.length === 1) return { category: validIds[0] };
    return { category: { $in: validIds } };
};

const buildMongoFilter = async (query, params, options) => {
    const filter = {};
    const andClauses = [];

    if (query.unitType && mongoose.Types.ObjectId.isValid(query.unitType)) {
        filter.unitType = query.unitType;
    } else if (query.type) {
        const matchedUnitType = await UnitType.findOne({ slug: query.type });
        if (matchedUnitType) {
            andClauses.push({ $or: [{ unitType: matchedUnitType._id }, { type: query.type }] });
        } else {
            filter.type = query.type;
        }
    }

    const categoryClause = await resolveCategories(params.categories, options);
    if (categoryClause) andClauses.push(categoryClause);

    const cityClause = await resolveCities(params.cities, options);
    if (cityClause) andClauses.push(cityClause);

    const regionClause = await resolveRegions(params.regions, options);
    if (regionClause) andClauses.push(regionClause);

    if (query.active !== undefined && query.active !== '') {
        filter.active = query.active === true || query.active === 'true';
    } else if (options.defaultPublic) {
        filter.active = { $ne: false };
    }

    if (query.status) {
        filter.status = query.status;
    } else if (options.defaultPublic) {
        filter.status = { $nin: ['draft', 'pending', 'archived'] };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
        filter['pricing.finalPrice'] = {};
        if (query.minPrice !== undefined && query.minPrice !== '' && !Number.isNaN(Number(query.minPrice))) {
            filter['pricing.finalPrice'].$gte = Number(query.minPrice);
        }
        if (query.maxPrice !== undefined && query.maxPrice !== '' && !Number.isNaN(Number(query.maxPrice))) {
            filter['pricing.finalPrice'].$lte = Number(query.maxPrice);
        }
        if (!Object.keys(filter['pricing.finalPrice']).length) {
            delete filter['pricing.finalPrice'];
        }
    }

    if (query.pricingUnit) {
        filter['pricing.pricingUnit'] = query.pricingUnit;
    }

    if (params.duration != null && !params.startDate) {
        andClauses.push({
            $or: [
                { 'pricing.minDuration': { $lte: params.duration } },
                { 'pricing.minDuration': null },
                { 'pricing.minDuration': { $exists: false } },
            ],
        });
    }

    Object.keys(query).forEach((qKey) => {
        if (qKey.startsWith('attr_')) {
            const attrKey = qKey.replace('attr_', '');
            const val = query[qKey];
            filter[`attributes.${attrKey}`] = !Number.isNaN(Number(val)) ? Number(val) : val;
        } else if (qKey.startsWith('attributes.')) {
            const val = query[qKey];
            filter[qKey] = !Number.isNaN(Number(val)) ? Number(val) : val;
        }
    });

    if (params.search) {
        const regex = new RegExp(escapeRegex(params.search), 'i');
        andClauses.push({
            $or: [
                { title: regex },
                { description: regex },
                { location: regex },
                { address: regex },
            ],
        });
    }

    if (andClauses.length === 1) {
        Object.assign(filter, andClauses[0]);
    } else if (andClauses.length > 1) {
        filter.$and = andClauses;
    }

    return filter;
};

const sortSpec = (sort) => {
    if (sort === 'price_asc') return { 'pricing.finalPrice': 1 };
    if (sort === 'price_desc') return { 'pricing.finalPrice': -1 };
    if (sort === 'oldest') return { createdAt: 1 };
    return { createdAt: -1 };
};

const compareAds = (a, b, sort) => {
    const priceA = a.pricing?.finalPrice ?? a.price ?? 0;
    const priceB = b.pricing?.finalPrice ?? b.price ?? 0;
    const timeA = new Date(a.createdAt).getTime() || 0;
    const timeB = new Date(b.createdAt).getTime() || 0;
    if (sort === 'price_asc') return priceA - priceB;
    if (sort === 'price_desc') return priceB - priceA;
    if (sort === 'oldest') return timeA - timeB;
    return timeB - timeA;
};

const populateListing = (query) => query
    .populate('category', 'name image')
    .populate('city', 'name image')
    .populate('region', 'name image')
    .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit');

const readPaging = (query, options) => {
    const defaultLimit = options.defaultLimit || 100;
    let limit = parseInt(query.limit, 10);
    if (!Number.isFinite(limit) || limit < 1) limit = defaultLimit;
    if (options.maxLimit) limit = Math.min(limit, options.maxLimit);

    let page = parseInt(query.page, 10);
    if (!Number.isFinite(page) || page < 1) page = 1;

    return { page, limit, skip: (page - 1) * limit };
};

const appliedFilters = (params) => ({
    categories: params.categories,
    guests: params.guests,
    cities: params.cities,
    regions: params.regions,
    startDate: params.startDate,
    endDate: params.endDate,
    duration: params.duration,
    search: params.search,
});

const searchAdvertisements = async (query, options = {}) => {
    const params = readSearchParams(query || {});
    const filter = await buildMongoFilter(query || {}, params, options);
    const paging = readPaging(query || {}, options);
    const sort = query.sort;
    const needsPost = params.guests != null || Boolean(params.startDate);

    if (!needsPost) {
        const [advertisements, total] = await Promise.all([
            populateListing(Advertisement.find(filter))
                .sort(sortSpec(sort))
                .skip(paging.skip)
                .limit(paging.limit),
            Advertisement.countDocuments(filter),
        ]);

        return {
            advertisements,
            availability: {},
            total,
            page: paging.page,
            limit: paging.limit,
            totalPages: Math.ceil(total / paging.limit) || 1,
            applied: appliedFilters(params),
        };
    }

    const candidates = await populateListing(Advertisement.find(filter)).sort(sortSpec(sort));
    let bookingsByAd = new Map();

    if (params.startDate) {
        const ids = candidates.map((ad) => ad._id);
        const bookings = ids.length
            ? await Booking.find({
                advertisement: { $in: ids },
                status: { $in: ['pending', 'confirmed'] },
                startDate: { $lt: params.endDate },
                endDate: { $gt: params.startDate },
            }).select('advertisement startDate endDate').lean()
            : [];

        bookingsByAd = bookings.reduce((map, booking) => {
            const key = String(booking.advertisement);
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(booking);
            return map;
        }, new Map());
    }

    const availability = {};
    const matched = candidates.filter((ad) => {
        if (params.guests != null) {
            const capacity = listingCapacity(ad.attributes);
            if (capacity == null || capacity < params.guests) return false;
        }

        if (params.startDate) {
            const slot = matchAvailability(
                ad,
                bookingsByAd.get(String(ad._id)) || [],
                params.startDate,
                params.endDate,
                params.duration
            );
            if (!slot) return false;
            availability[String(ad._id)] = slot;
        }

        return true;
    });

    matched.sort((a, b) => compareAds(a, b, sort));
    const total = matched.length;
    const advertisements = matched.slice(paging.skip, paging.skip + paging.limit);

    return {
        advertisements,
        availability,
        total,
        page: paging.page,
        limit: paging.limit,
        totalPages: Math.ceil(total / paging.limit) || 1,
        applied: appliedFilters(params),
    };
};

module.exports = {
    searchAdvertisements,
    listingCapacity,
    stayRequirement,
    findFreeSlot,
    measureGap,
    matchAvailability,
};
