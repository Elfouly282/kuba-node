
const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) {}

const path = require('path');

console.log('KUBA SERVER STARTING...');

const dotenv = require('dotenv');

const envResult = dotenv.config({
    path: path.join(__dirname, '..', '.env')
});

if (envResult.error) {
    dotenv.config({
        path: path.join(__dirname, '..', 'config.env')
    });
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dbConnection = require('./config/database');
const { i18nMiddleware } = require('../utils/i18n');
const globalErrorHandler = require('./middleware/errorMiddleware');
const APIError = require('./utils/apiError');

const authRoutes = require('./features/auth/routes/authRoutes');
const onboardingRoutes = require('./features/onboarding/routes/onboardingRoutes');
const categoryRoutes = require('./features/categories/routes/categoryRoutes');
const bannerRoutes = require('./features/banners/routes/bannerRoutes');
const advertisementRoutes = require('./features/advertisements/routes/advertisementRoutes');

const adminAuthRoutes = require('../admin/features/auth/routes/authRoutes');
const adminOnboardingRoutes = require('../admin/features/onboarding/routes/onboardingRoutes');
const adminUserRoutes = require('../admin/features/users/routes/userRoutes');
const adminCategoryRoutes = require('../admin/features/categories/routes/categoryRoutes');
const adminBannerRoutes = require('../admin/features/banners/routes/bannerRoutes');
const adminAdvertisementRoutes = require('../admin/features/advertisements/routes/advertisementRoutes');

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_URI exists:', Boolean(process.env.DB_URI));
console.log('PORT from environment:', process.env.PORT || 'not set');

console.log('BEFORE DB CONNECTION');

try {
    dbConnection();
    console.log('AFTER DB CONNECTION CALL');
} catch (error) {
    console.error('DB CONNECTION SYNC ERROR:', error.stack || error);
}

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(i18nMiddleware);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve Dashboard UI
app.use('/admin', express.static(path.join(__dirname, '..', 'dashboard')));
app.use('/dashboard', express.static(path.join(__dirname, '..', 'dashboard')));

// Client APIs
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/onboarding', onboardingRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/banners', bannerRoutes);
app.use('/api/v1/advertisements', advertisementRoutes);

// Admin APIs
app.use('/api/v1/admin/auth', adminAuthRoutes);
app.use('/api/v1/admin/onboarding', adminOnboardingRoutes);
app.use('/api/v1/admin/users', adminUserRoutes);
app.use('/api/v1/admin/categories', adminCategoryRoutes);
app.use('/api/v1/admin/banners', adminBannerRoutes);
app.use('/api/v1/admin/advertisements', adminAdvertisementRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running successfully',
    });
});

app.all('*splat', (req, _res, next) => {
    next(new APIError('errors.routeNotFound', 404, { url: req.originalUrl }));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

console.log('BEFORE APP LISTEN');
console.log('Attempting to listen on port:', PORT);

const server = app.listen(PORT, () => {
    console.log(`KUBA SERVER STARTED ON PORT ${PORT}`);
    console.log(`Server running in ${process.env.NODE_ENV} mode`);
    console.log('DB_URI exists:', Boolean(process.env.DB_URI));
    console.log(`Admin Dashboard available at: http://localhost:${PORT}/admin`);
});

server.on('error', (error) => {
    console.error('KUBA SERVER LISTEN ERROR:', error.stack || error);
});

process.on('unhandledRejection', (error) => {
    console.error('UNHANDLED REJECTION:', error?.stack || error);

    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (error) => {
    console.error('UNCAUGHT EXCEPTION:', error.stack || error);
    process.exit(1);
});

module.exports = app;
