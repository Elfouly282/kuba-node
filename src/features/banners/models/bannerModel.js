const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, 'validation.imageRequired'],
            trim: true,
        },
        advertisementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Advertisement',
            required: [true, 'validation.advertisementRequired'],
        },
        position: {
            type: String,
            enum: {
                values: ['top', 'center', 'bottom'],
                message: 'validation.invalidPosition',
            },
            default: 'top',
            trim: true,
            lowercase: true,
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

module.exports = mongoose.model('Banner', bannerSchema);
