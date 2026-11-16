const mongoose = require('mongoose');
const UnitTypeAttribute = require('../unit-types/models/unitTypeAttributeModel');
const {
    normalizeDescriptionHtml,
    stripHtml,
    buildAttributeSpecsHtml,
    buildDetailsHtml,
} = require('../../utils/descriptionHtml');
const { responseLocale, presentAttributeValues, pickText } = require('../../../utils/localize');

const unitTypeIdOf = (ad) => {
    const unitType = ad?.unitType;
    if (!unitType) return '';
    if (typeof unitType === 'object') return String(unitType._id || unitType.id || '');
    return String(unitType);
};

const attachDetailsHtml = async (items, req) => {
    const list = (Array.isArray(items) ? items : []).filter(Boolean);
    const locale = req ? responseLocale(req) : 'en';
    const exact = Boolean(req?.localeExact);
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
        const defs = grouped.get(unitTypeIdOf(ad)) || [];
        ad.attributes = presentAttributeValues(ad.attributes, defs, locale);
        const written = normalizeDescriptionHtml(pickText(ad.description, ad.descriptionAr, locale, exact));
        const location = pickText(ad.location, ad.locationAr, locale, exact);
        const address = pickText(ad.address, ad.addressAr, locale, exact);
        delete ad.descriptionAr;
        const specs = buildAttributeSpecsHtml(ad.attributes, defs, locale);
        ad.descriptionSource = written;
        ad.description = [written, specs].filter(Boolean).join('<br>');
        ad.descriptionText = stripHtml(ad.description);
        ad.detailsHtml = buildDetailsHtml({
            description: written,
            location,
            address,
            attributes: ad.attributes,
            attributeDefs: defs,
            locale,
        });
    });

    return items;
};

module.exports = { attachDetailsHtml };
