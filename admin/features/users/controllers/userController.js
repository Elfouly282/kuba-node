const mongoose = require('mongoose');
const User = require('../../../../src/features/auth/models/userModel');
const OnboardingScreen = require('../../../../src/features/onboarding/models/onboardingScreenModel');
const Category = require('../../../../src/features/categories/models/categoryModel');
const Banner = require('../../../../src/features/banners/models/bannerModel');
const Region = require('../../../../src/features/regions/models/regionModel');
const Advertisement = require('../../../../src/features/advertisements/models/advertisementModel');
const APIError = require('../../../utils/apiError');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({
                status: 'success',
                results: 0,
                total: 0,
                totalPages: 1,
                currentPage: 1,
                data: { users: [] },
                dbConnected: false,
            });
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const queryObj = {};

        if (req.query.search) {
            const regex = new RegExp(req.query.search.trim(), 'i');
            queryObj.$or = [{ name: regex }, { email: regex }, { phone: regex }];
        }

        if (req.query.role) {
            queryObj.role = req.query.role;
        }

        if (req.query.provider) {
            queryObj.provider = req.query.provider;
        }

        if (req.query.isEmailVerified !== undefined && req.query.isEmailVerified !== '') {
            queryObj.isEmailVerified = req.query.isEmailVerified === 'true';
        }

        if (req.query.active !== undefined && req.query.active !== '') {
            queryObj.active = req.query.active === 'true';
        }

        const total = await User.countDocuments(queryObj).setOptions({ includeInactive: true });
        const users = await User.find(queryObj)
            .setOptions({ includeInactive: true })
            .populate('region', 'name image')
            .select('+active')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            status: 'success',
            results: users.length,
            total,
            totalPages: Math.ceil(total / limit) || 1,
            currentPage: page,
            data: { users },
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserStats = async (_req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({
                status: 'success',
                data: {
                    totalUsers: 0,
                    activeUsers: 0,
                    inactiveUsers: 0,
                    verifiedUsers: 0,
                    googleUsers: 0,
                    localUsers: 0,
                    totalOnboarding: 0,
                    totalCategories: 0,
                    totalBanners: 0,
                    totalRegions: 0,
                    totalAdvertisements: 0,
                    recentUsers: [],
                    serverTime: new Date().toISOString(),
                    environment: process.env.NODE_ENV || 'development',
                    dbConnected: false,
                },
            });
        }

        const [
            totalUsers,
            activeUsers,
            inactiveUsers,
            verifiedUsers,
            googleUsers,
            localUsers,
            totalOnboarding,
            totalCategories,
            totalBanners,
            totalRegions,
            totalAdvertisements,
            recentUsers,
        ] = await Promise.all([
            User.countDocuments().setOptions({ includeInactive: true }),
            User.countDocuments({ active: { $ne: false } }).setOptions({ includeInactive: true }),
            User.countDocuments({ active: false }).setOptions({ includeInactive: true }),
            User.countDocuments({ isEmailVerified: true }).setOptions({ includeInactive: true }),
            User.countDocuments({ provider: 'google' }).setOptions({ includeInactive: true }),
            User.countDocuments({ provider: 'local' }).setOptions({ includeInactive: true }),
            OnboardingScreen.countDocuments().setOptions({ includeInactive: true }),
            Category.countDocuments(),
            Banner.countDocuments(),
            Region.countDocuments(),
            Advertisement.countDocuments(),
            User.find()
                .setOptions({ includeInactive: true })
                .populate('region', 'name')
                .select('+active')
                .sort({ createdAt: -1 })
                .limit(5),
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                totalUsers,
                activeUsers,
                inactiveUsers,
                verifiedUsers,
                googleUsers,
                localUsers,
                totalOnboarding,
                totalCategories,
                totalBanners,
                totalRegions,
                totalAdvertisements,
                recentUsers,
                serverTime: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development',
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .setOptions({ includeInactive: true })
            .select('+active');

        if (!user) {
            return next(new APIError('errors.userNotFound', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, phone, password, role, isEmailVerified, active } = req.body;

        if (!email || !password) {
            return next(new APIError('errors.missingFields', 400));
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() }).setOptions({ includeInactive: true });
        if (existingUser) {
            return next(new APIError('errors.emailAlreadyExists', 400));
        }

        const user = await User.create({
            name: name?.trim() || null,
            email: email.toLowerCase().trim(),
            phone: phone?.trim() || null,
            password,
            role: role || 'user',
            isEmailVerified: isEmailVerified === true || isEmailVerified === 'true',
            active: active !== false && active !== 'false',
        });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({
            status: 'success',
            data: { user: userObj },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .setOptions({ includeInactive: true })
            .select('+password +active');

        if (!user) {
            return next(new APIError('errors.userNotFound', 404));
        }

        const { name, phone, role, active, isEmailVerified, password } = req.body;

        if (name !== undefined) user.name = name.trim();
        if (phone !== undefined) user.phone = phone.trim();
        if (role !== undefined) user.role = role;
        if (active !== undefined) user.active = active === true || active === 'true';
        if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified === true || isEmailVerified === 'true';

        if (password && password.length >= 8) {
            user.password = password;
        }

        await user.save();

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({
            status: 'success',
            data: { user: userObj },
        });
    } catch (err) {
        next(err);
    }
};

exports.toggleUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .setOptions({ includeInactive: true })
            .select('+active');

        if (!user) {
            return next(new APIError('errors.userNotFound', 404));
        }

        user.active = !user.active;
        await user.save();

        res.status(200).json({
            status: 'success',
            data: {
                id: user._id,
                active: user.active,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).setOptions({ includeInactive: true });

        if (!user) {
            return next(new APIError('errors.userNotFound', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
};
