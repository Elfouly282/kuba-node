const path = require('path');
const fs = require('fs');
const OnboardingScreen = require('../../../../src/features/onboarding/models/onboardingScreenModel');
const APIError = require('../../../utils/apiError');

// ─── Helpers ────────────────────────────────────────────────────────────────

const deleteImageFile = (imagePath) => {
    if (!imagePath) return;
    const abs = path.join(__dirname, '..', '..', '..', '..', 'uploads', imagePath);
    try { fs.unlinkSync(abs); } catch (_) { }
};

// ─── GET ALL (includes inactive for admin) ───────────────────────────────────

exports.getAll = async (req, res, next) => {
    try {
        const screens = await OnboardingScreen
            .find()
            .setOptions({ includeInactive: true })
            .sort('order')
            .select('+active');

        res.status(200).json({
            status: 'success',
            results: screens.length,
            data: { screens },
        });
    } catch (err) { next(err); }
};

// ─── GET ONE ─────────────────────────────────────────────────────────────────

exports.getOne = async (req, res, next) => {
    try {
        const screen = await OnboardingScreen
            .findById(req.params.id)
            .setOptions({ includeInactive: true })
            .select('+active');

        if (!screen) return next(new APIError('errors.onboardingScreenNotFound', 404));

        res.status(200).json({
            status: 'success',
            data: { screen },
        });
    } catch (err) { next(err); }
};

// ─── CREATE ───────────────────────────────────────────────────────────────────

exports.create = async (req, res, next) => {
    try {
        const { titleEn, titleAr, descriptionEn, descriptionAr, order, active } = req.body;

        if (!titleEn || !titleAr) return next(new APIError('errors.missingFields', 400));

        const image = req.file ? `onboarding/${req.file.filename}` : null;

        const screen = await OnboardingScreen.create({
            titleEn,
            titleAr,
            descriptionEn: descriptionEn || '',
            descriptionAr: descriptionAr || '',
            image,
            order: order !== undefined ? Number(order) : 0,
            active: active !== undefined ? active === 'true' || active === true : true,
        });

        res.status(201).json({
            status: 'success',
            message: req.t('messages.onboardingScreenCreated'),
            data: { screen },
        });
    } catch (err) { next(err); }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────

exports.update = async (req, res, next) => {
    try {
        const screen = await OnboardingScreen
            .findById(req.params.id)
            .setOptions({ includeInactive: true });

        if (!screen) return next(new APIError('errors.onboardingScreenNotFound', 404));

        const allowed = ['titleEn', 'titleAr', 'descriptionEn', 'descriptionAr', 'order', 'active'];
        allowed.forEach((key) => {
            if (req.body[key] !== undefined) {
                screen[key] = key === 'active'
                    ? req.body[key] === 'true' || req.body[key] === true
                    : key === 'order'
                    ? Number(req.body[key])
                    : req.body[key];
            }
        });

        // Replace image if a new one was uploaded
        if (req.file) {
            deleteImageFile(screen.image);
            screen.image = `onboarding/${req.file.filename}`;
        }

        await screen.save();

        res.status(200).json({
            status: 'success',
            message: req.t('messages.onboardingScreenUpdated'),
            data: { screen },
        });
    } catch (err) { next(err); }
};

// ─── DELETE ───────────────────────────────────────────────────────────────────

exports.remove = async (req, res, next) => {
    try {
        const screen = await OnboardingScreen
            .findById(req.params.id)
            .setOptions({ includeInactive: true });

        if (!screen) return next(new APIError('errors.onboardingScreenNotFound', 404));

        deleteImageFile(screen.image);
        await screen.deleteOne();

        res.status(200).json({
            status: 'success',
            message: req.t('messages.onboardingScreenDeleted'),
        });
    } catch (err) { next(err); }
};

// ─── REORDER ──────────────────────────────────────────────────────────────────
// Body: { order: [{ id: "...", order: 0 }, { id: "...", order: 1 }, ...] }

exports.reorder = async (req, res, next) => {
    try {
        const { order } = req.body;

        if (!Array.isArray(order) || !order.length) {
            return next(new APIError('errors.missingFields', 400));
        }

        await Promise.all(
            order.map(({ id, order: idx }) =>
                OnboardingScreen.findByIdAndUpdate(
                    id,
                    { order: Number(idx) },
                    { new: true }
                )
            )
        );

        res.status(200).json({
            status: 'success',
            message: req.t('messages.onboardingScreensReordered'),
        });
    } catch (err) { next(err); }
};
