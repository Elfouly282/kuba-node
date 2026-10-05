const APIError = require('../utils/apiError');
const { translate } = require('../../utils/i18n');
const multer = require('multer');

const handleCastErrorDB = (err) =>
    new APIError('errors.invalidField', 400, { path: err.path, value: err.value });

const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    return new APIError('errors.duplicateField', 400, { field });
};

const handleValidationErrorDB = (err, locale) => {
    const messages = Object.values(err.errors).map((e) => translate(locale, e.message));
    return new APIError('errors.validationError', 400, { messages: messages.join('. ') });
};

const handleJWTError = () => new APIError('errors.invalidToken', 401);

const handleJWTExpiredError = () => new APIError('errors.tokenExpired', 401);

const handleMulterError = (err) => {
    if (err.code === 'LIMIT_FILE_SIZE') return new APIError('errors.fileTooLarge', 400);
    if (err.code === 'LIMIT_UNEXPECTED_FILE') return new APIError('errors.unexpectedField', 400);
    return new APIError('errors.uploadFailed', 400);
};

const getLocalizedMessage = (err, locale) => (err.key ? translate(locale, err.key, err.vars) : err.message);

const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: getLocalizedMessage(err, req.locale),
        stack: err.stack,
        error: err,
    });
};

const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: getLocalizedMessage(err, req.locale),
        });
    }

    console.error('UNEXPECTED ERROR 💥', err);
    res.status(500).json({
        status: 'error',
        message: translate(req.locale, 'errors.somethingWentWrong'),
    });
};

const globalErrorHandler = (err, req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = err;
    if (
        err instanceof multer.MulterError ||
        err.name === 'CastError' ||
        err.code === 11000 ||
        err.name === 'ValidationError' ||
        err.name === 'JsonWebTokenError' ||
        err.name === 'TokenExpiredError'
    ) {
        error = Object.assign(Object.create(Object.getPrototypeOf(err)), err);

        if (error instanceof multer.MulterError) error = handleMulterError(error);
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error, req.locale);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    }

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(error, req, res);
    } else {
        sendErrorProd(error, req, res);
    }
};

module.exports = globalErrorHandler;
