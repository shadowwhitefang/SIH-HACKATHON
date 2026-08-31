/**
 * Rule 1: Overdue Project Rule
 * Flags ongoing projects whose expected completion date has passed.
 */

const DEFAULT_CONFIG = {
  weight: 25,
  mediumThresholdDays: 1,   // 1+ days overdue
  highThresholdDays: 60,    // 60+ days overdue
  criticalThresholdDays: 180 // 180+ days overdue
};

/**
 * Evaluates whether a project is overdue.
 * @param {Object} project - Project data matching standard contract
 * @param {Object} [options] - Optional configuration overrides
 * @param {Date} [options.referenceDate] - Date to evaluate against (defaults to now)
 * @param {Object} [options.config] - Custom rule configuration
 * @returns {Object} Rule evaluation result
 */
function evaluateOverdueRule(project, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...(options.config || {}) };
  const now = options.referenceDate ? new Date(options.referenceDate) : new Date();

  // Completed or planned projects that haven't commenced are not flagged as overdue
  if (!project || project.status === 'COMPLETED' || project.status === 'PLANNED') {
    return {
      triggered: false,
      rule: 'OVERDUE',
      score: 0,
      severity: 'LOW',
      message: 'Project is not overdue.',
      details: null
    };
  }

  if (!project.expectedCompletionDate) {
    return {
      triggered: false,
      rule: 'OVERDUE',
      score: 0,
      severity: 'LOW',
      message: 'Expected completion date not specified.',
      details: null
    };
  }

  const expectedDate = new Date(project.expectedCompletionDate);
  const diffMs = now.getTime() - expectedDate.getTime();
  const overdueDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (overdueDays <= 0) {
    return {
      triggered: false,
      rule: 'OVERDUE',
      score: 0,
      severity: 'LOW',
      message: 'Project is on schedule relative to completion date.',
      details: {
        overdueDays: 0,
        expectedCompletionDate: expectedDate.toISOString().split('T')[0]
      }
    };
  }

  let severity = 'MEDIUM';
  let scoreMultiplier = 0.6;

  if (overdueDays >= config.criticalThresholdDays) {
    severity = 'CRITICAL';
    scoreMultiplier = 1.0;
  } else if (overdueDays >= config.highThresholdDays) {
    severity = 'HIGH';
    scoreMultiplier = 0.85;
  }

  const score = Math.round(config.weight * scoreMultiplier);
  const formattedDate = expectedDate.toISOString().split('T')[0];

  return {
    triggered: true,
    rule: 'OVERDUE',
    severity,
    score,
    message: `Project is ${overdueDays} day${overdueDays === 1 ? '' : 's'} past its expected completion date (${formattedDate}).`,
    details: {
      overdueDays,
      expectedCompletionDate: formattedDate,
      currentDate: now.toISOString().split('T')[0]
    }
  };
}

module.exports = {
  evaluateOverdueRule,
  DEFAULT_CONFIG
};
