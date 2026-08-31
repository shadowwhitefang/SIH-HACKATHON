/**
 * Project Sub-Routes for Developer 2 (Alerts & Evidence)
 * Provides /api/projects/:id/alerts and /api/projects/:id/evidence endpoints
 * without modifying Developer 1's core project router.
 */

const express = require('express');
const alertController = require('../controllers/alertController');
const evidenceController = require('../controllers/evidenceController');
const { requireAuth } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Project Alerts Endpoints
router.get('/:id/alerts', alertController.getProjectAlerts);
router.post('/:id/evaluate', requireAuth, alertController.evaluateProject);

// Project Evidence Endpoints
router.get('/:id/evidence', evidenceController.listProjectEvidence);
router.post('/:id/evidence', requireAuth, uploadLimiter, uploadSingle('file'), evidenceController.uploadEvidence);

module.exports = router;
