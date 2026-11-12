const mongoose = require('mongoose');
const Room = require('../rooms/models/roomModel');

const idOf = (ad) => {
    const id = ad && (ad.id || ad._id);
    return id ? String(id) : '';
};

/**
 * Marks each advertisement with hasRooms when it has at least one active room.
 * The app uses this to decide whether to call the available-rooms search.
 */
const attachHasRooms = async (advertisements) => {
    const list = (Array.isArray(advertisements) ? advertisements : [advertisements]).filter(Boolean);
    const ids = [...new Set(list.map(idOf).filter((id) => mongoose.Types.ObjectId.isValid(id)))];

    let withRooms = new Set();
    if (ids.length && mongoose.connection.readyState === 1) {
        const rows = await Room.aggregate([
            {
                $match: {
                    hotel: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
                    active: true,
                },
            },
            { $group: { _id: '$hotel' } },
        ]);
        withRooms = new Set(rows.map((row) => String(row._id)));
    }

    for (const ad of list) {
        const hasRooms = withRooms.has(idOf(ad));
        ad.hasRooms = hasRooms;
        if (ad.booking && typeof ad.booking === 'object') {
            ad.booking.requiresRoom = hasRooms;
        }
    }

    return advertisements;
};

module.exports = { attachHasRooms };
