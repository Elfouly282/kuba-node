const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Advertisement = require('../models/advertisementModel');
const APIError = require('../../../utils/apiError');
const { getUploadsRoot } = require('../../../config/uploadsPath');
const { getImageUrl, getRelativeImagePath } = require('../../../utils/imageUrl');

const deleteImageFile = (imagePath) => {
    if (!imagePath || imagePath.startsWith('http://') || imagePath.startsWith('https://')) return;
    const absPath = path.join(getUploadsRoot(), imagePath.replace(/^uploads[\\/]/, ''));
    try {
        if (fs.existsSync(absPath)) {
            fs.unlinkSync(absPath);
        }
    } catch (_) { }
};

const formatAdvertisement = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    if (obj.image) obj.image = getImageUrl(obj.image);
    if (obj.category && typeof obj.category === 'object' && obj.category.image) {
        obj.category.image = getImageUrl(obj.category.image);
    }
    if (obj.region && typeof obj.region === 'object' && obj.region.image) {
        obj.region.image = getImageUrl(obj.region.image);
    }
    return obj;
};

exports.getAll = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({
                status: 'success',
                results: 0,
                data: { advertisements: [] },
                dbConnected: false,
            });
        }

        const filter = {};
        if (req.query.type) filter.type = req.query.type;
        if (req.query.category && mongoose.Types.ObjectId.isValid(req.query.category)) {
            filter.category = req.query.category;
        }

        const regionParam = req.query.region || req.query.regionId;
        if (regionParam && mongoose.Types.ObjectId.isValid(regionParam)) {
            filter.region = regionParam;
        }

        if (req.query.active !== undefined) {
            filter.active = req.query.active === 'true';
        }

        if (req.query.search) {
            const regex = new RegExp(req.query.search.trim(), 'i');
            filter.$or = [
                { title: regex },
                { description: regex },
                { location: regex },
            ];
        }

        const advertisements = await Advertisement.find(filter)
            .populate('category', 'name image')
            .populate('region', 'name image')
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: advertisements.length,
            data: { advertisements: advertisements.map(formatAdvertisement) },
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id)
            .populate('category', 'name image')
            .populate('region', 'name image');

        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { advertisement: formatAdvertisement(advertisement) },
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { title, description, type, price, location, category, region, image } = req.body;

        if (!title || !title.trim()) {
            return next(new APIError('validation.titleRequired', 400));
        }

        const advertisement = await Advertisement.create({
            title: title.trim(),
            description: description ? description.trim() : '',
            type: type || 'apartment',
            price: price ? Number(price) : 0,
            location: location ? location.trim() : '',
            category: category && mongoose.Types.ObjectId.isValid(category) ? category : null,
            region: region && mongoose.Types.ObjectId.isValid(region) ? region : null,
            image: image ? getRelativeImagePath(image) : (req.file ? `advertisements/${req.file.filename}` : ''),
        });

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('region', 'name image');

        res.status(201).json({
            status: 'success',
            message: req.t ? req.t('messages.advertisementCreated') : 'Advertisement created successfully.',
            data: { advertisement: formatAdvertisement(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        const allowedFields = ['title', 'description', 'type', 'price', 'location', 'category', 'region', 'active'];
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                if (field === 'price') {
                    advertisement[field] = Number(req.body[field]);
                } else if (field === 'category') {
                    advertisement.category = mongoose.Types.ObjectId.isValid(req.body.category) ? req.body.category : null;
                } else if (field === 'region') {
                    advertisement.region = mongoose.Types.ObjectId.isValid(req.body.region) ? req.body.region : null;
                } else if (field === 'active') {
                    advertisement.active = String(req.body.active) === 'true';
                } else {
                    advertisement[field] = req.body[field];
                }
            }
        });

        if (req.file) {
            deleteImageFile(advertisement.image);
            advertisement.image = `advertisements/${req.file.filename}`;
        } else if (req.body.image !== undefined && req.body.image.trim() !== '') {
            const newRelative = getRelativeImagePath(req.body.image.trim());
            if (advertisement.image !== newRelative) {
                deleteImageFile(advertisement.image);
                advertisement.image = newRelative;
            }
        }

        await advertisement.save();

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('region', 'name image');

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.advertisementUpdated') : 'Advertisement updated successfully.',
            data: { advertisement: formatAdvertisement(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        deleteImageFile(advertisement.image);
        await advertisement.deleteOne();

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.advertisementDeleted') : 'Advertisement deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteImageFile = deleteImageFile;
exports.formatAdvertisement = formatAdvertisement;
