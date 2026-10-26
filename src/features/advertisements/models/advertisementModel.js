const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'validation.titleRequired'],
            trim: true,
            maxlength: [200, 'validation.titleTooLong'],
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        type: {
            type: String,
            default: 'apartment',
        },
        unitType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UnitType',
            default: null,
            index: true,
        },
        price: {
            type: Number,
            default: 0,
        },
        pricing: {
            basePrice: {
                type: Number,
                default: 0,
                min: [0, 'validation.invalidPrice'],
            },
            discountType: {
                type: String,
                enum: ['none', 'percentage', 'fixed'],
                default: 'none',
            },
            discountValue: {
                type: Number,
                default: 0,
                min: [0, 'validation.invalidDiscount'],
            },
            finalPrice: {
                type: Number,
                default: 0,
                min: [0, 'validation.invalidPrice'],
            },
            currency: {
                type: String,
                default: 'EGP',
                trim: true,
            },
            pricingUnit: {
                type: String,
                enum: ['per_night', 'per_hour', 'per_day', 'per_trip', 'fixed'],
                default: 'per_night',
            },
            offerStartDate: {
                type: Date,
                default: null,
            },
            offerEndDate: {
                type: Date,
                default: null,
            },
            minDuration: {
                type: Number,
                default: 1,
                min: [1, 'validation.minDuration'],
            },
        },
        location: {
            type: String,
            trim: true,
            default: '',
        },
        address: {
            type: String,
            trim: true,
            default: '',
        },
        latitude: {
            type: Number,
            default: null,
        },
        longitude: {
            type: Number,
            default: null,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
            index: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
            default: null,
            index: true,
        },
        region: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Region',
            default: null,
            index: true,
        },
        image: {
            type: String,
            default: '',
        },
        images: {
            type: [String],
            default: [],
        },
        attributes: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        status: {
            type: String,
            enum: ['draft', 'pending', 'published', 'archived'],
            default: 'published',
            index: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
            index: true,
        },
        active: {
            type: Boolean,
            default: true,
            index: true,
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

advertisementSchema.pre('validate', function (next) {
    if (!this.pricing) {
        this.pricing = {};
    }

    if (this.pricing.basePrice === undefined || this.pricing.basePrice === null || this.pricing.basePrice === 0) {
        if (this.price && this.price > 0) {
            this.pricing.basePrice = Number(this.price);
        }
    }

    const base = Number(this.pricing.basePrice) || 0;
    const discountType = this.pricing.discountType || 'none';
    const discountVal = Number(this.pricing.discountValue) || 0;

    let final = base;

    if (discountType === 'percentage') {
        const validPct = Math.max(0, Math.min(100, discountVal));
        final = Math.max(0, base - (base * validPct) / 100);
    } else if (discountType === 'fixed') {
        final = Math.max(0, base - Math.max(0, discountVal));
    }

    this.pricing.finalPrice = Math.round(final * 100) / 100;
    this.price = this.pricing.finalPrice;

    if (this.image && (!this.images || this.images.length === 0)) {
        this.images = [this.image];
    } else if ((!this.image || this.image === '') && this.images && this.images.length > 0) {
        this.image = this.images[0];
    }

    next();
});

advertisementSchema.index({ category: 1, active: 1, 'pricing.finalPrice': 1 });
advertisementSchema.index({ unitType: 1, active: 1, 'pricing.finalPrice': 1 });
advertisementSchema.index({ region: 1, active: 1 });
advertisementSchema.index({ city: 1, active: 1 });
advertisementSchema.index({ title: 'text', description: 'text', location: 'text', address: 'text' });

module.exports = mongoose.model('Advertisement', advertisementSchema);
