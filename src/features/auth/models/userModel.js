const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: [2, 'validation.nameTooShort'],
            maxlength: [50, 'validation.nameTooLong'],
            default: null,
        },
        email: {
            type: String,
            required: [true, 'validation.emailRequired'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'validation.emailInvalid'],
        },
        phone: {
            type: String,
            trim: true,
            default: null,
        },
        password: {
            type: String,
            minlength: [8, 'validation.passwordTooShort'],
            select: false,
        },
        avatar: {
            type: String,
            default: null,
        },
        provider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local',
        },
        isEmailVerified: { type: Boolean, default: false },
        emailVerificationToken: { type: String, select: false },
        emailVerificationExpires: { type: Date, select: false },
        passwordResetToken: { type: String, select: false },
        passwordResetExpires: { type: Date, select: false },
        active: { type: Boolean, default: true, select: false },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

userSchema.pre(/^find/, function () {
    this.where({ active: { $ne: false } });
});

module.exports = mongoose.model('User', userSchema);
