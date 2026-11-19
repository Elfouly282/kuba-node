const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        nameAr: {
            type: String,
            trim: true,
            default: '',
        },
        subtitle: {
            type: String,
            trim: true,
            default: '',
        },
        subtitleAr: {
            type: String,
            trim: true,
            default: '',
        },
        kind: {
            type: String,
            enum: ['on_arrival', 'platform'],
            default: 'platform',
        },
        builtin: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        requiresTerms: {
            type: Boolean,
            default: false,
        },
        sortOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id;
                delete ret.__v;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
