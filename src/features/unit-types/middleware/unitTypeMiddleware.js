const mongoose = require('mongoose');
const APIError = require('../../../utils/apiError');

/**
 * Validates unit type ID or slug parameter.
 */
const validateUnitTypeId = (req, _res, next) => {
    const { id } = req.params;
    if (!id || (!mongoose.Types.ObjectId.isValid(id) && typeof id !== 'string')) {
        return next(new APIError('errors.invalidUnitTypeId', 400));
    }
    next();
};

/**
 * Validates attribute ID parameter.
 */
const validateAttributeId = (req, _res, next) => {
    const { attrId } = req.params;
    if (!attrId || !mongoose.Types.ObjectId.isValid(attrId)) {
        return next(new APIError('errors.invalidAttributeId', 400));
    }
    next();
};

/**
 * Validates payload for creating a unit type.
 */
const validateCreateUnitType = (req, _res, next) => {
    const name = req.body.name ? req.body.name.trim() : '';
    if (!name) {
        return next(new APIError('validation.nameRequired', 400));
    }
    req.body.name = name;
    next();
};

/**
 * Validates payload for updating a unit type.
 */
const validateUpdateUnitType = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidUnitTypeId', 400));
    }
    if (req.body.name !== undefined) {
        const trimmed = req.body.name.trim();
        if (!trimmed) {
            return next(new APIError('validation.nameRequired', 400));
        }
        req.body.name = trimmed;
    }
    next();
};

/**
 * Validates payload for creating a unit type attribute.
 */
const validateCreateAttribute = (req, _res, next) => {
    const unitTypeId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(unitTypeId)) {
        return next(new APIError('errors.invalidUnitTypeId', 400));
    }

    const { name, key } = req.body;
    if (!name || !name.trim()) {
        return next(new APIError('validation.nameRequired', 400));
    }

    const safeKey = (key || name)
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '_')
        .replace(/^_|_$/g, '');

    if (!safeKey) {
        return next(new APIError('validation.keyRequired', 400));
    }

    req.safeAttributeKey = safeKey;
    next();
};

module.exports = {
    validateUnitTypeId,
    validateAttributeId,
    validateCreateUnitType,
    validateUpdateUnitType,
    validateCreateAttribute,
};
