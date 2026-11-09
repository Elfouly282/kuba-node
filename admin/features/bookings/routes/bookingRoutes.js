const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    update,
    remove,
} = require('../controllers/bookingController');

const { protectAdmin } = require('../../../middleware/authMiddleware');

router.use(protectAdmin);

router.get('/', getAll);
router.get('/:id', getOne);
router.patch('/:id', update);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
