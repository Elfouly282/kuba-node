const mongoose = require('mongoose');

const unitTypeAttributeSchema = new mongoose.Schema(
    {
        unitType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UnitType',
            required: [true, 'validation.unitTypeRequired'],
            index: true,
        },
        name: {
            type: String,
            required: [true, 'validation.nameRequired'],
            trim: true,
            maxlength: [100, 'validation.nameTooLong'],
        },
        nameAr: {
            type: String,
            trim: true,
            default: '',
        },
        key: {
            type: String,
            required: [true, 'validation.keyRequired'],
            trim: true,
            maxlength: [50, 'validation.keyTooLong'],
        },
        dataType: {
            type: String,
            required: [true, 'validation.dataTypeRequired'],
            enum: ['string', 'number', 'boolean', 'single_select', 'multi_select', 'date'],
            default: 'string',
        },
        required: {
            type: Boolean,
            default: false,
        },
        isArray: {
            type: Boolean,
            default: false,
        },
        showInDetails: {
            type: Boolean,
            default: true,
        },
        showInFilters: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
        options: {
            type: [String],
            default: [],
        },
        defaultValue: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },
        unit: {
            type: String,
            trim: true,
            default: '',
        },
        validation: {
            min: { type: Number, default: null },
            max: { type: Number, default: null },
            pattern: { type: String, default: null },
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

unitTypeAttributeSchema.index({ unitType: 1, key: 1 }, { unique: true });

module.exports = mongoose.model('UnitTypeAttribute', unitTypeAttributeSchema);
