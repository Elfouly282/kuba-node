const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const APIError = require('../../../utils/apiError');

const protect = async (req, _res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return next(new APIError('errors.tokenRequired', 401));
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        const key = err.name === 'TokenExpiredError' ? 'errors.tokenExpired' : 'errors.invalidToken';
        return next(new APIError(key, 401));
    }

    if (decoded.id) {
        const user = await User.findById(decoded.id);
        if (!user) return next(new APIError('errors.userNotFound', 401));
        req.user = user;
        return next();
    }

    if (decoded.uid) {
        req.user = { _id: decoded.uid, uid: decoded.uid, email: decoded.email, provider: 'google' };
        return next();
    }

    return next(new APIError('errors.invalidToken', 401));
};

const restrictTo = (...roles) => (req, _res, next) => {
    if (!roles.includes(req.user?.role)) {
        return next(new APIError('errors.forbidden', 403));
    }
    next();
};

module.exports = { protect, restrictTo };
