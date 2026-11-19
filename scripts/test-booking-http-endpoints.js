const http = require('http');
const path = require('path');
const dns = require('dns');
const dotenv = require('dotenv');

try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) {
    // The booking script can still use the system resolver.
}

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

const express = require('express');
const mongoose = require('mongoose');
const Advertisement = require('../src/features/advertisements/models/advertisementModel');
const Room = require('../src/features/rooms/models/roomModel');
const Booking = require('../src/features/bookings/models/bookingModel');
const User = require('../src/features/auth/models/userModel');
require('../src/features/categories/models/categoryModel');
require('../src/features/cities/models/cityModel');
require('../src/features/regions/models/regionModel');
require('../src/features/unit-types/models/unitTypeModel');
const { generateToken } = require('../src/utils/generateToken');
const { i18nMiddleware } = require('../utils/i18n');
const globalErrorHandler = require('../src/middleware/errorMiddleware');
const bookingRoutes = require('../src/features/bookings/routes/bookingRoutes');
const adminBookingRoutes = require('../admin/features/bookings/routes/bookingRoutes');
const buildBlockedPeriodRoutes = require('../src/features/bookings/routes/blockedPeriodRoutes');
const { protect } = require('../src/features/auth/middleware/authMiddleware');
const { protectAdmin } = require('../admin/middleware/authMiddleware');
const BlockedPeriod = require('../src/features/bookings/models/blockedPeriodModel');
const PaymentMethod = require('../src/features/payments/models/paymentMethodModel');

const app = express();
app.use(express.json());
app.use(i18nMiddleware);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/admin/bookings', adminBookingRoutes);
app.use('/api/v1/advertisements', buildBlockedPeriodRoutes(protect));
app.use('/api/v1/admin/advertisements', buildBlockedPeriodRoutes(protectAdmin));
app.use(globalErrorHandler);

let baseUrl;
let passed = 0;
const created = { users: [], ads: [], rooms: [], paymentMethods: [] };

const request = (method, urlPath, { body, token } = {}) => new Promise((resolve, reject) => {
    const url = new URL(baseUrl + urlPath);
    const req = http.request({
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
});

const expect = (condition, message, res) => {
    if (!condition) {
        throw new Error(`${message}\n    Response: ${JSON.stringify(res && res.body)}`);
    }
    passed++;
    console.log(`  ✅ ${message}`);
};

// ISO date `daysAhead` days from today at the given UTC hour
const at = (daysAhead, hour = 12) => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + daysAhead);
    d.setUTCHours(hour, 0, 0, 0);
    return d.toISOString();
};

const createUser = async (role) => {
    const user = await User.create({
        name: `Booking Test ${role}`,
        email: `booking-test-${role}-${Date.now()}@kuba.test`,
        password: 'Password@123',
        role,
        isEmailVerified: true,
    });
    created.users.push(user._id);
    return { user, token: generateToken({ id: user._id, role }) };
};

const createAd = async (fields) => {
    const ad = await Advertisement.create({ active: true, ...fields });
    created.ads.push(ad._id);
    return ad;
};

const run = async () => {
    await mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/kuba');

    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    baseUrl = `http://localhost:${server.address().port}`;

    try {
        const customer = await createUser('user');
        const otherCustomer = await createUser('user');
        const owner = await createUser('owner');

        const chalet = await createAd({
            title: 'Test Chalet',
            type: 'chalet',
            owner: owner.user._id,
            pricing: { basePrice: 1000, pricingUnit: 'per_night', minDuration: 2 },
        });
        const yacht = await createAd({
            title: 'Test Yacht',
            type: 'yacht',
            owner: owner.user._id,
            pricing: { basePrice: 2000, pricingUnit: 'per_hour', pricePerHour: 500 },
        });
        const hotel = await createAd({
            title: 'Test Hotel',
            type: 'hotel',
            owner: owner.user._id,
            pricing: { basePrice: 3000, pricingUnit: 'per_night' },
        });
        const roomA = await Room.create({ hotel: hotel._id, title: 'Room A', pricing: { basePrice: 800 } });
        const roomB = await Room.create({ hotel: hotel._id, title: 'Room B', pricing: { basePrice: 1200 } });
        created.rooms.push(roomA._id, roomB._id);

        console.log('\n--- Chalet (per night, minimum 2 nights) ---');
        let res = await request('GET', `/api/v1/bookings/check?advertisement=${chalet._id}&startDate=${at(30, 14)}&endDate=${at(31, 12)}`);
        expect(res.status === 400, '1 night is rejected because minimum is 2', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${chalet._id}&startDate=${at(30, 14)}&endDate=${at(33, 12)}`);
        expect(res.status === 200 && res.body.data.available === true, 'Check: 3 nights are available', res);
        expect(res.body.data.duration === 3 && res.body.data.totalPrice === 3000, 'Check: price is 3 x 1000 = 3000', res);
        expect(res.body.data.quote.total === res.body.data.totalPrice, 'Check: quote total matches totalPrice', res);

        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: { advertisement: chalet._id, startDate: at(30, 14), endDate: at(33, 12), guestDetails: { adults: 2 } },
        });
        expect(res.status === 201 && res.body.data.booking.status === 'pending', 'Create: booking saved as pending', res);
        const chaletBookingId = res.body.data.booking.id;

        res = await request('POST', '/api/v1/bookings', {
            token: otherCustomer.token,
            body: { advertisement: chalet._id, startDate: at(31, 14), endDate: at(34, 12) },
        });
        expect(res.status === 400, 'Create: overlapping dates are rejected', res);

        res = await request('GET', `/api/v1/bookings/booked-dates/${chalet._id}`);
        expect(res.status === 200 && res.body.data.bookedDates.length === 1, 'Booked dates: shows the one taken range', res);

        console.log('\n--- Yacht (per hour) ---');
        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: { advertisement: yacht._id, startDate: at(40, 10), endDate: at(40, 13) },
        });
        expect(res.status === 201 && res.body.data.booking.totalPrice === 1500, 'Create: 3 hours x 500 = 1500', res);
        expect(res.body.data.booking.rentalType === 'hourly', 'Create: saved as hourly', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${yacht._id}&startDate=${at(40, 12)}&endDate=${at(40, 14)}`);
        expect(res.status === 200 && res.body.data.available === false, 'Check: overlapping hours are unavailable', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${yacht._id}&startDate=${at(40, 13)}&endDate=${at(40, 15)}`);
        expect(res.status === 200 && res.body.data.available === true, 'Check: hours right after the booking are available', res);

        console.log('\n--- Golf car (same day, 17:00 to 19:00) ---');
        const golf = await createAd({
            title: 'Test Golf Car',
            type: 'golf_car',
            owner: owner.user._id,
            pricing: { basePrice: 400, pricingUnit: 'per_hour', pricePerHour: 500 },
        });

        res = await request('GET', `/api/v1/bookings/booked-dates/${golf._id}`);
        expect(res.status === 200 && res.body.data.booking.mode === 'hourly' && res.body.data.booking.sameDay === true, 'Booked dates: hourly booking is same-day', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${golf._id}&startDate=2026-12-20&endDate=2026-12-20`);
        expect(res.status === 400, 'Check: same day without hours is rejected', res);

        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: {
                advertisement: golf._id,
                date: '2026-12-20',
                startTime: '17:00',
                endTime: '19:00',
            },
        });
        expect(res.status === 201 && res.body.data.booking.totalPrice === 1000, 'Create: same day 17:00-19:00 is 2 hours x 500', res);
        expect(res.body.data.booking.rentalType === 'hourly' && res.body.data.booking.duration === 2, 'Create: saved as a 2 hour same-day rental', res);
        expect(new Date(res.body.data.booking.startDate).toISOString() === '2026-12-20T15:00:00.000Z', 'Create: 17:00 Cairo is 15:00 UTC', res);
        expect(new Date(res.body.data.booking.endDate).toISOString() === '2026-12-20T17:00:00.000Z', 'Create: 19:00 Cairo is 17:00 UTC, same day', res);
        expect(res.body.data.booking.confirmation.stay.checkInTime === '17:00' && res.body.data.booking.confirmation.stay.checkOutTime === '19:00', 'Create: confirmation shows 17:00 to 19:00', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${golf._id}&date=2026-12-20&startTime=6:00%20PM&endTime=8:00%20PM`);
        expect(res.status === 200 && res.body.data.available === false && res.body.data.duration === 2, 'Check: 6pm-8pm overlaps the same-day booking', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${golf._id}&date=2026-12-20&startTime=19:00&endTime=21:00`);
        expect(res.status === 200 && res.body.data.available === true && res.body.data.totalPrice === 1000, 'Check: 19:00-21:00 the same day is free', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${golf._id}&date=2026-12-21&startTime=19:00&endTime=17:00`);
        expect(res.status === 400, 'Check: end time before start time on the same day is rejected', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${golf._id}&date=2026-12-21&startTime=22:00&durationHours=4`);
        expect(res.status === 400, 'Check: hours that run into the next day are rejected', res);

        console.log('\n--- Hotel (room per night) ---');
        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: { advertisement: hotel._id, startDate: at(50, 14), endDate: at(52, 12) },
        });
        expect(res.status === 400, 'Create: hotel without a room is rejected', res);

        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: { room: roomA._id, startDate: at(50, 14), endDate: at(52, 12) },
        });
        expect(res.status === 201 && res.body.data.booking.totalPrice === 1600, 'Create: room only, 2 nights x 800 = 1600', res);
        expect(res.body.data.booking.bookingType === 'hotel', 'Create: saved as hotel booking', res);

        res = await request('GET', `/api/v1/bookings/check?room=${roomB._id}&startDate=${at(50, 14)}&endDate=${at(52, 12)}`);
        expect(res.status === 200 && res.body.data.available === true, 'Check: another room on the same dates is still available', res);

        console.log('\n--- Validation ---');
        res = await request('GET', `/api/v1/bookings/check?advertisement=${chalet._id}&startDate=${at(-3)}&endDate=${at(-1)}`);
        expect(res.status === 400, 'Dates in the past are rejected', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${chalet._id}&startDate=${at(60)}`);
        expect(res.status === 400, 'Missing end date is rejected', res);

        res = await request('POST', '/api/v1/bookings', { body: { advertisement: chalet._id, startDate: at(70), endDate: at(73) } });
        expect(res.status === 401, 'Create without login is rejected', res);

        console.log('\n--- Checkout quote stays the same on every step ---');
        const resort = await createAd({
            title: 'Azure Bay Resort',
            type: 'hotel',
            owner: owner.user._id,
            pricing: { basePrice: 7800, pricingUnit: 'per_night' },
            stay: {
                cleaningFee: 600,
                serviceFeePercent: 5,
                taxPercent: 10,
                taxLabel: 'VAT',
                checkInTime: '15:00',
                checkOutTime: '12:00',
                freeCancellationDays: 5,
                breakfastIncluded: true,
                addOns: [{
                    title: 'Breakfast in bed',
                    description: 'Breakfast in bed for 2 guests.',
                    price: 420,
                    category: 'meal',
                }],
            },
            policies: {
                booking: {
                    content: 'Full payment is due when the booking is confirmed.',
                    contentAr: 'يُدفع المبلغ كاملًا عند تأكيد الحجز.',
                },
                cancellation: {
                    content: 'Free cancellation until 5 days before check-in.',
                    contentAr: 'إلغاء مجاني حتى 5 أيام قبل الوصول.',
                },
                extras: [{
                    title: 'Pets',
                    titleAr: 'الحيوانات',
                    content: 'Pets are not allowed.',
                    contentAr: 'غير مسموح بالحيوانات.',
                }],
            },
        });
        const seaView = await Room.create({
            hotel: resort._id,
            title: 'Deluxe Sea-View',
            pricing: { basePrice: 7800 },
            beds: { count: 1, bedType: 'King Bed' },
            area: 42,
            capacity: { adults: 2, children: 0, maxGuests: 2 },
            amenities: ['Sea view'],
        });
        created.rooms.push(seaView._id);
        const breakfastId = String(resort.stay.addOns[0]._id);
        const stayStart = at(80, 15);
        const stayEnd = at(83, 12);

        res = await request('GET', `/api/v1/bookings/check?room=${seaView._id}&startDate=${stayStart}&endDate=${stayEnd}&adults=2`);
        const arrivalMethod = (res.body.data.paymentMethods || []).find((method) => method.key === 'on_arrival');
        expect(res.status === 200 && res.body.data.totalPrice === 27510, 'Review: 7800 x 3 + cleaning 600 + 5% + VAT 10% = 27510', res);
        expect(arrivalMethod && arrivalMethod.requiresTerms === false && arrivalMethod.label === 'Pay on arrival', 'Payment: pay on arrival is offered before checkout', res);
        expect(res.body.data.policies.booking.content === '<p>Full payment is due when the booking is confirmed.</p>', 'Check: owner booking policy is HTML', res);
        expect(res.body.data.policies.cancellation.contentAr === '<p>إلغاء مجاني حتى 5 أيام قبل الوصول.</p>', 'Check: owner cancellation policy is HTML in Arabic too', res);
        expect(res.body.data.policies.html.includes('Booking policy') && res.body.data.policies.html.includes('<article'), 'Check: policies.html is one organized article', res);
        expect(res.body.data.policies.htmlAr.includes('سياسة الإلغاء'), 'Check: Arabic policies.html keeps the cancellation section', res);
        expect(res.body.data.quote.total === 27510 && res.body.data.quote.summary.beforeAddOns === 27510, 'Review: footer total matches the breakdown before meals', res);

        res = await request('GET', `/api/v1/bookings/check?room=${seaView._id}&startDate=${stayStart}&endDate=${stayEnd}&adults=2&addOns=${breakfastId}`);
        const quoted = res.body.data.quote;
        const lineSum = quoted.lines.reduce((sum, line) => sum + line.amount, 0);
        expect(res.status === 200 && quoted.total === 27930 && quoted.addOnsTotal === 420, 'Meals: adding breakfast updates the same total to 27930', res);
        expect(lineSum === quoted.total && quoted.summary.total === quoted.total, 'Meals: every line adds up to the footer total', res);

        res = await request('GET', `/api/v1/bookings/check?room=${seaView._id}&startDate=${stayStart}&endDate=${stayEnd}&adults=5`);
        expect(res.status === 400, 'Review: more guests than the room allows is rejected', res);

        const platform = await PaymentMethod.create({
            key: `testpay${Date.now()}`,
            name: 'Test Pay',
            nameAr: 'دفع تجريبي',
            kind: 'platform',
            active: true,
            requiresTerms: true,
            sortOrder: 9,
        });
        created.paymentMethods.push(platform._id);

        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: {
                room: seaView._id,
                startDate: stayStart,
                endDate: stayEnd,
                addOns: [breakfastId],
                paymentMethod: 'not-a-real-platform',
                guestDetails: {
                    adults: 2,
                    bookingFor: 'me',
                    email: 'nadia.hassan@example.com',
                    phoneCountryCode: '+20',
                    phone: '1258966',
                    firstName: 'Nadia',
                    lastName: 'Hassan',
                    arrivalFrom: '3:00 PM',
                    arrivalTo: '4:00 PM',
                },
            },
        });
        expect(res.status === 400, 'Payment: a platform that was not added is rejected', res);

        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: {
                room: seaView._id,
                startDate: at(110, 15),
                endDate: at(113, 12),
                paymentMethod: platform.key,
                guestDetails: {
                    adults: 2,
                    bookingFor: 'me',
                    email: 'nadia.hassan@example.com',
                    phoneCountryCode: '+20',
                    phone: '1258966',
                    firstName: 'Nadia',
                    lastName: 'Hassan',
                },
            },
        });
        expect(res.status === 400, 'Payment: a platform that asks for terms is rejected until they are accepted', res);

        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: {
                room: seaView._id,
                startDate: stayStart,
                endDate: stayEnd,
                addOns: [breakfastId],
                paymentMethod: 'on_arrival',
                guestDetails: {
                    adults: 2,
                    bookingFor: 'me',
                    email: 'nadia.hassan@example.com',
                    phoneCountryCode: '+20',
                    phone: '1258966',
                    firstName: 'Nadia',
                    lastName: 'Hassan',
                    arrivalFrom: '3:00 PM',
                    arrivalTo: '4:00 PM',
                },
            },
        });
        const stayed = res.body.data && res.body.data.booking;
        const confirmation = stayed && stayed.confirmation;
        expect(res.status === 201 && stayed.totalPrice === 27930, 'Create: saved total matches the meals and payment total', res);
        expect(confirmation.price.total === stayed.totalPrice && confirmation.payment.amount === stayed.totalPrice, 'Confirmation: price and amount paid match the saved total', res);
        expect(confirmation.guest.name === 'Nadia Hassan' && confirmation.guest.email === 'nadia.hassan@example.com', 'Confirmation: primary guest and receipt email are the ones entered', res);
        expect(confirmation.guest.phoneCountryCode === '+20' && confirmation.guest.arrivalFrom === '15:00' && confirmation.guest.arrivalTo === '16:00', 'Confirmation: phone and arrival window are stored', res);
        expect(confirmation.stay.title === 'Deluxe Sea-View' && confirmation.stay.propertyTitle === 'Azure Bay Resort', 'Confirmation: stay name matches the room that was booked', res);
        expect(confirmation.stay.breakfastIncluded === true && confirmation.stay.area === 42 && confirmation.stay.bedType === 'King Bed', 'Confirmation: room facts match the review step', res);
        expect(confirmation.payment.method === 'on_arrival' && confirmation.payment.methodLabel === 'Pay on arrival', 'Confirmation: payment method is pay on arrival', res);
        expect(String(stayed.reference).startsWith('AZR-') && confirmation.reference === stayed.reference, 'Confirmation: booking reference is saved', res);
        const expectedFreeUntil = new Date(stayStart);
        expectedFreeUntil.setUTCDate(expectedFreeUntil.getUTCDate() - 5);
        expectedFreeUntil.setUTCHours(21, 59, 0, 0);
        expect(new Date(confirmation.cancellation.freeUntil).getTime() === expectedFreeUntil.getTime(), 'Confirmation: free cancellation is 5 days before check-in at 11:59 PM', res);
        expect(confirmation.policies.booking.content === '<p>Full payment is due when the booking is confirmed.</p>' && confirmation.policies.extras[0].titleAr === 'الحيوانات' && confirmation.policies.html.includes('Booking policy'), 'Confirmation: owner policies are saved as organized HTML', res);

        res = await request('GET', `/api/v1/bookings/${stayed.id}`, { token: customer.token });
        expect(res.status === 200 && res.body.data.booking.confirmation.price.total === 27930, 'Get booking: confirmation total is unchanged', res);

        const discounted = await createAd({
            title: 'Discount Chalet',
            type: 'chalet',
            owner: owner.user._id,
            pricing: { basePrice: 1000, discountType: 'percentage', discountValue: 10, pricingUnit: 'per_night', minDuration: 1 },
        });
        res = await request('GET', `/api/v1/bookings/check?advertisement=${discounted._id}&startDate=${at(90, 14)}&endDate=${at(92, 12)}`);
        const discountLine = res.body.data.quote.lines.find((line) => line.key === 'discount');
        expect(res.status === 200 && res.body.data.totalPrice === 1800 && discountLine.amount === -200, 'Discount is a line on the quote and is not charged twice', res);

        console.log('\n--- My bookings ---');
        res = await request('GET', '/api/v1/bookings/my', { token: customer.token });
        const mine = res.body.data && res.body.data.bookings;
        const stayedReceipt = mine && mine.find((item) => item.id === stayed.id);
        expect(res.status === 200 && res.body.results === 5, 'My bookings: returns my 5 bookings', res);
        expect(
            stayedReceipt
                && stayedReceipt.reference === stayed.reference
                && stayedReceipt.payment.amount === 27930
                && stayedReceipt.payment.method === 'on_arrival'
                && stayedReceipt.payment.methodLabel === 'Pay on arrival'
                && stayedReceipt.guest.name === 'Nadia Hassan'
                && stayedReceipt.guest.email === 'nadia.hassan@example.com'
                && stayedReceipt.stay.title === 'Deluxe Sea-View'
                && stayedReceipt.property.title === 'Azure Bay Resort'
                && stayedReceipt.lines.some((line) => line.label && line.amount !== undefined)
                && stayedReceipt.policies.cancellation.content === '<p>Free cancellation until 5 days before check-in.</p>'
                && stayedReceipt.priceBreakdown === undefined
                && stayedReceipt.user === undefined
                && stayedReceipt.confirmation === undefined
                && stayedReceipt.guest.nationalIdOrPassport === undefined,
            'My bookings: each item is a receipt without internal booking fields',
            res
        );

        res = await request('GET', `/api/v1/bookings/${chaletBookingId}`, { token: otherCustomer.token });
        expect(res.status === 403, "Another user can't see my booking", res);

        console.log('\n--- Owner (dashboard) ---');
        res = await request('GET', '/api/v1/admin/bookings', { token: owner.token });
        expect(res.status === 200 && res.body.results === 5, 'Owner sees the 5 bookings on their listings', res);

        res = await request('PATCH', `/api/v1/admin/bookings/${chaletBookingId}`, { token: owner.token, body: { status: 'confirmed' } });
        expect(res.status === 200 && res.body.data.booking.status === 'confirmed', 'Owner confirms the chalet booking', res);

        console.log('\n--- Cancel ---');
        res = await request('PATCH', `/api/v1/bookings/${chaletBookingId}/cancel`, { token: otherCustomer.token, body: {} });
        expect(res.status === 403, "Another user can't cancel my booking", res);

        res = await request('PATCH', `/api/v1/bookings/${chaletBookingId}/cancel`, { token: customer.token, body: { reason: 'Plans changed' } });
        expect(res.status === 200 && res.body.data.booking.status === 'cancelled', 'Cancel: confirmed booking is cancelled', res);

        res = await request('PATCH', `/api/v1/bookings/${chaletBookingId}/cancel`, { token: customer.token, body: {} });
        expect(res.status === 400, 'Cancel: cancelling twice is rejected', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${chalet._id}&startDate=${at(30, 14)}&endDate=${at(33, 12)}`);
        expect(res.status === 200 && res.body.data.available === true, 'Cancelled dates are available again', res);

        console.log('\n--- Provider closures ---');
        res = await request('POST', `/api/v1/advertisements/${chalet._id}/blocked-periods`, {
            token: customer.token,
            body: { kind: 'days', startDay: '2027-01-10', endDay: '2027-01-12' },
        });
        expect(res.status === 403, 'A customer cannot close the provider calendar', res);

        res = await request('POST', `/api/v1/advertisements/${chalet._id}/blocked-periods`, {
            token: owner.token,
            body: { kind: 'days', startDay: '2020-01-01', endDay: '2020-01-02' },
        });
        expect(res.status === 400, 'A closure that already ended is rejected', res);

        res = await request('POST', `/api/v1/admin/advertisements/${chalet._id}/blocked-periods`, {
            token: owner.token,
            body: { kind: 'days', startDay: '2027-01-10', endDay: '2027-01-12', note: 'ضغط حجوزات' },
        });
        expect(res.status === 201 && res.body.data.blockedPeriod.kind === 'days', 'Owner closes three days', res);
        const blockId = res.body.data.blockedPeriod.id;

        res = await request('GET', `/api/v1/bookings/check?advertisement=${chalet._id}&startDate=2027-01-10T12:00:00.000Z&endDate=2027-01-12T12:00:00.000Z`);
        expect(res.status === 200 && res.body.data.available === false && res.body.data.unavailableReason === 'closed', 'Check: closed days are unavailable', res);

        res = await request('POST', '/api/v1/bookings', {
            token: customer.token,
            body: { advertisement: chalet._id, startDate: '2027-01-10T12:00:00.000Z', endDate: '2027-01-12T12:00:00.000Z' },
        });
        expect(res.status === 400, 'Create: a closed range is rejected', res);

        res = await request('GET', `/api/v1/bookings/booked-dates/${chalet._id}?month=2027-01`);
        const closedDay = res.body.data.calendar.days.find((day) => day.date === '2027-01-10');
        const openDay = res.body.data.calendar.days.find((day) => day.date === '2027-01-20');
        expect(closedDay && closedDay.available === false && closedDay.status === 'closed', 'Calendar: a closed day is unavailable', res);
        expect(openDay && openDay.available === true && openDay.status === 'available', 'Calendar: an open day stays available', res);
        expect(res.body.data.closedPeriods.length === 1 && res.body.data.unavailable.some((item) => item.reason === 'closed'), 'Calendar payload includes the closure', res);

        res = await request('POST', `/api/v1/advertisements/${golf._id}/blocked-periods`, {
            token: owner.token,
            body: { kind: 'hours', date: '2027-02-02', startTime: '17:00', endTime: '19:00' },
        });
        expect(res.status === 201, 'Owner closes two hours', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${golf._id}&date=2027-02-02&startTime=17:00&endTime=19:00`);
        expect(res.status === 200 && res.body.data.available === false && res.body.data.unavailableReason === 'closed', 'Check: closed hours are unavailable', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${golf._id}&date=2027-02-02&startTime=19:00&endTime=21:00`);
        expect(res.status === 200 && res.body.data.available === true, 'Check: the hours after a closure stay available', res);

        res = await request('GET', `/api/v1/bookings/booked-dates/${golf._id}?month=2027-02`);
        const partialDay = res.body.data.calendar.days.find((day) => day.date === '2027-02-02');
        expect(
            partialDay && partialDay.status === 'partial' && partialDay.available === true && partialDay.closedHours.some((hour) => hour.startTime === '17:00' && hour.endTime === '19:00'),
            'Calendar: an hourly closure leaves the day open and lists the closed hours',
            res
        );

        res = await request('POST', `/api/v1/advertisements/${yacht._id}/blocked-periods`, {
            token: owner.token,
            body: { kind: 'month', month: '2027-03' },
        });
        expect(res.status === 201 && res.body.data.blockedPeriod.kind === 'month', 'Owner closes a whole month', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${yacht._id}&date=2027-03-15&startTime=10:00&endTime=12:00`);
        expect(res.status === 200 && res.body.data.available === false && res.body.data.unavailableReason === 'closed', 'Check: a day inside a closed month is unavailable', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${yacht._id}&date=2027-04-02&startTime=10:00&endTime=12:00`);
        expect(res.status === 200 && res.body.data.available === true, 'Check: the next month stays available', res);

        res = await request('POST', `/api/v1/advertisements/${hotel._id}/blocked-periods`, {
            token: owner.token,
            body: { kind: 'days', startDay: '2027-04-01', endDay: '2027-04-03', room: String(roomA._id) },
        });
        expect(res.status === 201, 'Owner closes one hotel room', res);

        res = await request('GET', `/api/v1/bookings/check?room=${roomA._id}&startDate=2027-04-01T12:00:00.000Z&endDate=2027-04-03T10:00:00.000Z`);
        expect(res.status === 200 && res.body.data.available === false && res.body.data.unavailableReason === 'closed', 'Check: the closed room is unavailable', res);

        res = await request('GET', `/api/v1/bookings/check?room=${roomB._id}&startDate=2027-04-01T12:00:00.000Z&endDate=2027-04-03T10:00:00.000Z`);
        expect(res.status === 200 && res.body.data.available === true, 'Check: another room in the same hotel stays available', res);

        res = await request('DELETE', `/api/v1/advertisements/${chalet._id}/blocked-periods/${blockId}`, { token: customer.token });
        expect(res.status === 403, 'A customer cannot reopen a closure', res);

        res = await request('DELETE', `/api/v1/advertisements/${chalet._id}/blocked-periods/${blockId}`, { token: owner.token });
        expect(res.status === 200, 'Owner reopens the closed days', res);

        res = await request('GET', `/api/v1/bookings/check?advertisement=${chalet._id}&startDate=2027-01-10T12:00:00.000Z&endDate=2027-01-12T12:00:00.000Z`);
        expect(res.status === 200 && res.body.data.available === true && res.body.data.unavailableReason === null, 'Check: reopened days are available again', res);

        console.log(`\n🎉 All ${passed} booking checks passed.\n`);
    } finally {
        await PaymentMethod.deleteMany({ _id: { $in: created.paymentMethods } });
        await BlockedPeriod.deleteMany({ advertisement: { $in: created.ads } });
        await Booking.deleteMany({ user: { $in: created.users } });
        await Room.deleteMany({ _id: { $in: created.rooms } });
        await Advertisement.deleteMany({ _id: { $in: created.ads } });
        await User.deleteMany({ _id: { $in: created.users } });
        server.close();
        await mongoose.disconnect();
    }
};

run().catch((err) => {
    console.error(`\n❌ ${err.message}`);
    process.exit(1);
});
