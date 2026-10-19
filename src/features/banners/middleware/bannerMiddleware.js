const mongoose = require('mongoose');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Region = require('../../regions/models/regionModel');
const APIError = require('../../../utils/apiError');

/**
 * Validates MongoDB ObjectId in route params.
 */
const validateBannerId = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidBannerId', 400));
    }
    next();
};

/**
 * Validates payload for creating a banner.
 */
const validateCreateBanner = async (req, _res, next) => {
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

        if (req.body.region && req.body.region.toString().trim() !== '') {
            const regId = req.body.region.toString().trim();
            if (!mongoose.Types.ObjectId.isValid(regId)) {
                return next(new APIError('errors.invalidRegionId', 400));
            }
            const regExists = await Region.findById(regId);
            if (!regExists) {
                return next(new APIError('errors.regionNotFound', 404));
            }
        }

        const hasImage = Boolean(req.file || (req.body.image && req.body.image.trim() !== ''));
        if (!hasImage) {
            return next(new APIError('errors.imageRequired', 400));
        }

        next();
    } catch (err) {
        next(err);
    }
};

/**
 * Validates payload for updating a banner.
 */
const validateUpdateBanner = async (req, _res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidBannerId', 400));
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
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    validateBannerId,
    validateCreateBanner,
    validateUpdateBanner,
};
