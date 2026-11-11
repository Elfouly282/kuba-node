const mongoose = require('mongoose');
const UnitTypeAttribute = require('../unit-types/models/unitTypeAttributeModel');
const {
    normalizeDescriptionHtml,
    stripHtml,
    buildAttributeSpecsHtml,
    buildDetailsHtml,
} = require('../../utils/descriptionHtml');

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
        const written = normalizeDescriptionHtml(ad.description);
        const defs = grouped.get(unitTypeIdOf(ad)) || [];
        const specs = buildAttributeSpecsHtml(ad.attributes, defs);
        ad.descriptionSource = written;
        ad.description = [written, specs].filter(Boolean).join('<br>');
        ad.descriptionText = stripHtml(ad.description);
        ad.detailsHtml = buildDetailsHtml({
            description: written,
            location: ad.location,
            address: ad.address,
            attributes: ad.attributes,
            attributeDefs: defs,
        });
    });

    return items;
};

module.exports = { attachDetailsHtml };
