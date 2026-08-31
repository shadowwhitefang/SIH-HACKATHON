/**
 * Authentication Routes
 * Endpoints for Google OAuth authentication and session management.
 */

const express = require('express');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Apply auth rate limiter
router.use(authLimiter);

router.post('/google', authController.googleLogin);
router.post('/dev-login', authController.devLogin);
router.get('/me', requireAuth, authController.getMe);
router.post('/logout', authController.logout);

module.exports = router;
