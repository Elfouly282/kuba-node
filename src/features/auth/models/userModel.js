const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'validation.nameRequired'],
            trim: true,
            minlength: [2, 'validation.nameTooShort'],
            maxlength: [50, 'validation.nameTooLong'],
        },
        email: {
            type: String,
            required: [true, 'validation.emailRequired'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'validation.emailInvalid'],
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
        // ── Email Verification ─────────────────────────────────────────────
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
            select: false,
        },
        emailVerificationExpires: {
            type: Date,
            select: false,
        },
        // ── Password Reset ─────────────────────────────────────────────────
        passwordResetToken: {
            type: String,
            select: false,
        },
        passwordResetExpires: {
            type: Date,
            select: false,
        },
        // ── Soft-delete / active flag ──────────────────────────────────────
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// ── Pre-save: hash password only when it's new or modified ─────────────────
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// ── Instance method: compare plain password to hashed ─────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// ── Query middleware: exclude inactive (deleted) users by default ──────────
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
