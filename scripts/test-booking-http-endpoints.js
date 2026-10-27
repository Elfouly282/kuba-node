const http = require('http');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) {}

const mongoose = require('mongoose');
const Advertisement = require('../src/features/advertisements/models/advertisementModel');
const Room = require('../src/features/rooms/models/roomModel');
const Booking = require('../src/features/bookings/models/bookingModel');
const User = require('../src/features/auth/models/userModel');
const { generateToken } = require('../src/utils/generateToken');

// Require the express app from src/server or construct directly
const express = require('express');
const cors = require('cors');
const { i18nMiddleware } = require('../utils/i18n');
const globalErrorHandler = require('../src/middleware/errorMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(i18nMiddleware);

const advertisementRoutes = require('../src/features/advertisements/routes/advertisementRoutes');
const bookingRoutes = require('../src/features/bookings/routes/bookingRoutes');
const roomRoutes = require('../src/features/rooms/routes/roomRoutes');

app.use('/api/v1/advertisements', advertisementRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use(globalErrorHandler);

let server;
let baseUrl;

function request(method, path, body = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(baseUrl + path);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (_) {
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });

        req.on('error', reject);
        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

const runHttpTests = async () => {
    console.log('================================================================');
    console.log('🌐 KUBA BOOKING HTTP ENDPOINTS INTEGRATION TEST');
    console.log('================================================================\n');

    try {
        const targetUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/kuba';
        await mongoose.connect(targetUri);

        let user = await User.findOne({ email: 'http-tester@kuba.com' });
        if (!user) {
            user = await User.create({
                name: 'HTTP Tester',
                email: 'http-tester@kuba.com',
                password: 'Password@123',
                role: 'user',
                isEmailVerified: true,
            });
        }
        const userToken = generateToken({ id: user._id, role: user.role });
        const authHeader = { Authorization: `Bearer ${userToken}` };

        // Start local test server
        server = http.createServer(app);
        await new Promise((res) => server.listen(0, res));
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        console.log(`Test server running at ${baseUrl}\n`);

        // 1. Create test hotel and room
        const testHotel = await Advertisement.create({
            title: 'فندق شيراتون ريفيرا HTTP',
            type: 'hotel',
            isHotel: true,
            price: 2800,
            active: true,
        });

        const testRoom = await Room.create({
            hotel: testHotel._id,
            roomNumber: '505',
            title: 'Panoramic Suite',
            price: 2500,
            pricing: { basePrice: 2500, finalPrice: 2500, pricingUnit: 'per_night' },
            active: true,
        });

        // 2. Test Available Rooms on Hotel endpoint
        console.log('[1] Testing GET /api/v1/advertisements/:id/available-rooms...');
        const hotelRoomsRes = await request(
            'GET',
            `/api/v1/advertisements/${testHotel._id}/available-rooms?startDate=2026-12-01&endDate=2026-12-05`
        );
        console.log(`    Status: ${hotelRoomsRes.status}`);
        if (hotelRoomsRes.status !== 200 || !hotelRoomsRes.body?.data?.rooms) {
            throw new Error(`Failed to get available rooms: ${JSON.stringify(hotelRoomsRes.body)}`);
        }
        console.log(`    Available rooms found: ${hotelRoomsRes.body.data.availableRoomsCount}`);
        console.log(`    Stay calculated nights: ${hotelRoomsRes.body.data.nights}, total: ${hotelRoomsRes.body.data.rooms[0].stayCalculation.totalPrice}`);

        // 3. Test Booking Calculate Price endpoint
        console.log('\n[2] Testing POST /api/v1/bookings/calculate-price (Estimate)...');
        const estRes = await request('POST', '/api/v1/bookings/calculate-price', {
            advertisement: String(testHotel._id),
            room: String(testRoom._id),
            startDate: '2026-12-01T14:00:00.000Z',
            endDate: '2026-12-05T12:00:00.000Z',
        });
        console.log(`    Status: ${estRes.status}, Available: ${estRes.body?.data?.available}, Total: ${estRes.body?.data?.totalPrice}`);
        if (estRes.status !== 200 || estRes.body?.data?.totalPrice !== 10000) {
            throw new Error(`Estimate failed: ${JSON.stringify(estRes.body)}`);
        }

        // 4. Test Create Hotel Room Booking via POST /api/v1/bookings
        console.log('\n[3] Testing POST /api/v1/bookings (Create Hotel Room Booking)...');
        const createRes = await request('POST', '/api/v1/bookings', {
            advertisement: String(testHotel._id),
            room: String(testRoom._id),
            startDate: '2026-12-01T14:00:00.000Z',
            endDate: '2026-12-05T12:00:00.000Z',
            guestDetails: { adults: 2, fullName: 'Ahmed Zaki', phone: '01012345678' },
        }, authHeader);
        console.log(`    Status: ${createRes.status}`);
        const bookingId = createRes.body?.data?.booking?.id;
        if (createRes.status !== 201 || !bookingId) {
            throw new Error(`Booking creation failed: ${JSON.stringify(createRes.body)}`);
        }
        console.log(`    Booking created ID: ${bookingId}, Type: ${createRes.body.data.booking.bookingType}`);

        // 5. Test Available Rooms again -> Should now show 0 available rooms for those dates!
        console.log('\n[4] Testing GET /api/v1/bookings/hotel/:id/available-rooms after booking...');
        const recheckRoomsRes = await request(
            'GET',
            `/api/v1/bookings/hotel/${testHotel._id}/available-rooms?startDate=2026-12-01&endDate=2026-12-05`
        );
        console.log(`    Status: ${recheckRoomsRes.status}, Available rooms count: ${recheckRoomsRes.body?.data?.availableRoomsCount}`);
        if (recheckRoomsRes.body?.data?.availableRoomsCount !== 0) {
            throw new Error('Room was booked but still appears available!');
        }

        // 6. Test Yacht Schedule endpoint
        console.log('\n[5] Testing Yacht Schedule endpoint GET /api/v1/bookings/yacht/:id/slots...');
        const testYacht = await Advertisement.create({
            title: 'يخت لؤلؤة الجونة HTTP',
            type: 'yacht',
            price: 1800,
            pricing: { basePrice: 1800, finalPrice: 1800, pricingUnit: 'per_hour', pricePerHour: 1800, fullDayPrice: 14000 },
            active: true,
        });

        const yachtSlotsRes = await request('GET', `/api/v1/bookings/yacht/${testYacht._id}/slots?date=2026-12-10`);
        console.log(`    Status: ${yachtSlotsRes.status}, isFullDayAvailable: ${yachtSlotsRes.body?.data?.isFullDayAvailable}`);
        if (yachtSlotsRes.status !== 200 || !yachtSlotsRes.body?.data?.pricing) {
            throw new Error(`Failed to get yacht schedule: ${JSON.stringify(yachtSlotsRes.body)}`);
        }

        // 7. Test Cancel Booking endpoint
        console.log('\n[6] Testing PATCH /api/v1/bookings/:id/cancel...');
        const cancelRes = await request('PATCH', `/api/v1/bookings/${bookingId}/cancel`, {
            reason: 'Customer requested cancellation via mobile app',
        }, authHeader);
        console.log(`    Status: ${cancelRes.status}, Booking status: ${cancelRes.body?.data?.booking?.status}`);
        if (cancelRes.status !== 200 || cancelRes.body?.data?.booking?.status !== 'cancelled') {
            throw new Error(`Failed to cancel booking: ${JSON.stringify(cancelRes.body)}`);
        }

        // 8. Re-check Hotel available rooms after cancellation -> Room should be available again!
        console.log('\n[7] Re-checking hotel rooms after cancellation...');
        const postCancelCheck = await request(
            'GET',
            `/api/v1/advertisements/${testHotel._id}/available-rooms?startDate=2026-12-01&endDate=2026-12-05`
        );
        console.log(`    Available rooms after cancel: ${postCancelCheck.body?.data?.availableRoomsCount}`);
        if (postCancelCheck.body?.data?.availableRoomsCount !== 1) {
            throw new Error('Cancelled booking did not liberate the hotel room!');
        }

        console.log('\n================================================================');
        console.log('🎉 ALL HTTP API INTEGRATION TESTS PASSED 100%!');
        console.log('================================================================\n');

        server.close();
        process.exit(0);
    } catch (err) {
        console.error('HTTP Test Failure:', err.message, err.stack);
        if (server) server.close();
        process.exit(1);
    }
};

runHttpTests();
