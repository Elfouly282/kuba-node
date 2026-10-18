const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Banner = require('../models/bannerModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
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

const formatBanner = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
    return {
        id: (obj._id || obj.id).toString(),
        image: getImageUrl(obj.image),
        advertisementId: (obj.advertisementId?._id || obj.advertisementId || '').toString(),
    };
};

exports.getAll = async (_req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({
                status: 'success',
                results: 0,
                data: { banners: [] },
                dbConnected: false,
            });
        }

        const rawBanners = await Banner.find().sort({ createdAt: -1 });
        const banners = rawBanners.map(formatBanner);

        res.status(200).json({
            status: 'success',
            results: banners.length,
            data: { banners },
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBannerId', 400));
        }

        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return next(new APIError('errors.bannerNotFound', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { banner: formatBanner(banner) },
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
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
        });

        res.status(201).json({
            status: 'success',
            message: req.t ? req.t('messages.bannerCreated') : 'Banner created successfully.',
            data: { banner: formatBanner(banner) },
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
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

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.bannerUpdated') : 'Banner updated successfully.',
            data: { banner: formatBanner(banner) },
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBannerId', 400));
        }

        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return next(new APIError('errors.bannerNotFound', 404));
        }

        deleteImageFile(banner.image);
        await banner.deleteOne();

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.bannerDeleted') : 'Banner deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteImageFile = deleteImageFile;
exports.formatBanner = formatBanner;
