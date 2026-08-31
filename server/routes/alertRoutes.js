/**
 * Alert Routes
 * Endpoints for retrieving, filtering, modifying, and triggering explainable attention alerts.
 */

const express = require('express');
const alertController = require('../controllers/alertController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// General Alert Endpoints
router.get('/', alertController.listAlerts);
router.post('/evaluate', requireAuth, alertController.evaluateAll);
router.get('/:id', alertController.getAlertById);
router.patch('/:id', requireAuth, alertController.patchAlert);

module.exports = router;
