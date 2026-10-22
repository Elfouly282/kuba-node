const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
} = require('../controllers/bannerController');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protectAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', protectAdmin, getOne);
router.post('/', protectAdmin, ...uploadSingle('image', 'banners'), create);
router.patch('/:id', protectAdmin, ...uploadSingle('image', 'banners'), update);
router.put('/:id', protectAdmin, ...uploadSingle('image', 'banners'), update);
router.delete('/:id', protectAdmin, remove);

module.exports = router;
