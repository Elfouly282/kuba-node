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
const {
    validateRegionId,
    validateRegionDataRequest,
    validateCreateRegion,
    validateUpdateRegion,
} = require('../middleware/regionMiddleware');

router.get('/', getAll);
router.get('/data', validateRegionDataRequest, getRegionData);
router.get('/:id/data', validateRegionDataRequest, getRegionData);
router.get('/:id', validateRegionId, getOne);

router.post('/', protect, restrictTo('admin'), ...uploadSingle('image', 'regions'), validateCreateRegion, create);
router.patch('/:id', protect, restrictTo('admin'), validateRegionId, ...uploadSingle('image', 'regions'), validateUpdateRegion, update);
router.put('/:id', protect, restrictTo('admin'), validateRegionId, ...uploadSingle('image', 'regions'), validateUpdateRegion, update);
router.delete('/:id', protect, restrictTo('admin'), validateRegionId, remove);

module.exports = router;
