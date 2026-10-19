const mongoose = require('mongoose');
const APIError = require('../../../utils/apiError');

/**
 * Validates MongoDB ObjectId in route params.
 */
const validateCategoryId = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidCategoryId', 400));
    }
    next();
};

/**
 * Validates payload for creating a category.
 */
const validateCreateCategory = (req, _res, next) => {
    const name = req.body.name ? req.body.name.trim() : '';
    if (!name) {
        return next(new APIError('validation.nameRequired', 400));
    }

    const hasImage = Boolean(req.file || (req.body.image && req.body.image.trim() !== ''));
    if (!hasImage) {
        return next(new APIError('errors.imageRequired', 400));
    }

    req.body.name = name;
    next();
};

/**
 * Validates payload for updating a category.
 */
const validateUpdateCategory = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidCategoryId', 400));
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
    validateCategoryId,
    validateCreateCategory,
    validateUpdateCategory,
};
