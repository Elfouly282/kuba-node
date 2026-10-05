const path = require('path');
const fs = require('fs');

/**
 * Persistent uploads root.
 * Set UPLOADS_PATH on the server to a folder OUTSIDE the deploy directory
 * so redeploys do not wipe product/banner/category images.
 * Example (Hostinger): UPLOADS_PATH=/home/USER/aurevia-uploads
 */
const getUploadsRoot = () => {
    if (process.env.UPLOADS_PATH) {
        return path.resolve(process.env.UPLOADS_PATH);
    }
    return path.join(__dirname, '../../uploads');
};

const getUploadsSubdir = (subfolder = '') => {
    const dir = subfolder
        ? path.join(getUploadsRoot(), subfolder)
        : getUploadsRoot();

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    return dir;
};

module.exports = { getUploadsRoot, getUploadsSubdir };
