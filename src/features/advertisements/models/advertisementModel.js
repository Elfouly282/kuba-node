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
            enum: ['hotel', 'apartment', 'chalet', 'resort', 'villa', 'unit', 'other'],
            default: 'apartment',
        },
        price: {
            type: Number,
            default: 0,
        },
        location: {
            type: String,
            trim: true,
            default: '',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        image: {
            type: String,
            default: '',
        },
        active: {
            type: Boolean,
            default: true,
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

module.exports = mongoose.model('Advertisement', advertisementSchema);
