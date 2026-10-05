/**
 * Turns a name into a URL-friendly slug, e.g. "Luxury Perfumes" -> "luxury-perfumes".
 * Uses a unicode-aware letter/number match so Arabic names slugify correctly too,
 * e.g. "عطور فاخرة" -> "عطور-فاخرة".
 */
const generateSlug = (text = '') => {
    return text
        .toString()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-');
};

module.exports = { generateSlug };
