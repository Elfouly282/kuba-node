const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const APIError = require('../../../utils/apiError');
const { decompressId } = require('../../../utils/generateToken');

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
        const userId = decompressId(decoded.id);
        const user = await User.findById(userId).populate('city', 'name nameAr image').populate('region', 'name nameAr');
        if (!user) return next(new APIError('errors.userNotFound', 401));
        if (user.provider === 'local' && !user.isEmailVerified) {
            return next(new APIError('errors.emailNotVerified', 403));
        }
        req.user = user;
        return next();
    }

    if (decoded.uid) {
        let user = await User.findOne({ firebaseUid: decoded.uid })
            .setOptions({ includeInactive: true })
            .select('+active')
            .populate('city', 'name nameAr image')
            .populate('region', 'name nameAr');

        if (user?.active === false) return next(new APIError('errors.userDisabled', 403));

        if (!user) {
            try {
                const { upsertGoogleUser } = require('../controllers/authController');
                const admin = require('../../../../admin/config/firebase');
                const fbUser = await admin.auth().getUser(decoded.uid);
                const saved = await upsertGoogleUser({
                    uid: fbUser.uid,
                    email: fbUser.email,
                    name: fbUser.displayName,
                    picture: fbUser.photoURL,
                });
                user = await User.findById(saved._id).populate('city', 'name nameAr image').populate('region', 'name nameAr');
            } catch (err) {
                if (err instanceof APIError) return next(err);
                return next(new APIError('errors.invalidToken', 401));
            }
        }

        if (!user) return next(new APIError('errors.userNotFound', 401));
        req.user = user;
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
