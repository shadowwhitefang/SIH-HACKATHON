/**
 * Alert Controller
 * Handles HTTP requests for listing, filtering, evaluating, and resolving project attention alerts.
 */

const alertService = require('../services/alertService');
const projectAdapter = require('../services/projectAdapter');
const { sendSuccess } = require('../utils/apiResponse');
const { NotFoundError } = require('../utils/errors');

/**
 * Lists alerts with filtering by severity, status, projectId, and pagination.
 * GET /api/alerts
 */
async function listAlerts(req, res, next) {
  try {
    const filters = {
      severity: req.query.severity,
      status: req.query.status,
      projectId: req.query.projectId,
      mpId: req.query.mpId
    };

    const pagination = {
      page: req.query.page,
      limit: req.query.limit
    };

    const result = await alertService.getAlerts(filters, pagination);

    return sendSuccess(res, result.alerts, 200, {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.pages
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves a single alert by ID.
 * GET /api/alerts/:id
 */
async function getAlertById(req, res, next) {
  try {
    const alert = await alertService.getAlertById(req.params.id);
    return sendSuccess(res, alert, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves alerts associated with a specific project.
 * GET /api/projects/:id/alerts
 */
async function getProjectAlerts(req, res, next) {
  try {
    const projectId = req.params.id;
    const filters = {
      status: req.query.status,
      severity: req.query.severity
    };

    const alerts = await alertService.getAlertsByProjectId(projectId, filters);
    return sendSuccess(res, alerts, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * Updates an alert's status and resolution details.
 * PATCH /api/alerts/:id
 */
async function patchAlert(req, res, next) {
  try {
    const alertId = req.params.id;
    const { status, resolutionNote } = req.body;

    const updatedAlert = await alertService.updateAlertStatus(
      alertId,
      { status, resolutionNote },
      req.user
    );

    return sendSuccess(res, updatedAlert, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * Evaluates attention rules on a specific project and updates its alert state.
 * POST /api/projects/:id/evaluate
 */
async function evaluateProject(req, res, next) {
  try {
    const projectId = req.params.id;
    const project = await projectAdapter.getProjectById(projectId);

    if (!project) {
      throw new NotFoundError(`Project with ID '${projectId}' not found`);
    }

    const result = await alertService.evaluateAndPersistAlert(project);
    return sendSuccess(res, result, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * Triggers batch evaluation of all projects across the system.
 * POST /api/alerts/evaluate
 */
async function evaluateAll(req, res, next) {
  try {
    const summary = await alertService.evaluateAllProjects();
    return sendSuccess(res, summary, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listAlerts,
  getAlertById,
  getProjectAlerts,
  patchAlert,
  evaluateProject,
  evaluateAll
};
