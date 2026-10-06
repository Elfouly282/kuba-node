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
};
