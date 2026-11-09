const express = require('express');
const router = express.Router();

const { getFlashSale } = require('../controllers/flashsaleController');

router.get('/', getFlashSale);

module.exports = router;
