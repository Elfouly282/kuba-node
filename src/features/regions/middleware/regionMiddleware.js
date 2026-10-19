const mongoose = require('mongoose');
const APIError = require('../../../utils/apiError');

/**
 * Validates MongoDB ObjectId in route params.
 */
const validateRegionId = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidRegionId', 400));
    }
    next();
};

/**
 * Validates region identifier in params or query for region data retrieval.
 */
const validateRegionDataRequest = (req, _res, next) => {
    const regionId = req.params.id || req.query.regionId;
    if (!regionId || !mongoose.Types.ObjectId.isValid(regionId)) {
        return next(new APIError('errors.invalidRegionId', 400));
    }
    req.regionId = regionId;
    next();
};

/**
 * Validates payload for creating a region.
 */
const validateCreateRegion = (req, _res, next) => {
    const name = req.body.name ? req.body.name.trim() : '';
    if (!name) {
        return next(new APIError('validation.nameRequired', 400));
    }
    req.body.name = name;
    next();
};

/**
 * Validates payload for updating a region.
 */
const validateUpdateRegion = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidRegionId', 400));
    }

    if (req.body.name !== undefined) {
        const trimmedName = req.body.name.trim();
        if (!trimmedName) {
            return next(new APIError('validation.nameRequired', 400));
        }
        req.body.name = trimmedName;
    }

    next();
};

module.exports = {
    validateRegionId,
    validateRegionDataRequest,
    validateCreateRegion,
    validateUpdateRegion,
};
