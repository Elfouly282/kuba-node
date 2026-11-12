const mongoose = require('mongoose');
const Room = require('../models/roomModel');
const Advertisement = require('../../advertisements/models/advertisementModel');
const Booking = require('../../bookings/models/bookingModel');
const APIError = require('../../../utils/apiError');
const { SuccessResponse } = require('../../../utils/apiResponse');
const { getImageUrl, getRelativeImagePath, deleteImageFile } = require('../../../utils/imageUrl');
const { buildRoomDetails, buildRoomDetailsHtml } = require('../roomDetails');
const { resolveBooking } = require('../../bookings/bookingMode');
const { priceStay } = require('../../bookings/services/bookingService');
const { normalizeStay } = require('../../advertisements/stayOptions');
const { normalizeDescriptionHtml, stripHtml } = require('../../../utils/descriptionHtml');

const ROOM_MAX_IMAGES = 3;

const formatRoom = (doc) => {
    if (!doc) return null;
    const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };

    const rawImages = Array.isArray(obj.images) ? obj.images : [];
    const merged = [];
    const seen = new Set();
    [...rawImages, obj.image].forEach((item) => {
        if (!item || seen.has(String(item)) || merged.length >= ROOM_MAX_IMAGES) return;
        seen.add(String(item));
        const url = getImageUrl(item);
        if (url) merged.push(url);
    });

    obj.images = merged;
    obj.image = merged[0] || '';
    obj.details = buildRoomDetails(obj);
    obj.detailsHtml = buildRoomDetailsHtml(obj.details);
    obj.booking = resolveBooking(obj);
    const written = normalizeDescriptionHtml(obj.description || obj.descriptionAr || '');
    obj.descriptionSource = written;
    obj.description = [written, obj.detailsHtml].filter(Boolean).join('<br>');
    obj.descriptionText = stripHtml(obj.description);

    if (obj.hotel && typeof obj.hotel === 'object' && obj.hotel.image) {
        obj.hotel.image = getImageUrl(obj.hotel.image);
    }

    return obj;
};

const parseImageList = (value) => {
    if (value === undefined || value === null || value === '') return null;
    let list = value;
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return null;
        try {
            const parsed = JSON.parse(trimmed);
            list = Array.isArray(parsed) ? parsed : [parsed];
        } catch (_) {
            list = trimmed.split(',').map((item) => item.trim()).filter(Boolean);
        }
    }
    if (!Array.isArray(list)) list = [list];
    return [...new Set(list.map((item) => getRelativeImagePath(String(item).trim())).filter(Boolean))];
};

const collectUploadedRoomFiles = (req) => {
    const files = [];
    if (req.file) files.push(req.file);
    if (Array.isArray(req.files)) {
        files.push(...req.files);
    } else if (req.files && typeof req.files === 'object') {
        ['images', 'image'].forEach((key) => {
            if (Array.isArray(req.files[key])) files.push(...req.files[key]);
        });
    }
    return files.map((file) => `rooms/${file.filename}`);
};

const resolveRoomImages = (req, existing = []) => {
    const uploaded = collectUploadedRoomFiles(req);
    const fromBody = parseImageList(req.body?.images);
    const replaceImages = req.body?.replaceImages === true || req.body?.replaceImages === 'true';
    const single = parseImageList(req.body?.image);
    const touched = fromBody !== null
        || replaceImages
        || uploaded.length > 0
        || (Boolean(single) && existing.length === 0);

    if (!touched) return [...existing];

    let images;
    if (fromBody) {
        images = [...fromBody];
    } else if (replaceImages || existing.length === 0) {
        images = single ? [...single] : [];
    } else {
        images = [...existing];
    }

    uploaded.forEach((img) => {
        if (img && !images.includes(img)) images.push(img);
    });

    images = [...new Set(images)];

    if (images.length > ROOM_MAX_IMAGES) {
        const kept = new Set(existing);
        uploaded.forEach((img) => {
            if (!kept.has(img)) deleteImageFile(img);
        });
        throw new APIError('errors.roomImagesLimit', 400);
    }

    return images;
};

const existingRoomImages = (room) => {
    const stored = Array.isArray(room?.images) ? room.images : [];
    const list = stored.length ? stored : (room?.image ? [room.image] : []);
    return list.map((img) => getRelativeImagePath(img)).filter(Boolean);
};

// Check if user has permission to manage hotel rooms
const assertHotelOwnership = async (req, hotelId) => {
    if (!req.user) throw new APIError('errors.tokenRequired', 401);
    if (req.user.role === 'admin') return true;

    const hotel = await Advertisement.findById(hotelId);
    if (!hotel) throw new APIError('errors.advertisementNotFound', 404);

    if (String(hotel.owner) !== String(req.user._id)) {
        throw new APIError('errors.forbidden', 403);
    }
    return true;
};

exports.createRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId || req.params.id || req.body.hotel;
        if (!hotelId || !mongoose.Types.ObjectId.isValid(hotelId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const hotel = await Advertisement.findById(hotelId);
        if (!hotel) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        await assertHotelOwnership(req, hotelId);

        const roomData = {
            ...req.body,
            hotel: hotel._id,
        };

        const images = resolveRoomImages(req, []);
        roomData.images = images;
        roomData.image = images[0] || '';
        delete roomData.replaceImages;

        if (req.body.pricing && typeof req.body.pricing === 'string') {
            try {
                roomData.pricing = JSON.parse(req.body.pricing);
            } catch (_) {}
        }
        if (req.body.capacity && typeof req.body.capacity === 'string') {
            try {
                roomData.capacity = JSON.parse(req.body.capacity);
            } catch (_) {}
        }
        if (req.body.beds && typeof req.body.beds === 'string') {
            try {
                roomData.beds = JSON.parse(req.body.beds);
            } catch (_) {}
        }
        if (req.body.amenities && typeof req.body.amenities === 'string') {
            try {
                roomData.amenities = JSON.parse(req.body.amenities);
            } catch (_) {
                roomData.amenities = req.body.amenities.split(',').map((s) => s.trim()).filter(Boolean);
            }
        }
        if (req.body.stay && typeof req.body.stay === 'string') {
            try { roomData.stay = JSON.parse(req.body.stay); } catch (_) {}
        }
        if (roomData.stay) roomData.stay = normalizeStay(roomData.stay);

        // Mark hotel as isHotel
        if (!hotel.isHotel) {
            hotel.isHotel = true;
            await hotel.save();
        }

        const room = await Room.create(roomData);

        SuccessResponse.created(res, {
            message: req.t ? req.t('messages.roomCreated') : 'Room created successfully.',
            data: { room: formatRoom(room) },
        });
    } catch (err) {
        next(err);
    }
};

exports.getRoomsByHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId || req.params.id;
        if (!hotelId || !mongoose.Types.ObjectId.isValid(hotelId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const filter = { hotel: hotelId };
        if (req.query.active !== undefined) {
            filter.active = req.query.active === 'true';
        } else if (!req.user || req.user.role === 'user') {
            filter.active = true;
        }

        const rooms = await Room.find(filter).sort({ 'pricing.finalPrice': 1 });

        SuccessResponse.ok(res, {
            results: rooms.length,
            data: { rooms: rooms.map(formatRoom) },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Returns available rooms for a hotel within a specific date range [startDate, endDate]
 */
exports.getAvailableRoomsForHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId || req.params.id;
        if (!hotelId || !mongoose.Types.ObjectId.isValid(hotelId)) {
            return next(new APIError('errors.invalidAdvertisementId', 400));
        }

        const hotel = await Advertisement.findById(hotelId);
        if (!hotel) {
            return next(new APIError('errors.advertisementNotFound', 404));
        }

        const startRaw = req.query.startDate || req.query.from || req.query.checkIn;
        const endRaw = req.query.endDate || req.query.to || req.query.checkOut;

        if (!startRaw || !endRaw) {
            return next(new APIError('validation.datesRequired', 400));
        }

        const start = new Date(startRaw);
        const end = new Date(endRaw);

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
            return next(new APIError('validation.invalidDateRange', 400));
        }

        const diffMs = end.getTime() - start.getTime();
        const nights = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

        // 1. Fetch all active rooms belonging to this hotel
        const allRooms = await Room.find({ hotel: hotelId, active: true }).sort({ 'pricing.finalPrice': 1 });

        // 2. Query conflicting bookings in this date window
        const conflictingBookings = await Booking.find({
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                { room: { $in: allRooms.map((r) => r._id) } },
                { advertisement: hotelId, room: { $ne: null } },
            ],
            startDate: { $lt: end },
            endDate: { $gt: start },
        }).select('room');

        const bookedRoomIds = new Set(
            conflictingBookings
                .map((b) => (b.room ? String(b.room) : null))
                .filter(Boolean)
        );

        // 3. Filter available rooms
        let availableRooms = allRooms.filter((room) => !bookedRoomIds.has(String(room._id)));

        // Filter by guests capacity if provided
        const guests = req.query.guests || req.query.guestsCount;
        if (guests && !isNaN(Number(guests))) {
            const guestNum = Number(guests);
            availableRooms = availableRooms.filter(
                (room) => (room.capacity?.maxGuests || 2) >= guestNum
            );
        }

        // Format and enrich rooms with calculated pricing for this specific stay
        const enrichedRooms = availableRooms.map((room) => {
            const formatted = formatRoom(room);
            const price = priceStay({ ad: hotel, room, start, end });

            return {
                ...formatted,
                available: true,
                stayCalculation: {
                    nights: price.duration,
                    pricePerNight: price.unitPrice,
                    totalPrice: price.totalPrice,
                    currency: price.currency,
                    quote: price.quote,
                },
            };
        });

        SuccessResponse.ok(res, {
            results: enrichedRooms.length,
            data: {
                hotel: {
                    id: hotel._id,
                    title: hotel.title,
                    location: hotel.location,
                    image: getImageUrl(hotel.image),
                },
                startDate: start,
                endDate: end,
                nights,
                totalRooms: allRooms.length,
                availableRoomsCount: enrichedRooms.length,
                rooms: enrichedRooms,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getRoomById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidRoomId', 400));
        }

        const room = await Room.findById(req.params.id).populate('hotel', 'title image location address city region');
        if (!room) {
            return next(new APIError('errors.roomNotFound', 404));
        }

        SuccessResponse.ok(res, {
            data: { room: formatRoom(room) },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateRoom = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidRoomId', 400));
        }

        const room = await Room.findById(req.params.id);
        if (!room) {
            return next(new APIError('errors.roomNotFound', 404));
        }

        await assertHotelOwnership(req, room.hotel);

        const updates = { ...req.body };
        const previousImages = existingRoomImages(room);
        const images = resolveRoomImages(req, previousImages);
        updates.images = images;
        updates.image = images[0] || '';
        delete updates.replaceImages;

        if (req.body.pricing && typeof req.body.pricing === 'string') {
            try { updates.pricing = JSON.parse(req.body.pricing); } catch (_) {}
        }
        if (req.body.capacity && typeof req.body.capacity === 'string') {
            try { updates.capacity = JSON.parse(req.body.capacity); } catch (_) {}
        }
        if (req.body.beds && typeof req.body.beds === 'string') {
            try { updates.beds = JSON.parse(req.body.beds); } catch (_) {}
        }
        if (req.body.amenities && typeof req.body.amenities === 'string') {
            try {
                updates.amenities = JSON.parse(req.body.amenities);
            } catch (_) {
                updates.amenities = req.body.amenities.split(',').map((s) => s.trim()).filter(Boolean);
            }
        }
        if (req.body.stay && typeof req.body.stay === 'string') {
            try { updates.stay = JSON.parse(req.body.stay); } catch (_) {}
        }
        if (updates.stay) updates.stay = normalizeStay(updates.stay);

        Object.assign(room, updates);
        await room.save();

        previousImages.forEach((img) => {
            if (img && !images.includes(img)) deleteImageFile(img);
        });

        SuccessResponse.ok(res, {
            message: req.t ? req.t('messages.roomUpdated') : 'Room updated successfully.',
            data: { room: formatRoom(room) },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteRoom = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new APIError('errors.invalidRoomId', 400));
        }

        const room = await Room.findById(req.params.id);
        if (!room) {
            return next(new APIError('errors.roomNotFound', 404));
        }

        await assertHotelOwnership(req, room.hotel);

        // Delete uploaded image files if any
        if (room.image) deleteImageFile(room.image);
        if (Array.isArray(room.images)) {
            room.images.forEach(deleteImageFile);
        }

        await room.deleteOne();

        SuccessResponse.ok(res, {
            message: req.t ? req.t('messages.roomDeleted') : 'Room deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};

exports.formatRoom = formatRoom;
