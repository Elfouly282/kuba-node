const express = require('express');
const { list, create, update, remove } = require('../../../../src/features/payments/controllers/paymentMethodController');
const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

const router = express.Router();

router.use(protectAdmin, requireAdmin);
router.get('/', list);
router.post('/', create);
router.patch('/:id', update);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
