const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'config.env') });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dbConnection = require('../src/config/database');
const { i18nMiddleware } = require('../utils/i18n');
const globalErrorHandler = require('./middleware/errorMiddleware');
const APIError = require('./utils/apiError');

const authRoutes = require('./features/auth/routes/authRoutes');
const onboardingRoutes = require('./features/onboarding/routes/onboardingRoutes');

dbConnection();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(i18nMiddleware);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/v1/admin/auth', authRoutes);
app.use('/api/v1/admin/onboarding', onboardingRoutes);

app.get('/', (_req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Admin API is running successfully',
    });
});

app.all('*splat', (req, _res, next) => {
    next(new APIError('errors.routeNotFound', 404, { url: req.originalUrl }));
});

app.use(globalErrorHandler);

const PORT = process.env.ADMIN_PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Admin server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION', err.name, err.message);
    server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION', err.name, err.message);
    process.exit(1);
});

module.exports = app;
