const mongoose = require('mongoose');
const APIError = require('../../../utils/apiError');

const extractAdvertisementId = (req) => {
    return (
        req.params.advertisementId ||
        req.params.id ||
        (req.body && (req.body.advertisementId || req.body.advertisement)) ||
        (req.query && (req.query.advertisementId || req.query.advertisement))
    );
};

const validateWishlistInput = (req, _res, next) => {
    const advertisementId = extractAdvertisementId(req);

    if (!advertisementId) {
        return next(new APIError('validation.advertisementRequired', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    req.advertisementId = advertisementId.toString();
    next();
};

const validateAdvertisementParam = (req, _res, next) => {
    const advertisementId = req.params.advertisementId || req.params.id;

    if (!advertisementId) {
        return next(new APIError('validation.advertisementRequired', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    req.advertisementId = advertisementId.toString();
    next();
};

module.exports = {
    extractAdvertisementId,
    validateWishlistInput,
    validateAdvertisementParam,
};
