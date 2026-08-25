/**
 * MP Routes
 * Base route: /api/mps
 */

const express = require('express');
const router = express.Router();
const mpController = require('../controllers/mpController');

router.get('/', mpController.getMPs);
router.get('/:id', mpController.getMPById);

module.exports = router;
