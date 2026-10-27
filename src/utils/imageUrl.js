const fs = require('fs');
const path = require('path');
const { getUploadsRoot } = require('../config/uploadsPath');

const isExternalUrl = (value) => /^https?:\/\//.test(value);

const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (isExternalUrl(imagePath)) return imagePath;
    const base = (process.env.BASE_URL || '').replace(/\/$/, '');
    return `${base}/uploads/${imagePath}`;
};

const getRelativeImagePath = (imageUrl) => {
    if (!imageUrl) return imageUrl;
    const match = imageUrl.match(/\/uploads\/(.+)$/);
    return match ? match[1] : imageUrl;
};

const deleteImageFile = (imagePath) => {
    if (!imagePath || typeof imagePath !== 'string' || isExternalUrl(imagePath)) return;
    const absPath = path.join(getUploadsRoot(), imagePath.replace(/^uploads[\\/]/, ''));
    try {
        fs.rmSync(absPath, { force: true });
    } catch (_) { }
};

module.exports = { getImageUrl, getRelativeImagePath, deleteImageFile };
