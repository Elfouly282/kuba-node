const { DEFAULT_LOCALE } = require('./i18n');

/**
 * Picks the En/Ar value for a bilingual field based on locale.
 * Falls back to the other language, then empty string.
 */
const pickLocalized = (doc, baseField, locale = DEFAULT_LOCALE) => {
    if (!doc) return '';
    const en = doc[`${baseField}En`];
    const ar = doc[`${baseField}Ar`];
    if (locale === 'ar') return (ar || en || '').toString();
    return (en || ar || '').toString();
};

const toPlain = (doc) => {
    if (!doc) return doc;
    if (typeof doc.toObject === 'function') return doc.toObject();
    if (typeof doc.toJSON === 'function') return doc.toJSON();
    return { ...doc };
};

/**
 * Storefront: one key per text field. Value follows Accept-Language.
 * Storage still uses nameEn/nameAr — they are stripped from the response.
 *
 * Accept-Language: ar  →  { name: "حقيبة جلدية", description: "..." }
 * Accept-Language: en  →  { name: "Leather Handbag", description: "..." }
 */
const localizeDoc = (doc, fields, locale = DEFAULT_LOCALE) => {
    if (!doc) return doc;

    const plain = toPlain(doc);
    const localized = {};

    for (const [key, value] of Object.entries(plain)) {
        const isBilingualKey = fields.some(
            (field) => key === `${field}En` || key === `${field}Ar`
        );
        if (!isBilingualKey) localized[key] = value;
    }

    for (const field of fields) {
        localized[field] = pickLocalized(plain, field, locale);
    }

    return localized;
};

const localizeDocs = (docs, fields, locale = DEFAULT_LOCALE) =>
    (docs || []).map((doc) => localizeDoc(doc, fields, locale));

/** Snapshot both languages for cart/order line items (DB storage only). */
const bilingualNameSnapshot = (product) => ({
    nameEn: product?.nameEn || product?.name || '',
    nameAr: product?.nameAr || '',
});

const PRODUCT_FIELDS = ['name', 'description'];
const CATEGORY_FIELDS = ['name'];
const BRAND_FIELDS = ['name', 'description'];
const BANNER_FIELDS = ['title', 'subtitle'];
const SHIPPING_FIELDS = ['name', 'description', 'estimatedDays'];
const COUPON_FIELDS = ['description'];
const PAGE_FIELDS = ['title', 'subtitle', 'content', 'address'];
const JOURNAL_FIELDS = ['title', 'description'];
const ONBOARDING_FIELDS = ['title', 'description'];

const localizeProduct = (doc, locale) => localizeDoc(doc, PRODUCT_FIELDS, locale);
const localizeProducts = (docs, locale) => localizeDocs(docs, PRODUCT_FIELDS, locale);
const localizeCategory = (doc, locale) => localizeDoc(doc, CATEGORY_FIELDS, locale);
const localizeCategories = (docs, locale) => localizeDocs(docs, CATEGORY_FIELDS, locale);
const localizeBrand = (doc, locale) => localizeDoc(doc, BRAND_FIELDS, locale);
const localizeBrands = (docs, locale) => localizeDocs(docs, BRAND_FIELDS, locale);
const localizeBanner = (doc, locale) => localizeDoc(doc, BANNER_FIELDS, locale);
const localizeBanners = (docs, locale) => localizeDocs(docs, BANNER_FIELDS, locale);
const localizeShipping = (doc, locale) => localizeDoc(doc, SHIPPING_FIELDS, locale);
const localizeShippingMethods = (docs, locale) => localizeDocs(docs, SHIPPING_FIELDS, locale);
const localizeCoupon = (doc, locale) => localizeDoc(doc, COUPON_FIELDS, locale);
const localizePage = (doc, locale) => localizeDoc(doc, PAGE_FIELDS, locale);
const localizePages = (docs, locale) => localizeDocs(docs, PAGE_FIELDS, locale);
const localizeJournal = (doc, locale) => localizeDoc(doc, JOURNAL_FIELDS, locale);
const localizeJournals = (docs, locale) => localizeDocs(docs, JOURNAL_FIELDS, locale);
const localizeOnboardingScreen = (doc, locale) => localizeDoc(doc, ONBOARDING_FIELDS, locale);
const localizeOnboardingScreens = (docs, locale) => localizeDocs(docs, ONBOARDING_FIELDS, locale);

const localizeLineItem = (item, locale = DEFAULT_LOCALE) =>
    localizeDoc(item, ['name'], locale);

const localizeCart = (cart, locale = DEFAULT_LOCALE) => {
    if (!cart) return cart;
    const obj = toPlain(cart);
    obj.items = (obj.items || []).map((item) => localizeLineItem(item, locale));
    return obj;
};

const localizeOrder = (order, locale = DEFAULT_LOCALE) => {
    if (!order) return order;
    const obj = toPlain(order);
    obj.items = (obj.items || []).map((item) => localizeLineItem(item, locale));
    return obj;
};

const localizeOrders = (orders, locale = DEFAULT_LOCALE) =>
    (orders || []).map((order) => localizeOrder(order, locale));

const isAdminRequest = (req) => /\/api\/v1\/admin(\/|\?|$)/.test(String(req?.originalUrl || ''));

const responseLocale = (req) => (req?.locale === 'ar' ? 'ar' : 'en');

const isTextValue = (value) => {
    if (typeof value === 'string') return true;
    return Array.isArray(value) && value.every((item) => item == null || typeof item === 'string');
};

const pickText = (en, ar, locale = DEFAULT_LOCALE, exact = false) => {
    const englishList = Array.isArray(en) ? en.map((item) => String(item)) : null;
    const arabicList = Array.isArray(ar) ? ar.map((item) => String(item)) : null;
    if (englishList || arabicList) {
        const english = englishList || [];
        const arabic = arabicList || [];
        if (exact) return locale === 'ar' ? arabic : english;
        if (locale === 'ar') return arabic.length ? arabic : english;
        return english.length ? english : arabic;
    }

    const english = en == null ? '' : String(en);
    const arabic = ar == null ? '' : String(ar);
    if (exact) return locale === 'ar' ? arabic : english;
    if (locale === 'ar') return arabic || english;
    return english || arabic;
};

/**
 * Every response keeps a single `field`. The value follows `lang`.
 * Storage and write payloads still use `field` (English) and `fieldAr`.
 */
const presentTexts = (obj, fields, req) => {
    if (!obj || typeof obj !== 'object' || !req) return obj;
    const locale = responseLocale(req);
    const exact = Boolean(req.localeExact);

    fields.forEach((field) => {
        const english = obj[field] ?? obj[`${field}En`] ?? '';
        const arabic = obj[`${field}Ar`] ?? '';
        obj[field] = pickText(english, arabic, locale, exact);
        delete obj[`${field}Ar`];
        delete obj[`${field}En`];
    });

    return obj;
};

const presentOptions = (obj, req) => {
    if (!obj || typeof obj !== 'object' || !req) return obj;
    const english = Array.isArray(obj.options) ? obj.options.map((item) => String(item)) : [];
    const arabic = Array.isArray(obj.optionsAr) ? obj.optionsAr.map((item) => String(item)) : [];

    const locale = responseLocale(req);
    const exact = Boolean(req.localeExact);
    obj.options = english.map((item, index) => {
        if (exact) return locale === 'ar' ? (arabic[index] || '') : (item || '');
        return locale === 'ar' ? (arabic[index] || item) : (item || arabic[index] || '');
    });
    if (!english.length && arabic.length) {
        obj.options = exact && locale !== 'ar' ? [] : arabic.map((item) => String(item));
    }
    delete obj.optionsAr;
    return obj;
};

const mapOptionValue = (value, options, optionsAr, locale) => {
    const english = Array.isArray(options) ? options : [];
    const arabic = Array.isArray(optionsAr) ? optionsAr : [];
    const text = value == null ? '' : String(value);
    const englishIndex = english.findIndex((item) => String(item) === text);
    const arabicIndex = arabic.findIndex((item) => String(item) === text);
    if (locale === 'ar' && englishIndex >= 0 && arabic[englishIndex]) return arabic[englishIndex];
    if (locale !== 'ar' && arabicIndex >= 0 && english[arabicIndex]) return english[arabicIndex];
    return value;
};

const presentAttributeValues = (attributes, defs, locale) => {
    if (!attributes || typeof attributes !== 'object' || Array.isArray(attributes)) return attributes;
    const next = { ...attributes };
    (defs || []).forEach((def) => {
        if (!def?.key || !Object.prototype.hasOwnProperty.call(next, def.key)) return;
        const value = next[def.key];
        if (Array.isArray(value)) {
            next[def.key] = value.map((item) => mapOptionValue(item, def.options, def.optionsAr, locale));
            return;
        }
        if (def.dataType === 'single_select' || def.dataType === 'multi_select' || (def.options || []).length) {
            next[def.key] = mapOptionValue(value, def.options, def.optionsAr, locale);
        }
    });
    return next;
};

const presentStay = (stay, req) => {
    if (!stay || typeof stay !== 'object') return stay;
    const obj = { ...stay };
    presentTexts(obj, ['taxLabel'], req);
    if (Array.isArray(obj.addOns)) {
        obj.addOns = obj.addOns.map((item) => {
            const addon = { ...(typeof item?.toObject === 'function' ? item.toObject() : item) };
            presentTexts(addon, ['title', 'description'], req);
            return addon;
        });
    }
    return obj;
};

const SKIP_BILINGUAL_BASES = new Set(['url']);

const QUOTE_LINE_LABELS = {
    room: { en: 'Room total', ar: 'إجمالي الغرفة' },
    discount: { en: 'Discount', ar: 'الخصم' },
    cleaning: { en: 'Cleaning fee', ar: 'رسوم النظافة' },
    service: { en: 'Service fee', ar: 'رسوم الخدمة' },
    tax: { en: 'Taxes', ar: 'الضرائب' },
};

const UNIT_NAMES = {
    per_night: { en: ['night', 'nights'], ar: ['ليلة', 'ليالي'] },
    per_day: { en: ['day', 'days'], ar: ['يوم', 'أيام'] },
    per_hour: { en: ['hour', 'hours'], ar: ['ساعة', 'ساعات'] },
    per_trip: { en: ['trip', 'trips'], ar: ['رحلة', 'رحلات'] },
    fixed: { en: ['booking', 'bookings'], ar: ['حجز', 'حجوزات'] },
};

const PAYMENT_LABELS = {
    cash: { en: 'Pay on arrival', ar: 'عند الوصول' },
    on_arrival: { en: 'Pay on arrival', ar: 'عند الوصول' },
    card: { en: 'Card', ar: 'بطاقة' },
    wallet: { en: 'Wallet', ar: 'محفظة' },
    online: { en: 'Online', ar: 'أونلاين' },
    instapay: { en: 'InstaPay', ar: 'InstaPay' },
    fawry: { en: 'Fawry', ar: 'Fawry' },
    meeza: { en: 'Meeza', ar: 'Meeza' },
};

const PAYMENT_SUBTITLES = {
    fawry: { en: 'Cash & retail', ar: 'كاش ومنفذ دفع' },
    meeza: { en: 'Wallet', ar: 'محفظة' },
};

const unitName = (pricingUnit, quantity, locale) => {
    const names = UNIT_NAMES[pricingUnit] || { en: ['unit', 'units'], ar: ['وحدة', 'وحدات'] };
    const pair = locale === 'ar' ? names.ar : names.en;
    return Number(quantity) === 1 ? pair[0] : pair[1];
};

const collapseBilingual = (obj, locale, exact) => {
    const bases = new Set();
    Object.keys(obj).forEach((key) => {
        if (key.endsWith('Ar') && key.length > 2) bases.add(key.slice(0, -2));
        if (key.endsWith('En') && key.length > 2) bases.add(key.slice(0, -2));
    });

    bases.forEach((base) => {
        const enKey = `${base}En`;
        const arKey = `${base}Ar`;
        const hasEn = Object.prototype.hasOwnProperty.call(obj, enKey);
        const hasAr = Object.prototype.hasOwnProperty.call(obj, arKey);
        if (!hasEn && !hasAr) return;

        if (SKIP_BILINGUAL_BASES.has(base)) {
            delete obj[enKey];
            delete obj[arKey];
            return;
        }

        const baseValue = obj[base];
        const baseIsText = isTextValue(baseValue);
        if (baseValue !== undefined && baseValue !== null && !baseIsText) return;

        const english = baseIsText ? baseValue : (hasEn ? obj[enKey] : '');
        const arabic = hasAr ? obj[arKey] : '';
        if (!isTextValue(english) && !isTextValue(arabic)) return;

        obj[base] = pickText(
            isTextValue(english) ? english : '',
            isTextValue(arabic) ? arabic : '',
            locale,
            exact
        );
        delete obj[enKey];
        delete obj[arKey];
    });
};

const relabelKnownCopy = (obj, locale) => {
    const lang = locale === 'ar' ? 'ar' : 'en';
    if (obj && QUOTE_LINE_LABELS[obj.key]) {
        obj.label = QUOTE_LINE_LABELS[obj.key][lang];
        if (obj.key === 'service' && obj.percent != null) {
            obj.label = lang === 'ar'
                ? `رسوم الخدمة (${obj.percent}%)`
                : `Service fee (${obj.percent}%)`;
        }
        if (obj.key === 'tax') {
            const taxLabel = obj.taxLabel || (lang === 'ar' ? 'ضريبة' : 'VAT');
            obj.label = lang === 'ar'
                ? `الضرائب (${taxLabel} ${obj.percent}%)`
                : `Taxes (${taxLabel} ${obj.percent}%)`;
        }
        if (obj.key === 'room' && obj.quantity && obj.unit) {
            obj.quantityLabel = `${obj.quantity} ${unitName(obj.unit, obj.quantity, lang)}`;
        }
    }

    if (obj && obj.method && PAYMENT_LABELS[obj.method] && Object.prototype.hasOwnProperty.call(obj, 'methodLabel')) {
        const known = PAYMENT_LABELS[obj.method];
        const current = obj.methodLabel;
        if (!current || current === known.en || current === known.ar || current === obj.method) {
            obj.methodLabel = known[lang];
        }
    }

    if (obj && PAYMENT_SUBTITLES[obj.key] && Object.prototype.hasOwnProperty.call(obj, 'subtitle')) {
        const known = PAYMENT_SUBTITLES[obj.key];
        if (obj.subtitle === known.en || obj.subtitle === known.ar || obj.subtitle === '') {
            obj.subtitle = known[lang];
        }
    }
};

const isMongooseDocument = (value) => Boolean(
    value
    && typeof value === 'object'
    && typeof value.toObject === 'function'
    && (value.$__ || value.$isMongooseDocument)
);

/**
 * Collapses every bilingual field in a response to one key.
 * `lang: ar` returns Arabic, `lang: en` returns English.
 * `x-locale-exact: 1` keeps an empty translation empty instead of falling back.
 */
const localizePayload = (value, locale = DEFAULT_LOCALE, options = {}, seen = new WeakSet()) => {
    const exact = Boolean(options.exact);
    const lang = locale === 'ar' ? 'ar' : 'en';
    if (value == null || typeof value !== 'object') return value;
    if (value instanceof Date) return value;
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) return value;
    if (value._bsontype) return typeof value.toString === 'function' ? value.toString() : String(value);
    if (seen.has(value)) return null;

    if (isMongooseDocument(value)) {
        return localizePayload(value.toObject({ virtuals: true }), lang, options, seen);
    }

    if (Array.isArray(value)) {
        seen.add(value);
        return value.map((item) => localizePayload(item, lang, options, seen));
    }

    seen.add(value);
    const obj = {};
    Object.entries(value).forEach(([key, item]) => {
        obj[key] = localizePayload(item, lang, options, seen);
    });
    collapseBilingual(obj, lang, exact);
    relabelKnownCopy(obj, lang);
    return obj;
};

const presentReceiptLine = (line, locale = DEFAULT_LOCALE) => {
    if (!line || line.amount === undefined || line.amount === null) return null;
    const lang = locale === 'ar' ? 'ar' : 'en';
    const copy = { ...line };
    if (copy.taxLabel != null || copy.taxLabelAr != null) {
        copy.taxLabel = pickText(copy.taxLabel, copy.taxLabelAr, lang, false);
    }
    if (copy.label != null || copy.labelAr != null) {
        copy.label = pickText(copy.label, copy.labelAr, lang, false);
    }
    relabelKnownCopy(copy, lang);
    const row = {
        label: copy.label || '',
        amount: copy.amount,
    };
    if (copy.quantityLabel) row.quantityLabel = copy.quantityLabel;
    return row;
};

const localizeResponseMiddleware = (req, res, next) => {
    const original = res.json.bind(res);
    res.json = (body) => {
        try {
            return original(localizePayload(body, req.locale || DEFAULT_LOCALE, {
                exact: Boolean(req.localeExact),
            }));
        } catch (err) {
            console.error('localize response failed', err);
            return original(body);
        }
    };
    next();
};

const readPair = (body, field) => {
    const source = body || {};
    const english = source[field] !== undefined ? source[field] : source[`${field}En`];
    return {
        en: english == null ? '' : String(english).trim(),
        ar: source[`${field}Ar`] == null ? '' : String(source[`${field}Ar`]).trim(),
    };
};

module.exports = {
    pickLocalized,
    localizeDoc,
    localizeDocs,
    bilingualNameSnapshot,
    localizeProduct,
    localizeProducts,
    localizeCategory,
    localizeCategories,
    localizeBrand,
    localizeBrands,
    localizeBanner,
    localizeBanners,
    localizeShipping,
    localizeShippingMethods,
    localizeCoupon,
    localizePage,
    localizePages,
    localizeJournal,
    localizeJournals,
    localizeOnboardingScreen,
    localizeOnboardingScreens,
    localizeCart,
    localizeOrder,
    localizeOrders,
    isAdminRequest,
    responseLocale,
    pickText,
    presentTexts,
    presentOptions,
    presentAttributeValues,
    presentStay,
    localizePayload,
    presentReceiptLine,
    localizeResponseMiddleware,
    readPair,
};
