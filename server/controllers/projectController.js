/**
 * Project Controller
 * Thin controller for project CRUD, validation invocation, and response formatting.
 */

const projectService = require('../services/projectService');
const {
  validateCreateProject,
  validateUpdateProject,
  parsePaginationParams
} = require('../validators/projectValidator');
const { sendSuccess } = require('../utils/apiResponse');

async function getProjects(req, res, next) {
  try {
    const pagination = parsePaginationParams(req.query);
    const filters = {
      search: req.query.search,
      status: req.query.status,
      category: req.query.category,
      mpId: req.query.mpId,
      constituency: req.query.constituency,
      state: req.query.state,
      financialYear: req.query.financialYear
    };

    const result = await projectService.listProjects(filters, pagination);
    return sendSuccess(res, result.data, 200, result.pagination);
  } catch (error) {
    return next(error);
  }
}

async function getProjectById(req, res, next) {
  try {
    const project = await projectService.getProjectById(req.params.id);
    return sendSuccess(res, project, 200);
  } catch (error) {
    return next(error);
  }
}

async function createProject(req, res, next) {
  try {
    validateCreateProject(req.body);
    const project = await projectService.createProject(req.body);
    return sendSuccess(res, project, 201);
  } catch (error) {
    return next(error);
  }
}

async function updateProject(req, res, next) {
  try {
    validateUpdateProject(req.body);
    const project = await projectService.updateProject(req.params.id, req.body);
    return sendSuccess(res, project, 200);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject
};
