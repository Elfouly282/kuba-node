const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    getCityRegions,
    getCityData,
    create,
    update,
    remove,
} = require('../controllers/cityController');

const {
    validateCityId,
    validateCityDataRequest,
    validateCreateCity,
    validateUpdateCity,
} = require('../middleware/cityMiddleware');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protect, restrictTo } = require('../../auth/middleware/authMiddleware');

router.get('/', getAll);
router.get('/data', validateCityDataRequest, getCityData);
router.get('/:id/data', validateCityDataRequest, getCityData);
router.get('/:id/regions', validateCityId, getCityRegions);
router.get('/:id', validateCityId, getOne);

router.post('/', protect, restrictTo('admin'), ...uploadSingle('image', 'regions'), validateCreateCity, create);
router.patch('/:id', protect, restrictTo('admin'), validateCityId, ...uploadSingle('image', 'regions'), validateUpdateCity, update);
router.put('/:id', protect, restrictTo('admin'), validateCityId, ...uploadSingle('image', 'regions'), validateUpdateCity, update);
router.delete('/:id', protect, restrictTo('admin'), validateCityId, remove);

module.exports = router;
