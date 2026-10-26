const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
    reorder,
} = require('../controllers/onboardingController');

const { uploadSingle } = require('../../../middleware/uploadMiddleware');
const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', getOne);
// reorder must be before /:id so Express doesn't match 'reorder' as an id
router.patch('/reorder/bulk', protectAdmin, requireAdmin, reorder);
router.post('/', protectAdmin, requireAdmin, ...uploadSingle('image', 'onboarding'), create);
router.patch('/:id', protectAdmin, requireAdmin, ...uploadSingle('image', 'onboarding'), update);
router.delete('/:id', protectAdmin, requireAdmin, remove);

module.exports = router;
