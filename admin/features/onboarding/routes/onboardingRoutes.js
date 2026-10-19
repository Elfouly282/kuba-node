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
const { protectAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', getOne);
// reorder must be before /:id so Express doesn't match 'reorder' as an id
router.patch('/reorder/bulk', protectAdmin, reorder);
router.post('/', protectAdmin, ...uploadSingle('image', 'onboarding'), create);
router.patch('/:id', protectAdmin, ...uploadSingle('image', 'onboarding'), update);
router.delete('/:id', protectAdmin, remove);

module.exports = router;
