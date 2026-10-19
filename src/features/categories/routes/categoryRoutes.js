const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
} = require('../controllers/categoryController');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protect, restrictTo } = require('../../auth/middleware/authMiddleware');
const {
    validateCategoryId,
    validateCreateCategory,
    validateUpdateCategory,
} = require('../middleware/categoryMiddleware');

router.get('/', getAll);
router.get('/:id', validateCategoryId, getOne);

router.post('/', protect, restrictTo('admin'), ...uploadSingle('image', 'categories'), validateCreateCategory, create);
router.patch('/:id', protect, restrictTo('admin'), validateCategoryId, ...uploadSingle('image', 'categories'), validateUpdateCategory, update);
router.put('/:id', protect, restrictTo('admin'), validateCategoryId, ...uploadSingle('image', 'categories'), validateUpdateCategory, update);
router.delete('/:id', protect, restrictTo('admin'), validateCategoryId, remove);

module.exports = router;
