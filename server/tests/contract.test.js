/**
 * Integration Contract Test
 * Protects Backend Developer 2 and the Frontend from breaking contract changes.
 */

const request = require('supertest');
const app = require('../app');
const { setupTestDB, teardownTestDB, clearCollections } = require('./setup');
const Project = require('../models/Project');

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

beforeEach(async () => {
  await clearCollections();

  await Project.create({
    projectId: 'project_contract_001',
    mpId: 'mp_contract_101',
    name: 'Road Construction',
    category: 'Road',
    location: 'Constituency Central',
    allocatedAmount: 10000000,
    spentAmount: 2500000,
    progressPercent: 30,
    startDate: new Date('2026-01-01T00:00:00.000Z'),
    expectedCompletionDate: new Date('2026-06-30T00:00:00.000Z'),
    status: 'ONGOING',
    lastUpdatedAt: new Date('2026-07-10T00:00:00.000Z'),
    dataSource: {
      type: 'demo',
      name: 'CivicTrack Demo Dataset',
      url: null,
      retrievedAt: new Date('2026-08-25T00:00:00.000Z')
    }
  });
});

describe('Integration Contract Tests for Developer 2 & Frontend', () => {
  it('GET /api/projects/:id response must strictly adhere to the contract schema', async () => {
    const res = await request(app).get('/api/projects/project_contract_001');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const project = res.body.data;

    // Required Contract Fields
    expect(project).toHaveProperty('id');
    expect(typeof project.id).toBe('string');
    expect(project.id).toBe('project_contract_001');

    expect(project).toHaveProperty('name');
    expect(typeof project.name).toBe('string');

    expect(project).toHaveProperty('mpId');
    expect(typeof project.mpId).toBe('string');

    expect(project).toHaveProperty('allocatedAmount');
    expect(typeof project.allocatedAmount).toBe('number');
    expect(project.allocatedAmount).toBe(10000000);

    expect(project).toHaveProperty('spentAmount');
    expect(typeof project.spentAmount).toBe('number');
    expect(project.spentAmount).toBe(2500000);

    expect(project).toHaveProperty('progressPercent');
    expect(typeof project.progressPercent).toBe('number');
    expect(project.progressPercent).toBe(30);

    expect(project).toHaveProperty('startDate');
    expect(typeof project.startDate).toBe('string');
    expect(new Date(project.startDate).toISOString()).toBe('2026-01-01T00:00:00.000Z');

    expect(project).toHaveProperty('expectedCompletionDate');
    expect(typeof project.expectedCompletionDate).toBe('string');
    expect(new Date(project.expectedCompletionDate).toISOString()).toBe('2026-06-30T00:00:00.000Z');

    expect(project).toHaveProperty('status');
    expect(typeof project.status).toBe('string');
    expect(project.status).toBe('ONGOING');

    expect(project).toHaveProperty('lastUpdatedAt');
    expect(typeof project.lastUpdatedAt).toBe('string');

    expect(project).toHaveProperty('dataSource');
    expect(typeof project.dataSource).toBe('object');
    expect(project.dataSource.type).toBe('demo');

    // Enriched Financial Helpers
    expect(project).toHaveProperty('remainingAmount');
    expect(project.remainingAmount).toBe(7500000);

    expect(project).toHaveProperty('utilizationPercentage');
    expect(project.utilizationPercentage).toBe(25);

    // Ensure internal MongoDB properties are not leaking
    expect(project).not.toHaveProperty('_id');
    expect(project).not.toHaveProperty('__v');
  });

  it('GET /api/projects array response elements must match the exact contract shape', async () => {
    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    const project = res.body.data[0];
    expect(project.id).toBe('project_contract_001');
    expect(project.allocatedAmount).toBe(10000000);
    expect(project.spentAmount).toBe(2500000);
    expect(project.remainingAmount).toBe(7500000);
    expect(project.progressPercent).toBe(30);
    expect(project.status).toBe('ONGOING');
  });

  it('Standard Error Contract must be respected on failure', async () => {
    const res = await request(app).get('/api/projects/unknown_id');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: "Project with ID 'unknown_id' not found"
      }
    });
  });
});
