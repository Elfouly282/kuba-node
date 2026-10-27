const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const dbConnection = require('../src/config/database');
const User = require('../src/features/auth/models/userModel');
const Advertisement = require('../src/features/advertisements/models/advertisementModel');
const { generateToken } = require('../src/utils/generateToken');

async function runTests() {
    await dbConnection();

    let testUser = await User.findOne({ email: 'wishlist_test@example.com' });
    if (!testUser) {
        testUser = await User.create({
            name: 'Wishlist Tester',
            email: 'wishlist_test@example.com',
            password: 'Password123!',
            role: 'user',
            isEmailVerified: true,
        });
    }

    testUser.wishlist = [];
    await testUser.save();

    const sampleAd = await Advertisement.findOne({ active: true });
    if (!sampleAd) {
        console.error('No advertisements found in database to test with!');
        process.exit(1);
    }

    const token = generateToken({ id: testUser._id });
    require('../src/server');

    const baseUrl = 'http://127.0.0.1:3000/api/v1';

    const request = async (method, route, body = null, useAuth = true) => {
        const headers = {};
        if (useAuth) headers['Authorization'] = `Bearer ${token}`;
        if (body) headers['Content-Type'] = 'application/json';

        const res = await fetch(`${baseUrl}${route}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
        const json = await res.json().catch(() => null);
        return { status: res.status, body: json };
    };

    let res = await request('GET', '/wishlist');
    if (res.status !== 200 || res.body?.results !== 0) throw new Error('Initial GET /wishlist failed');

    res = await request('POST', '/wishlist', { advertisementId: sampleAd._id.toString() });
    if (res.status !== 200 || !res.body?.data?.wishlist?.includes(sampleAd._id.toString())) {
        throw new Error('POST /wishlist failed');
    }

    res = await request('POST', '/wishlist', { advertisementId: sampleAd._id.toString() });
    if (res.body?.data?.wishlist?.length !== 1) throw new Error('Duplicate item added');

    res = await request('GET', '/wishlist');
    if (res.status !== 200 || res.body?.results !== 1 || res.body?.data?.wishlist[0]?.id !== sampleAd._id.toString()) {
        throw new Error('Populated GET /wishlist failed');
    }

    res = await request('DELETE', `/wishlist/${sampleAd._id}`);
    if (res.status !== 200 || res.body?.data?.wishlist?.length !== 0) throw new Error('DELETE /wishlist/:id failed');

    res = await request('POST', `/wishlist/${sampleAd._id}`);
    if (res.status !== 200 || res.body?.data?.wishlist?.length !== 1) throw new Error('POST /wishlist/:id failed');

    res = await request('POST', '/wishlist/toggle', { advertisementId: sampleAd._id.toString() });
    if (res.body?.data?.inWishlist !== false || res.body?.data?.wishlist?.length !== 0) throw new Error('Toggle remove failed');

    res = await request('POST', '/wishlist/toggle', { advertisementId: sampleAd._id.toString() });
    if (res.body?.data?.inWishlist !== true || res.body?.data?.wishlist?.length !== 1) throw new Error('Toggle add failed');

    res = await request('DELETE', `/advertisements/${sampleAd._id}/wishlist`);
    if (res.status !== 200 || res.body?.data?.wishlist?.length !== 0) throw new Error('DELETE shortcut failed');

    res = await request('POST', `/advertisements/${sampleAd._id}/wishlist`);
    if (res.status !== 200 || res.body?.data?.wishlist?.length !== 1) throw new Error('POST shortcut failed');

    res = await request('POST', '/wishlist', { advertisementId: 'invalid-id-123' });
    if (res.status !== 400) throw new Error('Invalid ID did not return 400');

    const fakeId = new mongoose.Types.ObjectId();
    res = await request('POST', '/wishlist', { advertisementId: fakeId.toString() });
    if (res.status !== 404) throw new Error('Non-existent ID did not return 404');

    res = await request('GET', '/wishlist', null, false);
    if (res.status !== 401) throw new Error('No token did not return 401');

    res = await request('DELETE', '/wishlist/clear');
    if (res.status !== 200 || res.body?.data?.wishlist?.length !== 0) throw new Error('Clear failed');

    await User.deleteOne({ _id: testUser._id });
    console.log('All Wishlist tests passed successfully!');
    process.exit(0);
}

runTests().catch((err) => {
    console.error('Test error:', err);
    process.exit(1);
});
