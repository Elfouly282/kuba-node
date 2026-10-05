const mongoose = require('mongoose');

const dbConnection = () => {

  if (mongoose.connection.readyState !== 0) return;

  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = dbConnection;
