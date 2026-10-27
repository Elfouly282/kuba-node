const mongoose = require('mongoose');
const Region = require('../models/regionModel');
const City = require('../../cities/models/cityModel');
const Banner = require('../../banners/models/bannerModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Category = require('../../categories/models/categoryModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const { getImageUrl, getRelativeImagePath, deleteImageFile } = require('../../../utils/imageUrl');
const { isPointInPolygon, getPolygonBoundingBox } = require('../../../utils/geospatial');

const parsePoints = (raw) => {
    if (!raw) return [];
    let arr = raw;
    if (typeof raw === 'string') {
        try {
            arr = JSON.parse(raw);
        } catch (_) {
            return [];
        }
    }
    if (!Array.isArray(arr)) return [];
    return arr
        .map((p) => {
            const lat = p.latitude !== undefined ? Number(p.latitude) : Number(p.lat || p[0]);
            const lng = p.longitude !== undefined ? Number(p.longitude) : Number(p.lng || p[1]);
            if (!isNaN(lat) && !isNaN(lng)) {
                return { latitude: Number(lat.toFixed(6)), longitude: Number(lng.toFixed(6)) };
            }
            return null;
        })
        .filter(Boolean);
};

const syncAdvertisementsInZone = async (regionDoc) => {
    if (!regionDoc || !Array.isArray(regionDoc.points) || regionDoc.points.length < 3) return 0;
    const bbox = getPolygonBoundingBox(regionDoc.points);
    if (!bbox) return 0;

    const candidateAds = await Advertisement.find({
        latitude: { $gte: bbox.minLat, $lte: bbox.maxLat },
        longitude: { $gte: bbox.minLng, $lte: bbox.maxLng },
    });

    const matchingAdIds = [];
    for (const ad of candidateAds) {
        if (isPointInPolygon({ latitude: ad.latitude, longitude: ad.longitude }, regionDoc.points)) {
            matchingAdIds.push(ad._id);
        }
    }

    if (matchingAdIds.length > 0) {
        await Advertisement.updateMany(
            { _id: { $in: matchingAdIds } },
            { $set: { region: regionDoc._id } }
        );
    }
    return matchingAdIds.length;
};

const formatRegion = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    if (obj.image) obj.image = getImageUrl(obj.image);
    if (obj.city && typeof obj.city === 'object') {
        if (obj.city.image) obj.city.image = getImageUrl(obj.city.image);
    }
    obj.points = Array.isArray(obj.points) ? obj.points : [];
    obj.color = obj.color || '#2D4F2E';
    return obj;
};

const formatBanner = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
    return {
        id: (obj._id || obj.id).toString(),
        image: getImageUrl(obj.image),
        position: obj.position || 'top',
        advertisementId: (obj.advertisementId?._id || obj.advertisementId || '').toString(),
        region: obj.region ? (obj.region._id || obj.region).toString() : null,
    };
};

const formatAdvertisement = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    if (obj.image) obj.image = getImageUrl(obj.image);
    if (obj.category && obj.category.image) {
        obj.category.image = getImageUrl(obj.category.image);
    }
    if (obj.region && obj.region.image) {
        obj.region.image = getImageUrl(obj.region.image);
    }
    return obj;
};

exports.getAll = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return SuccessResponse.ok(res, {
            results: 0,
            data: { regions: [] },
            dbConnected: false,
        });
    }

    const filter = {};
    if (req.query.active !== undefined) {
        filter.active = req.query.active === 'true';
    }
    const cityParam = req.query.city || req.query.cityId;
    if (cityParam && mongoose.Types.ObjectId.isValid(cityParam)) {
        filter.city = cityParam;
    }

    const rawRegions = await Region.find(filter)
        .populate('city', 'name image color')
        .sort({ order: 1, createdAt: -1 });
    const regions = rawRegions.map(formatRegion);

    SuccessResponse.ok(res, {
        results: regions.length,
        data: { regions },
    });
};

exports.getOne = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidRegionId', 400));
    }

    const region = await Region.findById(req.params.id).populate('city', 'name image color');
    if (!region) {
        return next(new APIError('errors.regionNotFound', 404));
    }

    SuccessResponse.ok(res, {
        data: { region: formatRegion(region) },
    });
};

exports.getRegionData = async (req, res, next) => {
    const regionId = req.params.id || req.query.regionId;
    if (!regionId || !mongoose.Types.ObjectId.isValid(regionId)) {
        return next(new APIError('errors.invalidRegionId', 400));
    }

    let region = await Region.findById(regionId);
    if (!region) {
        const cityDoc = await City.findById(regionId);
        if (cityDoc) {
            const cityController = require('../../cities/controllers/cityController');
            return cityController.getCityData(req, res, next);
        }
        return next(new APIError('errors.regionNotFound', 404));
    }

    const bannerConditions = [
        { $or: [{ region: regionId }, { region: null }, { region: { $exists: false } }] },
    ];

    if (req.query.position) {
        const pos = req.query.position.toString().toLowerCase().trim();
        if (['top', 'center', 'bottom'].includes(pos)) {
            if (pos === 'top') {
                bannerConditions.push({
                    $or: [{ position: 'top' }, { position: null }, { position: { $exists: false } }],
                });
            } else {
                bannerConditions.push({ position: pos });
            }
        }
    }

    const rawBanners = await Banner.find({ $and: bannerConditions }).sort({ createdAt: -1 });

    let adFilter = { region: regionId, active: true };
    if (region.points && region.points.length >= 3) {
        const bbox = getPolygonBoundingBox(region.points);
        if (bbox) {
            const geoCandidates = await Advertisement.find({
                active: true,
                latitude: { $gte: bbox.minLat, $lte: bbox.maxLat },
                longitude: { $gte: bbox.minLng, $lte: bbox.maxLng },
            }).select('_id latitude longitude');
            const matchedIds = geoCandidates
                .filter((a) => isPointInPolygon({ latitude: a.latitude, longitude: a.longitude }, region.points))
                .map((a) => a._id);
            if (matchedIds.length > 0) {
                adFilter = {
                    active: true,
                    $or: [{ region: regionId }, { _id: { $in: matchedIds } }],
                };
            }
        }
    }

    const rawChalets = await Advertisement.find({
        ...adFilter,
        type: 'chalet',
    }).populate('category', 'name image').populate('region', 'name image').sort({ createdAt: -1 });

    const rawAdvertisements = await Advertisement.find(adFilter)
        .populate('category', 'name image')
        .populate('region', 'name image')
        .sort({ createdAt: -1 });

    const rawCategories = await Category.find().sort({ createdAt: -1 });

    SuccessResponse.ok(res, {
        data: {
            region: formatRegion(region),
            banners: rawBanners.map(formatBanner),
            chalets: rawChalets.map(formatAdvertisement),
            advertisements: rawAdvertisements.map(formatAdvertisement),
            categories: rawCategories.map((c) => {
                const obj = c.toJSON();
                obj.image = getImageUrl(obj.image);
                return obj;
            }),
        },
    });
};

exports.create = async (req, res, next) => {
    const name = req.body.name ? req.body.name.trim() : '';
    if (!name) {
        return next(new APIError('validation.nameRequired', 400));
    }

    let image = '';
    if (req.file) {
        image = `regions/${req.file.filename}`;
    } else if (req.body.image) {
        image = getRelativeImagePath(req.body.image.trim());
    }

    const active = req.body.active !== undefined ? String(req.body.active) === 'true' : true;
    const order = req.body.order !== undefined ? Number(req.body.order) : 0;
    const points = parsePoints(req.body.points);
    const color = req.body.color ? req.body.color.trim() : '#2D4F2E';
    const cityParam = req.body.city || req.body.cityId;
    const city = cityParam && mongoose.Types.ObjectId.isValid(cityParam) ? cityParam : null;

    const region = new Region({
        name,
        city,
        image,
        active,
        order,
        points,
        color,
    });
    await region.save();

    if (points.length >= 3) {
        await syncAdvertisementsInZone(region);
    }

    const populated = await Region.findById(region._id).populate('city', 'name image color');

    SuccessResponse.created(res, {
        message: req.t ? req.t('messages.regionCreated') : 'Region created successfully.',
        data: { region: formatRegion(populated || region) },
    });
};

exports.update = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidRegionId', 400));
    }

    const region = await Region.findById(req.params.id);
    if (!region) {
        return next(new APIError('errors.regionNotFound', 404));
    }

    if (req.body.name !== undefined) {
        const trimmedName = req.body.name.trim();
        if (!trimmedName) {
            return next(new APIError('validation.nameRequired', 400));
        }
        region.name = trimmedName;
    }

    if (req.body.active !== undefined) {
        region.active = String(req.body.active) === 'true';
    }

    if (req.body.order !== undefined) {
        region.order = Number(req.body.order);
    }

    if (req.file) {
        deleteImageFile(region.image);
        region.image = `regions/${req.file.filename}`;
    } else if (req.body.image !== undefined && req.body.image.trim() !== '') {
        const newRelative = getRelativeImagePath(req.body.image.trim());
        if (region.image !== newRelative) {
            deleteImageFile(region.image);
            region.image = newRelative;
        }
    }

    if (req.body.city !== undefined) {
        const cityParam = req.body.city || req.body.cityId;
        region.city = cityParam && mongoose.Types.ObjectId.isValid(cityParam) ? cityParam : null;
    }

    if (req.body.points !== undefined) {
        region.points = parsePoints(req.body.points);
        region.markModified('points');
    }

    if (req.body.color !== undefined) {
        region.color = req.body.color.trim();
    }

    await region.save();

    if (region.points && region.points.length >= 3) {
        await syncAdvertisementsInZone(region);
    }

    const populated = await Region.findById(region._id).populate('city', 'name image color');

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.regionUpdated') : 'Region updated successfully.',
        data: { region: formatRegion(populated || region) },
    });
};

exports.remove = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidRegionId', 400));
    }

    const region = await Region.findById(req.params.id);
    if (!region) {
        return next(new APIError('errors.regionNotFound', 404));
    }

    deleteImageFile(region.image);
    await region.deleteOne();

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.regionDeleted') : 'Region deleted successfully.',
    });
};

exports.deleteImageFile = deleteImageFile;
exports.formatRegion = formatRegion;
