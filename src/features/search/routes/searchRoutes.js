const express = require('express');
const { search } = require('../../advertisements/controllers/advertisementController');

const router = express.Router();

router.get('/', search);
router.post('/', search);

module.exports = router;
