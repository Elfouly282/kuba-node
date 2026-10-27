const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const { getImageUrl, getRelativeImagePath, deleteImageFile } = require('../../../utils/imageUrl');

const formatCategory = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    obj.image = getImageUrl(obj.image);
    return obj;
};

exports.getAll = async (_req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return SuccessResponse.ok(res, {
            results: 0,
            data: { categories: [] },
            dbConnected: false,
        });
    }

    const rawCategories = await Category.find().sort({ createdAt: -1 });
    const categories = rawCategories.map(formatCategory);

    SuccessResponse.ok(res, {
        results: categories.length,
        data: { categories },
    });
};


exports.create = async (req, res, next) => {
    const name = req.body.name ? req.body.name.trim() : '';
    if (!name) {
        return next(new APIError('validation.nameRequired', 400));
    }

    let image = null;
    if (req.file) {
        image = `categories/${req.file.filename}`;
    } else if (req.body.image) {
        image = getRelativeImagePath(req.body.image.trim());
    }

    if (!image) {
        return next(new APIError('errors.imageRequired', 400));
    }

    const category = await Category.create({ name, image });

    SuccessResponse.created(res, {
        message: req.t ? req.t('messages.categoryCreated') : 'Category created successfully.',
        data: { category: formatCategory(category) },
    });
};

exports.update = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidCategoryId', 400));
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new APIError('errors.categoryNotFound', 404));
    }

    if (req.body.name !== undefined) {
        const trimmedName = req.body.name.trim();
        if (!trimmedName) {
            return next(new APIError('validation.nameRequired', 400));
        }
        category.name = trimmedName;
    }

    if (req.file) {
        deleteImageFile(category.image);
        category.image = `categories/${req.file.filename}`;
    } else if (req.body.image !== undefined && req.body.image.trim() !== '') {
        const newRelative = getRelativeImagePath(req.body.image.trim());
        if (category.image !== newRelative) {
            deleteImageFile(category.image);
            category.image = newRelative;
        }
    }

    await category.save();

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.categoryUpdated') : 'Category updated successfully.',
        data: { category: formatCategory(category) },
    });
};

exports.remove = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new APIError('errors.invalidCategoryId', 400));
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new APIError('errors.categoryNotFound', 404));
    }

    deleteImageFile(category.image);
    await category.deleteOne();

    SuccessResponse.ok(res, {
        message: req.t ? req.t('messages.categoryDeleted') : 'Category deleted successfully.',
    });
};

exports.deleteImageFile = deleteImageFile;
