const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Advertisement',
            required: [true, 'validation.hotelRequired'],
            index: true,
        },
        roomNumber: {
            type: String,
            trim: true,
            default: '',
        },
        title: {
            type: String,
            required: [true, 'validation.titleRequired'],
            trim: true,
            maxlength: [200, 'validation.titleTooLong'],
        },
        titleAr: {
            type: String,
            trim: true,
            default: '',
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        descriptionAr: {
            type: String,
            trim: true,
            default: '',
        },
        roomType: {
            type: String,
            enum: ['standard', 'deluxe', 'suite', 'junior_suite', 'royal_suite', 'studio', 'family', 'chalet_room', 'other'],
            default: 'standard',
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
                enum: ['per_night', 'per_day'],
                default: 'per_night',
            },
        },
        capacity: {
            adults: {
                type: Number,
                default: 2,
                min: [1, 'validation.invalidGuests'],
            },
            children: {
                type: Number,
                default: 0,
                min: 0,
            },
            maxGuests: {
                type: Number,
                default: 2,
                min: [1, 'validation.invalidGuests'],
            },
        },
        beds: {
            count: {
                type: Number,
                default: 1,
                min: 1,
            },
            bedType: {
                type: String,
                default: 'King Bed',
                trim: true,
            },
        },
        bathrooms: {
            type: Number,
            default: 1,
            min: 1,
        },
        area: {
            type: Number,
            default: null,
        },
        amenities: {
            type: [String],
            default: [],
        },
        image: {
            type: String,
            default: '',
        },
        images: {
            type: [String],
            default: [],
        },
        unitType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UnitType',
            default: null,
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

roomSchema.pre('validate', function (next) {
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

    if (!this.capacity) {
        this.capacity = {};
    }
    if (!this.capacity.maxGuests) {
        this.capacity.maxGuests = (Number(this.capacity.adults) || 2) + (Number(this.capacity.children) || 0);
    }

    next();
});

roomSchema.index({ hotel: 1, active: 1, 'pricing.finalPrice': 1 });
roomSchema.index({ hotel: 1, 'capacity.maxGuests': 1 });

module.exports = mongoose.model('Room', roomSchema);
