const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        bookingType: {
            type: String,
            enum: ['hotel', 'chalet', 'yacht', 'golf_car', 'apartment', 'villa', 'general'],
            default: 'general',
            index: true,
        },
        advertisement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Advertisement',
            required: [true, 'validation.advertisementRequired'],
            index: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            default: null,
            index: true,
        },
        rentalType: {
            type: String,
            enum: ['hourly', 'full_day', 'daily', 'per_night', 'per_trip', 'fixed'],
            default: 'per_night',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'validation.userRequired'],
            index: true,
        },
        startDate: {
            type: Date,
            required: [true, 'validation.startDateRequired'],
        },
        endDate: {
            type: Date,
            required: [true, 'validation.endDateRequired'],
        },
        duration: {
            type: Number,
            required: true,
            min: [1, 'validation.minDuration'],
        },
        pricingUnit: {
            type: String,
            enum: ['per_night', 'per_hour', 'per_day', 'per_trip', 'fixed'],
            default: 'per_night',
        },
        unitPrice: {
            type: Number,
            required: true,
            min: [0, 'validation.invalidPrice'],
        },
        totalPrice: {
            type: Number,
            required: true,
            min: [0, 'validation.invalidPrice'],
        },
        reference: {
            type: String,
            unique: true,
            sparse: true,
        },
        priceBreakdown: {
            type: mongoose.Schema.Types.Mixed,
        },
        staySnapshot: {
            type: mongoose.Schema.Types.Mixed,
        },
        addOns: [
            {
                addOn: { type: mongoose.Schema.Types.ObjectId },
                title: { type: String, trim: true, default: '' },
                description: { type: String, trim: true, default: '' },
                price: { type: Number, default: 0, min: 0 },
                category: { type: String, trim: true, default: 'extra' },
            },
        ],
        acceptedTerms: {
            type: Boolean,
            default: false,
        },
        guestDetails: {
            adults: {
                type: Number,
                default: 1,
            },
            children: {
                type: Number,
                default: 0,
            },
            rooms: {
                type: Number,
                default: 1,
            },
            bookingFor: {
                type: String,
                enum: ['me', 'someone_else'],
                default: 'me',
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
                default: '',
            },
            phoneCountryCode: {
                type: String,
                trim: true,
                default: '',
            },
            phone: {
                type: String,
                trim: true,
                default: '',
            },
            firstName: {
                type: String,
                trim: true,
                default: '',
            },
            lastName: {
                type: String,
                trim: true,
                default: '',
            },
            fullName: {
                type: String,
                trim: true,
                default: '',
            },
            nationalIdOrPassport: {
                type: String,
                trim: true,
                default: '',
            },
            arrivalFrom: {
                type: String,
                trim: true,
                default: '',
            },
            arrivalTo: {
                type: String,
                trim: true,
                default: '',
            },
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
            index: true,
        },
        paymentStatus: {
            type: String,
            enum: ['unpaid', 'paid', 'refunded'],
            default: 'unpaid',
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'card', 'wallet', 'online', 'instapay', 'fawry', 'meeza'],
            default: 'cash',
        },
        notes: {
            type: String,
            trim: true,
            default: '',
        },
        cancellationReason: {
            type: String,
            trim: true,
            default: '',
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

bookingSchema.index({ advertisement: 1, startDate: 1, endDate: 1 });
bookingSchema.index({ room: 1, startDate: 1, endDate: 1 });
bookingSchema.index({ advertisement: 1, room: 1, status: 1 });
bookingSchema.index({ user: 1, status: 1 });

bookingSchema.pre('validate', function (next) {
    if (this.endDate && this.startDate && this.endDate <= this.startDate) {
        this.invalidate('endDate', 'validation.endDateMustBeAfterStart');
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
