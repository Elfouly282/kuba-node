const PaymentMethod = require('./models/paymentMethodModel');
const APIError = require('../../utils/apiError');

const ON_ARRIVAL = {
    key: 'on_arrival',
    name: 'Pay on arrival',
    nameAr: 'عند الوصول',
    subtitle: 'Pay when you arrive',
    subtitleAr: 'الدفع عند الوصول',
    kind: 'on_arrival',
    builtin: true,
    active: true,
    requiresTerms: false,
    sortOrder: 0,
};

const ensureOnArrival = async () => {
    await PaymentMethod.updateOne(
        { key: ON_ARRIVAL.key },
        { $setOnInsert: ON_ARRIVAL },
        { upsert: true }
    );
};

const presentPublic = (method, locale = 'en') => {
    const arabic = locale === 'ar';
    return {
        key: method.key,
        label: arabic ? (method.nameAr || method.name) : (method.name || method.nameAr),
        subtitle: arabic
            ? (method.subtitleAr || method.subtitle || '')
            : (method.subtitle || method.subtitleAr || ''),
        kind: method.kind,
        requiresTerms: Boolean(method.requiresTerms),
    };
};

const listActive = async (locale = 'en') => {
    await ensureOnArrival();
    const methods = await PaymentMethod.find({ active: true }).sort({ sortOrder: 1, createdAt: 1 });
    return methods.map((method) => presentPublic(method, locale));
};

const resolvePayment = async (body = {}) => {
    await ensureOnArrival();
    const raw = String(body.paymentMethod || ON_ARRIVAL.key).trim().toLowerCase();
    const key = raw === 'cash' ? ON_ARRIVAL.key : raw;
    const method = await PaymentMethod.findOne({ key, active: true });
    if (!method) throw new APIError('validation.invalidPaymentMethod', 400);

    const accepted = body.acceptedTerms === true || body.acceptedTerms === 'true';
    if (method.requiresTerms && !accepted) throw new APIError('validation.termsRequired', 400);

    return {
        method: method.key,
        accepted,
        label: method.name || method.nameAr,
        labelAr: method.nameAr || method.name,
    };
};

module.exports = {
    ON_ARRIVAL,
    ensureOnArrival,
    listActive,
    resolvePayment,
};
