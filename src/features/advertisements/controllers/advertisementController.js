const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Advertisement = require('../models/advertisementModel');
const UnitType = require('../../unit-types/models/unitTypeModel');
const UnitTypeAttribute = require('../../unit-types/models/unitTypeAttributeModel');
const Category = require('../../categories/models/categoryModel');
const Region = require('../../regions/models/regionModel');
const City = require('../../cities/models/cityModel');
const User = require('../../auth/models/userModel');
const APIError = require('../../../utils/apiError');
const { getUploadsRoot } = require('../../../config/uploadsPath');
const { getImageUrl, getRelativeImagePath, deleteImageFile } = require('../../../utils/imageUrl');
const { findRegionForCoordinates } = require('../../../utils/geospatial');
const { searchAdvertisements } = require('../../search/listingSearch');

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
    if (obj.city && typeof obj.city === 'object' && obj.city.image) {
        obj.city.image = getImageUrl(obj.city.image);
    }
    if (obj.region && typeof obj.region === 'object' && obj.region.image) {
        obj.region.image = getImageUrl(obj.region.image);
    }

    if (obj.owner && typeof obj.owner === 'object') {
        obj.owner = {
            id: obj.owner._id || obj.owner.id,
            name: obj.owner.name,
            email: obj.owner.email,
            phone: obj.owner.phone,
        };
    }

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

const mergeSearchInput = (req) => {
    const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {};
    return { ...req.query, ...body };
};

const presentAdvertisements = (advertisements, availability) => advertisements.map((ad) => {
    const obj = formatAdvertisement(ad);
    const slot = availability && availability[String(ad._id)];
    if (slot) obj.availability = slot;
    return obj;
});

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

        const input = mergeSearchInput(req);
        if (req.user && (req.user.role === 'owner' || req.user.role === 'advertiser')) {
            input.owner = String(req.user._id);
        }

        const result = await searchAdvertisements(input, {
            strict: false,
            defaultPublic: false,
            defaultLimit: 100,
        });

        res.status(200).json({
            status: 'success',
            results: result.advertisements.length,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
            data: {
                advertisements: presentAdvertisements(result.advertisements, result.availability),
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.search = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({
                status: 'success',
                results: 0,
                total: 0,
                page: 1,
                totalPages: 1,
                data: { advertisements: [], filters: {} },
                dbConnected: false,
            });
        }

        const result = await searchAdvertisements(mergeSearchInput(req), {
            strict: true,
            defaultPublic: true,
            defaultLimit: 20,
            maxLimit: 100,
        });

        res.status(200).json({
            status: 'success',
            results: result.advertisements.length,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
            data: {
                filters: result.applied,
                advertisements: presentAdvertisements(result.advertisements, result.availability),
            },
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
            .populate('city', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
            .populate('owner', 'name email phone avatar');

        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        if (req.user && (req.user.role === 'owner' || req.user.role === 'advertiser')) {
            const ownerId = advertisement.owner?._id || advertisement.owner;
            if (String(ownerId) !== String(req.user._id)) {
                return next(new APIError('errors.adNotOwned', 403));
            }
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

        imageList = [...new Set(imageList)].filter(Boolean);
        if (!mainImage && imageList.length > 0) mainImage = imageList[0];

        const parsedLat = (latitude !== undefined && latitude !== null && latitude !== '' && !isNaN(Number(latitude))) ? Number(latitude) : null;
        const parsedLng = (longitude !== undefined && longitude !== null && longitude !== '' && !isNaN(Number(longitude))) ? Number(longitude) : null;

        let finalCity = (req.body.city && mongoose.Types.ObjectId.isValid(req.body.city)) ? req.body.city : null;
        let finalRegion = region && mongoose.Types.ObjectId.isValid(region) ? region : null;

        if (finalRegion && !finalCity) {
            const regDoc = await Region.findById(finalRegion);
            if (regDoc && regDoc.city) {
                finalCity = regDoc.city;
            }
        }

        if (parsedLat !== null && parsedLng !== null) {
            if (!finalCity) {
                const activeCities = await City.find({ active: true, 'points.2': { $exists: true } });
                const matchedCity = findRegionForCoordinates(parsedLat, parsedLng, activeCities);
                if (matchedCity) {
                    finalCity = matchedCity._id;
                }
            }
            if (!finalRegion) {
                const regFilter = { active: true, 'points.2': { $exists: true } };
                if (finalCity) regFilter.city = finalCity;
                const activeRegions = await Region.find(regFilter);
                const matchedRegion = findRegionForCoordinates(parsedLat, parsedLng, activeRegions);
                if (matchedRegion) {
                    finalRegion = matchedRegion._id;
                    if (!finalCity && matchedRegion.city) {
                        finalCity = matchedRegion.city;
                    }
                }
            }
        }

        const advertisement = await Advertisement.create({
            title: title.trim(),
            description: description ? description.trim() : '',
            type: resolvedType,
            unitType: validUnitType,
            price: pricing.finalPrice,
            pricing,
            location: location ? location.trim() : '',
            address: address ? address.trim() : '',
            latitude: parsedLat,
            longitude: parsedLng,
            category: validCategory,
            city: finalCity,
            region: finalRegion,
            image: mainImage,
            images: imageList,
            attributes: attributes || {},
            status: status || 'published',
            owner: (req.user?.role === 'admin' && req.body.owner && mongoose.Types.ObjectId.isValid(req.body.owner)) ? req.body.owner : (req.user?._id || null),
            active: active !== undefined ? (String(active) === 'true' || active === true) : true,
        });

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('city', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
            .populate('owner', 'name email phone avatar');

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

        if (req.user && (req.user.role === 'owner' || req.user.role === 'advertiser')) {
            const ownerId = advertisement.owner?._id || advertisement.owner;
            if (String(ownerId) !== String(req.user._id)) {
                return next(new APIError('errors.adNotOwned', 403));
            }
        }

        if (req.user && req.user.role === 'admin' && req.body.owner !== undefined) {
            advertisement.owner = (req.body.owner && mongoose.Types.ObjectId.isValid(req.body.owner)) ? req.body.owner : null;
        }

        const stringFields = ['title', 'description', 'type', 'location', 'address', 'status'];
        stringFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                advertisement[field] = req.body[field];
            }
        });

        if (req.body.latitude !== undefined) {
            advertisement.latitude = (req.body.latitude !== '' && req.body.latitude !== null && !isNaN(Number(req.body.latitude))) ? Number(req.body.latitude) : null;
        }
        if (req.body.longitude !== undefined) {
            advertisement.longitude = (req.body.longitude !== '' && req.body.longitude !== null && !isNaN(Number(req.body.longitude))) ? Number(req.body.longitude) : null;
        }
        if (req.body.active !== undefined) advertisement.active = String(req.body.active) === 'true' || req.body.active === true;

        if (req.body.category !== undefined) {
            if (req.body.category && mongoose.Types.ObjectId.isValid(req.body.category)) {
                const catExists = await Category.findById(req.body.category);
                if (catExists) advertisement.category = catExists._id;
            } else if (!req.body.category) {
                advertisement.category = null;
            }
        }

        if (req.body.city !== undefined) {
            advertisement.city = mongoose.Types.ObjectId.isValid(req.body.city) ? req.body.city : null;
        }

        if (req.body.region !== undefined) {
            advertisement.region = mongoose.Types.ObjectId.isValid(req.body.region) ? req.body.region : null;
            if (advertisement.region && !advertisement.city) {
                const regDoc = await Region.findById(advertisement.region);
                if (regDoc && regDoc.city) {
                    advertisement.city = regDoc.city;
                }
            }
        } else if (req.body.latitude !== undefined || req.body.longitude !== undefined) {
            const latToCheck = advertisement.latitude;
            const lngToCheck = advertisement.longitude;
            if (latToCheck !== null && lngToCheck !== null) {
                if (!advertisement.city) {
                    const activeCities = await City.find({ active: true, 'points.2': { $exists: true } });
                    const matchedCity = findRegionForCoordinates(latToCheck, lngToCheck, activeCities);
                    if (matchedCity) advertisement.city = matchedCity._id;
                }
                const regFilter = { active: true, 'points.2': { $exists: true } };
                if (advertisement.city) regFilter.city = advertisement.city;
                const activeRegions = await Region.find(regFilter);
                const matchedRegion = findRegionForCoordinates(latToCheck, lngToCheck, activeRegions);
                if (matchedRegion) {
                    advertisement.region = matchedRegion._id;
                    if (!advertisement.city && matchedRegion.city) {
                        advertisement.city = matchedRegion.city;
                    }
                }
            }
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
            .populate('city', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
            .populate('owner', 'name email phone avatar');

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

        if (req.user && (req.user.role === 'owner' || req.user.role === 'advertiser')) {
            const ownerId = advertisement.owner?._id || advertisement.owner;
            if (String(ownerId) !== String(req.user._id)) {
                return next(new APIError('errors.adNotOwned', 403));
            }
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

exports.assignOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        let ownerUser = null;

        if (req.body.userId && mongoose.Types.ObjectId.isValid(req.body.userId)) {
            ownerUser = await User.findById(req.body.userId).setOptions({ includeInactive: true });
            if (!ownerUser) {
                return next(new APIError('errors.ownerNotFound', 404));
            }
            if (ownerUser.role !== 'admin' && ownerUser.role !== 'owner') {
                ownerUser.role = 'owner';
                await ownerUser.save();
            }
        } else if (req.body.email && req.body.password) {
            const email = req.body.email.toLowerCase().trim();
            ownerUser = await User.findOne({ email }).setOptions({ includeInactive: true });
            if (ownerUser) {
                ownerUser.role = 'owner';
                if (req.body.name) ownerUser.name = req.body.name.trim();
                if (req.body.phone) ownerUser.phone = req.body.phone.trim();
                if (req.body.password && req.body.password.length >= 8) {
                    ownerUser.password = req.body.password;
                }
                ownerUser.active = true;
                await ownerUser.save();
            } else {
                ownerUser = await User.create({
                    name: req.body.name?.trim() || 'صاحب الإعلان',
                    email,
                    password: req.body.password,
                    phone: req.body.phone?.trim() || null,
                    role: 'owner',
                    isEmailVerified: true,
                    active: true,
                });
            }
        } else {
            return next(new APIError('errors.missingFields', 400));
        }

        advertisement.owner = ownerUser._id;
        await advertisement.save();

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('city', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
            .populate('owner', 'name email phone avatar');

        res.status(200).json({
            status: 'success',
            message: 'تم تعيين وربط حساب صاحب الإعلان بنجاح.',
            data: {
                advertisement: formatAdvertisement(populated),
                owner: {
                    id: ownerUser._id,
                    name: ownerUser.name,
                    email: ownerUser.email,
                    phone: ownerUser.phone,
                    role: ownerUser.role,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.removeOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        advertisement.owner = null;
        await advertisement.save();

        res.status(200).json({
            status: 'success',
            message: 'تم إلغاء ربط صاحب الإعلان بنجاح.',
        });
    } catch (err) {
        next(err);
    }
};

exports.addImages = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        if (req.user && req.user.role !== 'admin') {
            const ownerId = advertisement.owner?._id || advertisement.owner;
            if (String(ownerId) !== String(req.user._id)) {
                return next(new APIError('errors.adNotOwned', 403));
            }
        }

        let newImages = [];
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            newImages = req.files.map((f) => `advertisements/${f.filename}`);
        } else if (req.file) {
            newImages = [`advertisements/${req.file.filename}`];
        }

        if (req.body.imageUrl && typeof req.body.imageUrl === 'string') {
            newImages.push(getRelativeImagePath(req.body.imageUrl.trim()));
        } else if (Array.isArray(req.body.imageUrls)) {
            req.body.imageUrls.forEach((url) => {
                if (url && typeof url === 'string') newImages.push(getRelativeImagePath(url.trim()));
            });
        }

        if (newImages.length === 0) {
            return next(new APIError('validation.imageRequired', 400));
        }

        if (!Array.isArray(advertisement.images)) {
            advertisement.images = advertisement.image ? [advertisement.image] : [];
        }

        newImages.forEach((img) => {
            if (img && !advertisement.images.includes(img)) {
                advertisement.images.push(img);
            }
        });

        if (!advertisement.image && advertisement.images.length > 0) {
            advertisement.image = advertisement.images[0];
        }

        await advertisement.save();

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('city', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
            .populate('owner', 'name email phone avatar');

        res.status(200).json({
            status: 'success',
            message: 'تم إضافة الصور بنجاح.',
            data: { advertisement: formatAdvertisement(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { image } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        if (req.user && req.user.role !== 'admin') {
            const ownerId = advertisement.owner?._id || advertisement.owner;
            if (String(ownerId) !== String(req.user._id)) {
                return next(new APIError('errors.adNotOwned', 403));
            }
        }

        const relPath = getRelativeImagePath(image);
        deleteImageFile(relPath);

        if (Array.isArray(advertisement.images)) {
            advertisement.images = advertisement.images.filter((img) => img !== relPath && img !== image);
        }

        if (advertisement.image === relPath || advertisement.image === image) {
            advertisement.image = advertisement.images && advertisement.images.length > 0 ? advertisement.images[0] : '';
        }

        await advertisement.save();

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('city', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
            .populate('owner', 'name email phone avatar');

        res.status(200).json({
            status: 'success',
            message: 'تم حذف الصورة بنجاح.',
            data: { advertisement: formatAdvertisement(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.setMainImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { image } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const advertisement = await Advertisement.findById(id);
        if (!advertisement) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        if (req.user && req.user.role !== 'admin') {
            const ownerId = advertisement.owner?._id || advertisement.owner;
            if (String(ownerId) !== String(req.user._id)) {
                return next(new APIError('errors.adNotOwned', 403));
            }
        }

        const relPath = getRelativeImagePath(image);
        advertisement.image = relPath;

        if (Array.isArray(advertisement.images) && !advertisement.images.includes(relPath)) {
            advertisement.images.unshift(relPath);
        }

        await advertisement.save();

        const populated = await Advertisement.findById(advertisement._id)
            .populate('category', 'name image')
            .populate('city', 'name image')
            .populate('region', 'name image')
            .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
            .populate('owner', 'name email phone avatar');

        res.status(200).json({
            status: 'success',
            message: 'تم تعيين الصورة الرئيسية بنجاح.',
            data: { advertisement: formatAdvertisement(populated) },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteImageFile = deleteImageFile;
exports.formatAdvertisement = formatAdvertisement;
exports.validateAttributes = validateAttributes;
exports.buildPricingData = buildPricingData;
