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

const { protectAdmin } = require('../../../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protectAdmin, create);
router.patch('/:id', protectAdmin, update);
router.put('/:id', protectAdmin, update);
router.delete('/:id', protectAdmin, remove);

// Dynamic attributes sub-routes
router.get('/:id/attributes', getAttributes);
router.post('/:id/attributes', protectAdmin, createAttribute);
router.patch('/:id/attributes/:attrId', protectAdmin, updateAttribute);
router.put('/:id/attributes/:attrId', protectAdmin, updateAttribute);
router.delete('/:id/attributes/:attrId', protectAdmin, removeAttribute);

module.exports = router;
