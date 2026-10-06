const mongoose = require('mongoose');

const onboardingScreenSchema = new mongoose.Schema(
    {
        titleEn: {
            type: String,
            required: [true, 'validation.titleRequired'],
            trim: true,
            maxlength: [120, 'validation.titleTooLong'],
        },
        titleAr: {
            type: String,
            required: [true, 'validation.titleRequired'],
            trim: true,
            maxlength: [120, 'validation.titleTooLong'],
        },
        descriptionEn: {
            type: String,
            trim: true,
            maxlength: [500, 'validation.descriptionTooLong'],
            default: '',
        },
        descriptionAr: {
            type: String,
            trim: true,
            maxlength: [500, 'validation.descriptionTooLong'],
            default: '',
        },
        image: {
            type: String,
            default: null,
        },
        order: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    { timestamps: true }
);

// Only return active screens in normal queries
onboardingScreenSchema.pre(/^find/, function (next) {
    if (!this.getOptions().includeInactive) {
        this.find({ active: { $ne: false } });
    }
    next();
});

module.exports = mongoose.model('OnboardingScreen', onboardingScreenSchema);
