const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
} = require('../controllers/advertisementController');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protectAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protectAdmin, ...uploadSingle('image', 'advertisements'), create);
router.patch('/:id', protectAdmin, ...uploadSingle('image', 'advertisements'), update);
router.put('/:id', protectAdmin, ...uploadSingle('image', 'advertisements'), update);
router.delete('/:id', protectAdmin, remove);

module.exports = router;
