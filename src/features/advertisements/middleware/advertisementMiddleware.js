const mongoose = require('mongoose');
const UnitType = require('../../unit-types/models/unitTypeModel');
const UnitTypeAttribute = require('../../unit-types/models/unitTypeAttributeModel');
const Category = require('../../categories/models/categoryModel');
const APIError = require('../../../utils/apiError');

const validateAttributes = async (unitTypeId, rawAttributes = {}) => {
    if (!unitTypeId || !mongoose.Types.ObjectId.isValid(unitTypeId)) {
        return { valid: true, sanitized: rawAttributes || {} };
    }

    const attributeDefs = await UnitTypeAttribute.find({ unitType: unitTypeId, active: true });
    if (!attributeDefs || attributeDefs.length === 0) {
        return { valid: true, sanitized: rawAttributes || {} };
    }

    const sanitized = {};
    const errors = [];

    for (const def of attributeDefs) {
        const key = def.key;
        let value = rawAttributes[key];

        if (def.required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))) {
            errors.push(`Attribute '${def.name || key}' is required.`);
            continue;
        }

        if (value === undefined || value === null || value === '') {
            if (def.defaultValue !== null && def.defaultValue !== undefined) {
                sanitized[key] = def.defaultValue;
            }
            continue;
        }

        switch (def.dataType) {
            case 'number': {
                const numVal = Number(value);
                if (isNaN(numVal)) {
                    errors.push(`Attribute '${def.name || key}' must be a valid number.`);
                } else {
                    if (def.validation?.min !== null && def.validation?.min !== undefined && numVal < def.validation.min) {
                        errors.push(`Attribute '${def.name || key}' cannot be less than ${def.validation.min}.`);
                    }
                    if (def.validation?.max !== null && def.validation?.max !== undefined && numVal > def.validation.max) {
                        errors.push(`Attribute '${def.name || key}' cannot exceed ${def.validation.max}.`);
                    }
                    sanitized[key] = numVal;
                }
                break;
            }

            case 'boolean': {
                sanitized[key] = value === true || value === 'true' || value === 1 || value === '1';
                break;
            }

            case 'single_select': {
                const strVal = String(value).trim();
                if (def.options && def.options.length > 0 && !def.options.includes(strVal)) {
                    errors.push(`Invalid option '${strVal}' for attribute '${def.name || key}'. Allowed: ${def.options.join(', ')}`);
                } else {
                    sanitized[key] = strVal;
                }
                break;
            }

            case 'multi_select': {
                let arrVal = [];
                if (Array.isArray(value)) {
                    arrVal = value.map((v) => String(v).trim()).filter(Boolean);
                } else if (typeof value === 'string') {
                    arrVal = value.split(',').map((v) => v.trim()).filter(Boolean);
                }
                if (def.options && def.options.length > 0) {
                    const invalidOpts = arrVal.filter((opt) => !def.options.includes(opt));
                    if (invalidOpts.length > 0) {
                        errors.push(`Invalid options [${invalidOpts.join(', ')}] for '${def.name || key}'.`);
                    }
                }
                sanitized[key] = arrVal;
                break;
            }

            case 'date': {
                const d = new Date(value);
                if (isNaN(d.getTime())) {
                    errors.push(`Attribute '${def.name || key}' must be a valid date.`);
                } else {
                    sanitized[key] = d;
                }
                break;
            }

            case 'string':
            default: {
                sanitized[key] = String(value).trim();
                break;
            }
        }
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return { valid: true, sanitized };
};

const buildPricingData = (body) => {
    let basePrice = 0;
    if (body['pricing.basePrice'] !== undefined) {
        basePrice = Number(body['pricing.basePrice']);
    } else if (body.pricing?.basePrice !== undefined) {
        basePrice = Number(body.pricing.basePrice);
    } else if (body.basePrice !== undefined) {
        basePrice = Number(body.basePrice);
    } else if (body.price !== undefined) {
        basePrice = Number(body.price);
    }

    basePrice = Math.max(0, isNaN(basePrice) ? 0 : basePrice);

    let discountType = body['pricing.discountType'] || body.pricing?.discountType || body.discountType || 'none';
    if (!['none', 'percentage', 'fixed'].includes(discountType)) {
        discountType = 'none';
    }

    let discountValue = 0;
    if (body['pricing.discountValue'] !== undefined) {
        discountValue = Number(body['pricing.discountValue']);
    } else if (body.pricing?.discountValue !== undefined) {
        discountValue = Number(body.pricing.discountValue);
    } else if (body.discountValue !== undefined) {
        discountValue = Number(body.discountValue);
    }
    discountValue = Math.max(0, isNaN(discountValue) ? 0 : discountValue);

    let finalPrice = basePrice;
    if (discountType === 'percentage') {
        const pct = Math.min(100, discountValue);
        finalPrice = Math.max(0, basePrice - (basePrice * pct) / 100);
    } else if (discountType === 'fixed') {
        finalPrice = Math.max(0, basePrice - discountValue);
    }
    finalPrice = Math.round(finalPrice * 100) / 100;

    const pricingUnit = body['pricing.pricingUnit'] || body.pricing?.pricingUnit || body.pricingUnit || 'per_night';
    const currency = body['pricing.currency'] || body.pricing?.currency || body.currency || 'EGP';
    const minDuration = Number(body['pricing.minDuration'] || body.pricing?.minDuration || body.minDuration || 1);

    const offerStartDate = body['pricing.offerStartDate'] || body.pricing?.offerStartDate || body.offerStartDate || null;
    const offerEndDate = body['pricing.offerEndDate'] || body.pricing?.offerEndDate || body.offerEndDate || null;

    return {
        basePrice,
        discountType,
        discountValue,
        finalPrice,
        currency,
        pricingUnit,
        offerStartDate: offerStartDate ? new Date(offerStartDate) : null,
        offerEndDate: offerEndDate ? new Date(offerEndDate) : null,
        minDuration: Math.max(1, isNaN(minDuration) ? 1 : minDuration),
    };
};

const validateAdvertisementId = (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }
    next();
};

const validateCreateAdvertisement = async (req, res, next) => {
    try {
        const { title, category, unitType, type, region } = req.body;

        if (!title || !title.trim()) {
            return next(new APIError('validation.titleRequired', 400));
        }

        let validCategory = null;
        if (category) {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return next(new APIError('errors.invalidCategoryId', 400));
            }
            const catExists = await Category.findById(category);
            if (!catExists) {
                return next(new APIError('errors.categoryNotFound', 400));
            }
            validCategory = catExists._id;
        }

        if (region && !mongoose.Types.ObjectId.isValid(region)) {
            return next(new APIError('errors.invalidRegionId', 400));
        }

        let validUnitType = null;
        let resolvedType = type || 'apartment';

        if (unitType && mongoose.Types.ObjectId.isValid(unitType)) {
            const utDoc = await UnitType.findById(unitType);
            if (!utDoc) {
                return next(new APIError('errors.unitTypeNotFound', 400));
            }
            validUnitType = utDoc._id;
            resolvedType = utDoc.slug || resolvedType;
        } else if (type && typeof type === 'string') {
            const utDoc = await UnitType.findOne({ slug: type.toLowerCase() });
            if (utDoc) {
                validUnitType = utDoc._id;
            }
        }

        let rawAttributes = {};
        if (req.body.attributes) {
            if (typeof req.body.attributes === 'string') {
                try {
                    rawAttributes = JSON.parse(req.body.attributes);
                } catch (_) {
                    rawAttributes = {};
                }
            } else if (typeof req.body.attributes === 'object') {
                rawAttributes = req.body.attributes;
            }
        }

        const attrValidation = await validateAttributes(validUnitType, rawAttributes);
        if (!attrValidation.valid) {
            return res.status(400).json({
                status: 'fail',
                message: 'Validation failed for unit attributes',
                errors: attrValidation.errors,
            });
        }

        req.validatedAdData = {
            validCategory,
            validUnitType,
            resolvedType,
            sanitizedAttributes: attrValidation.sanitized,
            pricing: buildPricingData(req.body),
        };

        next();
    } catch (err) {
        next(err);
    }
};

const validateUpdateAdvertisement = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        if (req.body.category && !mongoose.Types.ObjectId.isValid(req.body.category)) {
            return next(new APIError('errors.invalidCategoryId', 400));
        }

        if (req.body.region && !mongoose.Types.ObjectId.isValid(req.body.region)) {
            return next(new APIError('errors.invalidRegionId', 400));
        }

        if (req.body.unitType && !mongoose.Types.ObjectId.isValid(req.body.unitType)) {
            return next(new APIError('errors.invalidUnitTypeId', 400));
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    validateAdvertisementId,
    validateCreateAdvertisement,
    validateUpdateAdvertisement,
    validateAttributes,
    buildPricingData,
};
