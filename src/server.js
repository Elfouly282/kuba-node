const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'config.env') });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dbConnection = require('./config/database');
const { i18nMiddleware } = require('../utils/i18n');
const globalErrorHandler = require('./middleware/errorMiddleware');
const APIError = require('./utils/apiError');

// ── Routes ───────────────────────────────────────────────────────────────────
const authRoutes = require('./features/auth/routes/authRoutes');

// ── Connect to Database ───────────────────────────────────────────────────────
dbConnection();

const app = express();

// ── Global Middleware ─────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// i18n — sets req.locale and req.t()
app.use(i18nMiddleware);

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.all('*', (req, _res, next) => {
    next(new APIError('errors.routeNotFound', 404, { url: req.originalUrl }));
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use(globalErrorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`🚀  Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// ── Unhandled rejections / uncaught exceptions ────────────────────────────────
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION 💥', err.name, err.message);
    server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION 💥', err.name, err.message);
    process.exit(1);
});

module.exports = app;
