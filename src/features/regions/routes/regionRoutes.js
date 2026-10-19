const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    getRegionData,
    create,
    update,
    remove,
} = require('../controllers/regionController');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protect, restrictTo } = require('../../auth/middleware/authMiddleware');

router.get('/', getAll);
router.get('/data', getRegionData);
router.get('/:id/data', getRegionData);
router.get('/:id', getOne);

router.post('/', protect, restrictTo('admin'), ...uploadSingle('image', 'regions'), create);
router.patch('/:id', protect, restrictTo('admin'), ...uploadSingle('image', 'regions'), update);
router.put('/:id', protect, restrictTo('admin'), ...uploadSingle('image', 'regions'), update);
router.delete('/:id', protect, restrictTo('admin'), remove);

module.exports = router;
