/**
 * One-time migration: copy legacy monolingual text fields into *En
 * and set empty *Ar placeholders (fill Arabic later from the admin dashboard).
 *
 * Usage: node scripts/migrate-bilingual-fields.js
 */
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { ensureDns } = require('../src/config/database');

dotenv.config({ path: path.join(__dirname, '..', 'config.env') });
ensureDns();

const dropIndexesQuietly = async (col, indexNames) => {
    const existing = await col.indexes();
    const names = new Set(existing.map((idx) => idx.name));

    for (const name of indexNames) {
        if (!names.has(name)) continue;
        try {
            await col.dropIndex(name);
            console.log(`  dropped index ${col.collectionName}.${name}`);
        } catch (err) {
            console.warn(`  could not drop ${col.collectionName}.${name}:`, err.message);
        }
    }
};

const migrateCollection = async (collectionName, mappings, legacyIndexes = []) => {
    const col = mongoose.connection.collection(collectionName);

    if (legacyIndexes.length) {
        await dropIndexesQuietly(col, legacyIndexes);
    }

    const cursor = col.find({});
    let updated = 0;

    while (await cursor.hasNext()) {
        const doc = await cursor.next();
        const $set = {};
        const $unset = {};

        for (const [oldField, { en, ar }] of Object.entries(mappings)) {
            if (doc[oldField] !== undefined && doc[en] === undefined) {
                $set[en] = doc[oldField];
                $set[ar] = doc[ar] ?? '';
                $unset[oldField] = '';
            } else if (doc[en] !== undefined && (doc[ar] === undefined || doc[ar] === null)) {
                $set[ar] = '';
            } else if (doc[oldField] !== undefined && doc[en] !== undefined) {
                // Already copied earlier; finish removing the legacy field.
                $unset[oldField] = '';
            }
        }

        if (Object.keys($set).length === 0 && Object.keys($unset).length === 0) continue;

        const update = {};
        if (Object.keys($set).length > 0) update.$set = $set;
        if (Object.keys($unset).length > 0) update.$unset = $unset;

        await col.updateOne({ _id: doc._id }, update);
        updated += 1;
    }

    console.log(`${collectionName}: migrated ${updated} document(s)`);
};

const migrateNestedItems = async (collectionName) => {
    const col = mongoose.connection.collection(collectionName);
    let updated = 0;
    const cursor = col.find({});

    while (await cursor.hasNext()) {
        const doc = await cursor.next();
        let changed = false;

        const items = (doc.items || []).map((item) => {
            const next = { ...item };

            if (next.name !== undefined && next.nameEn === undefined) {
                next.nameEn = next.name;
                next.nameAr = next.nameAr ?? '';
                delete next.name;
                changed = true;
            } else if (next.nameEn !== undefined && (next.nameAr === undefined || next.nameAr === null)) {
                next.nameAr = '';
                changed = true;
            }

            if (next.name !== undefined && next.nameEn !== undefined) {
                delete next.name;
                changed = true;
            }

            return next;
        });

        if (changed) {
            await col.updateOne({ _id: doc._id }, { $set: { items } });
            updated += 1;
        }
    }

    console.log(`${collectionName}: migrated ${updated} document(s)`);
};

const run = async () => {
    if (!process.env.DB_URI) {
        throw new Error('DB_URI is missing from config.env');
    }

    await mongoose.connect(process.env.DB_URI);
    console.log('Connected. Migrating bilingual fields...');

    await migrateCollection(
        'products',
        {
            name: { en: 'nameEn', ar: 'nameAr' },
            description: { en: 'descriptionEn', ar: 'descriptionAr' },
        },
        ['name_1', 'name_text_description_text_tags_text']
    );

    await migrateCollection(
        'categories',
        { name: { en: 'nameEn', ar: 'nameAr' } },
        ['name_1']
    );

    await migrateCollection(
        'brands',
        {
            name: { en: 'nameEn', ar: 'nameAr' },
            description: { en: 'descriptionEn', ar: 'descriptionAr' },
        },
        ['name_1']
    );

    await migrateCollection('banners', {
        title: { en: 'titleEn', ar: 'titleAr' },
        subtitle: { en: 'subtitleEn', ar: 'subtitleAr' },
    });

    await migrateCollection('coupons', {
        description: { en: 'descriptionEn', ar: 'descriptionAr' },
    });

    await migrateCollection(
        'shippingmethods',
        {
            name: { en: 'nameEn', ar: 'nameAr' },
            description: { en: 'descriptionEn', ar: 'descriptionAr' },
            estimatedDays: { en: 'estimatedDaysEn', ar: 'estimatedDaysAr' },
        },
        ['name_1']
    );

    await migrateNestedItems('carts');
    await migrateNestedItems('orders');

    console.log('Migration complete.');
    await mongoose.disconnect();
};

run().catch(async (err) => {
    console.error('Migration failed:', err);
    try {
        await mongoose.disconnect();
    } catch (_) {
        /* ignore */
    }
    process.exit(1);
});
