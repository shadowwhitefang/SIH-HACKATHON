/**
 * Integration Tests for Dashboard API
 */

const request = require('supertest');
const app = require('../app');
const { setupTestDB, teardownTestDB, clearCollections } = require('./setup');
const FundAllocation = require('../models/FundAllocation');
const Project = require('../models/Project');

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

beforeEach(async () => {
  await clearCollections();

  // Seed Allocations
  await FundAllocation.insertMany([
    {
      allocationId: 'alloc_1',
      mpId: 'mp_1',
      financialYear: '2025–26',
      allocatedAmount: 100000000, // 10 Cr
      spentAmount: 70000000      // 7 Cr (70% util)
    },
    {
      allocationId: 'alloc_2',
      mpId: 'mp_2',
      financialYear: '2025–26',
      allocatedAmount: 24000000,  // 2.4 Cr
      spentAmount: 17000000      // 1.7 Cr
    },
    {
      allocationId: 'alloc_3',
      mpId: 'mp_1',
      financialYear: '2024–25',
      allocatedAmount: 50000000,  // 5 Cr
      spentAmount: 40000000      // 4 Cr
    }
  ]);

  // Seed Projects across statuses and FYs
  await Project.insertMany([
    {
      projectId: 'p1',
      mpId: 'mp_1',
      name: 'Project 1',
      category: 'Road',
      location: 'Loc 1',
      financialYear: '2025–26',
      allocatedAmount: 40000000,
      spentAmount: 30000000,
      status: 'ONGOING',
      startDate: new Date('2025-01-01'),
      expectedCompletionDate: new Date('2025-12-31')
    },
    {
      projectId: 'p2',
      mpId: 'mp_1',
      name: 'Project 2',
      category: 'Healthcare',
      location: 'Loc 2',
      financialYear: '2025–26',
      allocatedAmount: 30000000,
      spentAmount: 30000000,
      status: 'COMPLETED',
      startDate: new Date('2025-01-01'),
      expectedCompletionDate: new Date('2025-06-30')
    },
    {
      projectId: 'p3',
      mpId: 'mp_2',
      name: 'Project 3',
      category: 'Water Supply',
      location: 'Loc 3',
      financialYear: '2025–26',
      allocatedAmount: 20000000,
      spentAmount: 10000000,
      status: 'DELAYED',
      startDate: new Date('2025-01-01'),
      expectedCompletionDate: new Date('2025-06-30')
    },
    {
      projectId: 'p4',
      mpId: 'mp_2',
      name: 'Project 4',
      category: 'Sanitation',
      location: 'Loc 4',
      financialYear: '2025–26',
      allocatedAmount: 10000000,
      spentAmount: 5000000,
      status: 'NEEDS_ATTENTION',
      startDate: new Date('2025-01-01'),
      expectedCompletionDate: new Date('2025-10-31')
    },
    {
      projectId: 'p5',
      mpId: 'mp_1',
      name: 'Project 5',
      category: 'Education',
      location: 'Loc 5',
      financialYear: '2024–25',
      allocatedAmount: 50000000,
      spentAmount: 40000000,
      status: 'COMPLETED',
      startDate: new Date('2024-01-01'),
      expectedCompletionDate: new Date('2024-12-31')
    }
  ]);
});

describe('Dashboard Endpoint', () => {
  describe('GET /api/dashboard', () => {
    it('should aggregate metrics for all financial years by default', async () => {
      const res = await request(app).get('/api/dashboard');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const { kpis, projectStatusBreakdown, fundUtilizationBreakdown } = res.body.data;

      // Total allocations: 10Cr + 2.4Cr + 5Cr = 17.4 Cr = 174,000,000
      expect(kpis.totalAllocation).toBe(174000000);
      // Total spent: 7Cr + 1.7Cr + 4Cr = 12.7 Cr = 127,000,000
      expect(kpis.totalExpenditure).toBe(127000000);
      // Remaining: 17.4Cr - 12.7Cr = 4.7 Cr = 47,000,000
      expect(kpis.remainingAmount).toBe(47000000);
      expect(kpis.utilizationPercentage).toBe(72.99);

      // Projects count across all years: 5
      expect(kpis.totalProjects).toBe(5);
      expect(kpis.activeProjects).toBe(1);
      expect(kpis.completedProjects).toBe(2);
      expect(kpis.delayedProjects).toBe(1);
      expect(kpis.attentionProjectsCount).toBe(1);

      // Status breakdown
      expect(Array.isArray(projectStatusBreakdown)).toBe(true);
      expect(projectStatusBreakdown.length).toBeGreaterThanOrEqual(4);

      // Fund breakdown
      expect(fundUtilizationBreakdown).toHaveLength(3);
    });

    it('should filter dashboard metrics by specific financial year (2025–26)', async () => {
      const res = await request(app).get('/api/dashboard?financialYear=2025–26');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const { kpis } = res.body.data;

      // 2025-26 Allocations: 10Cr + 2.4Cr = 12.4 Cr = 124,000,000
      expect(kpis.totalAllocation).toBe(124000000);
      // 2025-26 Spent: 7Cr + 1.7Cr = 8.7 Cr = 87,000,000
      expect(kpis.totalExpenditure).toBe(87000000);
      expect(kpis.remainingAmount).toBe(37000000);
      expect(kpis.utilizationPercentage).toBe(70.16);

      // 2025-26 Projects: 4
      expect(kpis.totalProjects).toBe(4);
      expect(kpis.activeProjects).toBe(1);
      expect(kpis.completedProjects).toBe(1);
      expect(kpis.delayedProjects).toBe(1);
      expect(kpis.attentionProjectsCount).toBe(1);
    });
  });
});
