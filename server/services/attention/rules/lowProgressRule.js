/**
 * Rule 2: Low Progress Rule
 * Flags projects whose reported physical progress lags significantly behind schedule elapsed time.
 */

const DEFAULT_CONFIG = {
  weight: 25,
  minElapsedThresholdPercent: 30, // Only evaluate once project is at least 30% through planned duration
  lagMediumThreshold: 30,         // 30% behind expected progress
  lagHighThreshold: 50,           // 50% behind expected progress
  lagCriticalThreshold: 70        // 70% behind expected progress
};

/**
 * Evaluates whether physical progress is lagging relative to project timeline.
 * @param {Object} project - Project data matching standard contract
 * @param {Object} [options] - Configuration and date overrides
 * @returns {Object} Rule evaluation result
 */
function evaluateLowProgressRule(project, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...(options.config || {}) };
  const now = options.referenceDate ? new Date(options.referenceDate) : new Date();

  if (!project || project.status === 'COMPLETED' || project.status === 'PLANNED') {
    return {
      triggered: false,
      rule: 'LOW_PROGRESS',
      score: 0,
      severity: 'LOW',
      message: 'Physical progress is consistent with project status.',
      details: null
    };
  }

  if (!project.startDate || !project.expectedCompletionDate) {
    return {
      triggered: false,
      rule: 'LOW_PROGRESS',
      score: 0,
      severity: 'LOW',
      message: 'Timeline dates incomplete for progress analysis.',
      details: null
    };
  }

  const startDate = new Date(project.startDate);
  const expectedDate = new Date(project.expectedCompletionDate);
  const totalDurationMs = expectedDate.getTime() - startDate.getTime();

  if (totalDurationMs <= 0) {
    return {
      triggered: false,
      rule: 'LOW_PROGRESS',
      score: 0,
      severity: 'LOW',
      message: 'Invalid project timeline duration.',
      details: null
    };
  }

  const elapsedMs = now.getTime() - startDate.getTime();
  if (elapsedMs <= 0) {
    return {
      triggered: false,
      rule: 'LOW_PROGRESS',
      score: 0,
      severity: 'LOW',
      message: 'Project has not yet reached its start date.',
      details: null
    };
  }

  const rawElapsedPercent = (elapsedMs / totalDurationMs) * 100;
  const elapsedPercent = Math.min(100, Math.max(0, Math.round(rawElapsedPercent)));
  const progressPercent = Number(project.progressPercent || 0);

  // If project has not reached minimum elapsed threshold, don't trigger
  if (elapsedPercent < config.minElapsedThresholdPercent) {
    return {
      triggered: false,
      rule: 'LOW_PROGRESS',
      score: 0,
      severity: 'LOW',
      message: `Project is early in its lifecycle (${elapsedPercent}% elapsed).`,
      details: { elapsedPercent, progressPercent }
    };
  }

  const progressLag = Math.max(0, elapsedPercent - progressPercent);

  if (progressLag < config.lagMediumThreshold) {
    return {
      triggered: false,
      rule: 'LOW_PROGRESS',
      score: 0,
      severity: 'LOW',
      message: 'Physical progress is commensurate with elapsed timeline.',
      details: { elapsedPercent, progressPercent, progressLag }
    };
  }

  let severity = 'MEDIUM';
  let scoreMultiplier = 0.6;

  if (progressLag >= config.lagCriticalThreshold) {
    severity = 'CRITICAL';
    scoreMultiplier = 1.0;
  } else if (progressLag >= config.lagHighThreshold) {
    severity = 'HIGH';
    scoreMultiplier = 0.85;
  }

  const score = Math.round(config.weight * scoreMultiplier);

  return {
    triggered: true,
    rule: 'LOW_PROGRESS',
    severity,
    score,
    message: `Physical progress (${progressPercent}%) lags behind planned timeline elapsed (${elapsedPercent}% elapsed, ${progressLag}% lag).`,
    details: {
      progressPercent,
      elapsedPercent,
      progressLag,
      expectedCompletionDate: expectedDate.toISOString().split('T')[0]
    }
  };
}

module.exports = {
  evaluateLowProgressRule,
  DEFAULT_CONFIG
};
