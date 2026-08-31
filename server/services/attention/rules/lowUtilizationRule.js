/**
 * Rule 3: Low Utilization Rule
 * Flags ongoing projects with low financial utilization relative to active duration.
 * Maintains strict political and editorial neutrality.
 */

const DEFAULT_CONFIG = {
  weight: 15,
  minDaysActive: 60,             // Must be active for at least 60 days before evaluating
  mediumUtilizationThreshold: 15, // Utilization below 15%
  highUtilizationThreshold: 5     // Utilization below 5%
};

/**
 * Evaluates whether an active project exhibits unusually low financial utilization.
 * @param {Object} project - Project data matching standard contract
 * @param {Object} [options] - Configuration and date overrides
 * @returns {Object} Rule evaluation result
 */
function evaluateLowUtilizationRule(project, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...(options.config || {}) };
  const now = options.referenceDate ? new Date(options.referenceDate) : new Date();

  if (!project || project.status === 'COMPLETED' || project.status === 'PLANNED') {
    return {
      triggered: false,
      rule: 'LOW_UTILIZATION',
      score: 0,
      severity: 'LOW',
      message: 'Utilization is consistent with project status.',
      details: null
    };
  }

  const allocated = Number(project.allocatedAmount || 0);
  const spent = Number(project.spentAmount || 0);

  if (allocated <= 0) {
    return {
      triggered: false,
      rule: 'LOW_UTILIZATION',
      score: 0,
      severity: 'LOW',
      message: 'No funds allocated for utilization analysis.',
      details: null
    };
  }

  const startDate = project.startDate ? new Date(project.startDate) : null;
  const daysActive = startDate ? Math.max(0, Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))) : 0;

  if (daysActive < config.minDaysActive) {
    return {
      triggered: false,
      rule: 'LOW_UTILIZATION',
      score: 0,
      severity: 'LOW',
      message: `Project recently commenced (${daysActive} days active).`,
      details: { daysActive, minDaysActive: config.minDaysActive }
    };
  }

  const rawUtilization = (spent / allocated) * 100;
  const utilizationPercent = Math.round(rawUtilization * 10) / 10;

  if (utilizationPercent >= config.mediumUtilizationThreshold) {
    return {
      triggered: false,
      rule: 'LOW_UTILIZATION',
      score: 0,
      severity: 'LOW',
      message: 'Fund utilization rate is in an expected range.',
      details: { allocatedAmount: allocated, spentAmount: spent, utilizationPercent, daysActive }
    };
  }

  let severity = 'MEDIUM';
  let scoreMultiplier = 0.7;

  if (utilizationPercent <= config.highUtilizationThreshold && daysActive >= 120) {
    severity = 'HIGH';
    scoreMultiplier = 1.0;
  }

  const score = Math.round(config.weight * scoreMultiplier);

  return {
    triggered: true,
    rule: 'LOW_UTILIZATION',
    severity,
    score,
    message: `Low fund utilization (${utilizationPercent}%) recorded for project active for ${daysActive} days. May indicate delayed contractor mobilization or pending invoices.`,
    details: {
      allocatedAmount: allocated,
      spentAmount: spent,
      utilizationPercent,
      daysActive,
      minDaysActive: config.minDaysActive
    }
  };
}

module.exports = {
  evaluateLowUtilizationRule,
  DEFAULT_CONFIG
};
