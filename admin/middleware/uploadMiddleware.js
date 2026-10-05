
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const APIError = require('../utils/apiError');
const { getUploadsSubdir } = require('../../src/config/uploadsPath');

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const createStorage = (subfolder = '') => {
    const uploadPath = getUploadsSubdir(subfolder);

    return multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
            const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
            const ext = path.extname(file.originalname).toLowerCase();
            cb(null, `${unique}${ext}`);
        },
    });
};

const fileFilter = (_req, file, cb) => {
    const allowed = /^image\/(jpeg|jpg|png|gif|webp|svg\+xml)$/i;
    if (allowed.test(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new APIError('errors.invalidImageType', 400), false);
    }
};

// Middleware to verify that saved files are not empty/corrupted
const verifyUploadedFiles = (req, res, next) => {
    if (!req.files && !req.file) return next();

    const filesToCheck = [];

    if (req.file) {
        filesToCheck.push(req.file);
    } else if (Array.isArray(req.files)) {
        filesToCheck.push(...req.files);
    } else if (req.files && typeof req.files === 'object') {
        Object.values(req.files).forEach((group) => filesToCheck.push(...group));
    }

    for (const file of filesToCheck) {
        if (!file.size || file.size === 0) {
            // Remove the empty file
            try { fs.unlinkSync(file.path); } catch (_) { }
            return next(new APIError('errors.invalidImageType', 400));
        }
    }

    next();
};

const uploadSingle = (fieldName, subfolder = '') => {
    const upload = multer({
        storage: createStorage(subfolder),
        limits: { fileSize: MAX_FILE_SIZE },
        fileFilter,
    });
    return [upload.single(fieldName), verifyUploadedFiles];
};

const uploadMultiple = (fieldName, maxCount = 10, subfolder = '') => {
    const upload = multer({
        storage: createStorage(subfolder),
        limits: { fileSize: MAX_FILE_SIZE },
        fileFilter,
    });
    return [upload.array(fieldName, maxCount), verifyUploadedFiles];
};

const uploadFields = (fields, subfolder = '') => {
    const upload = multer({
        storage: createStorage(subfolder),
        limits: { fileSize: MAX_FILE_SIZE },
        fileFilter,
    });
    return [upload.fields(fields), verifyUploadedFiles];
};

module.exports = { uploadSingle, uploadMultiple, uploadFields };
