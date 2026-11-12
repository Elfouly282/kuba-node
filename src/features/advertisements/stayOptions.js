const mongoose = require('mongoose');

const addOnSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            enum: ['meal', 'extra'],
            default: 'extra',
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { _id: true }
);

const staySchema = new mongoose.Schema(
    {
        cleaningFee: { type: Number, min: 0 },
        serviceFeePercent: { type: Number, min: 0, max: 100 },
        taxPercent: { type: Number, min: 0, max: 100 },
        taxLabel: { type: String, trim: true },
        checkInTime: { type: String, trim: true },
        checkOutTime: { type: String, trim: true },
        freeCancellationDays: { type: Number, min: 0 },
        breakfastIncluded: { type: Boolean },
        addOns: { type: [addOnSchema] },
    },
    { _id: false }
);

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

const numOrUndefined = (value) => {
    if (value === undefined || value === null || value === '') return undefined;
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0) return undefined;
    return Math.round(n * 100) / 100;
};

const normalizeAddOns = (list) => (Array.isArray(list) ? list : []).map((item) => {
    const price = numOrUndefined(item?.price);
    const title = String(item?.title || '').trim();
    if (!title || price === undefined) return null;

    const addOn = {
        title,
        description: String(item.description || '').trim(),
        price,
        category: item.category === 'meal' ? 'meal' : 'extra',
        active: item.active !== false && item.active !== 'false',
    };
    const id = item._id || item.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) addOn._id = id;
    return addOn;
}).filter(Boolean);

const normalizeStay = (input) => {
    if (input === undefined || input === null || input === '') return undefined;

    let source = input;
    if (typeof input === 'string') {
        try {
            source = JSON.parse(input);
        } catch (_) {
            return undefined;
        }
    }
    if (!source || typeof source !== 'object' || Array.isArray(source)) return undefined;

    const stay = {};
    const cleaningFee = numOrUndefined(source.cleaningFee);
    if (cleaningFee !== undefined) stay.cleaningFee = cleaningFee;

    const serviceFeePercent = numOrUndefined(source.serviceFeePercent);
    if (serviceFeePercent !== undefined) stay.serviceFeePercent = Math.min(100, serviceFeePercent);

    const taxPercent = numOrUndefined(source.taxPercent);
    if (taxPercent !== undefined) stay.taxPercent = Math.min(100, taxPercent);

    if (source.taxLabel !== undefined) stay.taxLabel = String(source.taxLabel || 'VAT').trim() || 'VAT';
    if (source.checkInTime !== undefined && TIME.test(String(source.checkInTime))) stay.checkInTime = String(source.checkInTime);
    if (source.checkOutTime !== undefined && TIME.test(String(source.checkOutTime))) stay.checkOutTime = String(source.checkOutTime);

    const freeCancellationDays = numOrUndefined(source.freeCancellationDays);
    if (freeCancellationDays !== undefined) stay.freeCancellationDays = Math.round(freeCancellationDays);

    if (source.breakfastIncluded !== undefined) {
        stay.breakfastIncluded = source.breakfastIncluded === true || source.breakfastIncluded === 'true';
    }
    if (source.addOns !== undefined) stay.addOns = normalizeAddOns(source.addOns);

    return stay;
};

module.exports = { staySchema, normalizeStay };
