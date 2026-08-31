/**
 * Attention Rules Unit Tests
 * Verifies mathematical calculations, boundary conditions, and explainable messages for all 5 rules.
 */

const { evaluateOverdueRule } = require('../services/attention/rules/overdueRule');
const { evaluateLowProgressRule } = require('../services/attention/rules/lowProgressRule');
const { evaluateLowUtilizationRule } = require('../services/attention/rules/lowUtilizationRule');
const { evaluateStaleUpdateRule } = require('../services/attention/rules/staleUpdateRule');
const { evaluateMismatchRule } = require('../services/attention/rules/mismatchRule');

describe('Attention Rules — Individual Pure Unit Tests', () => {
  const referenceDate = new Date('2026-08-31T00:00:00.000Z');

  // ==========================================
  // Rule 1: Overdue Rule
  // ==========================================
  describe('Rule 1: Overdue Project Rule', () => {
    it('should flag a project when expectedCompletionDate has passed', () => {
      const project = {
        projectId: 'p1',
        status: 'ONGOING',
        expectedCompletionDate: new Date('2026-06-30T00:00:00.000Z') // ~62 days overdue
      };

      const result = evaluateOverdueRule(project, { referenceDate });

      expect(result.triggered).toBe(true);
      expect(result.rule).toBe('OVERDUE');
      expect(result.severity).toBe('HIGH');
      expect(result.score).toBeGreaterThan(0);
      expect(result.details.overdueDays).toBe(62);
      expect(result.message).toContain('62 days past its expected completion date');
    });

    it('should not flag a project whose expectedCompletionDate is in the future', () => {
      const project = {
        projectId: 'p2',
        status: 'ONGOING',
        expectedCompletionDate: new Date('2026-12-31T00:00:00.000Z')
      };

      const result = evaluateOverdueRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
      expect(result.score).toBe(0);
    });

    it('should not flag a completed project even if its date is in the past', () => {
      const project = {
        projectId: 'p3',
        status: 'COMPLETED',
        expectedCompletionDate: new Date('2026-01-01T00:00:00.000Z')
      };

      const result = evaluateOverdueRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
      expect(result.score).toBe(0);
    });

    it('should assign CRITICAL severity for projects severely overdue (>180 days)', () => {
      const project = {
        projectId: 'p4',
        status: 'ONGOING',
        expectedCompletionDate: new Date('2025-12-01T00:00:00.000Z') // >270 days overdue
      };

      const result = evaluateOverdueRule(project, { referenceDate });
      expect(result.triggered).toBe(true);
      expect(result.severity).toBe('CRITICAL');
    });
  });

  // ==========================================
  // Rule 2: Low Progress Rule
  // ==========================================
  describe('Rule 2: Low Progress Rule', () => {
    it('should flag a project when physical progress lags far behind timeline elapsed', () => {
      // Start: 2026-01-01, Expected: 2026-10-31 (approx 303 days total)
      // Ref: 2026-08-31 (approx 242 days elapsed -> ~80% elapsed)
      // Progress: only 20% -> 60% lag
      const project = {
        projectId: 'p5',
        status: 'ONGOING',
        startDate: new Date('2026-01-01T00:00:00.000Z'),
        expectedCompletionDate: new Date('2026-10-31T00:00:00.000Z'),
        progressPercent: 20
      };

      const result = evaluateLowProgressRule(project, { referenceDate });

      expect(result.triggered).toBe(true);
      expect(result.rule).toBe('LOW_PROGRESS');
      expect(result.severity).toBe('HIGH');
      expect(result.details.elapsedPercent).toBeGreaterThanOrEqual(75);
      expect(result.details.progressPercent).toBe(20);
      expect(result.message).toContain('Physical progress (20%) lags behind');
    });

    it('should not flag a project when physical progress matches or exceeds elapsed schedule', () => {
      const project = {
        projectId: 'p6',
        status: 'ONGOING',
        startDate: new Date('2026-01-01T00:00:00.000Z'),
        expectedCompletionDate: new Date('2026-12-31T00:00:00.000Z'),
        progressPercent: 70
      };

      const result = evaluateLowProgressRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
      expect(result.score).toBe(0);
    });

    it('should not flag early lifecycle projects (< 30% elapsed)', () => {
      // Started 10 days ago, total 300 days
      const project = {
        projectId: 'p7',
        status: 'ONGOING',
        startDate: new Date('2026-08-20T00:00:00.000Z'),
        expectedCompletionDate: new Date('2027-06-30T00:00:00.000Z'),
        progressPercent: 5
      };

      const result = evaluateLowProgressRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
    });
  });

  // ==========================================
  // Rule 3: Low Utilization Rule
  // ==========================================
  describe('Rule 3: Low Utilization Rule', () => {
    it('should flag low utilization on projects active for a significant period', () => {
      // Active since 2026-01-01 (242 days active)
      // Allocated: 10,000,000, Spent: 400,000 (4% utilization)
      const project = {
        projectId: 'p8',
        status: 'ONGOING',
        startDate: new Date('2026-01-01T00:00:00.000Z'),
        allocatedAmount: 10000000,
        spentAmount: 400000
      };

      const result = evaluateLowUtilizationRule(project, { referenceDate });

      expect(result.triggered).toBe(true);
      expect(result.rule).toBe('LOW_UTILIZATION');
      expect(result.details.utilizationPercent).toBe(4);
      expect(result.message).toContain('Low fund utilization');
      // Neutral wording check
      expect(result.message).not.toMatch(/corrupt|scam|fraud|misuse/i);
    });

    it('should not flag low utilization if project is newly active (< 60 days)', () => {
      const project = {
        projectId: 'p9',
        status: 'ONGOING',
        startDate: new Date('2026-08-01T00:00:00.000Z'), // ~30 days active
        allocatedAmount: 10000000,
        spentAmount: 100000 // 1%
      };

      const result = evaluateLowUtilizationRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
    });

    it('should not flag when utilization is healthy', () => {
      const project = {
        projectId: 'p10',
        status: 'ONGOING',
        startDate: new Date('2026-01-01T00:00:00.000Z'),
        allocatedAmount: 10000000,
        spentAmount: 6500000 // 65%
      };

      const result = evaluateLowUtilizationRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
    });
  });

  // ==========================================
  // Rule 4: Stale Update Rule
  // ==========================================
  describe('Rule 4: Stale Update Rule', () => {
    it('should flag projects whose last update exceeds 90 days', () => {
      const project = {
        projectId: 'p11',
        status: 'ONGOING',
        lastUpdatedAt: new Date('2026-04-01T00:00:00.000Z') // ~152 days ago
      };

      const result = evaluateStaleUpdateRule(project, { referenceDate });

      expect(result.triggered).toBe(true);
      expect(result.rule).toBe('STALE_UPDATE');
      expect(result.details.daysSinceUpdate).toBeGreaterThan(90);
      expect(result.message).toContain('not been updated in');
    });

    it('should not flag projects updated recently (< 90 days)', () => {
      const project = {
        projectId: 'p12',
        status: 'ONGOING',
        lastUpdatedAt: new Date('2026-08-15T00:00:00.000Z') // 16 days ago
      };

      const result = evaluateStaleUpdateRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
    });

    it('should not flag completed projects with past update timestamps', () => {
      const project = {
        projectId: 'p13',
        status: 'COMPLETED',
        lastUpdatedAt: new Date('2025-01-01T00:00:00.000Z')
      };

      const result = evaluateStaleUpdateRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
    });
  });

  // ==========================================
  // Rule 5: Financial / Physical Mismatch Rule
  // ==========================================
  describe('Rule 5: Financial / Physical Mismatch Rule', () => {
    it('should flag large gaps between fund utilization and physical progress', () => {
      // Allocated: 10,000,000, Spent: 8,000,000 (80% utilization)
      // Progress: 30%
      // Gap: 50%
      const project = {
        projectId: 'p14',
        status: 'ONGOING',
        allocatedAmount: 10000000,
        spentAmount: 8000000,
        progressPercent: 30
      };

      const result = evaluateMismatchRule(project, { referenceDate });

      expect(result.triggered).toBe(true);
      expect(result.rule).toBe('FINANCIAL_PHYSICAL_MISMATCH');
      expect(result.severity).toBe('HIGH');
      expect(result.details.utilizationPercent).toBe(80);
      expect(result.details.progressPercent).toBe(30);
      expect(result.details.gap).toBe(50);
      expect(result.message).toContain('Financial utilization (80%) significantly outpaces reported physical progress (30%)');
      expect(result.message).toContain('Requires physical verification');
    });

    it('should not flag when financial spend and physical progress are balanced', () => {
      const project = {
        projectId: 'p15',
        status: 'ONGOING',
        allocatedAmount: 10000000,
        spentAmount: 5500000, // 55%
        progressPercent: 50   // 50% (gap = 5%)
      };

      const result = evaluateMismatchRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
    });

    it('should not flag when utilization has not reached 25% minimum threshold', () => {
      const project = {
        projectId: 'p16',
        status: 'ONGOING',
        allocatedAmount: 10000000,
        spentAmount: 2000000, // 20%
        progressPercent: 0
      };

      const result = evaluateMismatchRule(project, { referenceDate });
      expect(result.triggered).toBe(false);
    });
  });
});
