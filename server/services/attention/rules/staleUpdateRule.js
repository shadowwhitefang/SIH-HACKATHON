/**
 * Rule 4: Stale Update Rule
 * Flags projects whose tracking and reporting data has not been refreshed within the configured review cycle.
 */

const DEFAULT_CONFIG = {
  weight: 15,
  mediumStaleDays: 90,   // Stale after 90 days
  highStaleDays: 180,    // Stale after 180 days
  criticalStaleDays: 365 // Stale after 365 days
};

/**
 * Evaluates whether project tracking records are stale.
 * @param {Object} project - Project data matching standard contract
 * @param {Object} [options] - Configuration and date overrides
 * @returns {Object} Rule evaluation result
 */
function evaluateStaleUpdateRule(project, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...(options.config || {}) };
  const now = options.referenceDate ? new Date(options.referenceDate) : new Date();

  if (!project) {
    return {
      triggered: false,
      rule: 'STALE_UPDATE',
      score: 0,
      severity: 'LOW',
      message: 'No project data to evaluate.',
      details: null
    };
  }

  // Completed projects that were finalized long ago aren't penalized for no new updates
  if (project.status === 'COMPLETED') {
    return {
      triggered: false,
      rule: 'STALE_UPDATE',
      score: 0,
      severity: 'LOW',
      message: 'Completed projects are exempt from active update staleness checks.',
      details: null
    };
  }

  const lastUpdate = project.lastUpdatedAt ? new Date(project.lastUpdatedAt) : (project.updatedAt ? new Date(project.updatedAt) : null);

  if (!lastUpdate) {
    return {
      triggered: true,
      rule: 'STALE_UPDATE',
      severity: 'MEDIUM',
      score: Math.round(config.weight * 0.7),
      message: 'No recorded update timestamp found for this project.',
      details: { daysSinceUpdate: null }
    };
  }

  const diffMs = now.getTime() - lastUpdate.getTime();
  const daysSinceUpdate = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (daysSinceUpdate < config.mediumStaleDays) {
    return {
      triggered: false,
      rule: 'STALE_UPDATE',
      score: 0,
      severity: 'LOW',
      message: `Project data is current (updated ${daysSinceUpdate} days ago).`,
      details: {
        daysSinceUpdate,
        lastUpdatedAt: lastUpdate.toISOString().split('T')[0],
        thresholdDays: config.mediumStaleDays
      }
    };
  }

  let severity = 'MEDIUM';
  let scoreMultiplier = 0.6;

  if (daysSinceUpdate >= config.criticalStaleDays) {
    severity = 'CRITICAL';
    scoreMultiplier = 1.0;
  } else if (daysSinceUpdate >= config.highStaleDays) {
    severity = 'HIGH';
    scoreMultiplier = 0.85;
  }

  const score = Math.round(config.weight * scoreMultiplier);
  const formattedDate = lastUpdate.toISOString().split('T')[0];

  return {
    triggered: true,
    rule: 'STALE_UPDATE',
    severity,
    score,
    message: `Project progress data has not been updated in ${daysSinceUpdate} days (last recorded: ${formattedDate}, threshold: ${config.mediumStaleDays} days).`,
    details: {
      daysSinceUpdate,
      lastUpdatedAt: formattedDate,
      thresholdDays: config.mediumStaleDays
    }
  };
}

module.exports = {
  evaluateStaleUpdateRule,
  DEFAULT_CONFIG
};
