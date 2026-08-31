/**
 * Attention Service Index
 * Central exports for the Intelligence and Attention Analysis subsystem.
 */

const { evaluateProjectAttention, evaluateBatchProjects, DEFAULT_ENGINE_CONFIG } = require('./attentionEngine');
const { evaluateOverdueRule } = require('./rules/overdueRule');
const { evaluateLowProgressRule } = require('./rules/lowProgressRule');
const { evaluateLowUtilizationRule } = require('./rules/lowUtilizationRule');
const { evaluateStaleUpdateRule } = require('./rules/staleUpdateRule');
const { evaluateMismatchRule } = require('./rules/mismatchRule');

module.exports = {
  evaluateProjectAttention,
  evaluateBatchProjects,
  DEFAULT_ENGINE_CONFIG,
  rules: {
    evaluateOverdueRule,
    evaluateLowProgressRule,
    evaluateLowUtilizationRule,
    evaluateStaleUpdateRule,
    evaluateMismatchRule
  }
};
