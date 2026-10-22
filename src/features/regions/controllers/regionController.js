const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Region = require('../models/regionModel');
const Banner = require('../../banners/models/bannerModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Category = require('../../categories/models/categoryModel');
const APIError = require('../../../utils/apiError');
const { getUploadsRoot } = require('../../../config/uploadsPath');
const { getImageUrl, getRelativeImagePath } = require('../../../utils/imageUrl');

const formatRegion = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    if (obj.image) obj.image = getImageUrl(obj.image);
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
                data: { regions: [] },
                dbConnected: false,
            });
        }

        const filter = {};
        if (req.query.active !== undefined) {
            filter.active = req.query.active === 'true';
        }

        const rawRegions = await Region.find(filter).sort({ order: 1, createdAt: -1 });
        const regions = rawRegions.map(formatRegion);

        res.status(200).json({
            status: 'success',
            results: regions.length,
            data: { regions },
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidRegionId', 400));
        }

        const region = await Region.findById(req.params.id);
        if (!region) {
            return next(new APIError('errors.regionNotFound', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { region: formatRegion(region) },
        });
    } catch (err) {
        next(err);
    }
};

exports.getRegionData = async (req, res, next) => {
    try {
        const regionId = req.params.id || req.query.regionId;
        if (!regionId || !mongoose.Types.ObjectId.isValid(regionId)) {
            return next(new APIError('errors.invalidRegionId', 400));
        }

        const region = await Region.findById(regionId);
        if (!region) {
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

        const rawChalets = await Advertisement.find({
            region: regionId,
            type: 'chalet',
            active: true,
        }).populate('category', 'name image').populate('region', 'name image').sort({ createdAt: -1 });

        const rawAdvertisements = await Advertisement.find({
            region: regionId,
            active: true,
        }).populate('category', 'name image').populate('region', 'name image').sort({ createdAt: -1 });

        const rawCategories = await Category.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
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

        const region = await Region.create({
            name,
            image,
            active,
            order,
        });

        res.status(201).json({
            status: 'success',
            message: req.t ? req.t('messages.regionCreated') : 'Region created successfully.',
            data: { region: formatRegion(region) },
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
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

        await region.save();

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.regionUpdated') : 'Region updated successfully.',
            data: { region: formatRegion(region) },
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidRegionId', 400));
        }

        const region = await Region.findById(req.params.id);
        if (!region) {
            return next(new APIError('errors.regionNotFound', 404));
        }

        deleteImageFile(region.image);
        await region.deleteOne();

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.regionDeleted') : 'Region deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteImageFile = deleteImageFile;
exports.formatRegion = formatRegion;
