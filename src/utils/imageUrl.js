/**
 * Converts a stored relative image path (e.g. "categories/abc.png")
 * into a full public URL (e.g. "https://kuba-app.com/uploads/categories/abc.png").
 *
 * Rules:
 *  - If the value is already a full URL (http/https), return it as-is.
 *  - If the value is falsy, return null.
 *  - Otherwise prepend BASE_URL + "/uploads/".
 *
 * BASE_URL is read from process.env.BASE_URL (set this in .env / config.env).
 * Falls back to an empty string so relative URLs still work.
 */
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    const base = (process.env.BASE_URL || '').replace(/\/$/, '');
    return `${base}/uploads/${imagePath}`;
};

/**
 * Strips a full URL back to a relative path for DB storage.
 * e.g. "https://kuba-app.com/uploads/categories/abc.png" → "categories/abc.png"
 * If already relative, returns as-is.
 */
const getRelativeImagePath = (imageUrl) => {
    if (!imageUrl) return imageUrl;
    // Strip protocol + host + /uploads/ prefix
    const match = imageUrl.match(/\/uploads\/(.+)$/);
    if (match) return match[1];
    return imageUrl;
};

module.exports = { getImageUrl, getRelativeImagePath };
