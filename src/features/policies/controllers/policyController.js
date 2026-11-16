const mongoose = require('mongoose');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const Policy = require('../models/policyModel');
const {
    presentPolicy,
    loadPrivacyPolicy,
    pickLang,
    renderPrivacyHtml,
    defaultPrivacyPolicy,
} = require('../policyService');

exports.getPrivacyPolicy = async (req, res, next) => {
    try {
        const policy = await loadPrivacyPolicy();
        SuccessResponse.ok(res, { data: { policy: presentPolicy(policy) } });
    } catch (err) {
        next(err);
    }
};

exports.renderPrivacyPage = async (req, res, next) => {
    try {
        const policy = await loadPrivacyPolicy();
        const lang = pickLang(req);
        res.set('Cache-Control', 'no-cache');
        res.type('html').send(renderPrivacyHtml(policy, lang));
    } catch (err) {
        next(err);
    }
};

exports.updatePrivacyPolicy = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return next(new APIError('errors.somethingWentWrong', 503));
        }

        const titleEn = String(req.body.titleEn || '').trim();
        const titleAr = String(req.body.titleAr || '').trim();
        const contentEn = String(req.body.contentEn || '').trim();
        const contentAr = String(req.body.contentAr || '').trim();
        const contactEmail = String(req.body.contactEmail || '').trim();

        if (!titleEn || !titleAr || !contentEn || !contentAr) {
            return next(new APIError('errors.missingFields', 400));
        }
        if (contactEmail && !/^\S+@\S+\.\S+$/.test(contactEmail)) {
            return next(new APIError('errors.invalidEmail', 400));
        }

        await loadPrivacyPolicy();
        const policy = await Policy.findOneAndUpdate(
            { slug: 'privacy-policy' },
            {
                titleEn,
                titleAr,
                contentEn,
                contentAr,
                contactEmail: contactEmail || defaultPrivacyPolicy.contactEmail,
            },
            { new: true, runValidators: true }
        );

        SuccessResponse.ok(res, {
            message: req.t('messages.privacyPolicyUpdated'),
            data: { policy: presentPolicy(policy) },
        });
    } catch (err) {
        next(err);
    }
};
