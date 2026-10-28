const dns = require('dns');
try { dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']); } catch (_) {}
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });
const mongoose = require('mongoose');

async function clean() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.DB_URI, { serverSelectionTimeoutMS: 8000 });
    console.log('Connected.');

    const res = await mongoose.connection.db.collection('regions').updateMany(
        {},
        { $unset: { image: '' } }
    );
    console.log('Updated regions count (image removed):', res.modifiedCount);

    const check = await mongoose.connection.db.collection('regions').find({ image: { $exists: true } }).toArray();
    console.log('Regions still with image field:', check.length);

    await mongoose.disconnect();
    console.log('Done.');
}

clean().catch((err) => {
    console.error('Error during cleanup:', err);
    process.exit(1);
});
