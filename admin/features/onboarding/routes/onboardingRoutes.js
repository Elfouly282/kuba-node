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

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', ...uploadSingle('image', 'onboarding'), create);
router.patch('/:id', ...uploadSingle('image', 'onboarding'), update);
router.delete('/:id', remove);
router.patch('/reorder/bulk', reorder);

module.exports = router;
