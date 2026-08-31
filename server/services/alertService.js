/**
 * Alert Service
 * Orchestrates attention evaluation, persistence, filtering, and status updates for alerts.
 */

const Alert = require('../models/Alert');
const { evaluateProjectAttention } = require('./attention/attentionEngine');
const projectAdapter = require('./projectAdapter');
const { NotFoundError, BadRequestError } = require('../utils/errors');

/**
 * Generates a unique alert ID string.
 * @returns {String}
 */
function generateAlertId() {
  const timestamp = Date.now().toString(36);
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `alert_${timestamp}_${randomSuffix}`;
}

/**
 * Retrieves a paginated list of alerts with optional filters.
 * @param {Object} filters - Query filters (severity, status, projectId, mpId)
 * @param {Object} pagination - Page & limit
 * @returns {Promise<{ alerts: Array, total: Number, page: Number, limit: Number, pages: Number }>}
 */
async function getAlerts(filters = {}, pagination = {}) {
  const query = {};

  if (filters.severity) {
    const severities = filters.severity.split(',').map(s => s.trim().toUpperCase());
    query.severity = severities.length === 1 ? severities[0] : { $in: severities };
  }

  if (filters.status) {
    const statuses = filters.status.split(',').map(s => s.trim().toUpperCase());
    query.status = statuses.length === 1 ? statuses[0] : { $in: statuses };
  }

  if (filters.projectId) {
    query.projectId = filters.projectId.trim();
  }

  if (filters.mpId) {
    query.mpId = filters.mpId.trim();
  }

  const page = Math.max(1, parseInt(pagination.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(pagination.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [alerts, total] = await Promise.all([
    Alert.find(query)
      .sort({ score: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('resolvedBy', 'name email role')
      .lean(),
    Alert.countDocuments(query)
  ]);

  const formattedAlerts = alerts.map(alert => ({
    ...alert,
    id: alert.alertId
  }));

  return {
    alerts: formattedAlerts,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit) || 1
  };
}

/**
 * Retrieves a single alert by its unique alertId.
 * @param {String} alertId - Unique alert identifier
 * @returns {Promise<Object>}
 */
async function getAlertById(alertId) {
  const alert = await Alert.findOne({ alertId })
    .populate('resolvedBy', 'name email role')
    .lean();

  if (!alert) {
    throw new NotFoundError(`Alert with ID '${alertId}' not found`);
  }

  return {
    ...alert,
    id: alert.alertId
  };
}

/**
 * Retrieves alerts for a specific project.
 * @param {String} projectId - Unique project identifier
 * @param {Object} [filters] - Additional filters (status, severity)
 * @returns {Promise<Array>}
 */
async function getAlertsByProjectId(projectId, filters = {}) {
  const query = { projectId };

  if (filters.status) {
    query.status = filters.status.toUpperCase();
  }

  if (filters.severity) {
    query.severity = filters.severity.toUpperCase();
  }

  const alerts = await Alert.find(query)
    .sort({ score: -1, createdAt: -1 })
    .populate('resolvedBy', 'name email role')
    .lean();

  return alerts.map(a => ({
    ...a,
    id: a.alertId
  }));
}

/**
 * Updates an alert's status and records resolution notes.
 * @param {String} alertId - Unique alert identifier
 * @param {Object} updateData - { status, resolutionNote }
 * @param {Object} [user] - Authenticated user performing the update
 * @returns {Promise<Object>} Updated alert
 */
async function updateAlertStatus(alertId, updateData = {}, user = null) {
  const alert = await Alert.findOne({ alertId });
  if (!alert) {
    throw new NotFoundError(`Alert with ID '${alertId}' not found`);
  }

  const { status, resolutionNote } = updateData;

  if (status) {
    const validStatuses = ['OPEN', 'ACKNOWLEDGED', 'RESOLVED', 'DISMISSED'];
    const formattedStatus = status.toUpperCase();
    if (!validStatuses.includes(formattedStatus)) {
      throw new BadRequestError(`Invalid alert status '${status}'. Must be one of: ${validStatuses.join(', ')}`);
    }

    alert.status = formattedStatus;

    if (formattedStatus === 'RESOLVED' || formattedStatus === 'DISMISSED') {
      alert.resolvedAt = new Date();
      if (user) {
        alert.resolvedBy = user._id || user.id;
      }
    } else if (formattedStatus === 'ACKNOWLEDGED') {
      alert.acknowledgedAt = new Date();
    }
  }

  if (resolutionNote !== undefined) {
    alert.resolutionNote = resolutionNote ? resolutionNote.trim() : null;
  }

  await alert.save();
  return alert.toJSON();
}

/**
 * Evaluates attention rules on a project and creates or updates its Alert record.
 * @param {Object} project - Project object
 * @param {Object} [options] - Options for evaluation
 * @returns {Promise<Object>} Evaluation result and alert record
 */
async function evaluateAndPersistAlert(project, options = {}) {
  const evaluation = evaluateProjectAttention(project, options);
  const projectId = project.projectId || project.id;

  if (!evaluation.hasAttention) {
    // If no attention rules triggered, check if there was an open alert to auto-resolve
    const existingAlert = await Alert.findOne({ projectId, status: 'OPEN' });
    if (existingAlert) {
      existingAlert.status = 'RESOLVED';
      existingAlert.resolvedAt = new Date();
      existingAlert.resolutionNote = 'Resolved automatically: Project no longer triggers attention rules.';
      existingAlert.score = 0;
      existingAlert.severity = 'LOW';
      existingAlert.rulesTriggered = [];
      existingAlert.lastEvaluatedAt = new Date();
      await existingAlert.save();
    }
    return {
      evaluation,
      alert: existingAlert ? existingAlert.toJSON() : null
    };
  }

  // Look for existing active alert for this project
  let alert = await Alert.findOne({
    projectId,
    status: { $in: ['OPEN', 'ACKNOWLEDGED'] }
  });

  if (alert) {
    alert.severity = evaluation.severity;
    alert.score = evaluation.score;
    alert.rulesTriggered = evaluation.rulesTriggered;
    alert.mpId = project.mpId || alert.mpId;
    alert.lastEvaluatedAt = new Date();
    await alert.save();
  } else {
    alert = await Alert.create({
      alertId: generateAlertId(),
      projectId,
      mpId: project.mpId || null,
      severity: evaluation.severity,
      score: evaluation.score,
      rulesTriggered: evaluation.rulesTriggered,
      status: 'OPEN',
      lastEvaluatedAt: new Date()
    });
  }

  return {
    evaluation,
    alert: alert.toJSON()
  };
}

/**
 * Evaluates attention rules across all projects in the database and updates alerts.
 * @param {Object} [options] - Evaluation options
 * @returns {Promise<Object>} Summary statistics
 */
async function evaluateAllProjects(options = {}) {
  const projects = await projectAdapter.getAllProjects();
  let generated = 0;
  let evaluated = 0;

  for (const project of projects) {
    evaluated++;
    const result = await evaluateAndPersistAlert(project, options);
    if (result.alert && (result.alert.status === 'OPEN' || result.alert.status === 'ACKNOWLEDGED')) {
      generated++;
    }
  }

  return {
    totalProjectsEvaluated: evaluated,
    activeAlerts: generated,
    evaluatedAt: new Date().toISOString()
  };
}

module.exports = {
  getAlerts,
  getAlertById,
  getAlertsByProjectId,
  updateAlertStatus,
  evaluateAndPersistAlert,
  evaluateAllProjects
};
