const mongoose = require('mongoose');
const Advertisement = require('../../advertisements/models/advertisementModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const { getImageUrl } = require('../../../utils/imageUrl');

const FLASH_SALE_MAX_IMAGES = 3;
const FLASH_SALE_DEFAULT_LIMIT = 20;
const FLASH_SALE_MAX_LIMIT = 100;

const roundMoney = (value) => Math.round((Number(value) || 0) * 100) / 100;

const pricesOf = (pricing = {}) => {
    const priceBefore = roundMoney(pricing.basePrice);
    let priceAfter = Number(pricing.finalPrice);

    if (!Number.isFinite(priceAfter)) {
        const discountValue = Number(pricing.discountValue) || 0;
        if (pricing.discountType === 'percentage') {
            const pct = Math.min(100, Math.max(0, discountValue));
            priceAfter = priceBefore - (priceBefore * pct) / 100;
        } else if (pricing.discountType === 'fixed') {
            priceAfter = priceBefore - discountValue;
        } else {
            priceAfter = priceBefore;
        }
    }

    priceAfter = roundMoney(Math.max(0, priceAfter));
    const discountPercent = priceBefore > 0
        ? Math.max(0, Math.min(100, Math.round(((priceBefore - priceAfter) / priceBefore) * 100)))
        : 0;

    return { priceBefore, priceAfter, discountPercent };
};

const collectImages = (doc) => {
    const raw = [];
    if (Array.isArray(doc.images)) raw.push(...doc.images);
    if (doc.image) raw.push(doc.image);

    const seen = new Set();
    const images = [];

    raw.forEach((item) => {
        if (!item || seen.has(String(item)) || images.length >= FLASH_SALE_MAX_IMAGES) return;
        seen.add(String(item));
        const url = getImageUrl(item);
        if (!url || images.includes(url)) return;
        images.push(url);
    });

    return images;
};

const refSummary = (value) => {
    if (!value) return null;
    if (typeof value === 'object' && value._id) {
        return { id: value._id.toString(), name: value.name || '' };
    }
    return value.toString();
};

const formatFlashSale = (doc, prices) => ({
    id: doc._id.toString(),
    title: doc.title || '',
    location: doc.location || '',
    images: collectImages(doc),
    discountPercent: prices.discountPercent,
    priceBefore: prices.priceBefore,
    priceAfter: prices.priceAfter,
    currency: doc.pricing?.currency || 'EGP',
    pricingUnit: doc.pricing?.pricingUnit || 'per_night',
    city: refSummary(doc.city),
    region: refSummary(doc.region),
});

const readOptionalId = (value, errorKey) => {
    if (value === undefined || value === null || String(value).trim() === '') return null;
    const id = String(value).trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new APIError(errorKey, 400);
    }
    return id;
};

const readLimit = (value) => {
    if (value === undefined || value === null || String(value).trim() === '') {
        return FLASH_SALE_DEFAULT_LIMIT;
    }
    const limit = parseInt(value, 10);
    if (!Number.isFinite(limit) || limit < 1) {
        throw new APIError('errors.invalidField', 400, { value, path: 'limit' });
    }
    return Math.min(limit, FLASH_SALE_MAX_LIMIT);
};

const collectFlashSales = async ({ city, region, limit, publicOnly }) => {
    const filter = { isFlashSale: true };

    if (publicOnly) {
        filter.active = { $ne: false };
        filter.status = { $nin: ['draft', 'pending', 'archived'] };
    }
    if (city) filter.city = city;
    if (region) filter.region = region;

    const docs = await Advertisement.find(filter)
        .select('title location images image pricing city region active status updatedAt')
        .populate('city', 'name')
        .populate('region', 'name')
        .sort({ updatedAt: -1 });

    const items = docs.map((doc) => formatFlashSale(doc, pricesOf(doc.pricing)));
    const page = Number.isFinite(limit) ? items.slice(0, limit) : items;

    return {
        total: items.length,
        items: page,
    };
};

exports.getFlashSale = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return SuccessResponse.ok(res, {
                results: 0,
                total: 0,
                data: { flashsale: [] },
                dbConnected: false,
            });
        }

        const city = readOptionalId(req.query.city || req.query.cityId, 'errors.invalidCityId');
        const region = readOptionalId(req.query.region || req.query.regionId, 'errors.invalidRegionId');
        const limit = readLimit(req.query.limit);
        const publicOnly = !String(req.baseUrl || '').includes('/admin/');
        const { total, items } = await collectFlashSales({ city, region, limit, publicOnly });

        return SuccessResponse.ok(res, {
            results: items.length,
            total,
            data: { flashsale: items },
        });
    } catch (err) {
        return next(err);
    }
};

exports.countFlashSales = async () => {
    if (mongoose.connection.readyState !== 1) return 0;
    const { total } = await collectFlashSales({
        publicOnly: true,
        limit: null,
    });
    return total;
};
