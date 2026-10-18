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

router.get('/', getAll);
router.get('/:id', getOne);

router.post('/', protect, restrictTo('admin'), ...uploadSingle('image', 'categories'), create);
router.patch('/:id', protect, restrictTo('admin'), ...uploadSingle('image', 'categories'), update);
router.put('/:id', protect, restrictTo('admin'), ...uploadSingle('image', 'categories'), update);
router.delete('/:id', protect, restrictTo('admin'), remove);

module.exports = router;
