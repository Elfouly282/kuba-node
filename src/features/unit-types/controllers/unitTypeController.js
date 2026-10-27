const mongoose = require('mongoose');
const { escapeRegExp } = require('lodash');
const UnitType = require('../models/unitTypeModel');
const UnitTypeAttribute = require('../models/unitTypeAttributeModel');
const Category = require('../../categories/models/categoryModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const toKey = require('../../../utils/toKey');

const formatUnitType = (doc) => {
    if (!doc) return null;
    return typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
};

const formatAttribute = (doc) => {
    if (!doc) return null;
    return typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
};

exports.getAll = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return SuccessResponse.ok(res, {
            results: 0,
            data: { unitTypes: [] },
            dbConnected: false,
        });
    }

    const filter = {};
    if (req.query.active !== undefined) {
        filter.active = req.query.active === 'true';
    }

    if (req.query.category && mongoose.Types.ObjectId.isValid(req.query.category)) {
        filter.categories = req.query.category;
    }

    if (req.query.search) {
        const regex = new RegExp(escapeRegExp(req.query.search.trim()), 'i');
        filter.$or = [{ name: regex }, { nameAr: regex }, { slug: regex }, { description: regex }];
    }

    const unitTypes = await UnitType.find(filter)
        .populate('categories', 'name image')
        .sort({ order: 1, createdAt: -1 });

    const unitTypeIds = unitTypes.map(u => u._id);
    const attributeCounts = await UnitTypeAttribute.aggregate([
        { $match: { unitType: { $in: unitTypeIds } } },
        { $group: { _id: '$unitType', count: { $sum: 1 } } },
    ]);
    const countsMap = {};
    attributeCounts.forEach(ac => {
        countsMap[ac._id.toString()] = ac.count;
    });

    const formattedUnitTypes = unitTypes.map(ut => {
        const formatted = formatUnitType(ut);
        formatted.attributesCount = countsMap[ut._id.toString()] || 0;
        return formatted;
    });

    SuccessResponse.ok(res, {
        results: formattedUnitTypes.length,
        data: { unitTypes: formattedUnitTypes },
    });
};

exports.getOne = async (req, res, next) => {
    let unitType = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        unitType = await UnitType.findById(req.params.id).populate('categories', 'name image');
    } else {
        unitType = await UnitType.findOne({ slug: req.params.id }).populate('categories', 'name image');
    }

    if (!unitType) {
        return next(new APIError('errors.unitTypeNotFound', 404));
    }

    const attributes = await UnitTypeAttribute.find({ unitType: unitType._id, active: true }).sort({ order: 1 });

    const result = formatUnitType(unitType);
    result.attributes = attributes.map(formatAttribute);

    SuccessResponse.ok(res, {
        data: { unitType: result },
    });
};

exports.create = async (req, res, next) => {
    const { name, nameAr, slug, description, icon, categories, pricingUnits, defaultPricingUnit, order, active } = req.body;

    if (!name || !name.trim()) {
        return next(new APIError('validation.nameRequired', 400));
    }

    let validCategories = [];
    if (categories && Array.isArray(categories)) {
        for (const catId of categories) {
            if (mongoose.Types.ObjectId.isValid(catId)) {
                const catExists = await Category.findById(catId);
                if (catExists) validCategories.push(catId);
            }
        }
    } else if (typeof categories === 'string' && categories.trim()) {
        if (mongoose.Types.ObjectId.isValid(categories)) {
            validCategories.push(categories);
        }
    }

    const unitType = await UnitType.create({
        name: name.trim(),
        nameAr: nameAr ? nameAr.trim() : '',
        slug: slug ? slug.trim() : undefined,
        description: description ? description.trim() : '',
        icon: icon ? icon.trim() : '',
        categories: validCategories,
        pricingUnits: Array.isArray(pricingUnits) && pricingUnits.length > 0 ? pricingUnits : ['per_night'],
        defaultPricingUnit: defaultPricingUnit || 'per_night',
        order: order !== undefined ? Number(order) : 0,
        active: active !== undefined ? (String(active) === 'true' || active === true) : true,
    });

    const populated = await UnitType.findById(unitType._id).populate('categories', 'name image');

    SuccessResponse.created(res, {
        message: req.t ? req.t('messages.unitTypeCreated') : 'Unit type created successfully.',
        data: { unitType: formatUnitType(populated) },
    });
};

exports.update = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidUnitTypeId', 400));
    }

    const unitType = await UnitType.findById(req.params.id);
    if (!unitType) {
        return next(new APIError('errors.unitTypeNotFound', 404));
    }

    const allowedFields = ['name', 'nameAr', 'slug', 'description', 'icon', 'categories', 'pricingUnits', 'defaultPricingUnit', 'order', 'active'];

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            if (field === 'categories') {
                const cats = Array.isArray(req.body.categories) ? req.body.categories : [req.body.categories];
                unitType.categories = cats.filter((id) => mongoose.Types.ObjectId.isValid(id));
            } else if (field === 'active') {
                unitType.active = String(req.body.active) === 'true' || req.body.active === true;
            } else if (field === 'order') {
                unitType.order = Number(req.body.order);
            } else {
                unitType[field] = req.body[field];
            }
        }
    }

    await unitType.save();

    const populated = await UnitType.findById(unitType._id).populate('categories', 'name image');

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.unitTypeUpdated') : 'Unit type updated successfully.',
        data: { unitType: formatUnitType(populated) },
    });
};

exports.remove = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidUnitTypeId', 400));
    }

    const unitType = await UnitType.findById(req.params.id);
    if (!unitType) {
        return next(new APIError('errors.unitTypeNotFound', 404));
    }

    await UnitTypeAttribute.deleteMany({ unitType: unitType._id });
    await unitType.deleteOne();

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.unitTypeDeleted') : 'Unit type deleted successfully.',
    });
};

exports.getAttributes = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidUnitTypeId', 400));
    }

    const attributes = await UnitTypeAttribute.find({ unitType: req.params.id }).sort({ order: 1, createdAt: 1 });

    SuccessResponse.ok(res, {
        results: attributes.length,
        data: { attributes: attributes.map(formatAttribute) },
    });
};

exports.createAttribute = async (req, res, next) => {
    const unitTypeId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(unitTypeId)) {
        return next(new APIError('errors.invalidUnitTypeId', 400));
    }

    const unitType = await UnitType.findById(unitTypeId);
    if (!unitType) {
        return next(new APIError('errors.unitTypeNotFound', 404));
    }

    const {
        name,
        nameAr,
        key,
        dataType,
        required,
        isArray,
        showInDetails,
        showInFilters,
        order,
        options,
        defaultValue,
        unit,
        validation,
        active,
    } = req.body;

    if (!name || !name.trim()) {
        return next(new APIError('validation.nameRequired', 400));
    }

    const safeKey = toKey(key || name);

    if (!safeKey) {
        return next(new APIError('validation.keyRequired', 400));
    }

    const existing = await UnitTypeAttribute.findOne({ unitType: unitTypeId, key: safeKey });
    if (existing) {
        return next(new APIError('errors.duplicateAttributeKey', 400));
    }

    let parsedOptions = [];
    if (Array.isArray(options)) {
        parsedOptions = options.map((opt) => String(opt).trim()).filter(Boolean);
    } else if (typeof options === 'string' && options.trim()) {
        parsedOptions = options.split(',').map((opt) => opt.trim()).filter(Boolean);
    }

    const attribute = await UnitTypeAttribute.create({
        unitType: unitTypeId,
        name: name.trim(),
        nameAr: nameAr ? nameAr.trim() : '',
        key: safeKey,
        dataType: dataType || 'string',
        required: required !== undefined ? (String(required) === 'true' || required === true) : false,
        isArray: isArray !== undefined ? (String(isArray) === 'true' || isArray === true) : false,
        showInDetails: showInDetails !== undefined ? (String(showInDetails) === 'true' || showInDetails === true) : true,
        showInFilters: showInFilters !== undefined ? (String(showInFilters) === 'true' || showInFilters === true) : false,
        order: order !== undefined ? Number(order) : 0,
        options: parsedOptions,
        defaultValue: defaultValue !== undefined ? defaultValue : null,
        unit: unit ? unit.trim() : '',
        validation: validation || {},
        active: active !== undefined ? (String(active) === 'true' || active === true) : true,
    });

    SuccessResponse.created(res, {
        message: req.t ? req.t('messages.attributeCreated') : 'Attribute created successfully.',
        data: { attribute: formatAttribute(attribute) },
    });
};

exports.updateAttribute = async (req, res, next) => {
    const { attrId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(attrId)) {
        return next(new APIError('errors.invalidAttributeId', 400));
    }

    const attribute = await UnitTypeAttribute.findById(attrId);
    if (!attribute) {
        return next(new APIError('errors.attributeNotFound', 404));
    }

    const allowed = [
        'name',
        'nameAr',
        'key',
        'dataType',
        'required',
        'isArray',
        'showInDetails',
        'showInFilters',
        'order',
        'options',
        'defaultValue',
        'unit',
        'validation',
        'active',
    ];

    for (const field of allowed) {
        if (req.body[field] !== undefined) {
            if (field === 'options') {
                if (Array.isArray(req.body.options)) {
                    attribute.options = req.body.options.map((opt) => String(opt).trim()).filter(Boolean);
                } else if (typeof req.body.options === 'string') {
                    attribute.options = req.body.options.split(',').map((opt) => opt.trim()).filter(Boolean);
                }
            } else if (['required', 'isArray', 'showInDetails', 'showInFilters', 'active'].includes(field)) {
                attribute[field] = String(req.body[field]) === 'true' || req.body[field] === true;
            } else if (field === 'order') {
                attribute.order = Number(req.body.order);
            } else {
                attribute[field] = req.body[field];
            }
        }
    }

    await attribute.save();

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.attributeUpdated') : 'Attribute updated successfully.',
        data: { attribute: formatAttribute(attribute) },
    });
};

exports.removeAttribute = async (req, res, next) => {
    const { attrId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(attrId)) {
        return next(new APIError('errors.invalidAttributeId', 400));
    }

    const attribute = await UnitTypeAttribute.findById(attrId);
    if (!attribute) {
        return next(new APIError('errors.attributeNotFound', 404));
    }

    await attribute.deleteOne();

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.attributeDeleted') : 'Attribute deleted successfully.',
    });
};

exports.formatUnitType = formatUnitType;
exports.formatAttribute = formatAttribute;
