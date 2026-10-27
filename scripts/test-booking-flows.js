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
const Advertisement = require('../src/features/advertisements/models/advertisementModel');
const Room = require('../src/features/rooms/models/roomModel');
const Booking = require('../src/features/bookings/models/bookingModel');
const User = require('../src/features/auth/models/userModel');
const { checkBookingOverlap, parseBookingWindow } = require('../src/features/bookings/middleware/bookingMiddleware');
const { determineBookingPricing } = require('../src/features/bookings/controllers/bookingController');

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
    console.log('================================================================');
    console.log('🏨 🏖️ 🛥️ 🛺 KUBA MULTI-PROCESS BOOKING SYSTEM INTEGRATION TEST');
    console.log('================================================================\n');

    try {
        const targetUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/kuba';
        await mongoose.connect(targetUri);
        console.log('Connected to DB for tests.\n');

        // Setup users
        let testAdmin = await User.findOne({ role: 'admin' });
        if (!testAdmin) {
            testAdmin = await User.create({
                name: 'Admin User',
                email: 'admin-booking@kuba.com',
                password: 'Password@123',
                role: 'admin',
                isEmailVerified: true,
            });
        }

        let testCustomer = await User.findOne({ email: 'customer-test@kuba.com' });
        if (!testCustomer) {
            testCustomer = await User.create({
                name: 'Customer Ahmed',
                email: 'customer-test@kuba.com',
                password: 'Password@123',
                role: 'user',
                isEmailVerified: true,
            });
        }

        let testCustomer2 = await User.findOne({ email: 'customer2-test@kuba.com' });
        if (!testCustomer2) {
            testCustomer2 = await User.create({
                name: 'Customer Sara',
                email: 'customer2-test@kuba.com',
                password: 'Password@123',
                role: 'user',
                isEmailVerified: true,
            });
        }

        const cat = await Category.findOne() || await Category.create({ name: 'سياحة وإقامة', image: 'cat.png' });

        // =========================================================================
        // PROCESS 1: HOTEL BOOKING & AVAILABLE ROOMS
        // "هو لو دخل علي فندق ودخل يحجز يظهرله الغرف اللي ف الفندق المتاحه ف الوقت دا"
        // =========================================================================
        console.log('--- PROCESS 1: HOTEL & AVAILABLE ROOMS IN TIME WINDOW ---');

        const hotel = await Advertisement.create({
            title: 'فندق سمر لاند ريزورت الساحل الشمالي',
            type: 'hotel',
            isHotel: true,
            price: 2500,
            location: 'الساحل الشمالي - الكيلو 120',
            category: cat._id,
            owner: testAdmin._id,
            active: true,
        });
        assert(hotel.isHotel === true, 'Hotel created with isHotel = true');

        // Add 2 rooms to this hotel
        const roomA = await Room.create({
            hotel: hotel._id,
            roomNumber: '101',
            title: 'Deluxe Sea View Room',
            roomType: 'deluxe',
            price: 2000,
            pricing: {
                basePrice: 2000,
                finalPrice: 2000,
                pricingUnit: 'per_night',
            },
            capacity: { adults: 2, children: 1, maxGuests: 3 },
            active: true,
        });

        const roomB = await Room.create({
            hotel: hotel._id,
            roomNumber: '201',
            title: 'Royal Penthouse Suite',
            roomType: 'royal_suite',
            price: 3500,
            pricing: {
                basePrice: 3500,
                finalPrice: 3500,
                pricingUnit: 'per_night',
            },
            capacity: { adults: 4, children: 2, maxGuests: 6 },
            active: true,
        });
        assert(roomA._id && roomB._id, 'Created 2 rooms (Deluxe 101 & Royal Suite 201) under Hotel');

        // Check availability for Nov 1 to Nov 5 (4 nights)
        const checkInNov1 = new Date('2026-11-01T14:00:00.000Z');
        const checkOutNov5 = new Date('2026-11-05T12:00:00.000Z');

        // Before any booking: both rooms are free
        const overlapA_before = await checkBookingOverlap({ roomId: roomA._id, startDate: checkInNov1, endDate: checkOutNov5 });
        const overlapB_before = await checkBookingOverlap({ roomId: roomB._id, startDate: checkInNov1, endDate: checkOutNov5 });
        assert(!overlapA_before && !overlapB_before, 'Both rooms are initially AVAILABLE for Nov 1 - Nov 5');

        // Customer 1 books Room A for Nov 1 to Nov 5
        const pricingA = determineBookingPricing({ room: roomA, start: checkInNov1, end: checkOutNov5 });
        assert(pricingA.duration === 4, `Hotel duration is 4 nights (got ${pricingA.duration})`);
        assert(pricingA.totalPrice === 8000, `Room A totalPrice = 4 * 2000 = 8000 (got ${pricingA.totalPrice})`);

        const bookingHotelRoomA = await Booking.create({
            bookingType: 'hotel',
            advertisement: hotel._id,
            room: roomA._id,
            user: testCustomer._id,
            startDate: checkInNov1,
            endDate: checkOutNov5,
            duration: pricingA.duration,
            pricingUnit: pricingA.pricingUnit,
            unitPrice: pricingA.unitPrice,
            totalPrice: pricingA.totalPrice,
            status: 'confirmed',
        });
        assert(bookingHotelRoomA._id, 'Booking confirmed for Room A');

        // Now check availability again: Room A is booked, but Room B MUST STILL BE AVAILABLE!
        const overlapA_after = await checkBookingOverlap({ roomId: roomA._id, startDate: checkInNov1, endDate: checkOutNov5 });
        const overlapB_after = await checkBookingOverlap({ roomId: roomB._id, startDate: checkInNov1, endDate: checkOutNov5 });
        assert(overlapA_after === true, 'Room A is correctly marked as BOOKED (unavailable)');
        assert(overlapB_after === false, 'Room B is STILL AVAILABLE in the same hotel for the same dates!');

        // Customer 2 tries to book Room A on overlapping dates (Nov 3 to Nov 7) -> Conflict detected!
        const checkInNov3 = new Date('2026-11-03T14:00:00.000Z');
        const checkOutNov7 = new Date('2026-11-07T12:00:00.000Z');
        const overlapA_conflict = await checkBookingOverlap({ roomId: roomA._id, startDate: checkInNov3, endDate: checkOutNov7 });
        assert(overlapA_conflict === true, 'Date conflict successfully detected when attempting to double-book Room A');

        // Customer 2 books Room B for Nov 1 to Nov 5 -> Succeeds!
        const pricingB = determineBookingPricing({ room: roomB, start: checkInNov1, end: checkOutNov5 });
        const bookingHotelRoomB = await Booking.create({
            bookingType: 'hotel',
            advertisement: hotel._id,
            room: roomB._id,
            user: testCustomer2._id,
            startDate: checkInNov1,
            endDate: checkOutNov5,
            duration: pricingB.duration,
            pricingUnit: pricingB.pricingUnit,
            unitPrice: pricingB.unitPrice,
            totalPrice: pricingB.totalPrice,
            status: 'confirmed',
        });
        assert(bookingHotelRoomB.totalPrice === 14000, `Room B totalPrice = 4 * 3500 = 14000 (got ${bookingHotelRoomB.totalPrice})`);

        // Now both rooms are booked for Nov 1 - Nov 5. Check if next week (Nov 10 - Nov 15) is free:
        const checkInNov10 = new Date('2026-11-10T14:00:00.000Z');
        const checkOutNov15 = new Date('2026-11-15T12:00:00.000Z');
        const overlapA_nextWeek = await checkBookingOverlap({ roomId: roomA._id, startDate: checkInNov10, endDate: checkOutNov15 });
        const overlapB_nextWeek = await checkBookingOverlap({ roomId: roomB._id, startDate: checkInNov10, endDate: checkOutNov15 });
        assert(!overlapA_nextWeek && !overlapB_nextWeek, 'Both rooms are available again for Nov 10 - Nov 15');

        // =========================================================================
        // PROCESS 2: CHALET DIRECT BOOKING
        // "طيب لو شاليه يخش يحجز علطول فاهمني"
        // =========================================================================
        console.log('\n--- PROCESS 2: CHALET DIRECT BOOKING ---');

        const chalet = await Advertisement.create({
            title: 'شاليه مميز على اللاجون مباشرة - مراسي',
            type: 'chalet',
            price: 3200,
            pricing: {
                basePrice: 3200,
                finalPrice: 3200,
                pricingUnit: 'per_night',
                minDuration: 2,
            },
            location: 'الساحل الشمالي - سيدي عبد الرحمن',
            category: cat._id,
            owner: testAdmin._id,
            active: true,
        });

        // Direct booking dates
        const chaletStart = new Date('2026-11-10T14:00:00.000Z');
        const chaletEnd = new Date('2026-11-13T12:00:00.000Z'); // 3 nights

        const chaletPricing = determineBookingPricing({ ad: chalet, start: chaletStart, end: chaletEnd });
        assert(chaletPricing.bookingType === 'chalet', 'Inferred bookingType is chalet');
        assert(chaletPricing.duration === 3, 'Calculated duration: 3 nights');
        assert(chaletPricing.totalPrice === 3 * 3200, `Total price: 3 * 3200 = 9600 (got ${chaletPricing.totalPrice})`);

        // Create booking directly
        const chaletBooking = await Booking.create({
            bookingType: chaletPricing.bookingType,
            advertisement: chalet._id,
            room: null,
            user: testCustomer._id,
            startDate: chaletStart,
            endDate: chaletEnd,
            duration: chaletPricing.duration,
            pricingUnit: chaletPricing.pricingUnit,
            unitPrice: chaletPricing.unitPrice,
            totalPrice: chaletPricing.totalPrice,
            status: 'confirmed',
        });
        assert(chaletBooking._id, 'Chalet booked directly without room intermediary');

        // Overlap verification for Chalet
        const chaletConflictCheck = await checkBookingOverlap({
            advertisementId: chalet._id,
            startDate: new Date('2026-11-12T14:00:00.000Z'),
            endDate: new Date('2026-11-15T12:00:00.000Z'),
        });
        assert(chaletConflictCheck === true, 'Chalet direct overlap detected on conflicting dates (Nov 12 - Nov 15)');

        // Non-overlapping date check
        const chaletFreeCheck = await checkBookingOverlap({
            advertisementId: chalet._id,
            startDate: new Date('2026-11-15T14:00:00.000Z'),
            endDate: new Date('2026-11-18T12:00:00.000Z'),
        });
        assert(chaletFreeCheck === false, 'Chalet free for Nov 15 - Nov 18');

        // =========================================================================
        // PROCESS 3: YACHT BOOKING (HOURLY OR FULL DAY)
        // "او يخت مثلا يحجز اليوم وعايزه ساعه او اكتر ولا يوم كامل"
        // =========================================================================
        console.log('\n--- PROCESS 3: YACHT BOOKING (HOURLY VS FULL DAY) ---');

        const yacht = await Advertisement.create({
            title: 'يخت أمواج البحر الأحمر الفاخر 55 قدم',
            type: 'yacht',
            price: 1500,
            pricing: {
                basePrice: 1500,
                finalPrice: 1500,
                pricingUnit: 'per_hour',
                pricePerHour: 1500,
                fullDayPrice: 12000,
                minDuration: 2,
            },
            location: 'الغردقة - مارينا الجونة',
            category: cat._id,
            owner: testAdmin._id,
            active: true,
        });

        // Scenario 3A: Parse hourly input (date: '2026-11-20', startTime: '10:00', durationHours: 3)
        const hourlyWindow = parseBookingWindow({
            date: '2026-11-20',
            startTime: '10:00',
            durationHours: 3,
            rentalType: 'hourly',
        });
        assert(hourlyWindow !== null, 'Hourly booking window parsed successfully');
        assert(hourlyWindow.start.getUTCHours() === 10, 'Start hour is 10:00 UTC');
        assert(hourlyWindow.end.getUTCHours() === 13, 'End hour is 13:00 UTC (3 hours duration)');

        const yachtHourlyPricing = determineBookingPricing({
            ad: yacht,
            start: hourlyWindow.start,
            end: hourlyWindow.end,
            rentalTypeInput: 'hourly',
        });
        assert(yachtHourlyPricing.bookingType === 'yacht', 'Inferred bookingType is yacht');
        assert(yachtHourlyPricing.rentalType === 'hourly', 'Rental type is hourly');
        assert(yachtHourlyPricing.duration === 3, 'Hourly duration is 3 hours');
        assert(yachtHourlyPricing.totalPrice === 3 * 1500, `Yacht hourly price = 3 * 1500 = 4500 (got ${yachtHourlyPricing.totalPrice})`);

        // Customer 1 books 10:00 to 13:00
        const yachtBooking1 = await Booking.create({
            bookingType: 'yacht',
            advertisement: yacht._id,
            rentalType: 'hourly',
            user: testCustomer._id,
            startDate: hourlyWindow.start,
            endDate: hourlyWindow.end,
            duration: yachtHourlyPricing.duration,
            pricingUnit: yachtHourlyPricing.pricingUnit,
            unitPrice: yachtHourlyPricing.unitPrice,
            totalPrice: yachtHourlyPricing.totalPrice,
            status: 'confirmed',
        });
        assert(yachtBooking1._id, 'Yacht hourly slot (10:00 - 13:00) booked successfully');

        // Scenario 3B: Customer 2 wants to book the FULL DAY on 2026-11-20
        // Because slot 10:00-13:00 is already booked, full day MUST BE BLOCKED!
        const fullDayWindow = parseBookingWindow({
            date: '2026-11-20',
            rentalType: 'full_day',
        });
        const fullDayOverlap = await checkBookingOverlap({
            advertisementId: yacht._id,
            startDate: fullDayWindow.start,
            endDate: fullDayWindow.end,
        });
        assert(fullDayOverlap === true, 'FULL DAY booking is BLOCKED because an hourly booking already exists on that date');

        // Scenario 3C: Customer 2 books a DIFFERENT hourly slot on the same day (14:00 to 17:00) -> MUST SUCCEED!
        const afternoonWindow = parseBookingWindow({
            date: '2026-11-20',
            startTime: '14:00',
            durationHours: 3,
            rentalType: 'hourly',
        });
        const afternoonOverlap = await checkBookingOverlap({
            advertisementId: yacht._id,
            startDate: afternoonWindow.start,
            endDate: afternoonWindow.end,
        });
        assert(afternoonOverlap === false, 'Afternoon slot (14:00 - 17:00) is AVAILABLE on the same day!');

        const yachtBooking2 = await Booking.create({
            bookingType: 'yacht',
            advertisement: yacht._id,
            rentalType: 'hourly',
            user: testCustomer2._id,
            startDate: afternoonWindow.start,
            endDate: afternoonWindow.end,
            duration: 3,
            pricingUnit: 'per_hour',
            unitPrice: 1500,
            totalPrice: 4500,
            status: 'confirmed',
        });
        assert(yachtBooking2._id, 'Second hourly slot booked successfully on the same day');

        // Scenario 3D: Customer 3 tries to book 12:00 to 15:00 (overlaps with both 10-13 and 14-17) -> MUST FAIL!
        const conflictingSlotWindow = parseBookingWindow({
            date: '2026-11-20',
            startTime: '12:00',
            durationHours: 3,
            rentalType: 'hourly',
        });
        const conflictSlotOverlap = await checkBookingOverlap({
            advertisementId: yacht._id,
            startDate: conflictingSlotWindow.start,
            endDate: conflictingSlotWindow.end,
        });
        assert(conflictSlotOverlap === true, 'Slot 12:00-15:00 correctly rejected due to overlap with 10:00-13:00');

        // Scenario 3E: Customer books a FULL DAY on the NEXT day (2026-11-21) when yacht is completely free -> MUST SUCCEED!
        const freeDayWindow = parseBookingWindow({
            date: '2026-11-21',
            rentalType: 'full_day',
        });
        const freeDayOverlap = await checkBookingOverlap({
            advertisementId: yacht._id,
            startDate: freeDayWindow.start,
            endDate: freeDayWindow.end,
        });
        assert(freeDayOverlap === false, 'Full day on 2026-11-21 is completely AVAILABLE');

        const yachtFullDayPricing = determineBookingPricing({
            ad: yacht,
            start: freeDayWindow.start,
            end: freeDayWindow.end,
            rentalTypeInput: 'full_day',
        });
        assert(yachtFullDayPricing.rentalType === 'full_day', 'Rental type is full_day');
        assert(yachtFullDayPricing.totalPrice === 12000, `Yacht fullDayPrice = 12000 (got ${yachtFullDayPricing.totalPrice})`);

        const yachtFullDayBooking = await Booking.create({
            bookingType: 'yacht',
            advertisement: yacht._id,
            rentalType: 'full_day',
            user: testCustomer._id,
            startDate: freeDayWindow.start,
            endDate: freeDayWindow.end,
            duration: 1,
            pricingUnit: 'per_day',
            unitPrice: yachtFullDayPricing.unitPrice,
            totalPrice: yachtFullDayPricing.totalPrice,
            status: 'confirmed',
        });
        assert(yachtFullDayBooking._id, 'Yacht FULL DAY booked successfully');

        // Now an hourly booking on 2026-11-21 MUST BE BLOCKED because full day is booked!
        const blockedHourWindow = parseBookingWindow({
            date: '2026-11-21',
            startTime: '16:00',
            durationHours: 2,
            rentalType: 'hourly',
        });
        const blockedHourOverlap = await checkBookingOverlap({
            advertisementId: yacht._id,
            startDate: blockedHourWindow.start,
            endDate: blockedHourWindow.end,
        });
        assert(blockedHourOverlap === true, 'Hourly slot is correctly BLOCKED by the full-day booking');

        // =========================================================================
        // PROCESS 4: GOLF CAR BOOKING (HOURLY OR DAILY)
        // "وكذلك الجولف كار"
        // =========================================================================
        console.log('\n--- PROCESS 4: GOLF CAR (HOURLY / DAILY) ---');

        const golfCar = await Advertisement.create({
            title: 'عربة جولف كلوب كار 6 ركاب كهربائية فاخرة',
            type: 'golf_car',
            price: 350,
            pricing: {
                basePrice: 350,
                finalPrice: 350,
                pricingUnit: 'per_hour',
                pricePerHour: 350,
                fullDayPrice: 2000,
                minDuration: 1,
            },
            location: 'الجونة - الحي النوبي',
            category: cat._id,
            owner: testAdmin._id,
            active: true,
        });

        // Hourly Golf Car booking: 2 hours (09:00 to 11:00)
        const golfHourlyWindow = parseBookingWindow({
            date: '2026-11-25',
            startTime: '09:00',
            durationHours: 2,
            rentalType: 'hourly',
        });
        const golfHourlyPricing = determineBookingPricing({
            ad: golfCar,
            start: golfHourlyWindow.start,
            end: golfHourlyWindow.end,
            rentalTypeInput: 'hourly',
        });
        assert(golfHourlyPricing.bookingType === 'golf_car', 'Booking type is golf_car');
        assert(golfHourlyPricing.totalPrice === 2 * 350, `Golf car 2 hours = 700 EGP (got ${golfHourlyPricing.totalPrice})`);

        const golfBooking1 = await Booking.create({
            bookingType: 'golf_car',
            advertisement: golfCar._id,
            rentalType: 'hourly',
            user: testCustomer._id,
            startDate: golfHourlyWindow.start,
            endDate: golfHourlyWindow.end,
            duration: 2,
            pricingUnit: 'per_hour',
            unitPrice: 350,
            totalPrice: 700,
            status: 'confirmed',
        });
        assert(golfBooking1._id, 'Golf car booked for 2 hours (09:00 - 11:00)');

        // Full day Golf Car rental on 2026-11-26
        const golfFullDayWindow = parseBookingWindow({
            date: '2026-11-26',
            rentalType: 'full_day',
        });
        const golfDailyPricing = determineBookingPricing({
            ad: golfCar,
            start: golfFullDayWindow.start,
            end: golfFullDayWindow.end,
            rentalTypeInput: 'full_day',
        });
        assert(golfDailyPricing.totalPrice === 2000, `Golf car full day = 2000 EGP (got ${golfDailyPricing.totalPrice})`);

        const golfBooking2 = await Booking.create({
            bookingType: 'golf_car',
            advertisement: golfCar._id,
            rentalType: 'full_day',
            user: testCustomer2._id,
            startDate: golfFullDayWindow.start,
            endDate: golfFullDayWindow.end,
            duration: 1,
            pricingUnit: 'per_day',
            unitPrice: 2000,
            totalPrice: 2000,
            status: 'confirmed',
        });
        assert(golfBooking2._id, 'Golf car booked for Full Day on 2026-11-26');

        // =========================================================================
        // PROCESS 5: CANCELLATION & SLOT LIBERATION
        // =========================================================================
        console.log('\n--- PROCESS 5: CANCELLATION & CALENDAR SLOT LIBERATION ---');

        // Currently, golfBooking1 occupies 09:00 - 11:00 on 2026-11-25
        const checkBeforeCancel = await checkBookingOverlap({
            advertisementId: golfCar._id,
            startDate: golfHourlyWindow.start,
            endDate: golfHourlyWindow.end,
        });
        assert(checkBeforeCancel === true, 'Slot 09:00-11:00 is currently occupied');

        // Cancel the booking
        golfBooking1.status = 'cancelled';
        golfBooking1.cancellationReason = 'User requested cancellation due to travel changes';
        await golfBooking1.save();

        // The slot MUST now be free for other users!
        const checkAfterCancel = await checkBookingOverlap({
            advertisementId: golfCar._id,
            startDate: golfHourlyWindow.start,
            endDate: golfHourlyWindow.end,
        });
        assert(checkAfterCancel === false, 'Slot 09:00-11:00 is immediately LIBERATED and available for booking after cancellation');

        console.log('\n================================================================');
        console.log(`🎉 ALL ${passedTests}/${totalTests} MULTI-PROCESS BOOKING TESTS PASSED!`);
        console.log('================================================================\n');

        process.exit(0);
    } catch (err) {
        console.error('\n❌ TEST RUN ERROR:', err.message, err.stack);
        process.exit(1);
    }
};

runTests();
