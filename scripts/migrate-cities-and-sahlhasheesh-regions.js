const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) { }

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

const mongoose = require('mongoose');

const SAHL_HASHEESH_ID = '6ad616031ddbe497b5dd4416';

const areas = [
    {
        name: 'منطقة جمران',
        order: 0,
        color: '#2D4F2E',
        center: { latitude: 27.0652, longitude: 33.8845 },
    },
    {
        name: 'منطقة ازورا',
        order: 1,
        color: '#1b6b55',
        center: { latitude: 27.0371, longitude: 33.8841 },
    },
    {
        name: 'منطقة الاولد تاون',
        order: 2,
        color: '#a3702c',
        center: { latitude: 27.0455, longitude: 33.8962 },
    },
    {
        name: 'السرايا',
        order: 3,
        color: '#2b5a7a',
        center: { latitude: 27.0503, longitude: 33.8932 },
    },
    {
        name: 'الاندلس',
        order: 4,
        color: '#8b4a2b',
        center: { latitude: 27.0432, longitude: 33.8948 },
    },
    {
        name: 'القصر',
        order: 5,
        color: '#55337a',
        center: { latitude: 27.0392, longitude: 33.8915 },
    },
    {
        name: 'البيادزا',
        order: 6,
        color: '#0e7090',
        center: { latitude: 27.0468, longitude: 33.8985 },
    },
];

async function run() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DB_URI, { serverSelectionTimeoutMS: 8000 });
        console.log('Connected.');

        const db = mongoose.connection.db;
        const regionsCol = db.collection('regions');
        const citiesCol = db.collection('cities');
        const adsCol = db.collection('advertisements');
        const bannersCol = db.collection('banners');

        // 1. Find existing "سهل حشيش" in regions
        const sahlRegion = await regionsCol.findOne({
            $or: [
                { _id: new mongoose.Types.ObjectId(SAHL_HASHEESH_ID) },
                { name: 'سهل حشيش' },
            ],
        });

        const targetCityId = sahlRegion ? sahlRegion._id : new mongoose.Types.ObjectId(SAHL_HASHEESH_ID);

        // 2. Ensure "سهل حشيش" exists in `cities` collection
        let existingCity = await citiesCol.findOne({ _id: targetCityId });
        if (!existingCity) {
            existingCity = await citiesCol.findOne({ name: 'سهل حشيش' });
        }

        if (!existingCity) {
            console.log('Migrating "سهل حشيش" to cities collection...');
            const cityDoc = {
                _id: targetCityId,
                name: 'سهل حشيش',
                image: sahlRegion?.image || 'regions/1792415235905-91215.jpg',
                active: sahlRegion?.active !== undefined ? sahlRegion.active : true,
                order: sahlRegion?.order || 0,
                color: sahlRegion?.color || '#2D4F2E',
                points: sahlRegion?.points || [],
                boundaries: sahlRegion?.boundaries,
                center: sahlRegion?.center || { latitude: 27.041086, longitude: 33.891272 },
                createdAt: sahlRegion?.createdAt || new Date(),
                updatedAt: new Date(),
            };
            await citiesCol.insertOne(cityDoc);
            console.log('✓ City "سهل حشيش" created in cities collection.');
        } else {
            console.log('✓ City "سهل حشيش" already exists in cities collection.');
        }

        // 3. Update advertisements to link to city: سهل حشيش
        const adUpdate = await adsCol.updateMany(
            { $or: [{ region: targetCityId }, { location: /سهل حشيش/i }] },
            { $set: { city: targetCityId } }
        );
        console.log(`✓ Updated ${adUpdate.modifiedCount} advertisements with city: سهل حشيش.`);

        // 4. Update banners to link to city: سهل حشيش
        const bannerUpdate = await bannersCol.updateMany(
            { region: targetCityId },
            { $set: { city: targetCityId } }
        );
        console.log(`✓ Updated ${bannerUpdate.modifiedCount} banners with city: سهل حشيش.`);

        // 5. Remove the city "سهل حشيش" from the regions collection so regions only contains sub-areas
        await regionsCol.deleteOne({ _id: targetCityId });
        await regionsCol.deleteMany({ name: 'سهل حشيش' });
        console.log('✓ Cleaned up "سهل حشيش" from regions collection (now cleanly stored in cities).');

        // 6. Seed the 7 sub-areas inside سهل حشيش
        console.log('Seeding areas inside سهل حشيش...');
        for (const area of areas) {
            const existingArea = await regionsCol.findOne({
                name: area.name,
                city: targetCityId,
            });

            if (!existingArea) {
                await regionsCol.insertOne({
                    name: area.name,
                    city: targetCityId,
                    active: true,
                    order: area.order,
                    color: area.color,
                    center: area.center,
                    points: [],
                    image: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                console.log(`  + Created region: "${area.name}" inside سهل حشيش.`);
            } else {
                console.log(`  • Region already exists: "${area.name}".`);
            }
        }

        console.log('\nMigration and seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Migration error:', err);
        process.exit(1);
    }
}

run();
