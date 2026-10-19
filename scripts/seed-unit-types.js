const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) {}

const mongoose = require('mongoose');
const Category = require('../src/features/categories/models/categoryModel');
const UnitType = require('../src/features/unit-types/models/unitTypeModel');
const UnitTypeAttribute = require('../src/features/unit-types/models/unitTypeAttributeModel');

const seedData = async () => {
    try {
        let targetUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/kuba';
        console.log('Connecting to MongoDB:', targetUri.includes('@') ? 'MongoDB Cloud Atlas' : targetUri);

        try {
            await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 5000 });
            console.log('MongoDB connected successfully.');
        } catch (connErr) {
            console.warn('Atlas connection failed, trying local MongoDB fallback...', connErr.message);
            targetUri = 'mongodb://127.0.0.1:27017/kuba';
            await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 3000 });
            console.log('Connected to local MongoDB successfully.');
        }

        // 1. Ensure categories exist
        let categories = await Category.find();
        if (categories.length === 0) {
            console.log('Creating initial categories...');
            const defaultCats = [
                { name: 'شاليهات ومصايف', image: 'categories/chalets.png' },
                { name: 'فنادق ومنتجعات', image: 'categories/hotels.png' },
                { name: 'شقق وأجنحة ساحلية', image: 'categories/apartments.png' },
                { name: 'يخوت ورحلات بحرية', image: 'categories/yachts.png' },
                { name: 'وسائل تنقل وجولف كار', image: 'categories/golf_cars.png' },
            ];
            categories = await Category.insertMany(defaultCats);
            console.log(`Created ${categories.length} categories.`);
        }

        const chaletsCat = categories.find(c => c.name.includes('شاليه')) || categories[0];
        const hotelsCat = categories.find(c => c.name.includes('فندق')) || categories[0];
        const apartmentsCat = categories.find(c => c.name.includes('شقق')) || categories[0];
        const yachtsCat = categories.find(c => c.name.includes('يخوت')) || categories[0];
        const transportCat = categories.find(c => c.name.includes('تنقل') || c.name.includes('جولف')) || categories[0];

        // 2. Define Unit Types & their dynamic attributes
        const unitTypesConfig = [
            {
                name: 'Chalet',
                nameAr: 'شاليه',
                slug: 'chalet',
                description: 'شاليهات ساحلية خاصة ومصايف بقرى سياحية متكاملة الخدمات',
                icon: 'fa-umbrella-beach',
                categories: [chaletsCat._id],
                pricingUnits: ['per_night', 'per_day'],
                defaultPricingUnit: 'per_night',
                order: 1,
                attributes: [
                    { name: 'Guests Capacity', nameAr: 'عدد الأشخاص', key: 'guests_count', dataType: 'number', required: true, showInFilters: true, showInDetails: true, order: 1, unit: 'أفراد' },
                    { name: 'Bedrooms', nameAr: 'عدد الغرف', key: 'bedrooms', dataType: 'number', required: true, showInFilters: true, showInDetails: true, order: 2, unit: 'غرفة' },
                    { name: 'Bathrooms', nameAr: 'عدد الحمامات', key: 'bathrooms', dataType: 'number', required: true, showInFilters: true, showInDetails: true, order: 3, unit: 'حمام' },
                    { name: 'Beds Count', nameAr: 'عدد الأسرّة', key: 'beds_count', dataType: 'number', required: false, showInFilters: true, showInDetails: true, order: 4, unit: 'سرير' },
                    { name: 'Area', nameAr: 'مساحة الوحدة', key: 'area', dataType: 'number', required: false, showInFilters: false, showInDetails: true, order: 5, unit: 'م²' },
                    { name: 'Has Swimming Pool', nameAr: 'وجود حمام سباحة', key: 'has_pool', dataType: 'boolean', required: false, showInFilters: true, showInDetails: true, order: 6 },
                    { name: 'Has Air Conditioning', nameAr: 'وجود تكييف', key: 'has_ac', dataType: 'boolean', required: false, showInFilters: true, showInDetails: true, order: 7 },
                    { name: 'Sea View', nameAr: 'إطلالة بحرية مباشرة', key: 'sea_view', dataType: 'boolean', required: false, showInFilters: true, showInDetails: true, order: 8 },
                    { name: 'Amenities', nameAr: 'المرافق والخدمات', key: 'amenities', dataType: 'multi_select', options: ['واي فاي', 'شاشة تلفزيون', 'مطبخ متكامل', 'شواية باربيكيو', 'حديقة خاصة', 'أمن 24 ساعة'], required: false, showInFilters: false, showInDetails: true, order: 9 },
                ],
            },
            {
                name: 'Hotel Room',
                nameAr: 'غرفة فندقية',
                slug: 'hotel_room',
                description: 'غرف وأجنحة فندقية فاخرة بإطلالات مميزة وخدمات غرف يومية',
                icon: 'fa-hotel',
                categories: [hotelsCat._id],
                pricingUnits: ['per_night'],
                defaultPricingUnit: 'per_night',
                order: 2,
                attributes: [
                    { name: 'Room Type', nameAr: 'نوع الغرفة', key: 'room_type', dataType: 'single_select', options: ['Standard Room', 'Deluxe Room', 'Junior Suite', 'Royal Suite', 'Studio'], required: true, showInFilters: true, showInDetails: true, order: 1 },
                    { name: 'Guests Capacity', nameAr: 'عدد النزلاء', key: 'guests_count', dataType: 'number', required: true, showInFilters: true, showInDetails: true, order: 2, unit: 'نزيل' },
                    { name: 'Beds Count', nameAr: 'عدد الأسرّة', key: 'beds_count', dataType: 'number', required: true, showInFilters: true, showInDetails: true, order: 3, unit: 'سرير' },
                    { name: 'Bed Type', nameAr: 'نوع السرير', key: 'bed_type', dataType: 'single_select', options: ['King Bed', 'Queen Bed', 'Twin Beds', 'Single Bed'], required: false, showInFilters: false, showInDetails: true, order: 4 },
                    { name: 'Bathrooms', nameAr: 'عدد الحمامات', key: 'bathrooms', dataType: 'number', required: true, showInFilters: false, showInDetails: true, order: 5 },
                    { name: 'Room Area', nameAr: 'مساحة الغرفة', key: 'area', dataType: 'number', required: false, showInFilters: false, showInDetails: true, order: 6, unit: 'م²' },
                    { name: 'Meal Plan', nameAr: 'نظام الوجبات', key: 'meal_plan', dataType: 'single_select', options: ['إقامة فقط (Room Only)', 'شامل الإفطار (Bed & Breakfast)', 'نصف إقامة (Half Board)', 'إقامة كاملة (All Inclusive)'], required: false, showInFilters: true, showInDetails: true, order: 7 },
                    { name: 'Available Services', nameAr: 'الخدمات المتاحة', key: 'services', dataType: 'multi_select', options: ['خدمة الغرف', 'واي فاي مجاني', 'ميني بار', 'صندوق أمانات', 'ماكينة قهوة'], required: false, showInFilters: false, showInDetails: true, order: 8 },
                ],
            },
            {
                name: 'Yacht',
                nameAr: 'يخت سياحي',
                slug: 'yacht',
                description: 'يخوت وقوارب بحرية خاصة للإيجار بالساعة أو اليوم للرحلات البحرية والغطس',
                icon: 'fa-ship',
                categories: [yachtsCat._id],
                pricingUnits: ['per_hour', 'per_trip', 'per_day'],
                defaultPricingUnit: 'per_hour',
                order: 3,
                attributes: [
                    { name: 'Max Passengers', nameAr: 'السعة القصوى للركاب', key: 'max_passengers', dataType: 'number', required: true, showInFilters: true, showInDetails: true, order: 1, unit: 'راكب' },
                    { name: 'Cabins Count', nameAr: 'عدد الكبائن', key: 'cabins_count', dataType: 'number', required: false, showInFilters: false, showInDetails: true, order: 2, unit: 'كابينة' },
                    { name: 'Bathrooms', nameAr: 'عدد الحمامات', key: 'bathrooms', dataType: 'number', required: false, showInFilters: false, showInDetails: true, order: 3 },
                    { name: 'Has Captain & Crew', nameAr: 'وجود قائد وطاقم بحري', key: 'has_crew', dataType: 'boolean', required: true, showInFilters: true, showInDetails: true, order: 4 },
                    { name: 'Length', nameAr: 'طول اليخت', key: 'length_feet', dataType: 'number', required: false, showInFilters: false, showInDetails: true, order: 5, unit: 'قدم' },
                    { name: 'Trip Inclusions', nameAr: 'مشتملات الرحلة', key: 'trip_inclusions', dataType: 'multi_select', options: ['مشروبات ووجبات خفيفة', 'أدوات غطس وسنوركلينج', 'معدات صيد', 'نظام صوتي بلوتوث', 'سترات نجاة معتمدة'], required: false, showInFilters: false, showInDetails: true, order: 6 },
                ],
            },
            {
                name: 'Golf Car',
                nameAr: 'Golf Car / سيارة جولف',
                slug: 'golf_car',
                description: 'عربات وسيارات جولف كهربائية للتنقل الداخلي داخل القرى والمنتجعات الساحلية',
                icon: 'fa-car-side',
                categories: [transportCat._id],
                pricingUnits: ['per_hour', 'per_day'],
                defaultPricingUnit: 'per_hour',
                order: 4,
                attributes: [
                    { name: 'Passenger Capacity', nameAr: 'عدد الركاب', key: 'passengers', dataType: 'single_select', options: ['2 ركاب', '4 ركاب', '6 ركاب', '8 ركاب'], required: true, showInFilters: true, showInDetails: true, order: 1 },
                    { name: 'Power Type', nameAr: 'نوع المركبة', key: 'power_type', dataType: 'single_select', options: ['كهربائي (Electric)', 'بنزين (Gasoline)'], required: true, showInFilters: false, showInDetails: true, order: 2 },
                    { name: 'Max Speed', nameAr: 'السرعة القصوى', key: 'max_speed', dataType: 'number', required: false, showInFilters: false, showInDetails: true, order: 3, unit: 'كم/س' },
                    { name: 'Rental Terms', nameAr: 'شروط الإيجار', key: 'rental_terms', dataType: 'string', required: false, showInFilters: false, showInDetails: true, order: 4 },
                    { name: 'Pickup Details', nameAr: 'تفاصيل الاستلام والإرجاع', key: 'pickup_details', dataType: 'string', required: false, showInFilters: false, showInDetails: true, order: 5 },
                ],
            },
            {
                name: 'Apartment',
                nameAr: 'شقة ساحلية',
                slug: 'apartment',
                description: 'شقق مصيفية وسكنية مفروشة بالكامل بالقرب من الشاطئ',
                icon: 'fa-building',
                categories: [apartmentsCat._id],
                pricingUnits: ['per_night', 'per_day'],
                defaultPricingUnit: 'per_night',
                order: 5,
                attributes: [
                    { name: 'Bedrooms', nameAr: 'عدد الغرف', key: 'bedrooms', dataType: 'number', required: true, showInFilters: true, showInDetails: true, order: 1, unit: 'غرفة' },
                    { name: 'Bathrooms', nameAr: 'عدد الحمامات', key: 'bathrooms', dataType: 'number', required: true, showInFilters: true, showInDetails: true, order: 2 },
                    { name: 'Floor', nameAr: 'الدور / الطابق', key: 'floor', dataType: 'number', required: false, showInFilters: false, showInDetails: true, order: 3 },
                    { name: 'Area', nameAr: 'المساحة', key: 'area', dataType: 'number', required: false, showInFilters: false, showInDetails: true, order: 4, unit: 'م²' },
                    { name: 'Has Elevator', nameAr: 'وجود مصعد', key: 'has_elevator', dataType: 'boolean', required: false, showInFilters: true, showInDetails: true, order: 5 },
                ],
            },
        ];

        for (const config of unitTypesConfig) {
            let ut = await UnitType.findOne({ slug: config.slug });
            if (!ut) {
                ut = await UnitType.create({
                    name: config.name,
                    nameAr: config.nameAr,
                    slug: config.slug,
                    description: config.description,
                    icon: config.icon,
                    categories: config.categories,
                    pricingUnits: config.pricingUnits,
                    defaultPricingUnit: config.defaultPricingUnit,
                    order: config.order,
                    active: true,
                });
                console.log(`Created UnitType: ${config.nameAr} (${config.slug})`);
            } else {
                ut.name = config.name;
                ut.nameAr = config.nameAr;
                ut.categories = config.categories;
                ut.pricingUnits = config.pricingUnits;
                ut.defaultPricingUnit = config.defaultPricingUnit;
                await ut.save();
                console.log(`Updated UnitType: ${config.nameAr}`);
            }

            // Sync attributes
            for (const attr of config.attributes) {
                const existing = await UnitTypeAttribute.findOne({ unitType: ut._id, key: attr.key });
                if (!existing) {
                    await UnitTypeAttribute.create({
                        unitType: ut._id,
                        name: attr.name,
                        nameAr: attr.nameAr,
                        key: attr.key,
                        dataType: attr.dataType,
                        options: attr.options || [],
                        required: attr.required || false,
                        showInFilters: attr.showInFilters !== undefined ? attr.showInFilters : false,
                        showInDetails: attr.showInDetails !== undefined ? attr.showInDetails : true,
                        order: attr.order || 0,
                        unit: attr.unit || '',
                        active: true,
                    });
                }
            }
            console.log(`  Synced ${config.attributes.length} attributes for ${config.nameAr}`);
        }

        console.log('\nAll Unit Types & Attributes seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedData();
