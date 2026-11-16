const express = require('express');
const router = express.Router();
const { getPrivacyPolicy, updatePrivacyPolicy } = require('../../../../src/features/policies/controllers/policyController');
const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.get('/', protectAdmin, requireAdmin, getPrivacyPolicy);
router.put('/', protectAdmin, requireAdmin, updatePrivacyPolicy);

module.exports = router;
