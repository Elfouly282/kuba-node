const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const City = require('../models/cityModel');
const Region = require('../../regions/models/regionModel');
const Banner = require('../../banners/models/bannerModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Category = require('../../categories/models/categoryModel');
const APIError = require('../../../utils/apiError');
const { getUploadsRoot } = require('../../../config/uploadsPath');
const { getImageUrl, getRelativeImagePath } = require('../../../utils/imageUrl');
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

const syncAdvertisementsInCityZone = async (cityDoc) => {
    if (!cityDoc || !Array.isArray(cityDoc.points) || cityDoc.points.length < 3) return 0;
    const bbox = getPolygonBoundingBox(cityDoc.points);
    if (!bbox) return 0;

    const candidateAds = await Advertisement.find({
        latitude: { $gte: bbox.minLat, $lte: bbox.maxLat },
        longitude: { $gte: bbox.minLng, $lte: bbox.maxLng },
    });

    const matchingAdIds = [];
    for (const ad of candidateAds) {
        if (isPointInPolygon({ latitude: ad.latitude, longitude: ad.longitude }, cityDoc.points)) {
            matchingAdIds.push(ad._id);
        }
    }

    if (matchingAdIds.length > 0) {
        await Advertisement.updateMany(
            { _id: { $in: matchingAdIds } },
            { $set: { city: cityDoc._id } }
        );
    }
    return matchingAdIds.length;
};

const formatCity = (doc, regionsCount = 0) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    if (obj.image) obj.image = getImageUrl(obj.image);
    obj.points = Array.isArray(obj.points) ? obj.points : [];
    obj.color = obj.color || '#2D4F2E';
    obj.regionsCount = regionsCount !== undefined ? regionsCount : (Array.isArray(obj.regions) ? obj.regions.length : 0);
    return obj;
};

const formatRegion = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    if (obj.image) obj.image = getImageUrl(obj.image);
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
        city: obj.city ? (obj.city._id || obj.city).toString() : null,
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
    if (obj.city && obj.city.image) {
        obj.city.image = getImageUrl(obj.city.image);
    }
    if (obj.region && obj.region.image) {
        obj.region.image = getImageUrl(obj.region.image);
    }
    return obj;
};

const deleteImageFile = (imagePath) => {
    if (!imagePath || imagePath.startsWith('http://') || imagePath.startsWith('https://')) return;
    const absPath = path.join(getUploadsRoot(), imagePath.replace(/^uploads[\\/]/, ''));
    try {
        if (fs.existsSync(absPath)) {
            fs.unlinkSync(absPath);
        }
    } catch (_) { }
};

exports.getAll = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({
                status: 'success',
                results: 0,
                data: { cities: [] },
                dbConnected: false,
            });
        }

        const filter = {};
        if (req.query.active !== undefined) {
            filter.active = req.query.active === 'true';
        }

        const rawCities = await City.find(filter).sort({ order: 1, createdAt: -1 });

        // Aggregate region count per city
        const regionCounts = await Region.aggregate([
            { $group: { _id: '$city', count: { $sum: 1 } } },
        ]);
        const countsMap = {};
        regionCounts.forEach((r) => {
            if (r._id) countsMap[r._id.toString()] = r.count;
        });

        const cities = rawCities.map((c) => formatCity(c, countsMap[c._id.toString()] || 0));

        res.status(200).json({
            status: 'success',
            results: cities.length,
            data: { cities },
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidCityId', 400));
        }

        const city = await City.findById(req.params.id);
        if (!city) {
            return next(new APIError('errors.cityNotFound', 404));
        }

        const regions = await Region.find({ city: city._id }).sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            status: 'success',
            data: {
                city: formatCity(city, regions.length),
                regions: regions.map(formatRegion),
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getCityRegions = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidCityId', 400));
        }

        const city = await City.findById(req.params.id);
        if (!city) {
            return next(new APIError('errors.cityNotFound', 404));
        }

        const filter = { city: city._id };
        if (req.query.active !== undefined) {
            filter.active = req.query.active === 'true';
        }

        const regions = await Region.find(filter).sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: regions.length,
            data: {
                city: formatCity(city, regions.length),
                regions: regions.map(formatRegion),
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getCityData = async (req, res, next) => {
    try {
        const cityId = req.params.id || req.query.cityId || req.query.id;
        if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) {
            return next(new APIError('errors.invalidCityId', 400));
        }

        const city = await City.findById(cityId);
        if (!city) {
            return next(new APIError('errors.cityNotFound', 404));
        }

        const regions = await Region.find({ city: cityId, active: true }).sort({ order: 1 });

        const bannerConditions = [
            { $or: [{ city: cityId }, { city: null }, { city: { $exists: false } }] },
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

        let adFilter = {
            active: true,
            $or: [{ city: cityId }, { region: { $in: regions.map((r) => r._id) } }],
        };

        if (city.points && city.points.length >= 3) {
            const bbox = getPolygonBoundingBox(city.points);
            if (bbox) {
                const geoCandidates = await Advertisement.find({
                    active: true,
                    latitude: { $gte: bbox.minLat, $lte: bbox.maxLat },
                    longitude: { $gte: bbox.minLng, $lte: bbox.maxLng },
                }).select('_id latitude longitude');
                const matchedIds = geoCandidates
                    .filter((a) => isPointInPolygon({ latitude: a.latitude, longitude: a.longitude }, city.points))
                    .map((a) => a._id);
                if (matchedIds.length > 0) {
                    adFilter = {
                        active: true,
                        $or: [
                            { city: cityId },
                            { region: { $in: regions.map((r) => r._id) } },
                            { _id: { $in: matchedIds } },
                        ],
                    };
                }
            }
        }

        const rawChalets = await Advertisement.find({
            ...adFilter,
            type: 'chalet',
        })
            .populate('category', 'name image')
            .populate('city', 'name image')
            .populate('region', 'name image')
            .sort({ createdAt: -1 });

        const rawAdvertisements = await Advertisement.find(adFilter)
            .populate('category', 'name image')
            .populate('city', 'name image')
            .populate('region', 'name image')
            .sort({ createdAt: -1 });

        const rawCategories = await Category.find().sort({ createdAt: -1 });

        const formattedCity = formatCity(city, regions.length);

        res.status(200).json({
            status: 'success',
            data: {
                city: formattedCity,
                region: formattedCity, // Backward compatibility for legacy clients expecting data.region
                regions: regions.map(formatRegion),
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
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
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

        const city = new City({
            name,
            image,
            active,
            order,
            points,
            color,
        });
        await city.save();

        if (points.length >= 3) {
            await syncAdvertisementsInCityZone(city);
        }

        res.status(201).json({
            status: 'success',
            message: req.t ? req.t('messages.cityCreated') : 'City created successfully.',
            data: { city: formatCity(city, 0) },
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidCityId', 400));
        }

        const city = await City.findById(req.params.id);
        if (!city) {
            return next(new APIError('errors.cityNotFound', 404));
        }

        if (req.body.name !== undefined) {
            const trimmedName = req.body.name.trim();
            if (!trimmedName) {
                return next(new APIError('validation.nameRequired', 400));
            }
            city.name = trimmedName;
        }

        if (req.body.active !== undefined) {
            city.active = String(req.body.active) === 'true';
        }

        if (req.body.order !== undefined) {
            city.order = Number(req.body.order);
        }

        if (req.body.color !== undefined) {
            city.color = req.body.color.trim() || '#2D4F2E';
        }

        if (req.body.points !== undefined) {
            city.points = parsePoints(req.body.points);
        }

        if (req.file) {
            deleteImageFile(city.image);
            city.image = `regions/${req.file.filename}`;
        } else if (req.body.image !== undefined) {
            const trimmedImage = req.body.image.trim();
            if (trimmedImage !== city.image) {
                deleteImageFile(city.image);
                city.image = getRelativeImagePath(trimmedImage);
            }
        }

        await city.save();

        if (city.points && city.points.length >= 3) {
            await syncAdvertisementsInCityZone(city);
        }

        const regionsCount = await Region.countDocuments({ city: city._id });

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.cityUpdated') : 'City updated successfully.',
            data: { city: formatCity(city, regionsCount) },
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidCityId', 400));
        }

        const city = await City.findById(req.params.id);
        if (!city) {
            return next(new APIError('errors.cityNotFound', 404));
        }

        deleteImageFile(city.image);
        await city.deleteOne();

        // Nullify city reference on ads, banners, and regions
        await Advertisement.updateMany({ city: city._id }, { $set: { city: null } });
        await Banner.updateMany({ city: city._id }, { $set: { city: null } });
        await Region.updateMany({ city: city._id }, { $set: { city: null } });

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.cityDeleted') : 'City deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};
