const express = require('express');
const router = express.Router();

const {
    getAll,
    create,
    update,
    remove,
} = require('../controllers/categoryController');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.post('/', protectAdmin, requireAdmin, ...uploadSingle('image', 'categories'), create);
router.patch('/:id', protectAdmin, requireAdmin, ...uploadSingle('image', 'categories'), update);
router.put('/:id', protectAdmin, requireAdmin, ...uploadSingle('image', 'categories'), update);
router.delete('/:id', protectAdmin, requireAdmin, remove);

module.exports = router;
