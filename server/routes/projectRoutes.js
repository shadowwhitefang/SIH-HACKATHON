/**
 * Project Routes
 * Base route: /api/projects
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.patch('/:id', projectController.updateProject);

module.exports = router;
