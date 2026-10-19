const mongoose = require('mongoose');

const unitTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'validation.nameRequired'],
            trim: true,
            minlength: [2, 'validation.nameTooShort'],
            maxlength: [100, 'validation.nameTooLong'],
        },
        nameAr: {
            type: String,
            trim: true,
            default: '',
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        icon: {
            type: String,
            trim: true,
            default: '',
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
            },
        ],
        pricingUnits: {
            type: [String],
            enum: ['per_night', 'per_hour', 'per_day', 'per_trip', 'fixed'],
            default: ['per_night'],
        },
        defaultPricingUnit: {
            type: String,
            enum: ['per_night', 'per_hour', 'per_day', 'per_trip', 'fixed'],
            default: 'per_night',
        },
        active: {
            type: Boolean,
            default: true,
        },
        order: {
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

unitTypeSchema.pre('save', function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = (this.slug || this.name)
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '_')
            .replace(/^_|_$/g, '');
    }
    next();
});

module.exports = mongoose.model('UnitType', unitTypeSchema);
