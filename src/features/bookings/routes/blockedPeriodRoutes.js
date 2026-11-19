const express = require('express');
const {
    listBlockedPeriods,
    createBlockedPeriod,
    deleteBlockedPeriod,
} = require('../controllers/blockedPeriodController');

const buildBlockedPeriodRoutes = (protect) => {
    const router = express.Router();

    router.get('/:id/blocked-periods', protect, listBlockedPeriods);
    router.post('/:id/blocked-periods', protect, createBlockedPeriod);
    router.delete('/:id/blocked-periods/:blockId', protect, deleteBlockedPeriod);

    return router;
};

module.exports = buildBlockedPeriodRoutes;
