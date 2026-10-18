const mongoose = require('mongoose');
const Advertisement = require('../models/advertisementModel');
const APIError = require('../../../utils/apiError');
const { getImageUrl, getRelativeImagePath } = require('../../../utils/imageUrl');

const formatAdvertisement = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    if (obj.image) obj.image = getImageUrl(obj.image);
    // also transform populated category image if present
    if (obj.category && obj.category.image) {
        obj.category.image = getImageUrl(obj.category.image);
    }
    return obj;
};

// ─── GET ALL ADVERTISEMENTS ───────────────────────────────────────────────────
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

        const advertisements = await Advertisement.find(filter)
            .populate('category', 'name image')
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

// ─── GET ONE ADVERTISEMENT ───────────────────────────────────────────────────
exports.getOne = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id)
            .populate('category', 'name image');

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

// ─── CREATE ADVERTISEMENT ───────────────────────────────────────────────────
exports.create = async (req, res, next) => {
    try {
        const { title, description, type, price, location, category, image } = req.body;

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
            image: image ? getRelativeImagePath(image) : (req.file ? `advertisements/${req.file.filename}` : ''),
        });

        res.status(201).json({
            status: 'success',
            message: req.t ? req.t('messages.advertisementCreated') : 'Advertisement created successfully.',
            data: { advertisement: formatAdvertisement(advertisement) },
        });
    } catch (err) {
        next(err);
    }
};

// ─── UPDATE ADVERTISEMENT ───────────────────────────────────────────────────
exports.update = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        const allowedFields = ['title', 'description', 'type', 'price', 'location', 'category', 'active'];
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                advertisement[field] = field === 'price' ? Number(req.body[field]) : req.body[field];
            }
        });

        if (req.file) {
            advertisement.image = `advertisements/${req.file.filename}`;
        } else if (req.body.image) {
            advertisement.image = getRelativeImagePath(req.body.image.trim());
        }

        await advertisement.save();

        res.status(200).json({
            status: 'success',
            data: { advertisement: formatAdvertisement(advertisement) },
        });
    } catch (err) {
        next(err);
    }
};

// ─── DELETE ADVERTISEMENT ───────────────────────────────────────────────────
exports.remove = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        await advertisement.deleteOne();

        res.status(200).json({
            status: 'success',
            message: 'Advertisement deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};
