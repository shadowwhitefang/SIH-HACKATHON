/**
 * Alert API Integration Tests
 * Verifies Alert query endpoints, status updates, project evaluation triggers, and filtering.
 */

const request = require('supertest');
const app = require('../app');
const { setupTestDB, teardownTestDB, clearCollections } = require('./setup');
const Alert = require('../models/Alert');
const Project = require('../models/Project');
const User = require('../models/User');
const authService = require('../services/authService');

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

let testUserToken;
let testAdminToken;
let sampleAlert1;
let sampleAlert2;

beforeEach(async () => {
  await clearCollections();

  const user = await User.create({
    name: 'Standard User',
    email: 'user@civictrack.org',
    role: 'USER'
  });
  testUserToken = authService.generateToken(user);

  const admin = await User.create({
    name: 'Admin Auditor',
    email: 'admin@civictrack.org',
    role: 'ADMIN'
  });
  testAdminToken = authService.generateToken(admin);

  // Create sample project in DB
  await Project.create({
    projectId: 'proj_alert_001',
    mpId: 'mp_alert_001',
    name: 'Primary Health Clinic Construction',
    category: 'Healthcare',
    location: 'District Center',
    allocatedAmount: 15000000,
    spentAmount: 12000000, // 80% spent
    progressPercent: 25,   // 25% progress -> 55% gap
    startDate: new Date('2025-01-01T00:00:00.000Z'),
    expectedCompletionDate: new Date('2026-06-30T00:00:00.000Z'),
    status: 'ONGOING',
    lastUpdatedAt: new Date('2026-07-01T00:00:00.000Z')
  });

  // Seed sample alerts
  sampleAlert1 = await Alert.create({
    alertId: 'alert_test_001',
    projectId: 'proj_alert_001',
    mpId: 'mp_alert_001',
    severity: 'HIGH',
    score: 65,
    status: 'OPEN',
    rulesTriggered: [
      {
        rule: 'OVERDUE',
        severity: 'HIGH',
        score: 25,
        message: 'Project is 62 days past its expected completion date.',
        details: { overdueDays: 62 }
      },
      {
        rule: 'FINANCIAL_PHYSICAL_MISMATCH',
        severity: 'HIGH',
        score: 40,
        message: 'Financial utilization (80%) outpaces physical progress (25%).',
        details: { utilizationPercent: 80, progressPercent: 25, gap: 55 }
      }
    ]
  });

  sampleAlert2 = await Alert.create({
    alertId: 'alert_test_002',
    projectId: 'proj_alert_002',
    mpId: 'mp_alert_002',
    severity: 'MEDIUM',
    score: 30,
    status: 'RESOLVED',
    rulesTriggered: [
      {
        rule: 'STALE_UPDATE',
        severity: 'MEDIUM',
        score: 30,
        message: 'Project has not been updated in 95 days.',
        details: { daysSinceUpdate: 95 }
      }
    ],
    resolutionNote: 'Data refreshed by local field engineer.',
    resolvedAt: new Date()
  });
});

describe('Alert Endpoints', () => {
  describe('GET /api/alerts', () => {
    it('should return a paginated list of alerts', async () => {
      const res = await request(app).get('/api/alerts');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(2);
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.total).toBe(2);
    });

    it('should filter alerts by severity', async () => {
      const res = await request(app).get('/api/alerts?severity=HIGH');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].severity).toBe('HIGH');
      expect(res.body.data[0].id).toBe('alert_test_001');
    });

    it('should filter alerts by status', async () => {
      const res = await request(app).get('/api/alerts?status=OPEN');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].status).toBe('OPEN');
    });

    it('should filter alerts by projectId', async () => {
      const res = await request(app).get('/api/alerts?projectId=proj_alert_001');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].projectId).toBe('proj_alert_001');
    });
  });

  describe('GET /api/alerts/:id', () => {
    it('should retrieve a single alert by its alertId', async () => {
      const res = await request(app).get('/api/alerts/alert_test_001');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe('alert_test_001');
      expect(res.body.data.score).toBe(65);
      expect(res.body.data.rulesTriggered).toHaveLength(2);
    });

    it('should return 404 for a non-existent alert ID', async () => {
      const res = await request(app).get('/api/alerts/alert_non_existent');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('GET /api/projects/:id/alerts', () => {
    it('should retrieve alerts associated with a specific project', async () => {
      const res = await request(app).get('/api/projects/proj_alert_001/alerts');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].projectId).toBe('proj_alert_001');
    });
  });

  describe('PATCH /api/alerts/:id', () => {
    it('should update alert status and resolution note when authenticated', async () => {
      const res = await request(app)
        .patch('/api/alerts/alert_test_001')
        .set('Authorization', `Bearer ${testUserToken}`)
        .send({
          status: 'ACKNOWLEDGED',
          resolutionNote: 'Field inspection scheduled for tomorrow.'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('ACKNOWLEDGED');
      expect(res.body.data.resolutionNote).toBe('Field inspection scheduled for tomorrow.');
      expect(res.body.data.acknowledgedAt).toBeDefined();
    });

    it('should reject invalid status with 400 Bad Request', async () => {
      const res = await request(app)
        .patch('/api/alerts/alert_test_001')
        .set('Authorization', `Bearer ${testUserToken}`)
        .send({
          status: 'INVALID_STATUS'
        });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('BAD_REQUEST');
    });

    it('should reject unauthorized requests with 401', async () => {
      const res = await request(app)
        .patch('/api/alerts/alert_test_001')
        .send({ status: 'RESOLVED' });

      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('POST /api/projects/:id/evaluate', () => {
    it('should trigger evaluation on a specific project and return explainable alert data', async () => {
      const res = await request(app)
        .post('/api/projects/proj_alert_001/evaluate')
        .set('Authorization', `Bearer ${testUserToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('evaluation');
      expect(res.body.data.evaluation.hasAttention).toBe(true);
      expect(res.body.data).toHaveProperty('alert');
    });
  });

  describe('POST /api/alerts/evaluate', () => {
    it('should batch evaluate all projects in the system', async () => {
      const res = await request(app)
        .post('/api/alerts/evaluate')
        .set('Authorization', `Bearer ${testAdminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalProjectsEvaluated');
      expect(res.body.data).toHaveProperty('activeAlerts');
    });
  });
});
