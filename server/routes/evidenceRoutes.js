/**
 * Evidence Routes
 * Endpoints for uploading, retrieving, and removing project media and documentary evidence.
 */

const express = require('express');
const evidenceController = require('../controllers/evidenceController');
const { requireAuth } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// General Evidence Endpoints
router.get('/:id', evidenceController.getEvidenceById);
router.delete('/:id', requireAuth, evidenceController.deleteEvidence);

module.exports = router;
