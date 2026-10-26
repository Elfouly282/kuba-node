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
const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/data', getRegionData);
router.get('/:id/data', getRegionData);
router.get('/:id', getOne);

router.post('/', protectAdmin, requireAdmin, ...uploadSingle('image', 'regions'), create);
router.patch('/:id', protectAdmin, requireAdmin, ...uploadSingle('image', 'regions'), update);
router.put('/:id', protectAdmin, requireAdmin, ...uploadSingle('image', 'regions'), update);
router.delete('/:id', protectAdmin, requireAdmin, remove);

module.exports = router;
