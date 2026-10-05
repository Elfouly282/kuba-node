const admin = require('../../../config/firebase');
const APIError = require('../../../utils/apiError');
const generateToken = require('../../../utils/generateToken');

exports.googleLogin = async (req, res, next) => {
    try {
        const { firebaseIdToken } = req.body;

        if (!firebaseIdToken) {
            return next(new APIError('errors.tokenRequired', 401));
        }

        const decodedToken = await admin.auth().verifyIdToken(firebaseIdToken);

        const jwtToken = generateToken({
            uid: decodedToken.uid,
            email: decodedToken.email,
        });

        res.status(200).json({
            status: 'success',
            token: jwtToken,
            data: {
                uid: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture,
            },
        });
    } catch (err) {
        if (
            err.code === 'auth/argument-error' ||
            err.code === 'auth/id-token-expired' ||
            err.code === 'auth/id-token-revoked' ||
            err.code?.startsWith('auth/')
        ) {
            return next(new APIError('errors.invalidFirebaseToken', 401));
        }

        next(err);
    }
};
