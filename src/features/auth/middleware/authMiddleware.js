const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const APIError = require('../../../utils/apiError');

/**
 * protect — verifies the JWT and attaches the full User document to req.user.
 *
 * Supports two token shapes:
 *   - Local auth:   { id, email }   → looks up MongoDB user by _id
 *   - Firebase/SSO: { uid, email }  → attaches a lightweight object (no DB lookup)
 */
const protect = async (req, _res, next) => {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new APIError('errors.tokenRequired', 401));
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify signature & expiry
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new APIError('errors.tokenExpired', 401));
        }
        return next(new APIError('errors.invalidToken', 401));
    }

    // 3a. Local auth — token has `id` field (MongoDB ObjectId)
    if (decoded.id) {
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new APIError('errors.userNotFound', 401));
        }

        req.user = user;
        return next();
    }

    // 3b. Firebase/Google SSO — token has `uid` field (Firebase UID)
    if (decoded.uid) {
        req.user = {
            _id: decoded.uid,
            uid: decoded.uid,
            email: decoded.email,
            provider: 'google',
        };
        return next();
    }

    return next(new APIError('errors.invalidToken', 401));
};

/**
 * restrictTo — role-based access control middleware factory.
 * Usage: restrictTo('admin', 'moderator')
 *
 * @param {...string} roles - Allowed role values
 */
const restrictTo = (...roles) => (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return next(new APIError('errors.forbidden', 403));
    }
    next();
};

module.exports = { protect, restrictTo };
