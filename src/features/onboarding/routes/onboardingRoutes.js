const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/onboardingController');

router.get('/', getAll);

module.exports = router;
