const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'validation.nameRequired'],
            trim: true,
            minlength: [2, 'validation.nameTooShort'],
            maxlength: [100, 'validation.nameTooLong'],
        },
        image: {
            type: String,
            trim: true,
            default: '',
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

module.exports = mongoose.model('Region', regionSchema);
