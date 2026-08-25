/**
 * Express Application Initialization
 * Configures middleware, core API routes, and error handling.
 */

const express = require('express');
const cors = require('cors');

const mpRoutes = require('./routes/mpRoutes');
const projectRoutes = require('./routes/projectRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorHandler = require('./middleware/errorHandler');
const { NotFoundError } = require('./utils/errors');

const app = express();

// Security and standard middlewares
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'civictrack-backend',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'civictrack-backend',
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// Core Routes (Backend Developer 1 Ownership)
// ==========================================
app.use('/api/mps', mpRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ==========================================
// Developer 2 Integration Points
// ==========================================
// app.use('/api/auth', authRoutes);
// app.use('/api/attention', attentionRoutes);
// app.use('/api/evidence', evidenceRoutes);

// 404 Handler for undefined API routes
app.use((req, res, next) => {
  next(new NotFoundError(`Endpoint '${req.originalUrl}' not found`));
});

// Centralized Error Handling Middleware (must be registered last)
app.use(errorHandler);

module.exports = app;
