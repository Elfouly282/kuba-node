const mongoose = require('mongoose');

const policySchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        titleEn: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
        titleAr: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
        contentEn: {
            type: String,
            required: true,
            maxlength: 50000,
        },
        contentAr: {
            type: String,
            required: true,
            maxlength: 50000,
        },
        contactEmail: {
            type: String,
            trim: true,
            default: 'KUBA.tours@gmail.com',
            maxlength: 200,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Policy', policySchema);
