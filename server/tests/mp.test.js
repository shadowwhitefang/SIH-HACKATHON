/**
 * Integration Tests for MP APIs
 */

const request = require('supertest');
const app = require('../app');
const { setupTestDB, teardownTestDB, clearCollections } = require('./setup');
const MP = require('../models/MP');
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

  // Seed sample MPs
  await MP.insertMany([
    {
      mpId: 'mp_1',
      name: 'Ravi Shankar Prasad',
      constituency: 'Patna Sahib',
      state: 'Bihar',
      party: 'BJP',
      dataSource: { type: 'demo', name: 'Demo Data', url: null, retrievedAt: new Date() }
    },
    {
      mpId: 'mp_2',
      name: 'Raj Bhushan Choudhary',
      constituency: 'Muzaffarpur',
      state: 'Bihar',
      party: 'BJP',
      dataSource: { type: 'demo', name: 'Demo Data', url: null, retrievedAt: new Date() }
    },
    {
      mpId: 'mp_3',
      name: 'Hibi Eden',
      constituency: 'Ernakulam',
      state: 'Kerala',
      party: 'INC',
      dataSource: { type: 'demo', name: 'Demo Data', url: null, retrievedAt: new Date() }
    }
  ]);

  // Seed sample allocations & projects
  await FundAllocation.create({
    allocationId: 'alloc_1',
    mpId: 'mp_1',
    financialYear: '2025–26',
    allocatedAmount: 50000000,
    releasedAmount: 40000000,
    spentAmount: 35000000,
    dataSource: { type: 'demo' }
  });

  await Project.create({
    projectId: 'proj_1',
    mpId: 'mp_1',
    name: 'Road Construction',
    category: 'Road',
    location: 'Patna',
    allocatedAmount: 10000000,
    spentAmount: 2500000,
    progressPercent: 30,
    startDate: new Date('2025-01-01'),
    expectedCompletionDate: new Date('2025-06-30'),
    status: 'ONGOING'
  });
});

describe('MP Endpoints', () => {
  describe('GET /api/mps', () => {
    it('should return a paginated list of MPs with consistent response shape', async () => {
      const res = await request(app).get('/api/mps');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(3);
      expect(res.body.pagination).toEqual({
        page: 1,
        limit: 20,
        total: 3,
        pages: 1
      });
      expect(res.body.data[0]).toHaveProperty('id');
      expect(res.body.data[0]).toHaveProperty('name');
      expect(res.body.data[0]).toHaveProperty('constituency');
      expect(res.body.data[0]).toHaveProperty('state');
      expect(res.body.data[0]).toHaveProperty('party');
    });

    it('should filter MPs by state', async () => {
      const res = await request(app).get('/api/mps?state=Kerala');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].state).toBe('Kerala');
    });

    it('should filter MPs by party', async () => {
      const res = await request(app).get('/api/mps?party=INC');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].party).toBe('INC');
    });

    it('should search MPs by name or constituency', async () => {
      const res = await request(app).get('/api/mps?search=Patna');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].constituency).toBe('Patna Sahib');
    });

    it('should support pagination params', async () => {
      const res = await request(app).get('/api/mps?page=1&limit=2');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.pagination.total).toBe(3);
      expect(res.body.pagination.pages).toBe(2);
    });
  });

  describe('GET /api/mps/:id', () => {
    it('should return detailed MP record with fund allocations and project summary', async () => {
      const res = await request(app).get('/api/mps/mp_1');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe('mp_1');
      expect(res.body.data.name).toBe('Ravi Shankar Prasad');
      expect(res.body.data.financialSummary).toBeDefined();
      expect(res.body.data.financialSummary.totalAllocated).toBe(50000000);
      expect(res.body.data.financialSummary.totalSpent).toBe(35000000);
      expect(res.body.data.financialSummary.remainingAmount).toBe(15000000);
      expect(res.body.data.financialSummary.utilizationPercentage).toBe(70);
      expect(res.body.data.fundAllocations.length).toBe(1);
      expect(res.body.data.projectSummary.totalProjects).toBe(1);
      expect(res.body.data.projectSummary.ongoing).toBe(1);
    });

    it('should return 404 for a non-existent MP', async () => {
      const res = await request(app).get('/api/mps/non_existent_mp');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });
});
