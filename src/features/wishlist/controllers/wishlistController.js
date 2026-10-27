const mongoose = require('mongoose');
const User = require('../../auth/models/userModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const { formatAdvertisement } = require('../../advertisements/controllers/advertisementController');
const { extractAdvertisementId } = require('../middleware/wishlistMiddleware');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');

exports.getWishlist = async (req, res, next) => {
    const user = await User.findById(req.user._id).select('wishlist');
    if (!user) {
        return next(new APIError('errors.userNotFound', 404));
    }

    const wishlistIds = user.wishlist || [];
    if (wishlistIds.length === 0) {
        return SuccessResponse.ok(res, {
            results: 0,
            total: 0,
            page: 1,
            totalPages: 1,
            data: { wishlist: [] },
        });
    }

    const advertisements = await Advertisement.find({
        _id: { $in: wishlistIds },
        active: { $ne: false },
    })
        .populate('category', 'name image')
        .populate('city', 'name image')
        .populate('region', 'name image')
        .populate('unitType', 'name nameAr slug icon pricingUnits defaultPricingUnit')
        .populate('owner', 'name email phone avatar');

    const foundAdIds = new Set(advertisements.map((ad) => ad._id.toString()));
    const staleIds = wishlistIds.filter((id) => !foundAdIds.has(id.toString()));
    if (staleIds.length > 0) {
        User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: { $in: staleIds } } }).exec();
    }

    const idIndexMap = new Map(wishlistIds.map((id, index) => [id.toString(), index]));
    advertisements.sort((a, b) => {
        const indexA = idIndexMap.get(a._id.toString()) ?? 0;
        const indexB = idIndexMap.get(b._id.toString()) ?? 0;
        return indexB - indexA;
    });

    const total = advertisements.length;
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    let pagedAds = advertisements;
    let totalPages = 1;
    let currentPage = 1;

    if (!isNaN(page) && !isNaN(limit) && limit > 0) {
        currentPage = Math.max(1, page);
        totalPages = Math.ceil(total / limit) || 1;
        const skip = (currentPage - 1) * limit;
        pagedAds = advertisements.slice(skip, skip + limit);
    }

    const formatted = pagedAds.map(formatAdvertisement);

    SuccessResponse.ok(res, {
        results: formatted.length,
        total,
        page: currentPage,
        totalPages,
        data: {
            wishlist: formatted,
        },
    });
};

exports.addToWishlist = async (req, res, next) => {
    const advertisementId = req.advertisementId || extractAdvertisementId(req);

    if (!advertisementId) {
        return next(new APIError('validation.advertisementRequired', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    const advertisement = await Advertisement.findById(advertisementId);
    if (!advertisement) {
        return next(new APIError('errors.advertisementNotFound', 404));
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { wishlist: advertisement._id } },
        { new: true }
    );

    if (!user) {
        return next(new APIError('errors.userNotFound', 404));
    }

    SuccessResponse.ok(res, {
        message: req.t('messages.addedToWishlist'),
        data: {
            inWishlist: true,
            advertisementId: advertisement._id,
            wishlist: user.wishlist,
        },
    });
};

exports.removeFromWishlist = async (req, res, next) => {
    const advertisementId = req.advertisementId || extractAdvertisementId(req);

    if (!advertisementId) {
        return exports.clearWishlist(req, res, next);
    }

    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { wishlist: advertisementId } },
        { new: true }
    );

    if (!user) {
        return next(new APIError('errors.userNotFound', 404));
    }

    SuccessResponse.ok(res, {
        message: req.t('messages.removedFromWishlist'),
        data: {
            inWishlist: false,
            advertisementId,
            wishlist: user.wishlist,
        },
    });
};

exports.toggleWishlist = async (req, res, next) => {
    const advertisementId = req.advertisementId || extractAdvertisementId(req);

    if (!advertisementId) {
        return next(new APIError('validation.advertisementRequired', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return next(new APIError('errors.invalidAdvertisementId', 400));
    }

    const advertisement = await Advertisement.findById(advertisementId);
    if (!advertisement) {
        return next(new APIError('errors.advertisementNotFound', 404));
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new APIError('errors.userNotFound', 404));
    }

    const isInWishlist = (user.wishlist || []).some(
        (id) => id.toString() === advertisementId.toString()
    );

    let updatedUser;
    let message;
    let inWishlist;

    if (isInWishlist) {
        updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { wishlist: advertisementId } },
            { new: true }
        );
        message = req.t('messages.removedFromWishlist');
        inWishlist = false;
    } else {
        updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { wishlist: advertisement._id } },
            { new: true }
        );
        message = req.t('messages.addedToWishlist');
        inWishlist = true;
    }

    SuccessResponse.ok(res, {
        message,
        data: {
            inWishlist,
            advertisementId: advertisement._id,
            wishlist: updatedUser.wishlist,
        },
    });
};

exports.clearWishlist = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { wishlist: [] },
        { new: true }
    );

    if (!user) {
        return next(new APIError('errors.userNotFound', 404));
    }

    SuccessResponse.ok(res, {
        message: req.t('messages.wishlistCleared'),
        data: {
            wishlist: [],
        },
    });
};
