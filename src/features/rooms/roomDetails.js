const ROOM_TYPE_LABELS = {
    ar: {
        standard: 'قياسية',
        deluxe: 'ديلوكس',
        suite: 'جناح',
        junior_suite: 'جناح صغير',
        royal_suite: 'جناح ملكي',
        studio: 'استوديو',
        family: 'عائلية',
        chalet_room: 'غرفة شاليه',
        other: 'أخرى',
    },
    en: {
        standard: 'Standard',
        deluxe: 'Deluxe',
        suite: 'Suite',
        junior_suite: 'Junior suite',
        royal_suite: 'Royal suite',
        studio: 'Studio',
        family: 'Family',
        chalet_room: 'Chalet room',
        other: 'Other',
    },
};

const ROOM_COPY = {
    ar: {
        roomType: 'نوع الغرفة',
        roomNumber: 'رقم الغرفة',
        adults: 'البالغين',
        adult: 'بالغ',
        children: 'الأطفال',
        child: 'طفل',
        beds: 'عدد الأسرّة',
        bed: 'سرير',
        bedsUnit: 'أسرّة',
        bedType: 'نوع السرير',
        bathrooms: 'الحمامات',
        bathroom: 'حمام',
        bathroomsUnit: 'حمامات',
        area: 'المساحة',
        details: 'تفاصيل الغرفة',
        dir: 'rtl',
    },
    en: {
        roomType: 'Room type',
        roomNumber: 'Room number',
        adults: 'Adults',
        adult: 'adult',
        children: 'Children',
        child: 'child',
        beds: 'Beds',
        bed: 'bed',
        bedsUnit: 'beds',
        bedType: 'Bed type',
        bathrooms: 'Bathrooms',
        bathroom: 'bathroom',
        bathroomsUnit: 'bathrooms',
        area: 'Area',
        details: 'Room details',
        dir: 'ltr',
    },
};

const AMENITY_ICONS = [
    { test: /واي\s*فاي|wifi|wi-fi|انترنت|إنترنت|نت\b/i, icon: 'fa-wifi' },
    { test: /تلفزيون|تلفاز|شاشة|tv\b|netflix/i, icon: 'fa-tv' },
    { test: /ميني\s*بار|minibar|mini[\s-]?bar/i, icon: 'fa-wine-glass' },
    { test: /شرفة|بلكونة|balcony/i, icon: 'fa-building' },
    { test: /إطلالة|اطلالة|فيو|view|بحر/i, icon: 'fa-water' },
    { test: /تكييف|مكيف|air[\s-]?condition/i, icon: 'fa-snowflake' },
    { test: /مسبح|pool/i, icon: 'fa-person-swimming' },
    { test: /مطبخ|kitchen/i, icon: 'fa-utensils' },
    { test: /قهوة|coffee/i, icon: 'fa-mug-hot' },
    { test: /أمانات|خزنة|safe\b/i, icon: 'fa-lock' },
    { test: /خدمة الغرف|room\s*service/i, icon: 'fa-bell-concierge' },
    { test: /شواية|باربيكيو|bbq|grill/i, icon: 'fa-fire' },
    { test: /حديقة|garden/i, icon: 'fa-leaf' },
    { test: /أمن|حراسة|security/i, icon: 'fa-shield-halved' },
    { test: /إفطار|فطور|breakfast/i, icon: 'fa-mug-saucer' },
    { test: /موقف|باركنج|parking/i, icon: 'fa-square-parking' },
    { test: /سرير|bed/i, icon: 'fa-bed' },
    { test: /حمام|bath/i, icon: 'fa-bath' },
];

const amenityIcon = (name) => {
    const text = String(name || '');
    const match = AMENITY_ICONS.find((item) => item.test.test(text));
    return match ? match.icon : 'fa-check';
};

const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const iconClass = (icon) => {
    const name = String(icon || 'fa-check').replace(/^fas\s+/i, '').trim();
    if (name.startsWith('fa-')) return `fas ${name}`;
    return `fas fa-${name}`;
};

const detail = ({ key, label, value, unit = '', icon }) => {
    const text = unit ? `${value} ${unit}` : String(value);
    const resolvedIcon = icon || 'fa-check';
    return {
        key,
        label,
        value,
        unit,
        text,
        icon: resolvedIcon,
        iconClass: iconClass(resolvedIcon),
    };
};

const buildRoomDetails = (room, locale = 'ar', exact = false) => {
    if (!room) return [];
    const copy = ROOM_COPY[locale === 'en' ? 'en' : 'ar'];
    const typeLabels = ROOM_TYPE_LABELS[locale === 'en' ? 'en' : 'ar'];
    const items = [];
    const roomType = room.roomType || 'standard';

    items.push(detail({
        key: 'roomType',
        label: copy.roomType,
        value: typeLabels[roomType] || roomType,
        icon: 'fa-door-open',
    }));

    if (room.roomNumber) {
        items.push(detail({
            key: 'roomNumber',
            label: copy.roomNumber,
            value: room.roomNumber,
            icon: 'fa-hashtag',
        }));
    }

    const adults = Number(room.capacity?.adults);
    if (adults > 0) {
        items.push(detail({
            key: 'adults',
            label: copy.adults,
            value: adults,
            unit: copy.adult,
            icon: 'fa-user',
        }));
    }

    const children = Number(room.capacity?.children);
    if (children > 0) {
        items.push(detail({
            key: 'children',
            label: copy.children,
            value: children,
            unit: copy.child,
            icon: 'fa-child',
        }));
    }

    const beds = Number(room.beds?.count);
    if (beds > 0) {
        items.push(detail({
            key: 'beds',
            label: copy.beds,
            value: beds,
            unit: beds === 1 ? copy.bed : copy.bedsUnit,
            icon: 'fa-bed',
        }));
    }

    const bedType = exact
        ? (locale === 'en' ? room.beds?.bedType : room.beds?.bedTypeAr)
        : (locale === 'en'
            ? (room.beds?.bedType || room.beds?.bedTypeAr)
            : (room.beds?.bedTypeAr || room.beds?.bedType));
    if (bedType) {
        items.push(detail({
            key: 'bedType',
            label: copy.bedType,
            value: bedType,
            icon: 'fa-bed',
        }));
    }

    const bathrooms = Number(room.bathrooms);
    if (bathrooms > 0) {
        items.push(detail({
            key: 'bathrooms',
            label: copy.bathrooms,
            value: bathrooms,
            unit: bathrooms === 1 ? copy.bathroom : copy.bathroomsUnit,
            icon: 'fa-bath',
        }));
    }

    const area = Number(room.area);
    if (area > 0) {
        items.push(detail({
            key: 'area',
            label: copy.area,
            value: area,
            unit: locale === 'en' ? 'm²' : 'م²',
            icon: 'fa-ruler-combined',
        }));
    }

    const englishAmenities = Array.isArray(room.amenities) ? room.amenities : [];
    const arabicAmenities = Array.isArray(room.amenitiesAr) ? room.amenitiesAr : [];
    const amenities = exact
        ? (locale === 'en' ? englishAmenities : arabicAmenities)
        : (locale === 'en' ? (englishAmenities.length ? englishAmenities : arabicAmenities) : (arabicAmenities.length ? arabicAmenities : englishAmenities));
    amenities.forEach((name, index) => {
        const label = String(name || '').trim();
        if (!label) return;
        const iconSource = englishAmenities[index] || label;
        items.push(detail({
            key: 'amenity',
            label,
            value: label,
            icon: amenityIcon(iconSource),
        }));
    });

    return items;
};

const detailLine = (item) => {
    if (item.key === 'amenity') return item.label;
    return `${item.label}: ${item.text}`;
};

const buildRoomDetailsHtml = (items, locale = 'ar') => {
    const list = Array.isArray(items) ? items : [];
    if (!list.length) return '';
    const copy = ROOM_COPY[locale === 'en' ? 'en' : 'ar'];
    const lines = list.map((item) => (
        `• <i class="${escapeHtml(item.iconClass || iconClass(item.icon))}" style="color:#2D4F2E;margin-left:6px;"></i> ${escapeHtml(detailLine(item))}`
    )).join('<br>');
    return `<div class="room-auto-details" dir="${copy.dir}"><p style="display:block;margin:14px 0 8px;font-size:15px;font-weight:700;color:#2D4F2E;">${copy.details}</p><p style="display:block;margin:0;line-height:2;font-size:14px;color:#334155;">${lines}</p></div>`;
};

module.exports = {
    buildRoomDetails,
    buildRoomDetailsHtml,
    amenityIcon,
};
