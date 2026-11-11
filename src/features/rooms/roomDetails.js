const ROOM_TYPE_LABELS = {
    standard: 'قياسية',
    deluxe: 'ديلوكس',
    suite: 'جناح',
    junior_suite: 'جناح صغير',
    royal_suite: 'جناح ملكي',
    studio: 'استوديو',
    family: 'عائلية',
    chalet_room: 'غرفة شاليه',
    other: 'أخرى',
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

const detail = ({ key, label, value, unit = '', icon }) => {
    const text = unit ? `${value} ${unit}` : String(value);
    return {
        key,
        label,
        value,
        unit,
        text,
        icon,
    };
};

const buildRoomDetails = (room) => {
    if (!room) return [];
    const items = [];
    const roomType = room.roomType || 'standard';

    items.push(detail({
        key: 'roomType',
        label: 'نوع الغرفة',
        value: ROOM_TYPE_LABELS[roomType] || roomType,
        icon: 'fa-door-open',
    }));

    if (room.roomNumber) {
        items.push(detail({
            key: 'roomNumber',
            label: 'رقم الغرفة',
            value: room.roomNumber,
            icon: 'fa-hashtag',
        }));
    }

    const adults = Number(room.capacity?.adults);
    if (adults > 0) {
        items.push(detail({
            key: 'adults',
            label: 'البالغين',
            value: adults,
            unit: 'بالغ',
            icon: 'fa-user',
        }));
    }

    const children = Number(room.capacity?.children);
    if (children > 0) {
        items.push(detail({
            key: 'children',
            label: 'الأطفال',
            value: children,
            unit: 'طفل',
            icon: 'fa-child',
        }));
    }

    const beds = Number(room.beds?.count);
    if (beds > 0) {
        items.push(detail({
            key: 'beds',
            label: 'عدد الأسرّة',
            value: beds,
            unit: beds === 1 ? 'سرير' : 'أسرّة',
            icon: 'fa-bed',
        }));
    }

    if (room.beds?.bedType) {
        items.push(detail({
            key: 'bedType',
            label: 'نوع السرير',
            value: room.beds.bedType,
            icon: 'fa-bed',
        }));
    }

    const bathrooms = Number(room.bathrooms);
    if (bathrooms > 0) {
        items.push(detail({
            key: 'bathrooms',
            label: 'الحمامات',
            value: bathrooms,
            unit: bathrooms === 1 ? 'حمام' : 'حمامات',
            icon: 'fa-bath',
        }));
    }

    const area = Number(room.area);
    if (area > 0) {
        items.push(detail({
            key: 'area',
            label: 'المساحة',
            value: area,
            unit: 'م²',
            icon: 'fa-ruler-combined',
        }));
    }

    const amenities = Array.isArray(room.amenities) ? room.amenities : [];
    amenities.forEach((name) => {
        const label = String(name || '').trim();
        if (!label) return;
        items.push(detail({
            key: 'amenity',
            label,
            value: label,
            icon: amenityIcon(label),
        }));
    });

    return items;
};

module.exports = {
    buildRoomDetails,
    amenityIcon,
};
