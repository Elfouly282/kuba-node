const express = require('express');
const router = express.Router();

const { getAll, getOne, getAttributes } = require('../controllers/unitTypeController');
const { validateUnitTypeId } = require('../middleware/unitTypeMiddleware');

router.get('/', getAll);
router.get('/:id', validateUnitTypeId, getOne);
router.get('/:id/attributes', validateUnitTypeId, getAttributes);

module.exports = router;
