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
const Advertisement = require('../src/features/advertisements/models/advertisementModel');
const Booking = require('../src/features/bookings/models/bookingModel');
const User = require('../src/features/auth/models/userModel');
const { generateToken } = require('../src/utils/generateToken');
const { validateAttributes, buildPricingData } = require('../src/features/advertisements/controllers/advertisementController');
const { checkBookingOverlap } = require('../src/features/bookings/controllers/bookingController');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  ✅ [PASS] ${message}`);
    } else {
        console.error(`  ❌ [FAIL] ${message}`);
        throw new Error(`Assertion failed: ${message}`);
    }
}

const runTests = async () => {
    console.log('====================================================');
    console.log('🧪 KUBA LISTINGS & UNIT TYPES COMPREHENSIVE TEST SUITE');
    console.log('====================================================\n');

    try {
        const targetUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/kuba';
        await mongoose.connect(targetUri);
        console.log('Connected to DB for tests.\n');

        // Setup test user and tokens
        let adminUser = await User.findOne({ role: 'admin' });
        if (!adminUser) {
            adminUser = await User.create({
                name: 'Test Super Admin',
                email: 'test-admin@kuba-app.com',
                password: 'Password@123',
                role: 'admin',
                isEmailVerified: true,
                active: true,
            });
        }
        const adminToken = generateToken({ id: adminUser._id, role: 'admin' });

        let regularUser = await User.findOne({ role: 'user' });
        if (!regularUser) {
            regularUser = await User.create({
                name: 'Regular Customer',
                email: 'customer@kuba-app.com',
                password: 'Password@123',
                role: 'user',
                isEmailVerified: true,
                active: true,
            });
        }

        // Test 1: Categories Retrieval
        console.log('--- TEST 1: Categories Verification ---');
        const categories = await Category.find();
        assert(categories.length > 0, `Existing categories found (${categories.length} categories)`);
        const testCategory = categories[0];

        // Test 2: Create a new Unit Type dynamically
        console.log('\n--- TEST 2: Dynamic Unit Type Creation ---');
        const testUnitTypeSlug = `beach_buggy_${Date.now()}`;
        const unitType = await UnitType.create({
            name: 'Beach Buggy',
            nameAr: 'بيتش باجي سفاري',
            slug: testUnitTypeSlug,
            description: 'مركبات دفع رباعي لرحلات السفاري بالصحراء الساحلية',
            icon: 'fa-motorcycle',
            categories: [testCategory._id],
            pricingUnits: ['per_hour', 'per_trip'],
            defaultPricingUnit: 'per_hour',
            active: true,
        });
        assert(unitType && unitType._id, `UnitType created with ID: ${unitType._id}`);
        assert(unitType.slug === testUnitTypeSlug, `Slug correctly assigned: ${unitType.slug}`);

        // Test 3: Add Dynamic Attributes to the new Unit Type
        console.log('\n--- TEST 3: Dynamic Attributes Definition ---');
        const attrEngine = await UnitTypeAttribute.create({
            unitType: unitType._id,
            name: 'Engine CC',
            nameAr: 'سعة المحرك',
            key: 'engine_cc',
            dataType: 'number',
            unit: 'CC',
            required: true,
            showInFilters: true,
            order: 1,
        });
        assert(attrEngine && attrEngine._id, `Attribute 'engine_cc' created (dataType: number, required: true)`);

        const attrSafety = await UnitTypeAttribute.create({
            unitType: unitType._id,
            name: 'Safety Helmet Included',
            nameAr: 'خوذة أمان متوفرة',
            key: 'safety_helmet',
            dataType: 'boolean',
            required: false,
            defaultValue: true,
            order: 2,
        });
        assert(attrSafety && attrSafety._id, `Attribute 'safety_helmet' created (dataType: boolean, default: true)`);

        // Test 4: Validation Engine for Dynamic Attributes
        console.log('\n--- TEST 4: Attribute Validation Rules Engine ---');
        // Test missing required attribute
        const invalidMissing = await validateAttributes(unitType._id, { safety_helmet: true });
        assert(!invalidMissing.valid, 'Correctly rejected missing required attribute (engine_cc)');

        // Test invalid data type
        const invalidType = await validateAttributes(unitType._id, { engine_cc: 'not_a_number' });
        assert(!invalidType.valid, 'Correctly rejected string for number dataType');

        // Test valid attributes
        const validAttrs = await validateAttributes(unitType._id, { engine_cc: '450', safety_helmet: 'true' });
        assert(validAttrs.valid && validAttrs.sanitized.engine_cc === 450, 'Correctly parsed and typed valid attributes');

        // Test 5: Pricing Calculation Engine
        console.log('\n--- TEST 5: Advanced Pricing Calculation Engine ---');
        const p1 = buildPricingData({ basePrice: 1000, discountType: 'percentage', discountValue: 20 });
        assert(p1.finalPrice === 800, `Percentage discount: 1000 - 20% = ${p1.finalPrice}`);

        const p2 = buildPricingData({ basePrice: 1000, discountType: 'fixed', discountValue: 250 });
        assert(p2.finalPrice === 750, `Fixed discount: 1000 - 250 = ${p2.finalPrice}`);

        const p3 = buildPricingData({ basePrice: 500, discountType: 'percentage', discountValue: 150 });
        assert(p3.finalPrice === 0, `Capped discount: percentage > 100% clamps safely to 0 (finalPrice: ${p3.finalPrice})`);

        // Test 6: Create Chalet Listing with dynamic attributes & per_night pricing
        console.log('\n--- TEST 6: Chalet Listing Creation ---');
        const chaletUnitType = await UnitType.findOne({ slug: 'chalet' });
        assert(Boolean(chaletUnitType), 'Found seeded Chalet UnitType');

        const chaletAd = await Advertisement.create({
            title: 'شاليه فاخر بفيو بحري مميز - ستيلا دي ماري',
            description: 'شاليه دور أول بحديقة خاصة وحمام سباحة مطل على البحر مباشرة',
            category: testCategory._id,
            unitType: chaletUnitType._id,
            type: chaletUnitType.slug,
            pricing: {
                basePrice: 3500,
                discountType: 'percentage',
                discountValue: 10,
                pricingUnit: 'per_night',
                minDuration: 2,
            },
            location: 'الساحل الشمالي - سيدي عبد الرحمن',
            address: 'قرية ستيلا هايتس، شاليه 104',
            attributes: {
                guests_count: 6,
                bedrooms: 3,
                bathrooms: 2,
                has_pool: true,
                has_ac: true,
                sea_view: true,
            },
            active: true,
        });
        assert(chaletAd && chaletAd._id, `Chalet listing created with ID: ${chaletAd._id}`);
        assert(chaletAd.pricing.finalPrice === 3150, `Chalet finalPrice correctly computed: 3500 - 10% = ${chaletAd.pricing.finalPrice}`);
        assert(chaletAd.price === 3150, `Legacy price synchronized for Flutter compatibility: ${chaletAd.price}`);
        assert(chaletAd.attributes.guests_count === 6, 'Dynamic attributes stored accurately');

        // Test 7: Create Hotel Room Listing
        console.log('\n--- TEST 7: Hotel Room Listing Creation ---');
        const hotelUnitType = await UnitType.findOne({ slug: 'hotel_room' });
        assert(Boolean(hotelUnitType), 'Found seeded Hotel Room UnitType');

        const hotelAd = await Advertisement.create({
            title: 'جناح ديلوكس مطل على البحر - فندق ريكسوس',
            description: 'إقامة فاخرة شاملة جميع الوجبات مع إطلالة بانورامية',
            category: testCategory._id,
            unitType: hotelUnitType._id,
            type: hotelUnitType.slug,
            pricing: {
                basePrice: 8000,
                discountType: 'none',
                discountValue: 0,
                pricingUnit: 'per_night',
            },
            attributes: {
                room_type: 'Deluxe Room',
                guests_count: 2,
                beds_count: 1,
                bed_type: 'King Bed',
                bathrooms: 1,
                meal_plan: 'شامل الإفطار (Bed & Breakfast)',
            },
            active: true,
        });
        assert(hotelAd && hotelAd.attributes.room_type === 'Deluxe Room', `Hotel listing created (Room Type: ${hotelAd.attributes.room_type})`);

        // Test 8: Create Yacht Listing with per_hour pricing
        console.log('\n--- TEST 8: Yacht Listing Creation (Hourly Rate) ---');
        const yachtUnitType = await UnitType.findOne({ slug: 'yacht' });
        assert(Boolean(yachtUnitType), 'Found seeded Yacht UnitType');

        const yachtAd = await Advertisement.create({
            title: 'يخت أمواج برستيج - 45 قدم',
            description: 'رحلات بحرية وصيد فاخرة مع طاقم محترف ومعدات سنوركلينج',
            category: testCategory._id,
            unitType: yachtUnitType._id,
            type: yachtUnitType.slug,
            pricing: {
                basePrice: 2000,
                discountType: 'none',
                pricingUnit: 'per_hour',
                minDuration: 3,
            },
            attributes: {
                max_passengers: 12,
                cabins_count: 2,
                bathrooms: 1,
                has_crew: true,
                length_feet: 45,
            },
            active: true,
        });
        assert(yachtAd.pricing.pricingUnit === 'per_hour', `Yacht priced per hour: ${yachtAd.pricing.pricingUnit}`);
        assert(yachtAd.attributes.max_passengers === 12, `Passenger capacity: ${yachtAd.attributes.max_passengers}`);

        // Test 9: Create Golf Car Listing with per_day pricing
        console.log('\n--- TEST 9: Golf Car Listing Creation (Daily/Hourly Rate) ---');
        const golfCarUnitType = await UnitType.findOne({ slug: 'golf_car' });
        assert(Boolean(golfCarUnitType), 'Found seeded Golf Car UnitType');

        const golfCarAd = await Advertisement.create({
            title: 'Golf Car Club Car 4 Passengers',
            description: 'عربة جولف كهربائية فاخرة ببطاريات شحن سريع',
            category: testCategory._id,
            unitType: golfCarUnitType._id,
            type: golfCarUnitType.slug,
            pricing: {
                basePrice: 1500,
                discountType: 'fixed',
                discountValue: 200,
                pricingUnit: 'per_day',
            },
            attributes: {
                passengers: '4 ركاب',
                power_type: 'كهربائي (Electric)',
                max_speed: 30,
            },
            active: true,
        });
        assert(golfCarAd.pricing.finalPrice === 1300, `Golf Car final price: 1500 - 200 = ${golfCarAd.pricing.finalPrice}`);

        // Test 10: Query and Filter Listings by Dynamic Attributes
        console.log('\n--- TEST 10: Filter by Dynamic Attributes & Price ---');
        const chaletsWithPool = await Advertisement.find({
            unitType: chaletUnitType._id,
            'attributes.has_pool': true,
            'pricing.finalPrice': { $lte: 4000 },
        });
        assert(chaletsWithPool.length > 0, `Found ${chaletsWithPool.length} chalets with pool under 4000 EGP`);

        const hourlyYachts = await Advertisement.find({
            'pricing.pricingUnit': 'per_hour',
        });
        assert(hourlyYachts.length > 0, `Found ${hourlyYachts.length} hourly listings`);

        // Test 11: Booking and Overlap Prevention
        console.log('\n--- TEST 11: Booking System & Overlap Detection ---');
        const bookStart1 = new Date('2026-07-01T14:00:00Z');
        const bookEnd1 = new Date('2026-07-05T12:00:00Z');

        const booking1 = await Booking.create({
            advertisement: chaletAd._id,
            user: regularUser._id,
            startDate: bookStart1,
            endDate: bookEnd1,
            duration: 4,
            pricingUnit: 'per_night',
            unitPrice: chaletAd.pricing.finalPrice,
            totalPrice: chaletAd.pricing.finalPrice * 4,
            status: 'confirmed',
        });
        assert(booking1 && booking1._id, `Booking #1 created for Chalet: 4 nights x ${chaletAd.pricing.finalPrice} = ${booking1.totalPrice} EGP`);

        // Check overlapping dates
        const overlapStart = new Date('2026-07-03T10:00:00Z');
        const overlapEnd = new Date('2026-07-08T12:00:00Z');
        const hasOverlap = await checkBookingOverlap(chaletAd._id, overlapStart, overlapEnd);
        assert(hasOverlap === true, 'Successfully detected date conflict with existing confirmed booking');

        // Check non-overlapping dates
        const freeStart = new Date('2026-07-10T14:00:00Z');
        const freeEnd = new Date('2026-07-15T12:00:00Z');
        const noOverlap = await checkBookingOverlap(chaletAd._id, freeStart, freeEnd);
        assert(noOverlap === false, 'Dates 10-15 July are correctly identified as AVAILABLE');

        // Test 12: Backward Compatibility with Legacy Listings
        console.log('\n--- TEST 12: Backward Compatibility with Legacy Listings ---');
        const legacyAd = await Advertisement.create({
            title: 'Legacy Apartment Listing (Old Schema Style)',
            description: 'Created with old fields only',
            type: 'apartment',
            price: 2200,
            location: 'Alexandria',
            active: true,
        });
        assert(legacyAd && legacyAd.price === 2200, 'Legacy ad created without unitType or attributes');
        assert(legacyAd.pricing.finalPrice === 2200, 'Pre-save hook synthesized pricing.finalPrice = 2200 automatically');
        assert(legacyAd.pricing.pricingUnit === 'per_night', 'Default pricingUnit is per_night');

        // Clean up temporary buggy unit type
        await UnitTypeAttribute.deleteMany({ unitType: unitType._id });
        await UnitType.deleteOne({ _id: unitType._id });

        console.log('\n====================================================');
        console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
        console.log('====================================================\n');
        process.exit(0);
    } catch (err) {
        console.error('\n❌ Test Suite Failed:', err);
        process.exit(1);
    }
};

runTests();
