const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Advertisement = require('../models/advertisementModel');
const UnitType = require('../../unit-types/models/unitTypeModel');
const UnitTypeAttribute = require('../../unit-types/models/unitTypeAttributeModel');
const Category = require('../../categories/models/categoryModel');
const APIError = require('../../../utils/apiError');
const { getUploadsRoot } = require('../../../config/uploadsPath');
const { getImageUrl, getRelativeImagePath, deleteImageFile } = require('../../../utils/imageUrl');

const formatAdvertisement = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };

    if (obj.image) obj.image = getImageUrl(obj.image);

    if (Array.isArray(obj.images)) {
        obj.images = obj.images.map((img) => getImageUrl(img)).filter(Boolean);
    }

    if (obj.category && typeof obj.category === 'object' && obj.category.image) {
        obj.category.image = getImageUrl(obj.category.image);
    }
    if (obj.region && typeof obj.region === 'object' && obj.region.image) {
        obj.region.image = getImageUrl(obj.region.image);
    }

    // Ensure pricing structure is always populated for consumers
    if (!obj.pricing || typeof obj.pricing !== 'object') {
        obj.pricing = {
            basePrice: obj.price || 0,
            finalPrice: obj.price || 0,
            discountType: 'none',
            discountValue: 0,
            currency: 'EGP',
            pricingUnit: 'per_night',
            minDuration: 1,
        };
    }

    return obj;
};

const { validateAttributes, buildPricingData } = require('../middleware/advertisementMiddleware');


// ─── LISTINGS / ADVERTISEMENTS CONTROLLER ────────────────────────────────────

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

        // UnitType / Type filter
        if (req.query.unitType && mongoose.Types.ObjectId.isValid(req.query.unitType)) {
            filter.unitType = req.query.unitType;
        } else if (req.query.type) {
            // Support searching by unit type slug or legacy type
            const matchedUnitType = await UnitType.findOne({ slug: req.query.type });
            if (matchedUnitType) {
                filter.$or = [{ unitType: matchedUnitType._id }, { type: req.query.type }];
            } else {
                filter.type = req.query.type;
            }
        }

        // Category filter
        if (req.query.category && mongoose.Types.ObjectId.isValid(req.query.category)) {
            filter.category = req.query.category;
        }

        // Region filter
        const regionParam = req.query.region || req.query.regionId;
        if (regionParam && mongoose.Types.ObjectId.isValid(regionParam)) {
            filter.region = regionParam;
        }

        // Active status
        if (req.query.active !== undefined) {
            filter.active = req.query.active === 'true';
        }

        // Publication status (draft, published, etc.)
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Price range filtering (on final price)
        if (req.query.minPrice !== undefined || req.query.maxPrice !== undefined) {
            filter['pricing.finalPrice'] = {};
            if (req.query.minPrice !== undefined && !isNaN(Number(req.query.minPrice))) {
                filter['pricing.finalPrice'].$gte = Number(req.query.minPrice);
            }
            if (req.query.maxPrice !== undefined && !isNaN(Number(req.query.maxPrice))) {
                filter['pricing.finalPrice'].$lte = Number(req.query.maxPrice);
            }
        }

        // Pricing unit filter (per_night, per_hour, etc.)
        if (req.query.pricingUnit) {
            filter['pricing.pricingUnit'] = req.query.pricingUnit;
        }

        // Dynamic attribute filters (e.g. ?attr_guests=4 or ?attributes.bedrooms=2)
        Object.keys(req.query).forEach((qKey) => {
            if (qKey.startsWith('attr_')) {
                const attrKey = qKey.replace('attr_', '');
                const val = req.query[qKey];
                filter[`attributes.${attrKey}`] = !isNaN(Number(val)) ? Number(val) : val;
            } else if (qKey.startsWith('attributes.')) {
                const val = req.query[qKey];
                filter[qKey] = !isNaN(Number(val)) ? Number(val) : val;
            }
        });

        // Search in title, description, location, address
        if (req.query.search && req.query.search.trim()) {
            const regex = new RegExp(req.query.search.trim(), 'i');
            filter.$or = [
                { title: regex },
                { description: regex },
                { location: regex },
                { address: regex },
            ];
        }

        // Sorting
        let sort = { createdAt: -1 };
        if (req.query.sort) {
            if (req.query.sort === 'price_asc') sort = { 'pricing.finalPrice': 1 };
            else if (req.query.sort === 'price_desc') sort = { 'pricing.finalPrice': -1 };
            else if (req.query.sort === 'oldest') sort = { createdAt: 1 };
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const skip = (page - 1) * limit;

        const [advertisements, totalCount] = await Promise.all([
            Advertisement.find(filter)
                .populate('category', 'name image')
                .populate('region', 'name image')
                .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Advertisement.countDocuments(filter),
        ]);

        res.status(200).json({
            status: 'success',
            results: advertisements.length,
            total: totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit) || 1,
            data: { advertisements: advertisements.map(formatAdvertisement) },
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id)
            .populate('category', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit');

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

exports.create = async (req, res, next) => {
    try {
        const {
            title,
            description,
            type,
            unitType,
            location,
            address,
            latitude,
            longitude,
            category,
            region,
            status,
            active,
            image,
            images,
        } = req.body;

        let validCategory = req.validatedAdData?.validCategory;
        let validUnitType = req.validatedAdData?.validUnitType;
        let resolvedType = req.validatedAdData?.resolvedType || type || 'apartment';
        let attributes = req.validatedAdData?.sanitizedAttributes;
        let pricing = req.validatedAdData?.pricing;

        if (!req.validatedAdData) {
            if (!title || !title.trim()) {
                return next(new APIError('validation.titleRequired', 400));
            }
            if (category && mongoose.Types.ObjectId.isValid(category)) {
                const catExists = await Category.findById(category);
                if (!catExists) return next(new APIError('errors.categoryNotFound', 400));
                validCategory = catExists._id;
            }
            if (unitType && mongoose.Types.ObjectId.isValid(unitType)) {
                const utDoc = await UnitType.findById(unitType);
                if (!utDoc) return next(new APIError('errors.unitTypeNotFound', 400));
                validUnitType = utDoc._id;
                resolvedType = utDoc.slug || resolvedType;
            } else if (type && typeof type === 'string') {
                const utDoc = await UnitType.findOne({ slug: type.toLowerCase() });
                if (utDoc) validUnitType = utDoc._id;
            }
            let rawAttributes = {};
            if (req.body.attributes) {
                if (typeof req.body.attributes === 'string') {
                    try { rawAttributes = JSON.parse(req.body.attributes); } catch (_) { rawAttributes = {}; }
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
            attributes = attrValidation.sanitized;
            pricing = buildPricingData(req.body);
        }

        // Handle Images
        let mainImage = '';
        let imageList = [];

        if (req.file) {
            mainImage = `advertisements/${req.file.filename}`;
            imageList.push(mainImage);
        } else if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            imageList = req.files.map((f) => `advertisements/${f.filename}`);
            mainImage = imageList[0];
        } else if (image && typeof image === 'string' && image.trim() !== '') {
            mainImage = getRelativeImagePath(image.trim());
            imageList.push(mainImage);
        }

        if (images) {
            let extraImages = [];
            if (Array.isArray(images)) extraImages = images;
            else if (typeof images === 'string') {
                try {
                    extraImages = JSON.parse(images);
                } catch (_) {
                    extraImages = images.split(',').map((s) => s.trim());
                }
            }
            extraImages.forEach((img) => {
                if (img) imageList.push(getRelativeImagePath(img));
            });
        }

        // Remove duplicate images
        imageList = [...new Set(imageList)].filter(Boolean);
        if (!mainImage && imageList.length > 0) mainImage = imageList[0];

        const advertisement = await Advertisement.create({
            title: title.trim(),
            description: description ? description.trim() : '',
            type: resolvedType,
            unitType: validUnitType,
            price: pricing.finalPrice,
            pricing,
            location: location ? location.trim() : '',
            address: address ? address.trim() : '',
            latitude: (latitude !== undefined && latitude !== null && latitude !== '' && !isNaN(Number(latitude))) ? Number(latitude) : null,
            longitude: (longitude !== undefined && longitude !== null && longitude !== '' && !isNaN(Number(longitude))) ? Number(longitude) : null,
            category: validCategory,
            region: region && mongoose.Types.ObjectId.isValid(region) ? region : null,
            image: mainImage,
            images: imageList,
            attributes: attributes || {},
            status: status || 'published',
            owner: req.user?._id || null,
            active: active !== undefined ? (String(active) === 'true' || active === true) : true,
        });

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit');

        res.status(201).json({
            status: 'success',
            message: req.t ? req.t('messages.advertisementCreated') : 'Listing created successfully.',
            data: { advertisement: formatAdvertisement(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        // Basic string fields
        const stringFields = ['title', 'description', 'type', 'location', 'address', 'status'];
        stringFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                advertisement[field] = req.body[field];
            }
        });

        // Numbers
        if (req.body.latitude !== undefined) {
            advertisement.latitude = (req.body.latitude !== '' && req.body.latitude !== null && !isNaN(Number(req.body.latitude))) ? Number(req.body.latitude) : null;
        }
        if (req.body.longitude !== undefined) {
            advertisement.longitude = (req.body.longitude !== '' && req.body.longitude !== null && !isNaN(Number(req.body.longitude))) ? Number(req.body.longitude) : null;
        }
        if (req.body.active !== undefined) advertisement.active = String(req.body.active) === 'true' || req.body.active === true;

        // References
        if (req.body.category !== undefined) {
            if (req.body.category && mongoose.Types.ObjectId.isValid(req.body.category)) {
                const catExists = await Category.findById(req.body.category);
                if (catExists) advertisement.category = catExists._id;
            } else if (!req.body.category) {
                advertisement.category = null;
            }
        }

        if (req.body.region !== undefined) {
            advertisement.region = mongoose.Types.ObjectId.isValid(req.body.region) ? req.body.region : null;
        }

        if (req.body.unitType !== undefined) {
            if (req.body.unitType && mongoose.Types.ObjectId.isValid(req.body.unitType)) {
                const utDoc = await UnitType.findById(req.body.unitType);
                if (utDoc) {
                    advertisement.unitType = utDoc._id;
                    advertisement.type = utDoc.slug || advertisement.type;
                }
            } else if (!req.body.unitType) {
                advertisement.unitType = null;
            }
        }

        // Update Attributes
        if (req.body.attributes !== undefined) {
            let rawAttrs = {};
            if (typeof req.body.attributes === 'string') {
                try {
                    rawAttrs = JSON.parse(req.body.attributes);
                } catch (_) {
                    rawAttrs = {};
                }
            } else if (typeof req.body.attributes === 'object') {
                rawAttrs = req.body.attributes;
            }

            const targetUnitType = advertisement.unitType;
            const attrValidation = await validateAttributes(targetUnitType, {
                ...(advertisement.attributes || {}),
                ...rawAttrs,
            });

            if (!attrValidation.valid) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Validation failed for unit attributes',
                    errors: attrValidation.errors,
                });
            }

            advertisement.attributes = attrValidation.sanitized;
            advertisement.markModified('attributes');
        }

        // Update Pricing
        const hasPricingUpdate = [
            'pricing',
            'pricing.basePrice',
            'pricing.discountType',
            'pricing.discountValue',
            'pricing.pricingUnit',
            'basePrice',
            'price',
            'discountType',
            'discountValue',
            'pricingUnit',
        ].some((key) => req.body[key] !== undefined);

        if (hasPricingUpdate) {
            const pricing = buildPricingData({
                pricing: advertisement.pricing || {},
                ...req.body,
            });
            advertisement.pricing = pricing;
            advertisement.price = pricing.finalPrice;
        }

        // Images handling
        if (req.file) {
            deleteImageFile(advertisement.image);
            const newImg = `advertisements/${req.file.filename}`;
            advertisement.image = newImg;
            if (!advertisement.images) advertisement.images = [];
            advertisement.images.unshift(newImg);
        } else if (req.body.image !== undefined && req.body.image.trim() !== '') {
            const newRelative = getRelativeImagePath(req.body.image.trim());
            if (advertisement.image !== newRelative) {
                deleteImageFile(advertisement.image);
                advertisement.image = newRelative;
            }
        }

        if (req.body.images !== undefined) {
            let imgArr = [];
            if (Array.isArray(req.body.images)) imgArr = req.body.images;
            else if (typeof req.body.images === 'string') {
                try {
                    imgArr = JSON.parse(req.body.images);
                } catch (_) {
                    imgArr = req.body.images.split(',').map((s) => s.trim());
                }
            }
            advertisement.images = imgArr.map((im) => getRelativeImagePath(im)).filter(Boolean);
            if (!advertisement.image && advertisement.images.length > 0) {
                advertisement.image = advertisement.images[0];
            }
        }

        await advertisement.save();

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit');

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.advertisementUpdated') : 'Listing updated successfully.',
            data: { advertisement: formatAdvertisement(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        deleteImageFile(advertisement.image);
        if (Array.isArray(advertisement.images)) {
            advertisement.images.forEach((img) => deleteImageFile(img));
        }

        await advertisement.deleteOne();

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.advertisementDeleted') : 'Listing deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteImageFile = deleteImageFile;
exports.formatAdvertisement = formatAdvertisement;
exports.validateAttributes = validateAttributes;
exports.buildPricingData = buildPricingData;
