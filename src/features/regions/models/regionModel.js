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

regionSchema.pre('save', function (next) {
    if (this.points && Array.isArray(this.points) && this.points.length >= 3) {
        const ring = this.points.map((p) => [Number(p.longitude), Number(p.latitude)]);
        const first = ring[0];
        const last = ring[ring.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
            ring.push([first[0], first[1]]);
        }
        this.boundaries = {
            type: 'Polygon',
            coordinates: [ring],
        };

        const sumLat = this.points.reduce((acc, p) => acc + Number(p.latitude), 0);
        const sumLng = this.points.reduce((acc, p) => acc + Number(p.longitude), 0);
        this.center = {
            latitude: Number((sumLat / this.points.length).toFixed(6)),
            longitude: Number((sumLng / this.points.length).toFixed(6)),
        };
    } else if (this.points && this.points.length === 0) {
        this.boundaries = undefined;
        this.center = { latitude: null, longitude: null };
    }
    next();
});

module.exports = mongoose.model('Region', regionSchema);
