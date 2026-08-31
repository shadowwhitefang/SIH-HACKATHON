/**
 * Attention Engine Integration & Scoring Tests
 * Verifies composite scoring, severity aggregation, multi-rule triggering, and explainable output shapes.
 */

const { evaluateProjectAttention, evaluateBatchProjects } = require('../services/attention/attentionEngine');

describe('Attention Engine — Composite Scoring & Explainability', () => {
  const referenceDate = new Date('2026-08-31T00:00:00.000Z');

  it('should return clean NONE severity when a project has zero anomalies', () => {
    const perfectProject = {
      projectId: 'project_perfect',
      status: 'ONGOING',
      startDate: new Date('2026-01-01T00:00:00.000Z'),
      expectedCompletionDate: new Date('2026-12-31T00:00:00.000Z'),
      allocatedAmount: 10000000,
      spentAmount: 6000000,
      progressPercent: 65,
      lastUpdatedAt: new Date('2026-08-25T00:00:00.000Z')
    };

    const result = evaluateProjectAttention(perfectProject, { referenceDate });

    expect(result.projectId).toBe('project_perfect');
    expect(result.score).toBe(0);
    expect(result.severity).toBe('NONE');
    expect(result.hasAttention).toBe(false);
    expect(result.rulesTriggered).toHaveLength(0);
    expect(result).toHaveProperty('evaluatedAt');
  });

  it('should aggregate multiple triggered rules and calculate explainable composite score', () => {
    // Project with Overdue + Mismatch + Stale Update
    const problematicProject = {
      projectId: 'project_multi_signal',
      status: 'ONGOING',
      startDate: new Date('2025-01-01T00:00:00.000Z'),
      expectedCompletionDate: new Date('2026-05-30T00:00:00.000Z'), // Overdue (~93 days)
      allocatedAmount: 10000000,
      spentAmount: 8500000, // 85% spent
      progressPercent: 30,  // 30% progress -> 55% mismatch gap
      lastUpdatedAt: new Date('2026-03-01T00:00:00.000Z') // Stale (>180 days)
    };

    const result = evaluateProjectAttention(problematicProject, { referenceDate });

    expect(result.projectId).toBe('project_multi_signal');
    expect(result.hasAttention).toBe(true);
    expect(result.rulesTriggered.length).toBeGreaterThanOrEqual(3);

    // Verify rules triggered array contains explainable entries
    const ruleNames = result.rulesTriggered.map(r => r.rule);
    expect(ruleNames).toContain('OVERDUE');
    expect(ruleNames).toContain('FINANCIAL_PHYSICAL_MISMATCH');
    expect(ruleNames).toContain('STALE_UPDATE');

    // Score is positive and bounded <= 100
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.score).toBeLessThanOrEqual(100);

    // Severity should be HIGH or CRITICAL
    expect(['HIGH', 'CRITICAL']).toContain(result.severity);

    // Each triggered rule must have a human-readable message and values
    result.rulesTriggered.forEach(ruleItem => {
      expect(typeof ruleItem.rule).toBe('string');
      expect(typeof ruleItem.message).toBe('string');
      expect(ruleItem.message.length).toBeGreaterThan(10);
      expect(ruleItem.details).toBeDefined();
    });
  });

  it('should cap the composite score at 100 even if sum of rules exceeds 100', () => {
    const extremeProject = {
      projectId: 'project_extreme',
      status: 'ONGOING',
      startDate: new Date('2024-01-01T00:00:00.000Z'),
      expectedCompletionDate: new Date('2025-01-01T00:00:00.000Z'), // >600 days overdue
      allocatedAmount: 10000000,
      spentAmount: 9500000, // 95% spent
      progressPercent: 5,   // 5% progress
      lastUpdatedAt: new Date('2024-06-01T00:00:00.000Z') // >700 days stale
    };

    const result = evaluateProjectAttention(extremeProject, {
      referenceDate,
      config: {
        overdue: { weight: 50 },
        mismatch: { weight: 60 }
      }
    });

    expect(result.score).toBe(100);
    expect(result.severity).toBe('CRITICAL');
  });

  it('should support batch evaluation of projects', () => {
    const projects = [
      {
        projectId: 'p_batch_1',
        status: 'ONGOING',
        expectedCompletionDate: new Date('2026-06-01T00:00:00.000Z')
      },
      {
        projectId: 'p_batch_2',
        status: 'COMPLETED',
        expectedCompletionDate: new Date('2026-01-01T00:00:00.000Z')
      }
    ];

    const results = evaluateBatchProjects(projects, { referenceDate });

    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(2);
    expect(results[0].projectId).toBe('p_batch_1');
    expect(results[0].hasAttention).toBe(true);
    expect(results[1].projectId).toBe('p_batch_2');
    expect(results[1].hasAttention).toBe(false);
  });

  it('should handle null/undefined project input safely', () => {
    const result = evaluateProjectAttention(null);
    expect(result.hasAttention).toBe(false);
    expect(result.score).toBe(0);
    expect(result.severity).toBe('NONE');
  });
});
