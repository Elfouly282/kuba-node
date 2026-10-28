const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadNone = multer().none();

const {
    getAll,
    getOne,
    getRegionData,
    create,
    update,
    remove,
} = require('../controllers/regionController');

const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/data', getRegionData);
router.get('/:id/data', getRegionData);
router.get('/:id', getOne);

router.post('/', protectAdmin, requireAdmin, uploadNone, create);
router.patch('/:id', protectAdmin, requireAdmin, uploadNone, update);
router.put('/:id', protectAdmin, requireAdmin, uploadNone, update);
router.delete('/:id', protectAdmin, requireAdmin, remove);

module.exports = router;
