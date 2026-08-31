/**
 * Rule 5: Financial / Physical Mismatch Rule
 * Compares fund utilization rate against reported physical progress.
 * Surfaces anomalies requiring verification without making assumptions or accusations.
 */

const DEFAULT_CONFIG = {
  weight: 30,
  minUtilizationToEvaluate: 25, // Only evaluate when financial utilization has reached at least 25%
  gapMediumThreshold: 30,       // Financial utilization exceeds physical progress by >= 30%
  gapHighThreshold: 50,         // Financial utilization exceeds physical progress by >= 50%
  gapCriticalThreshold: 70      // Financial utilization exceeds physical progress by >= 70%
};

/**
 * Evaluates whether financial spend outpaces reported physical ground progress.
 * @param {Object} project - Project data matching standard contract
 * @param {Object} [options] - Configuration overrides
 * @returns {Object} Rule evaluation result
 */
function evaluateMismatchRule(project, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...(options.config || {}) };

  if (!project) {
    return {
      triggered: false,
      rule: 'FINANCIAL_PHYSICAL_MISMATCH',
      score: 0,
      severity: 'LOW',
      message: 'No project data to evaluate.',
      details: null
    };
  }

  const allocated = Number(project.allocatedAmount || 0);
  const spent = Number(project.spentAmount || 0);
  const progressPercent = Number(project.progressPercent || 0);

  if (allocated <= 0) {
    return {
      triggered: false,
      rule: 'FINANCIAL_PHYSICAL_MISMATCH',
      score: 0,
      severity: 'LOW',
      message: 'No allocated amount available for comparison.',
      details: null
    };
  }

  const rawUtilization = (spent / allocated) * 100;
  const utilizationPercent = Math.round(rawUtilization * 10) / 10;

  // Below minimum evaluation threshold
  if (utilizationPercent < config.minUtilizationToEvaluate) {
    return {
      triggered: false,
      rule: 'FINANCIAL_PHYSICAL_MISMATCH',
      score: 0,
      severity: 'LOW',
      message: `Utilization (${utilizationPercent}%) is below analysis threshold (${config.minUtilizationToEvaluate}%).`,
      details: { utilizationPercent, progressPercent }
    };
  }

  const gap = Math.round((utilizationPercent - progressPercent) * 10) / 10;

  if (gap < config.gapMediumThreshold) {
    return {
      triggered: false,
      rule: 'FINANCIAL_PHYSICAL_MISMATCH',
      score: 0,
      severity: 'LOW',
      message: 'Financial expenditure is aligned with physical progress.',
      details: { utilizationPercent, progressPercent, gap }
    };
  }

  let severity = 'MEDIUM';
  let scoreMultiplier = 0.6;

  if (gap >= config.gapCriticalThreshold) {
    severity = 'CRITICAL';
    scoreMultiplier = 1.0;
  } else if (gap >= config.gapHighThreshold) {
    severity = 'HIGH';
    scoreMultiplier = 0.85;
  }

  const score = Math.round(config.weight * scoreMultiplier);

  return {
    triggered: true,
    rule: 'FINANCIAL_PHYSICAL_MISMATCH',
    severity,
    score,
    message: `Financial utilization (${utilizationPercent}%) significantly outpaces reported physical progress (${progressPercent}%). Requires physical verification to ensure milestones match disbursements.`,
    details: {
      allocatedAmount: allocated,
      spentAmount: spent,
      utilizationPercent,
      progressPercent,
      gap,
      minUtilizationToEvaluate: config.minUtilizationToEvaluate
    }
  };
}

module.exports = {
  evaluateMismatchRule,
  DEFAULT_CONFIG
};
