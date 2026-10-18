const path = require('path');
const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) {}

const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import app
const app = require('../src/server');

const runTests = async () => {
    console.log('--- STARTING KUBA BANNERS & CATEGORIES API TESTS ---');

    // Generate valid admin token
    const token = jwt.sign(
        { id: '660000000000000000000001', role: 'admin', email: 'admin@kuba-app.com' },
        process.env.JWT_SECRET || 'kuba_secret_key_jwt_default',
        { expiresIn: '1d' }
    );

    const http = require('http');
    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    const baseUrl = `http://localhost:${port}`;
    console.log(`Test server running on ${baseUrl}`);

    // Helper for requests
    const request = async (urlPath, options = {}) => {
        const headers = options.headers || {};
        if (options.token) {
            headers['Authorization'] = `Bearer ${options.token}`;
        }
        if (options.json) {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(options.json);
        }

        const res = await fetch(`${baseUrl}${urlPath}`, {
            method: options.method || 'GET',
            headers,
            body: options.body,
        });

        const data = await res.json().catch(() => ({}));
        return { status: res.status, ok: res.ok, data };
    };

    try {
        // ─── 1. CATEGORIES TESTS ──────────────────────────────────────────────
        console.log('\n[1] Testing GET /api/v1/categories...');
        const getCats = await request('/api/v1/categories');
        console.log(`GET /api/v1/categories -> Status: ${getCats.status}, Count: ${getCats.data.results}`);
        if (getCats.status !== 200 || !Array.isArray(getCats.data.data.categories)) {
            throw new Error('Categories list test failed');
        }

        console.log('\n[2] Testing POST /api/v1/admin/categories (Create)...');
        const createCat = await request('/api/v1/admin/categories', {
            method: 'POST',
            token,
            json: {
                name: 'منتجعات سياحية فاخرة',
                image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
            },
        });
        console.log(`POST /api/v1/admin/categories -> Status: ${createCat.status}, Message: ${createCat.data.message}`);
        if (createCat.status !== 201 || !createCat.data.data.category.id) {
            throw new Error(`Create category failed: ${JSON.stringify(createCat.data)}`);
        }
        const createdCatId = createCat.data.data.category.id;
        console.log(`Created Category ID: ${createdCatId}, Name: ${createCat.data.data.category.name}`);

        console.log('\n[3] Testing GET /api/v1/categories/:id...');
        const getOneCat = await request(`/api/v1/categories/${createdCatId}`);
        console.log(`GET /api/v1/categories/:id -> Status: ${getOneCat.status}, Name: ${getOneCat.data.data?.category?.name}`);
        if (getOneCat.status !== 200 || getOneCat.data.data.category.id !== createdCatId) {
            throw new Error('Get one category failed');
        }

        console.log('\n[4] Testing PATCH /api/v1/admin/categories/:id (Update)...');
        const updateCat = await request(`/api/v1/admin/categories/${createdCatId}`, {
            method: 'PATCH',
            token,
            json: {
                name: 'منتجعات وقرى سياحية محدثة',
            },
        });
        console.log(`PATCH /api/v1/admin/categories/:id -> Status: ${updateCat.status}, New Name: ${updateCat.data.data?.category?.name}`);
        if (updateCat.status !== 200 || updateCat.data.data.category.name !== 'منتجعات وقرى سياحية محدثة') {
            throw new Error('Update category failed');
        }

        // ─── 2. ADVERTISEMENTS & BANNERS TESTS ─────────────────────────────────
        console.log('\n[5] Testing GET /api/v1/advertisements...');
        const getAds = await request('/api/v1/advertisements');
        console.log(`GET /api/v1/advertisements -> Status: ${getAds.status}, Count: ${getAds.data.results}`);
        if (getAds.status !== 200 || getAds.data.results === 0) {
            throw new Error('No advertisements found to link to banner');
        }
        const validAdId = getAds.data.data.advertisements[0].id || getAds.data.data.advertisements[0]._id;
        console.log(`Using valid Advertisement ID: ${validAdId}`);

        console.log('\n[6] Testing POST /api/v1/admin/banners with NON-EXISTENT advertisementId...');
        const invalidAdId = new mongoose.Types.ObjectId().toString();
        const createBannerFail = await request('/api/v1/admin/banners', {
            method: 'POST',
            token,
            json: {
                advertisementId: invalidAdId,
                image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
            },
        });
        console.log(`POST /api/v1/admin/banners (non-existent ad) -> Status: ${createBannerFail.status}, Error: ${createBannerFail.data.message}`);
        if (createBannerFail.status !== 404) {
            throw new Error('Expected 404 for non-existent advertisementId');
        }

        console.log('\n[7] Testing POST /api/v1/admin/banners with VALID advertisementId...');
        const createBannerSuccess = await request('/api/v1/admin/banners', {
            method: 'POST',
            token,
            json: {
                advertisementId: validAdId,
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
            },
        });
        console.log(`POST /api/v1/admin/banners -> Status: ${createBannerSuccess.status}, Message: ${createBannerSuccess.data.message}`);
        if (createBannerSuccess.status !== 201 || !createBannerSuccess.data.data?.banner?.id) {
            throw new Error(`Create banner failed: ${JSON.stringify(createBannerSuccess.data)}`);
        }
        const createdBanner = createBannerSuccess.data.data.banner;
        console.log('Created Banner Object:', JSON.stringify(createdBanner, null, 2));

        // Verify banner contains ONLY id, image, advertisementId
        const bannerKeys = Object.keys(createdBanner).sort();
        console.log('Banner fields in response:', bannerKeys);
        if (bannerKeys.includes('title') || bannerKeys.includes('description') || bannerKeys.includes('price')) {
            throw new Error('Banner response contains duplicated advertisement fields!');
        }

        const createdBannerId = createdBanner.id;

        console.log('\n[8] Testing GET /api/v1/banners...');
        const getBanners = await request('/api/v1/banners');
        console.log(`GET /api/v1/banners -> Status: ${getBanners.status}, Count: ${getBanners.data.results}`);
        if (getBanners.status !== 200 || !Array.isArray(getBanners.data.data.banners)) {
            throw new Error('Get banners list failed');
        }

        console.log('\n[9] Testing GET /api/v1/banners/:id...');
        const getOneBanner = await request(`/api/v1/banners/${createdBannerId}`);
        console.log(`GET /api/v1/banners/:id -> Status: ${getOneBanner.status}, adId: ${getOneBanner.data.data?.banner?.advertisementId}`);
        if (getOneBanner.status !== 200 || getOneBanner.data.data.banner.id !== createdBannerId) {
            throw new Error('Get one banner failed');
        }

        console.log('\n[10] Testing PATCH /api/v1/admin/banners/:id (Update)...');
        const updateBanner = await request(`/api/v1/admin/banners/${createdBannerId}`, {
            method: 'PATCH',
            token,
            json: {
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
            },
        });
        console.log(`PATCH /api/v1/admin/banners/:id -> Status: ${updateBanner.status}, New Image: ${updateBanner.data.data?.banner?.image}`);
        if (updateBanner.status !== 200 || updateBanner.data.data.banner.image !== 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200') {
            throw new Error('Update banner failed');
        }

        console.log('\n[11] Testing DELETE /api/v1/admin/banners/:id (Delete)...');
        const deleteBannerRes = await request(`/api/v1/admin/banners/${createdBannerId}`, {
            method: 'DELETE',
            token,
        });
        console.log(`DELETE /api/v1/admin/banners/:id -> Status: ${deleteBannerRes.status}, Message: ${deleteBannerRes.data.message}`);
        if (deleteBannerRes.status !== 200) {
            throw new Error('Delete banner failed');
        }

        console.log('\n[12] Testing DELETE /api/v1/admin/categories/:id (Delete)...');
        const deleteCatRes = await request(`/api/v1/admin/categories/${createdCatId}`, {
            method: 'DELETE',
            token,
        });
        console.log(`DELETE /api/v1/admin/categories/:id -> Status: ${deleteCatRes.status}, Message: ${deleteCatRes.data.message}`);
        if (deleteCatRes.status !== 200) {
            throw new Error('Delete category failed');
        }

        console.log('\nALL 12 TESTS PASSED PERFECTLY!');
        server.close();
        process.exit(0);
    } catch (err) {
        console.error('\nTEST FAILED WITH ERROR:', err.message);
        server.close();
        process.exit(1);
    }
};

runTests();
