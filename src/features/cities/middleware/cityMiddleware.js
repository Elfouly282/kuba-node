const mongoose = require('mongoose');
const APIError = require('../../../utils/apiError');

const validateCityId = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidCityId', 400));
    }
    next();
};

const validateCityDataRequest = (req, _res, next) => {
    const cityId = req.params.id || req.query.cityId || req.query.id;
    if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) {
        return next(new APIError('errors.invalidCityId', 400));
    }
    req.cityId = cityId;
    next();
};

const validateCreateCity = (req, _res, next) => {
    const name = req.body.name ? req.body.name.trim() : '';
    if (!name) {
        return next(new APIError('validation.nameRequired', 400));
    }
    req.body.name = name;
    next();
};

const validateUpdateCity = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidCityId', 400));
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
    validateCityId,
    validateCityDataRequest,
    validateCreateCity,
    validateUpdateCity,
};
