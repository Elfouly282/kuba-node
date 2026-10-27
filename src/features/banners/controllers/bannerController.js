const mongoose = require('mongoose');
const Banner = require('../models/bannerModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Region = require('../../regions/models/regionModel');
const City = require('../../cities/models/cityModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const { getImageUrl, getRelativeImagePath, deleteImageFile } = require('../../../utils/imageUrl');

const formatBanner = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
    return {
        id: (obj._id || obj.id).toString(),
        image: getImageUrl(obj.image),
        position: obj.position || 'top',
        advertisementId: (obj.advertisementId?._id || obj.advertisementId || '').toString(),
        city: obj.city
            ? (typeof obj.city === 'object' && obj.city._id
                ? {
                    id: obj.city._id.toString(),
                    name: obj.city.name,
                    image: obj.city.image ? getImageUrl(obj.city.image) : '',
                }
                : obj.city.toString())
            : null,
        region: obj.region
            ? (typeof obj.region === 'object' && obj.region._id
                ? {
                    id: obj.region._id.toString(),
                    name: obj.region.name,
                    image: obj.region.image ? getImageUrl(obj.region.image) : '',
                }
                : obj.region.toString())
            : null,
    };
};

exports.getAll = async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return SuccessResponse.ok(res, {
            results: 0,
            data: { banners: [] },
            dbConnected: false,
        });
    }

    const andConditions = [];

    const cityParam = req.query.city || req.query.cityId;
    if (cityParam && mongoose.Types.ObjectId.isValid(cityParam)) {
        if (req.query.strict === 'true') {
            andConditions.push({ city: cityParam });
        } else {
            andConditions.push({
                $or: [
                    { city: cityParam },
                    { city: null },
                    { city: { $exists: false } },
                ],
            });
        }
    }

    const regionParam = req.query.region || req.query.regionId;
    if (regionParam && mongoose.Types.ObjectId.isValid(regionParam)) {
        if (req.query.strict === 'true') {
            andConditions.push({ region: regionParam });
        } else {
            andConditions.push({
                $or: [
                    { region: regionParam },
                    { region: null },
                    { region: { $exists: false } },
                ],
            });
        }
    }

    if (req.query.position) {
        const pos = req.query.position.toString().toLowerCase().trim();
        if (!['top', 'center', 'bottom'].includes(pos)) {
            return next(new APIError('errors.invalidPosition', 400));
        }
        if (pos === 'top') {
            andConditions.push({
                $or: [
                    { position: 'top' },
                    { position: null },
                    { position: { $exists: false } },
                ],
            });
        } else {
            andConditions.push({ position: pos });
        }
    }

    const filter = andConditions.length > 0 ? { $and: andConditions } : {};

    const rawBanners = await Banner.find(filter)
        .populate('city', 'name image')
        .populate('region', 'name image')
        .sort({ createdAt: -1 });

    const banners = rawBanners.map(formatBanner);

    SuccessResponse.ok(res, {
        results: banners.length,
        data: { banners },
    });
};

exports.getOne = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBannerId', 400));
    }

    const banner = await Banner.findById(req.params.id)
        .populate('city', 'name image')
        .populate('region', 'name image');
    if (!banner) {
        return next(new APIError('errors.bannerNotFound', 404));
    }

    SuccessResponse.ok(res, {
        data: { banner: formatBanner(banner) },
    });
};


exports.create = async (req, res, next) => {
    const advertisementId = req.body.advertisementId ? req.body.advertisementId.toString().trim() : '';

    if (!advertisementId) {
        return next(new APIError('validation.advertisementRequired', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    const adExists = await Advertisement.findById(advertisementId);
    if (!adExists) {
        return next(new APIError('errors.advertisementNotFound', 404));
    }

    let city = null;
    if (req.body.city && req.body.city.toString().trim() !== '') {
        const cId = req.body.city.toString().trim();
        if (!mongoose.Types.ObjectId.isValid(cId)) {
            return next(new APIError('errors.invalidCityId', 400));
        }
        const cityExists = await City.findById(cId);
        if (!cityExists) {
            return next(new APIError('errors.cityNotFound', 404));
        }
        city = cId;
    }

    let region = null;
    if (req.body.region && req.body.region.toString().trim() !== '') {
        const regId = req.body.region.toString().trim();
        if (!mongoose.Types.ObjectId.isValid(regId)) {
            return next(new APIError('errors.invalidRegionId', 400));
        }
        const regExists = await Region.findById(regId);
        if (!regExists) {
            return next(new APIError('errors.regionNotFound', 404));
        }
        region = regId;
        if (!city && regExists.city) {
            city = regExists.city;
        }
    }

    let position = 'top';
    if (req.body.position !== undefined && req.body.position !== null && req.body.position.toString().trim() !== '') {
        const pos = req.body.position.toString().toLowerCase().trim();
        if (!['top', 'center', 'bottom'].includes(pos)) {
            return next(new APIError('errors.invalidPosition', 400));
        }
        position = pos;
    }

    let image = null;
    if (req.file) {
        image = `banners/${req.file.filename}`;
    } else if (req.body.image) {
        image = getRelativeImagePath(req.body.image.trim());
    }

    if (!image) {
        return next(new APIError('errors.imageRequired', 400));
    }

    const banner = await Banner.create({
        image,
        advertisementId,
        position,
        city,
        region,
    });

    const populated = await Banner.findById(banner._id)
        .populate('city', 'name image')
        .populate('region', 'name image');

    SuccessResponse.created(res, {
        message: req.t ? req.t('messages.bannerCreated') : 'Banner created successfully.',
        data: { banner: formatBanner(populated) },
    });
};

exports.update = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBannerId', 400));
    }

    const banner = await Banner.findById(req.params.id);
    if (!banner) {
        return next(new APIError('errors.bannerNotFound', 404));
    }

    if (req.body.advertisementId !== undefined) {
        const newAdId = req.body.advertisementId.toString().trim();
        if (!newAdId) {
            return next(new APIError('validation.advertisementRequired', 400));
        }

        if (!mongoose.Types.ObjectId.isValid(newAdId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const adExists = await Advertisement.findById(newAdId);
        if (!adExists) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        banner.advertisementId = newAdId;
    }

    if (req.body.city !== undefined) {
        const newCity = req.body.city ? req.body.city.toString().trim() : '';
        if (newCity && newCity !== 'null' && newCity !== '') {
            if (!mongoose.Types.ObjectId.isValid(newCity)) {
                return next(new APIError('errors.invalidCityId', 400));
            }
            const cityExists = await City.findById(newCity);
            if (!cityExists) {
                return next(new APIError('errors.cityNotFound', 404));
            }
            banner.city = newCity;
        } else {
            banner.city = null;
        }
    }

    if (req.body.region !== undefined) {
        const newRegion = req.body.region ? req.body.region.toString().trim() : '';
        if (newRegion && newRegion !== 'null' && newRegion !== '') {
            if (!mongoose.Types.ObjectId.isValid(newRegion)) {
                return next(new APIError('errors.invalidRegionId', 400));
            }
            const regExists = await Region.findById(newRegion);
            if (!regExists) {
                return next(new APIError('errors.regionNotFound', 404));
            }
            banner.region = newRegion;
            if (!banner.city && regExists.city) {
                banner.city = regExists.city;
            }
        } else {
            banner.region = null;
        }
    }

    if (req.body.position !== undefined) {
        const pos = req.body.position ? req.body.position.toString().toLowerCase().trim() : '';
        if (!['top', 'center', 'bottom'].includes(pos)) {
            return next(new APIError('errors.invalidPosition', 400));
        }
        banner.position = pos;
    }

    if (req.file) {
        deleteImageFile(banner.image);
        banner.image = `banners/${req.file.filename}`;
    } else if (req.body.image !== undefined && req.body.image.trim() !== '') {
        const newRelative = getRelativeImagePath(req.body.image.trim());
        if (banner.image !== newRelative) {
            deleteImageFile(banner.image);
            banner.image = newRelative;
        }
    }

    await banner.save();

    const populated = await Banner.findById(banner._id)
        .populate('city', 'name image')
        .populate('region', 'name image');

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.bannerUpdated') : 'Banner updated successfully.',
        data: { banner: formatBanner(populated) },
    });
};

exports.remove = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBannerId', 400));
    }

    const banner = await Banner.findById(req.params.id);
    if (!banner) {
        return next(new APIError('errors.bannerNotFound', 404));
    }

    deleteImageFile(banner.image);
    await banner.deleteOne();

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.bannerDeleted') : 'Banner deleted successfully.',
    });
};

exports.deleteImageFile = deleteImageFile;
exports.formatBanner = formatBanner;
