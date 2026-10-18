const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const APIError = require('../../../utils/apiError');
const { getUploadsRoot } = require('../../../config/uploadsPath');
const { getImageUrl, getRelativeImagePath } = require('../../../utils/imageUrl');

const formatCategory = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
    obj.image = getImageUrl(obj.image);
    return obj;
};

const deleteImageFile = (imagePath) => {
    if (!imagePath || imagePath.startsWith('http://') || imagePath.startsWith('https://')) return;
    const absPath = path.join(getUploadsRoot(), imagePath.replace(/^uploads[\\/]/, ''));
    try {
        if (fs.existsSync(absPath)) {
            fs.unlinkSync(absPath);
        }
    } catch (_) { }
};

exports.getAll = async (_req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({
                status: 'success',
                results: 0,
                data: { categories: [] },
                dbConnected: false,
            });
        }

        const rawCategories = await Category.find().sort({ createdAt: -1 });
        const categories = rawCategories.map(formatCategory);

        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: { categories },
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidCategoryId', 400));
        }

        const category = await Category.findById(req.params.id);
        if (!category) {
            return next(new APIError('errors.categoryNotFound', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { category: formatCategory(category) },
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
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

        res.status(201).json({
            status: 'success',
            message: req.t ? req.t('messages.categoryCreated') : 'Category created successfully.',
            data: { category: formatCategory(category) },
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
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

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.categoryUpdated') : 'Category updated successfully.',
            data: { category: formatCategory(category) },
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidCategoryId', 400));
        }

        const category = await Category.findById(req.params.id);
        if (!category) {
            return next(new APIError('errors.categoryNotFound', 404));
        }

        deleteImageFile(category.image);
        await category.deleteOne();

        res.status(200).json({
            status: 'success',
            message: req.t ? req.t('messages.categoryDeleted') : 'Category deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteImageFile = deleteImageFile;
