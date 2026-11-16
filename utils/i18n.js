const en = require('../locales/en.json');
const ar = require('../locales/ar.json');

const dictionaries = { en, ar };
const SUPPORTED_LOCALES = Object.keys(dictionaries);
const DEFAULT_LOCALE = 'en';

const getNested = (obj, path) =>
    path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);

const interpolate = (template, vars = {}) =>
    template.replace(/{{\s*(\w+)\s*}}/g, (match, name) => (vars[name] !== undefined ? vars[name] : match));

/**
 * Translates a dot-notation key into the given locale, falling back to the
 * default locale (and finally to the raw key) if no translation is found.
 */
const translate = (locale, key, vars = {}) => {
    const dictionary = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
    const template =
        getNested(dictionary, key) ?? getNested(dictionaries[DEFAULT_LOCALE], key) ?? key;
    return interpolate(template, vars);
};

/**
 * Resolves the best supported locale from an `Accept-Language` header value,
 * respecting quality (`;q=`) weighting. Defaults to English.
 *
 * Examples: "ar", "ar-EG", "en-US,en;q=0.9,ar;q=0.8"
 */
const detectLocale = (acceptLanguageHeader = '') => {
    if (!acceptLanguageHeader) return DEFAULT_LOCALE;

    const languages = acceptLanguageHeader
        .split(',')
        .map((entry) => {
            const [tag, qPart] = entry.trim().split(';q=');
            return {
                code: (tag || '').trim().split('-')[0].toLowerCase(),
                quality: qPart ? parseFloat(qPart) : 1,
            };
        })
        .filter((lang) => lang.code)
        .sort((a, b) => b.quality - a.quality);

    const match = languages.find((lang) => SUPPORTED_LOCALES.includes(lang.code));
    return match ? match.code : DEFAULT_LOCALE;
};

/**
 * Express middleware: resolves the request locale from the `Accept-Language`
 * header (with an optional `?lang=` query override for easy manual testing),
 * then exposes `req.locale` and a `req.t(key, vars)` translation helper.
 */
const normalizeLocale = (value) => {
    const code = String(value || '').trim().toLowerCase().split(/[-_]/)[0];
    return SUPPORTED_LOCALES.includes(code) ? code : null;
};

/**
 * Locale priority: `lang` header, then `?lang=`, then `Accept-Language`.
 * The mobile app sends `lang: ar` or `lang: en`.
 */
const i18nMiddleware = (req, res, next) => {
    const headerLocale = normalizeLocale(req.headers.lang || req.headers['x-lang']);
    const queryLocale = normalizeLocale(req.query?.lang);
    req.locale = headerLocale || queryLocale || detectLocale(req.headers['accept-language']);
    req.localeExact = String(req.headers['x-locale-exact'] || '') === '1';
    req.t = (key, vars) => translate(req.locale, key, vars);

    res.setHeader('Content-Language', req.locale);
    next();
};

module.exports = {
    translate,
    detectLocale,
    normalizeLocale,
    i18nMiddleware,
    SUPPORTED_LOCALES,
    DEFAULT_LOCALE,
};
