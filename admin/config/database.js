const dns = require('dns');
const mongoose = require('mongoose');

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) {}

const dbConnection = () => {
  if (mongoose.connection.readyState !== 0) return;

  const targetUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/kuba';

  mongoose
    .connect(targetUri, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.warn('Atlas connection failed, trying local MongoDB...');
      if (targetUri.includes('mongodb+srv://')) {
        mongoose
          .connect('mongodb://127.0.0.1:27017/kuba', { serverSelectionTimeoutMS: 3000 })
          .then(() => console.log('MongoDB connected to local database!'))
          .catch(() => console.warn('Local MongoDB unavailable. Server running with local admin bypass.'));
      }
    });
};

module.exports = dbConnection;
