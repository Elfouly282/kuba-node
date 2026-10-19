const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/onboardingController');
const { validateOnboardingQuery } = require('../middleware/onboardingMiddleware');

router.get('/', validateOnboardingQuery, getAll);

module.exports = router;
