/**
 * Integration Tests for Project APIs (CRUD, Filters, Search, Validation)
 */

const request = require('supertest');
const app = require('../app');
const { setupTestDB, teardownTestDB, clearCollections } = require('./setup');
const MP = require('../models/MP');
const Project = require('../models/Project');

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

beforeEach(async () => {
  await clearCollections();

  // Create an MP
  await MP.create({
    mpId: 'mp_101',
    name: 'Ravi Shankar Prasad',
    constituency: 'Patna Sahib',
    state: 'Bihar',
    party: 'BJP'
  });

  // Seed sample projects
  await Project.insertMany([
    {
      projectId: 'proj_001',
      mpId: 'mp_101',
      name: 'Road Construction — Ward 12',
      category: 'Road',
      location: 'Patna, Bihar',
      constituency: 'Patna Sahib',
      state: 'Bihar',
      financialYear: '2025–26',
      allocatedAmount: 10000000,
      spentAmount: 2500000,
      progressPercent: 32,
      startDate: new Date('2025-01-01'),
      expectedCompletionDate: new Date('2025-06-30'),
      status: 'DELAYED',
      dataSource: { type: 'demo', name: 'Demo Data', url: null, retrievedAt: new Date() }
    },
    {
      projectId: 'proj_002',
      mpId: 'mp_101',
      name: 'Community Health Center',
      category: 'Healthcare',
      location: 'Muzaffarpur, Bihar',
      constituency: 'Muzaffarpur',
      state: 'Bihar',
      financialYear: '2025–26',
      allocatedAmount: 7500000,
      spentAmount: 5600000,
      progressPercent: 75,
      startDate: new Date('2025-02-01'),
      expectedCompletionDate: new Date('2025-08-30'),
      status: 'ONGOING',
      dataSource: { type: 'demo', name: 'Demo Data', url: null, retrievedAt: new Date() }
    },
    {
      projectId: 'proj_003',
      mpId: 'mp_101',
      name: 'Primary School Renovation',
      category: 'Education',
      location: 'Patna, Bihar',
      constituency: 'Patna Sahib',
      state: 'Bihar',
      financialYear: '2024–25',
      allocatedAmount: 5000000,
      spentAmount: 5000000,
      progressPercent: 100,
      startDate: new Date('2024-01-01'),
      expectedCompletionDate: new Date('2024-06-30'),
      status: 'COMPLETED',
      dataSource: { type: 'demo', name: 'Demo Data', url: null, retrievedAt: new Date() }
    }
  ]);
});

describe('Project Endpoints', () => {
  describe('GET /api/projects', () => {
    it('should return paginated list of projects', async () => {
      const res = await request(app).get('/api/projects');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(3);
      expect(res.body.pagination).toEqual({
        page: 1,
        limit: 20,
        total: 3,
        pages: 1
      });
    });

    it('should filter projects by status', async () => {
      const res = await request(app).get('/api/projects?status=DELAYED');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].projectId).toBe('proj_001');
      expect(res.body.data[0].status).toBe('DELAYED');
    });

    it('should filter projects by category', async () => {
      const res = await request(app).get('/api/projects?category=Healthcare');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].category).toBe('Healthcare');
    });

    it('should search projects by name, category or location', async () => {
      const res = await request(app).get('/api/projects?search=Road');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toContain('Road');
    });

    it('should filter by financial year', async () => {
      const res = await request(app).get('/api/projects?financialYear=2024–25');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].projectId).toBe('proj_003');
    });

    it('should combine multiple filters', async () => {
      const res = await request(app).get('/api/projects?status=DELAYED&search=Road&category=Road');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].projectId).toBe('proj_001');
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return a single project with enriched financial calculations', async () => {
      const res = await request(app).get('/api/projects/proj_001');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe('proj_001');
      expect(res.body.data.allocatedAmount).toBe(10000000);
      expect(res.body.data.spentAmount).toBe(2500000);
      expect(res.body.data.remainingAmount).toBe(7500000);
      expect(res.body.data.utilizationPercentage).toBe(25);
    });

    it('should return 404 for a non-existent project', async () => {
      const res = await request(app).get('/api/projects/proj_non_existent');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('POST /api/projects', () => {
    it('should successfully create a new project with valid data', async () => {
      const payload = {
        projectId: 'proj_new_99',
        mpId: 'mp_101',
        name: 'Solar Street Lighting Installation',
        category: 'Energy',
        location: 'Patna Sahib, Bihar',
        allocatedAmount: 4000000,
        spentAmount: 1000000,
        progressPercent: 25,
        startDate: '2026-01-01T00:00:00.000Z',
        expectedCompletionDate: '2026-06-30T00:00:00.000Z',
        status: 'ONGOING',
        dataSource: {
          type: 'demo',
          name: 'CivicTrack Demo Dataset'
        }
      };

      const res = await request(app).post('/api/projects').send(payload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe('proj_new_99');
      expect(res.body.data.remainingAmount).toBe(3000000);
      expect(res.body.data.utilizationPercentage).toBe(25);
    });

    it('should return 409 Conflict when attempting to create duplicate projectId', async () => {
      const payload = {
        projectId: 'proj_001', // Already exists
        mpId: 'mp_101',
        name: 'Duplicate Road',
        category: 'Road',
        location: 'Patna',
        allocatedAmount: 1000000,
        startDate: '2026-01-01',
        expectedCompletionDate: '2026-06-30'
      };

      const res = await request(app).post('/api/projects').send(payload);
      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('CONFLICT');
    });

    it('should return 400 Validation Error for missing required fields', async () => {
      const payload = {
        // Missing name, category, location, allocatedAmount, dates
        projectId: 'proj_bad_1'
      };

      const res = await request(app).post('/api/projects').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 Validation Error when progressPercent is out of bounds (<0 or >100)', async () => {
      const payload = {
        projectId: 'proj_invalid_progress',
        mpId: 'mp_101',
        name: 'Test Project',
        category: 'Road',
        location: 'Patna',
        allocatedAmount: 1000000,
        progressPercent: 120, // Invalid > 100
        startDate: '2026-01-01',
        expectedCompletionDate: '2026-06-30'
      };

      const res = await request(app).post('/api/projects').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
      expect(res.body.error.details).toHaveProperty('progressPercent');
    });

    it('should return 400 Validation Error when expectedCompletionDate is before startDate', async () => {
      const payload = {
        projectId: 'proj_invalid_dates',
        mpId: 'mp_101',
        name: 'Test Project',
        category: 'Road',
        location: 'Patna',
        allocatedAmount: 1000000,
        startDate: '2026-06-30',
        expectedCompletionDate: '2026-01-01' // Before startDate
      };

      const res = await request(app).post('/api/projects').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 Validation Error for invalid status', async () => {
      const payload = {
        projectId: 'proj_invalid_status',
        mpId: 'mp_101',
        name: 'Test Project',
        category: 'Road',
        location: 'Patna',
        allocatedAmount: 1000000,
        startDate: '2026-01-01',
        expectedCompletionDate: '2026-06-30',
        status: 'NON_EXISTENT_STATUS'
      };

      const res = await request(app).post('/api/projects').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('PATCH /api/projects/:id', () => {
    it('should update project fields partially and update lastUpdatedAt', async () => {
      const res = await request(app)
        .patch('/api/projects/proj_001')
        .send({
          spentAmount: 3500000,
          progressPercent: 45,
          status: 'ONGOING'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.spentAmount).toBe(3500000);
      expect(res.body.data.progressPercent).toBe(45);
      expect(res.body.data.status).toBe('ONGOING');
      expect(res.body.data.remainingAmount).toBe(6500000);
      expect(res.body.data.utilizationPercentage).toBe(35);
      expect(new Date(res.body.data.lastUpdatedAt).getTime()).toBeGreaterThan(0);
    });

    it('should reject invalid partial updates with 400 Validation Error', async () => {
      const res = await request(app)
        .patch('/api/projects/proj_001')
        .send({
          progressPercent: -10 // Invalid
        });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 404 when updating non-existent project', async () => {
      const res = await request(app)
        .patch('/api/projects/proj_non_existent')
        .send({ progressPercent: 50 });

      expect(res.status).toBe(404);
    });
  });
});
