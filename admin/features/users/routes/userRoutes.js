const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserStats,
    getUserById,
    createUser,
    updateUser,
    toggleUserStatus,
    deleteUser,
} = require('../controllers/userController');
const { protectAdmin, requireAdmin } = require('../../../middleware/authMiddleware');

router.use(protectAdmin, requireAdmin);

router.get('/stats', getUserStats);
router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.patch('/:id/toggle-status', toggleUserStatus);
router.delete('/:id', deleteUser);

module.exports = router;
