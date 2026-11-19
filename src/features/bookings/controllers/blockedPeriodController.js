const mongoose = require('mongoose');
const Advertisement = require('../../advertisements/models/advertisementModel');
const BlockedPeriod = require('../models/blockedPeriodModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const {
    formatBlock,
    parseBlock,
    assertBlockStillOpen,
    assertBlockRoom,
    listManagedBlocks,
} = require('../blockedPeriods');

const loadManagedAd = async (req) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new APIError('errors.invalidAdvertisementId', 400);
    }

    const ad = await Advertisement.findById(req.params.id).select('owner');
    if (!ad) throw new APIError('errors.advertisementNotFound', 404);

    if (req.user?.role === 'admin') return ad;

    const ownsListing = (req.user?.role === 'owner' || req.user?.role === 'advertiser')
        && ad.owner
        && String(ad.owner) === String(req.user._id);

    if (!ownsListing) throw new APIError('errors.adNotOwned', 403);
    return ad;
};

exports.listBlockedPeriods = async (req, res) => {
    const ad = await loadManagedAd(req);
    const blocks = await listManagedBlocks(ad._id);

    SuccessResponse.ok(res, {
        results: blocks.length,
        data: { blockedPeriods: blocks.map(formatBlock) },
    });
};

exports.createBlockedPeriod = async (req, res) => {
    const ad = await loadManagedAd(req);
    const parsed = assertBlockStillOpen(parseBlock(req.body || {}));
    const room = await assertBlockRoom(ad, req.body?.room);
    const createdBy = req.user?._id && mongoose.Types.ObjectId.isValid(req.user._id) ? req.user._id : null;

    const block = await BlockedPeriod.create({
        advertisement: ad._id,
        room,
        createdBy,
        ...parsed,
    });

    SuccessResponse.created(res, {
        message: req.t('messages.blockedPeriodCreated'),
        data: { blockedPeriod: formatBlock(block) },
    });
};

exports.deleteBlockedPeriod = async (req, res) => {
    const ad = await loadManagedAd(req);
    if (!mongoose.Types.ObjectId.isValid(req.params.blockId)) {
        throw new APIError('errors.blockedPeriodNotFound', 404);
    }

    const block = await BlockedPeriod.findOne({ _id: req.params.blockId, advertisement: ad._id });
    if (!block) throw new APIError('errors.blockedPeriodNotFound', 404);

    await block.deleteOne();

    SuccessResponse.ok(res, {
        message: req.t('messages.blockedPeriodDeleted'),
        data: { id: block._id },
    });
};
