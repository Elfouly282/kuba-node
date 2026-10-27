const mongoose = require('mongoose');
const { buildZoneGeometry } = require('../../../utils/geospatial');

const citySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'validation.nameRequired'],
            trim: true,
            minlength: [2, 'validation.nameTooShort'],
            maxlength: [100, 'validation.nameTooLong'],
            unique: true,
        },
        image: {
            type: String,
            trim: true,
            default: '',
        },
        active: {
            type: Boolean,
            default: true,
            index: true,
        },
        order: {
            type: Number,
            default: 0,
        },
        points: [
            {
                _id: false,
                latitude: {
                    type: Number,
                    required: true,
                },
                longitude: {
                    type: Number,
                    required: true,
                },
            },
        ],
        boundaries: {
            type: {
                type: String,
                enum: ['Polygon'],
                default: 'Polygon',
            },
            coordinates: {
                type: [[[Number]]],
                default: undefined,
            },
        },
        center: {
            latitude: { type: Number, default: null },
            longitude: { type: Number, default: null },
        },
        color: {
            type: String,
            default: '#2D4F2E',
            trim: true,
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

citySchema.virtual('regions', {
    ref: 'Region',
    localField: '_id',
    foreignField: 'city',
});

citySchema.pre('save', function (next) {
    const zone = buildZoneGeometry(this.points);
    if (zone) {
        this.boundaries = zone.boundaries;
        this.center = zone.center;
    } else if (this.points && this.points.length === 0) {
        this.boundaries = undefined;
        this.center = { latitude: null, longitude: null };
    }
    next();
});

module.exports = mongoose.model('City', citySchema);
