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

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protectAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/data', getCityData);
router.get('/:id/data', getCityData);
router.get('/:id/regions', getCityRegions);
router.get('/:id', getOne);

router.post('/', protectAdmin, ...uploadSingle('image', 'regions'), create);
router.patch('/:id', protectAdmin, ...uploadSingle('image', 'regions'), update);
router.put('/:id', protectAdmin, ...uploadSingle('image', 'regions'), update);
router.delete('/:id', protectAdmin, remove);

module.exports = router;
