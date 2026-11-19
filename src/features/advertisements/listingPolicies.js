const mongoose = require('mongoose');
const { escapeHtml, normalizeDescriptionHtml, stripHtml, styleDescription } = require('../../utils/descriptionHtml');

const TEXT_KEYS = ['booking', 'cancellation', 'houseRules', 'checkIn', 'payment'];
const TEXT_MAX = 20000;
const TITLE_MAX = 200;
const EXTRA_MAX = 8;

const policyTextSchema = new mongoose.Schema(
    {
        content: { type: String, trim: true, default: '', maxlength: TEXT_MAX },
        contentAr: { type: String, trim: true, default: '', maxlength: TEXT_MAX },
    },
    { _id: false }
);

const extraPolicySchema = new mongoose.Schema(
    {
        title: { type: String, trim: true, default: '', maxlength: TITLE_MAX },
        titleAr: { type: String, trim: true, default: '', maxlength: TITLE_MAX },
        content: { type: String, trim: true, default: '', maxlength: TEXT_MAX },
        contentAr: { type: String, trim: true, default: '', maxlength: TEXT_MAX },
    },
    { _id: true }
);

const listingPoliciesSchema = new mongoose.Schema(
    {
        booking: { type: policyTextSchema, default: undefined },
        cancellation: { type: policyTextSchema, default: undefined },
        houseRules: { type: policyTextSchema, default: undefined },
        checkIn: { type: policyTextSchema, default: undefined },
        payment: { type: policyTextSchema, default: undefined },
        extras: { type: [extraPolicySchema], default: undefined },
    },
    { _id: false }
);

const clip = (value, max) => String(value || '').trim().slice(0, max);

const LABELS = {
    booking: { en: 'Booking policy', ar: 'سياسة الحجز' },
    cancellation: { en: 'Cancellation policy', ar: 'سياسة الإلغاء' },
    houseRules: { en: 'House rules', ar: 'قواعد الإقامة' },
    checkIn: { en: 'Arrival instructions', ar: 'تعليمات الوصول' },
    payment: { en: 'Payment policy', ar: 'سياسة الدفع' },
};

const BLOCK_HTML = /^(<p\b|<ul\b|<ol\b|<h[2-4]\b|<blockquote\b|<div\b)/i;

const asPolicyHtml = (value) => {
    let html = normalizeDescriptionHtml(value);
    if (!html) return '';
    if (!BLOCK_HTML.test(html)) html = `<p>${html}</p>`;
    if (html.length <= TEXT_MAX) return html;
    return normalizeDescriptionHtml(stripHtml(html).slice(0, 4000));
};

const localizeBody = (policy, locale) => {
    if (!policy) return '';
    return locale === 'ar' ? (policy.contentAr || '') : (policy.content || '');
};

const sectionHtml = (title, body) => {
    const html = styleDescription(body);
    if (!html) return '';
    return `<section style="margin:0 0 16px;"><h2 style="margin:0 0 8px;font-size:16px;font-weight:700;color:#2D4F2E;">${escapeHtml(title)}</h2><div>${html}</div></section>`;
};

const buildPoliciesHtml = (policies, locale) => {
    const isAr = locale === 'ar';
    const lang = isAr ? 'ar' : 'en';
    const sections = TEXT_KEYS
        .map((key) => sectionHtml(LABELS[key][lang], localizeBody(policies[key], lang)))
        .filter(Boolean);

    (policies.extras || []).forEach((extra) => {
        const title = isAr
            ? (extra.titleAr || extra.title || 'سياسة إضافية')
            : (extra.title || extra.titleAr || 'Additional policy');
        const section = sectionHtml(title, localizeBody(extra, lang));
        if (section) sections.push(section);
    });

    if (!sections.length) return '';
    const dir = isAr ? 'rtl' : 'ltr';
    const align = isAr ? 'right' : 'left';
    return `<article dir="${dir}" style="font-family:Cairo,Tahoma,sans-serif;direction:${dir};text-align:${align};color:#0f172a;line-height:1.7;">${sections.join('')}</article>`;
};

const asPlain = (value) => {
    if (!value || typeof value !== 'object') return null;
    if (typeof value.toObject === 'function') return value.toObject();
    return value;
};

const parseInput = (input) => {
    if (input === undefined) return undefined;
    if (input === null || input === '') return null;
    if (typeof input === 'string') {
        try {
            return JSON.parse(input);
        } catch (_) {
            return undefined;
        }
    }
    return input;
};

const readTextPolicy = (source) => ({
    content: asPolicyHtml(source?.content),
    contentAr: asPolicyHtml(source?.contentAr),
});

const readExtra = (item) => {
    if (!item || typeof item !== 'object') return null;
    const extra = {
        title: clip(item.title, TITLE_MAX),
        titleAr: clip(item.titleAr, TITLE_MAX),
        content: asPolicyHtml(item.content),
        contentAr: asPolicyHtml(item.contentAr),
    };
    if (!extra.title && !extra.titleAr && !extra.content && !extra.contentAr) return null;
    const id = item._id || item.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) extra._id = id;
    return extra;
};

// A patch: a text key set to null means "clear it". Missing keys are left alone.
const normalizeListingPolicies = (input) => {
    const source = parseInput(input);
    if (source === undefined) return undefined;
    if (source === null) return null;
    if (typeof source !== 'object' || Array.isArray(source)) return undefined;

    const policies = {};
    TEXT_KEYS.forEach((key) => {
        if (source[key] === undefined) return;
        if (source[key] === null || source[key] === '') {
            policies[key] = null;
            return;
        }
        const text = readTextPolicy(source[key]);
        policies[key] = (text.content || text.contentAr) ? text : null;
    });

    if (source.extras !== undefined) {
        const list = Array.isArray(source.extras) ? source.extras : [];
        policies.extras = list.map(readExtra).filter(Boolean).slice(0, EXTRA_MAX);
    }

    return policies;
};

const mergeListingPolicies = (current, next) => {
    if (next === null) return undefined;
    if (!next) return compactPolicies(asPlain(current) || {});

    const merged = { ...(asPlain(current) || {}) };
    TEXT_KEYS.forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(next, key)) return;
        if (next[key] == null) delete merged[key];
        else merged[key] = next[key];
    });
    if (Object.prototype.hasOwnProperty.call(next, 'extras')) {
        if (next.extras.length) merged.extras = next.extras;
        else delete merged.extras;
    }
    return compactPolicies(merged);
};

const hasText = (policy) => Boolean(policy && (policy.content || policy.contentAr));

const compactPolicies = (policies) => {
    if (!policies || typeof policies !== 'object') return undefined;
    const compact = {};
    TEXT_KEYS.forEach((key) => {
        if (!hasText(policies[key])) return;
        const text = {
            content: asPolicyHtml(policies[key].content),
            contentAr: asPolicyHtml(policies[key].contentAr),
        };
        if (text.content || text.contentAr) compact[key] = text;
    });
    const extras = (Array.isArray(policies.extras) ? policies.extras : [])
        .map(readExtra)
        .filter(Boolean)
        .slice(0, EXTRA_MAX);
    if (extras.length) compact.extras = extras;
    return Object.keys(compact).length ? compact : undefined;
};

const publicPolicies = (policies) => {
    const compact = compactPolicies(asPlain(policies));
    if (!compact) return undefined;
    const html = buildPoliciesHtml(compact, 'en');
    const htmlAr = buildPoliciesHtml(compact, 'ar');
    if (html) compact.html = html;
    if (htmlAr) compact.htmlAr = htmlAr;
    return compact;
};

listingPoliciesSchema.pre('validate', function (next) {
    TEXT_KEYS.forEach((key) => {
        const item = this[key];
        if (!item) return;
        item.content = asPolicyHtml(item.content);
        item.contentAr = asPolicyHtml(item.contentAr);
    });
    if (Array.isArray(this.extras)) {
        this.extras.forEach((extra) => {
            extra.content = asPolicyHtml(extra.content);
            extra.contentAr = asPolicyHtml(extra.contentAr);
        });
    }
    next();
});

const snapshotPolicies = (policies) => publicPolicies(policies);

module.exports = {
    TEXT_KEYS,
    listingPoliciesSchema,
    normalizeListingPolicies,
    mergeListingPolicies,
    publicPolicies,
    snapshotPolicies,
};
