const mongoose = require('mongoose');
const UnitTypeAttribute = require('../unit-types/models/unitTypeAttributeModel');
const { normalizeDescriptionHtml, stripHtml, buildDetailsHtml } = require('../../utils/descriptionHtml');

const unitTypeIdOf = (ad) => {
    const unitType = ad?.unitType;
    if (!unitType) return '';
    if (typeof unitType === 'object') return String(unitType._id || unitType.id || '');
    return String(unitType);
};

const attachDetailsHtml = async (items) => {
    const list = (Array.isArray(items) ? items : []).filter(Boolean);
    const unitTypeIds = [...new Set(list.map(unitTypeIdOf).filter((id) => mongoose.Types.ObjectId.isValid(id)))];
    const grouped = new Map();

    if (unitTypeIds.length && mongoose.connection.readyState === 1) {
        const defs = await UnitTypeAttribute.find({
            unitType: { $in: unitTypeIds },
            active: true,
        }).sort({ order: 1 }).lean();

        defs.forEach((def) => {
            const id = String(def.unitType);
            if (!grouped.has(id)) grouped.set(id, []);
            grouped.get(id).push(def);
        });
    }

    list.forEach((ad) => {
        const descriptionHtml = normalizeDescriptionHtml(ad.description);
        ad.description = descriptionHtml;
        ad.descriptionText = stripHtml(descriptionHtml);
        ad.detailsHtml = buildDetailsHtml({
            description: descriptionHtml,
            location: ad.location,
            address: ad.address,
            attributes: ad.attributes,
            attributeDefs: grouped.get(unitTypeIdOf(ad)) || [],
        });
    });

    return items;
};

module.exports = { attachDetailsHtml };
