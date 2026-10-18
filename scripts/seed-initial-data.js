const path = require('path');
const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) {}

const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

const mongoose = require('mongoose');
const Category = require('../src/features/categories/models/categoryModel');
const Advertisement = require('../src/features/advertisements/models/advertisementModel');
const Banner = require('../src/features/banners/models/bannerModel');

const seedData = async () => {
    try {
        const uri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/kuba';
        console.log('Connecting to database...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        console.log('Connected to MongoDB successfully.');

        // 1. Seed Categories if empty
        const categoryCount = await Category.countDocuments();
        let categories = [];
        if (categoryCount === 0) {
            console.log('Seeding initial categories...');
            categories = await Category.insertMany([
                { name: 'فنادق', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' },
                { name: 'شقق ساحلية', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
                { name: 'شاليهات', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
                { name: 'قرى سياحية', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800' },
                { name: 'منتجعات', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800' },
            ]);
            console.log(`Created ${categories.length} categories.`);
        } else {
            categories = await Category.find();
            console.log(`Found ${categories.length} existing categories.`);
        }

        // 2. Seed Advertisements if empty
        const adCount = await Advertisement.countDocuments();
        let ads = [];
        if (adCount === 0) {
            console.log('Seeding initial advertisements...');
            const hotelCat = categories.find((c) => c.name === 'فنادق')?._id;
            const chaletCat = categories.find((c) => c.name === 'شاليهات')?._id;
            const apartmentCat = categories.find((c) => c.name === 'شقق ساحلية')?._id;
            const resortCat = categories.find((c) => c.name === 'منتجعات')?._id;

            ads = await Advertisement.insertMany([
                {
                    title: 'شاليه ديلوكس بإطلالة بانورامية على البحر',
                    description: 'شاليه مكيف بالكامل مع مسبح خاص وحديقة مميزة في قلب بورتو مارينا.',
                    type: 'chalet',
                    price: 3500,
                    location: 'الساحل الشمالي - مارينا',
                    category: chaletCat,
                    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
                    active: true,
                },
                {
                    title: 'شقة فندقية فاخرة على الكورنيش مباشرة',
                    description: 'شقة 3 غرف نوم مجهزة بأرقى المفروشات وإطلالة ساحرة على قلعة قايتباي والبحر.',
                    type: 'apartment',
                    price: 2200,
                    location: 'الإسكندرية - ستانلي',
                    category: apartmentCat,
                    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
                    active: true,
                },
                {
                    title: 'جناح ملكي مطل على البحر الأحمر - رويال ريزورت',
                    description: 'إقامة شاملة كلياً لجميع الوجبات والأنشطة المائية مع شاطئ رملي خاص.',
                    type: 'hotel',
                    price: 4800,
                    location: 'شرم الشيخ - خليج نعمة',
                    category: hotelCat || resortCat,
                    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    active: true,
                },
                {
                    title: 'فيلا مستقلة صف أول على البحر',
                    description: 'فيلا فاخرة 5 غرف نوم مع مسبح انفنتي خاص وحديقة واسعة للعائلات.',
                    type: 'villa',
                    price: 8500,
                    location: 'الساحل الشمالي - هاسيندا باي',
                    category: chaletCat,
                    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
                    active: true,
                },
            ]);
            console.log(`Created ${ads.length} sample advertisements.`);
        } else {
            ads = await Advertisement.find();
            console.log(`Found ${ads.length} existing advertisements.`);
        }

        // 3. Seed Banners if empty
        const bannerCount = await Banner.countDocuments();
        if (bannerCount === 0 && ads.length > 0) {
            console.log('Seeding initial banners linked to advertisements...');
            await Banner.insertMany([
                {
                    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
                    advertisementId: ads[0]._id,
                },
                {
                    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
                    advertisementId: ads[1]._id,
                },
            ]);
            console.log('Created 2 sample banners linked to advertisements.');
        } else {
            console.log(`Found ${bannerCount} existing banners.`);
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

if (require.main === module) {
    seedData();
}

module.exports = seedData;
