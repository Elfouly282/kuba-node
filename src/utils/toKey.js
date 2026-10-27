const slugify = require('slugify');

const toKey = (value) => slugify(String(value || '').replace(/[-_]+/g, ' '), {
    replacement: '_',
    lower: true,
    strict: true,
    trim: true,
});

module.exports = toKey;
