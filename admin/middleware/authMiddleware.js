const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/features/auth/models/userModel');
const APIError = require('../utils/apiError');
const { decompressId } = require('../utils/generateToken');

const protectAdmin = async (req, _res, next) => {
    let token = null;

    if (req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query?.token) {
        token = req.query.token;
    }

    if (!token) {
        return next(new APIError('errors.tokenRequired', 401));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        const key = err.name === 'TokenExpiredError' ? 'errors.tokenExpired' : 'errors.invalidToken';
        return next(new APIError(key, 401));
    }

    // Local Super Admin bypass
    if (decoded.role === 'admin' && (decoded.id === '660000000000000000000001' || decoded.email === 'admin@kuba-app.com')) {
        req.user = {
            _id: '660000000000000000000001',
            name: 'Super Admin (Local)',
            email: decoded.email || 'admin@kuba-app.com',
            role: 'admin',
            provider: 'local',
        };
        return next();
    }

    if (decoded.id) {
        // If DB is offline, but token is valid admin token:
        if (mongoose.connection.readyState !== 1 && decoded.role === 'admin') {
            req.user = {
                _id: decoded.id,
                name: 'Admin',
                email: decoded.email || 'admin@kuba-app.com',
                role: 'admin',
                provider: 'local',
            };
            return next();
        }

        const userId = decompressId(decoded.id);
        const user = await User.findById(userId).select('+active');
        if (!user) return next(new APIError('errors.userNotFound', 401));
        if (user.active === false) return next(new APIError('errors.userDisabled', 403));
        if (user.role !== 'admin' && user.role !== 'owner' && user.role !== 'advertiser') {
            return next(new APIError('errors.forbidden', 403));
        }

        req.user = user;
        return next();
    }

    if (decoded.uid) {
        req.user = { _id: decompressId(decoded.uid), uid: decoded.uid, email: decoded.email, role: 'admin', provider: 'google' };
        return next();
    }

    return next(new APIError('errors.invalidToken', 401));
};

const requireAdmin = (req, _res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return next(new APIError('errors.forbidden', 403));
    }
    next();
};

const restrictTo = (...roles) => (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return next(new APIError('errors.forbidden', 403));
    }
    next();
};

const maybeAuth = async (req, _res, next) => {
    let token = null;

    if (req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query?.token) {
        token = req.query.token;
    }

    if (!token) return next();

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (_) {
        return next();
    }

    if (decoded.role === 'admin' && (decoded.id === '660000000000000000000001' || decoded.email === 'admin@kuba-app.com')) {
        req.user = {
            _id: '660000000000000000000001',
            name: 'Super Admin (Local)',
            email: decoded.email || 'admin@kuba-app.com',
            role: 'admin',
            provider: 'local',
        };
        return next();
    }

    if (decoded.id) {
        try {
            const userId = decompressId(decoded.id);
            const user = await User.findById(userId).select('+active');
            if (user && user.active !== false) {
                req.user = user;
            }
        } catch (_) {}
    }

    next();
};

module.exports = { protectAdmin, requireAdmin, restrictTo, maybeAuth };
