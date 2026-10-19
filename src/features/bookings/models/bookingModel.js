const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        advertisement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Advertisement',
            required: [true, 'validation.advertisementRequired'],
            index: true,
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
        notes: {
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

bookingSchema.pre('validate', function (next) {
    if (this.endDate && this.startDate && this.endDate <= this.startDate) {
        this.invalidate('endDate', 'validation.endDateMustBeAfterStart');
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
