
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

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_URI exists:', Boolean(process.env.DB_URI));
console.log('PORT from environment:', process.env.PORT || 'not set');

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

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/onboarding', onboardingRoutes);

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

const server = app.listen(PORT, () => {
    console.log(`KUBA SERVER STARTED ON PORT ${PORT}`);
    console.log(`Server running in ${process.env.NODE_ENV} mode`);
    console.log(`DB_URI exists: ${Boolean(process.env.DB_URI)}`);
});

server.on('error', (err) => {
    console.error('KUBA SERVER LISTEN ERROR:', err.message);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION:', err?.stack || err);

    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err?.stack || err);
    process.exit(1);
});

module.exports = app;
