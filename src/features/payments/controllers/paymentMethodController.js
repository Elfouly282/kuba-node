const mongoose = require('mongoose');
const PaymentMethod = require('../models/paymentMethodModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const { readPair } = require('../../../../utils/localize');
const { ensureOnArrival } = require('../paymentMethods');

const RESERVED_KEYS = new Set(['on_arrival', 'cash']);

const slugify = (value) => String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);

const isFalse = (value) => value === false || value === 'false' || value === 0 || value === '0';
const isTrue = (value) => value === true || value === 'true' || value === 1 || value === '1';

const findMethod = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new APIError('errors.paymentMethodNotFound', 404);
    const method = await PaymentMethod.findById(id);
    if (!method) throw new APIError('errors.paymentMethodNotFound', 404);
    return method;
};

exports.list = async (req, res) => {
    await ensureOnArrival();
    const methods = await PaymentMethod.find().sort({ sortOrder: 1, createdAt: 1 });
    SuccessResponse.ok(res, {
        results: methods.length,
        data: { paymentMethods: methods.map((method) => method.toJSON()) },
    });
};

exports.create = async (req, res) => {
    const { en: name, ar: nameAr } = readPair(req.body, 'name');
    const { en: subtitle, ar: subtitleAr } = readPair(req.body, 'subtitle');
    if (!name && !nameAr) throw new APIError('validation.paymentMethodNameRequired', 400);

    let key = slugify(req.body.key || name);
    if (!key || RESERVED_KEYS.has(key)) key = `platform_${Date.now().toString(36)}`;

    const taken = await PaymentMethod.findOne({ key }).select('_id');
    if (taken) throw new APIError('validation.paymentMethodKeyTaken', 400);

    const last = await PaymentMethod.findOne().sort({ sortOrder: -1 }).select('sortOrder');
    const method = await PaymentMethod.create({
        key,
        name: name || nameAr,
        nameAr,
        subtitle,
        subtitleAr,
        kind: 'platform',
        builtin: false,
        active: !isFalse(req.body.active),
        requiresTerms: isTrue(req.body.requiresTerms),
        sortOrder: (Number(last?.sortOrder) || 0) + 1,
    });

    SuccessResponse.created(res, {
        message: req.t('messages.paymentMethodCreated'),
        data: { paymentMethod: method.toJSON() },
    });
};

exports.update = async (req, res) => {
    const method = await findMethod(req.params.id);
    const names = readPair(req.body, 'name');
    const subtitles = readPair(req.body, 'subtitle');

    if (req.body.name !== undefined || req.body.nameEn !== undefined || req.body.nameAr !== undefined) {
        const name = names.en || method.name;
        const nameAr = req.body.nameAr !== undefined ? names.ar : method.nameAr;
        if (!name && !nameAr) throw new APIError('validation.paymentMethodNameRequired', 400);
        method.name = name || nameAr;
        method.nameAr = nameAr;
    }

    if (req.body.subtitle !== undefined || req.body.subtitleEn !== undefined) method.subtitle = subtitles.en;
    if (req.body.subtitleAr !== undefined) method.subtitleAr = subtitles.ar;

    if (!method.builtin && req.body.active !== undefined) method.active = !isFalse(req.body.active);
    if (!method.builtin && req.body.requiresTerms !== undefined) method.requiresTerms = isTrue(req.body.requiresTerms);
    if (req.body.sortOrder !== undefined && Number.isFinite(Number(req.body.sortOrder))) {
        method.sortOrder = Number(req.body.sortOrder);
    }

    await method.save();
    SuccessResponse.ok(res, {
        message: req.t('messages.paymentMethodUpdated'),
        data: { paymentMethod: method.toJSON() },
    });
};

exports.remove = async (req, res) => {
    const method = await findMethod(req.params.id);
    if (method.builtin) throw new APIError('errors.paymentMethodLocked', 400);
    await method.deleteOne();
    SuccessResponse.ok(res, {
        message: req.t('messages.paymentMethodDeleted'),
    });
};
