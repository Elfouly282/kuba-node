const { SuccessResponse } = require('../../../../src/utils/apiResponse');
const { deleteImageFile } = require('../../../../src/utils/imageUrl');
const {
    previewAudience,
    sendNotification,
    listNotifications,
    listRecipients,
} = require('../../../../src/features/notifications/notificationService');

const readImage = (req) => {
    if (req.file) return `notifications/${req.file.filename}`;
    const url = String(req.body.imageUrl || '').trim();
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) {
        const error = new Error('errors.invalidNotificationImage');
        error.key = 'errors.invalidNotificationImage';
        error.statusCode = 400;
        error.status = 'fail';
        error.isOperational = true;
        throw error;
    }
    return url;
};

exports.preview = async (req, res, next) => {
    try {
        const audience = await previewAudience({ ...req.query, ...req.body });
        SuccessResponse.ok(res, { data: { audience } });
    } catch (err) {
        next(err);
    }
};

exports.recipients = async (req, res, next) => {
    try {
        const recipients = await listRecipients();
        SuccessResponse.ok(res, {
            results: recipients.length,
            data: { recipients },
        });
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const page = await listNotifications(req);
        SuccessResponse.ok(res, {
            results: page.results,
            total: page.total,
            page: page.page,
            totalPages: page.totalPages,
            data: { notifications: page.notifications },
        });
    } catch (err) {
        next(err);
    }
};

exports.send = async (req, res, next) => {
    let image = '';
    try {
        image = readImage(req);
        const notification = await sendNotification({
            input: req.body,
            image,
            sentBy: req.user?._id,
            req,
        });
        SuccessResponse.ok(res, {
            message: req.t('messages.notificationSent'),
            data: { notification },
        });
    } catch (err) {
        if (req.file && err.statusCode && err.statusCode < 500) {
            deleteImageFile(`notifications/${req.file.filename}`);
        }
        next(err);
    }
};
