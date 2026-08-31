/**
 * Attention Engine
 * Aggregates explainable rule evaluations, calculates composite attention scores,
 * and determines severity classification for public development projects.
 */

const { evaluateOverdueRule, DEFAULT_CONFIG: OVERDUE_DEFAULT } = require('./rules/overdueRule');
const { evaluateLowProgressRule, DEFAULT_CONFIG: PROGRESS_DEFAULT } = require('./rules/lowProgressRule');
const { evaluateLowUtilizationRule, DEFAULT_CONFIG: UTILIZATION_DEFAULT } = require('./rules/lowUtilizationRule');
const { evaluateStaleUpdateRule, DEFAULT_CONFIG: STALE_DEFAULT } = require('./rules/staleUpdateRule');
const { evaluateMismatchRule, DEFAULT_CONFIG: MISMATCH_DEFAULT } = require('./rules/mismatchRule');

const DEFAULT_ENGINE_CONFIG = {
  weights: {
    OVERDUE: OVERDUE_DEFAULT.weight,
    LOW_PROGRESS: PROGRESS_DEFAULT.weight,
    LOW_UTILIZATION: UTILIZATION_DEFAULT.weight,
    STALE_UPDATE: STALE_DEFAULT.weight,
    FINANCIAL_PHYSICAL_MISMATCH: MISMATCH_DEFAULT.weight
  },
  severityThresholds: {
    critical: 80,
    high: 50,
    medium: 25
  }
};

/**
 * Evaluates a single project against all active attention rules.
 * @param {Object} project - Project object conforming to the data contract
 * @param {Object} [options] - Options for evaluation
 * @param {Date} [options.referenceDate] - Custom evaluation timestamp
 * @param {Object} [options.config] - Custom engine or rule configurations
 * @returns {Object} Complete explainable evaluation output
 */
function evaluateProjectAttention(project, options = {}) {
  if (!project) {
    return {
      projectId: null,
      score: 0,
      severity: 'NONE',
      hasAttention: false,
      rulesTriggered: [],
      evaluatedAt: new Date().toISOString()
    };
  }

  const projectId = project.projectId || project.id || 'unknown';
  const customConfig = options.config || {};
  const referenceDate = options.referenceDate ? new Date(options.referenceDate) : new Date();

  // Evaluate all individual rules
  const ruleResults = [
    evaluateOverdueRule(project, { referenceDate, config: customConfig.overdue }),
    evaluateLowProgressRule(project, { referenceDate, config: customConfig.lowProgress }),
    evaluateLowUtilizationRule(project, { referenceDate, config: customConfig.lowUtilization }),
    evaluateStaleUpdateRule(project, { referenceDate, config: customConfig.staleUpdate }),
    evaluateMismatchRule(project, { referenceDate, config: customConfig.mismatch })
  ];

  // Collect only triggered rules
  const rulesTriggered = ruleResults
    .filter(r => r && r.triggered)
    .map(r => ({
      rule: r.rule,
      severity: r.severity,
      score: r.score,
      message: r.message,
      details: r.details
    }));

  // Calculate composite score (capped between 0 and 100)
  const rawScore = rulesTriggered.reduce((sum, r) => sum + (r.score || 0), 0);
  const score = Math.min(100, Math.max(0, rawScore));

  // Determine overall severity
  let severity = 'NONE';
  const hasCriticalRule = rulesTriggered.some(r => r.severity === 'CRITICAL');
  const hasHighRule = rulesTriggered.some(r => r.severity === 'HIGH');
  const hasMediumRule = rulesTriggered.some(r => r.severity === 'MEDIUM');

  if (hasCriticalRule || score >= (customConfig.criticalThreshold || DEFAULT_ENGINE_CONFIG.severityThresholds.critical)) {
    severity = 'CRITICAL';
  } else if (hasHighRule || score >= (customConfig.highThreshold || DEFAULT_ENGINE_CONFIG.severityThresholds.high)) {
    severity = 'HIGH';
  } else if (hasMediumRule || score >= (customConfig.mediumThreshold || DEFAULT_ENGINE_CONFIG.severityThresholds.medium)) {
    severity = 'MEDIUM';
  } else if (rulesTriggered.length > 0 || score > 0) {
    severity = 'LOW';
  }

  return {
    projectId,
    score,
    severity,
    hasAttention: rulesTriggered.length > 0,
    rulesTriggered,
    evaluatedAt: referenceDate.toISOString()
  };
}

/**
 * Batch evaluates a list of projects.
 * @param {Array<Object>} projects - List of project objects
 * @param {Object} [options] - Options for evaluation
 * @returns {Array<Object>} Array of evaluation outputs
 */
function evaluateBatchProjects(projects = [], options = {}) {
  if (!Array.isArray(projects)) return [];
  return projects.map(p => evaluateProjectAttention(p, options));
}

module.exports = {
  evaluateProjectAttention,
  evaluateBatchProjects,
  DEFAULT_ENGINE_CONFIG
};
