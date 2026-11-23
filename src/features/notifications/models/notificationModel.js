const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120,
        },
        body: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
        image: {
            type: String,
            default: '',
        },
        targetType: {
            type: String,
            enum: ['user', 'users', 'city', 'region'],
            required: true,
        },
        userIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
            default: null,
        },
        region: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Region',
            default: null,
        },
        sentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        stats: {
            matchedUsers: { type: Number, default: 0 },
            withToken: { type: Number, default: 0 },
            skippedNoToken: { type: Number, default: 0 },
            devices: { type: Number, default: 0 },
            sent: { type: Number, default: 0 },
            failed: { type: Number, default: 0 },
        },
        status: {
            type: String,
            enum: ['sent', 'partial', 'failed'],
            default: 'sent',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
