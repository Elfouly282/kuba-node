const express = require('express');
const router = express.Router();

const {
    getAll,
    getOne,
    create,
    update,
    remove,
    getAttributes,
    createAttribute,
    updateAttribute,
    removeAttribute,
} = require('../controllers/unitTypeController');

const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protectAdmin, requireAdmin, create);
router.patch('/:id', protectAdmin, requireAdmin, update);
router.put('/:id', protectAdmin, requireAdmin, update);
router.delete('/:id', protectAdmin, requireAdmin, remove);

// Dynamic attributes sub-routes
router.get('/:id/attributes', getAttributes);
router.post('/:id/attributes', protectAdmin, requireAdmin, createAttribute);
router.patch('/:id/attributes/:attrId', protectAdmin, requireAdmin, updateAttribute);
router.put('/:id/attributes/:attrId', protectAdmin, requireAdmin, updateAttribute);
router.delete('/:id/attributes/:attrId', protectAdmin, requireAdmin, removeAttribute);

module.exports = router;
