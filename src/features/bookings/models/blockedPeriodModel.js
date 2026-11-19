const mongoose = require('mongoose');

const blockedPeriodSchema = new mongoose.Schema(
    {
        advertisement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Advertisement',
            required: true,
            index: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            default: null,
            index: true,
        },
        kind: {
            type: String,
            enum: ['hours', 'days', 'month'],
            required: true,
        },
        date: { type: String, default: '' },
        startTime: { type: String, default: '' },
        endTime: { type: String, default: '' },
        startDay: { type: String, default: '' },
        endDay: { type: String, default: '' },
        month: { type: String, default: '' },
        note: { type: String, default: '', maxlength: 200 },
        startsAt: { type: Date, required: true },
        endsAt: { type: Date, required: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
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

blockedPeriodSchema.index({ advertisement: 1, startsAt: 1, endsAt: 1 });

module.exports = mongoose.model('BlockedPeriod', blockedPeriodSchema);
