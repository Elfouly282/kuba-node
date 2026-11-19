const mongoose = require('mongoose');

const TEXT_KEYS = ['booking', 'cancellation', 'houseRules', 'checkIn', 'payment'];
const TEXT_MAX = 5000;
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
    content: clip(source?.content, TEXT_MAX),
    contentAr: clip(source?.contentAr, TEXT_MAX),
});

const readExtra = (item) => {
    if (!item || typeof item !== 'object') return null;
    const extra = {
        title: clip(item.title, TITLE_MAX),
        titleAr: clip(item.titleAr, TITLE_MAX),
        content: clip(item.content, TEXT_MAX),
        contentAr: clip(item.contentAr, TEXT_MAX),
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
        if (hasText(policies[key])) {
            compact[key] = {
                content: clip(policies[key].content, TEXT_MAX),
                contentAr: clip(policies[key].contentAr, TEXT_MAX),
            };
        }
    });
    const extras = (Array.isArray(policies.extras) ? policies.extras : [])
        .map(readExtra)
        .filter(Boolean)
        .slice(0, EXTRA_MAX);
    if (extras.length) compact.extras = extras;
    return Object.keys(compact).length ? compact : undefined;
};

const publicPolicies = (policies) => compactPolicies(asPlain(policies));

const snapshotPolicies = (policies) => publicPolicies(policies);

module.exports = {
    TEXT_KEYS,
    listingPoliciesSchema,
    normalizeListingPolicies,
    mergeListingPolicies,
    publicPolicies,
    snapshotPolicies,
};
