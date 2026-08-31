/**
 * Evidence Management & Upload Security Tests
 * Verifies multi-layered file validation, Cloudinary integration, and role-based deletion permissions.
 */

const request = require('supertest');
const app = require('../app');
const { setupTestDB, teardownTestDB, clearCollections } = require('./setup');
const Project = require('../models/Project');
const Evidence = require('../models/Evidence');
const User = require('../models/User');
const authService = require('../services/authService');

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

// Binary fixture buffers
const VALID_JPEG_BUFFER = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00]);
const VALID_PNG_BUFFER = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00]);
const VALID_PDF_BUFFER = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x35, 0x0a]);
const SPOOFED_TEXT_BUFFER = Buffer.from('Plain text contents posing as an image file');

let uploaderUser;
let uploaderToken;
let otherUser;
let otherToken;
let adminUser;
let adminToken;

beforeEach(async () => {
  await clearCollections();

  // Create users
  uploaderUser = await User.create({
    name: 'Field Verifier',
    email: 'verifier@civictrack.org',
    role: 'USER'
  });
  uploaderToken = authService.generateToken(uploaderUser);

  otherUser = await User.create({
    name: 'Other Citizen',
    email: 'other@civictrack.org',
    role: 'USER'
  });
  otherToken = authService.generateToken(otherUser);

  adminUser = await User.create({
    name: 'Admin Auditor',
    email: 'admin@civictrack.org',
    role: 'ADMIN'
  });
  adminToken = authService.generateToken(adminUser);

  // Seed project
  await Project.create({
    projectId: 'proj_evidence_001',
    mpId: 'mp_evidence_001',
    name: 'Rural Water Pipeline Installation',
    category: 'Water Supply',
    location: 'Sector 4',
    allocatedAmount: 5000000,
    spentAmount: 2000000,
    progressPercent: 40,
    startDate: new Date('2026-01-01T00:00:00.000Z'),
    expectedCompletionDate: new Date('2026-09-30T00:00:00.000Z'),
    status: 'ONGOING',
    lastUpdatedAt: new Date('2026-08-01T00:00:00.000Z')
  });
});

describe('Evidence & Upload Security Module', () => {
  describe('File Upload Validation & Security', () => {
    it('should successfully upload a valid JPEG image file with metadata', async () => {
      const res = await request(app)
        .post('/api/projects/proj_evidence_001/evidence')
        .set('Authorization', `Bearer ${uploaderToken}`)
        .field('title', 'Foundation Trenching Completed')
        .field('description', 'Photographic proof of pipe trench depth.')
        .field('type', 'PHOTO')
        .field('source', 'CITIZEN')
        .field('latitude', '25.3176')
        .field('longitude', '82.9739')
        .attach('file', VALID_JPEG_BUFFER, {
          filename: 'foundation_trench.jpg',
          contentType: 'image/jpeg'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.projectId).toBe('proj_evidence_001');
      expect(res.body.data.title).toBe('Foundation Trenching Completed');
      expect(res.body.data.type).toBe('PHOTO');
      expect(res.body.data.url).toBeDefined();
      expect(res.body.data.publicId).toBeDefined();
      expect(res.body.data.metadata.location.latitude).toBe(25.3176);
      expect(res.body.data.uploaderEmail).toBe('verifier@civictrack.org');
    });

    it('should successfully upload a valid PDF document', async () => {
      const res = await request(app)
        .post('/api/projects/proj_evidence_001/evidence')
        .set('Authorization', `Bearer ${uploaderToken}`)
        .field('title', 'Third Party Inspection Report')
        .field('type', 'INSPECTION_REPORT')
        .attach('file', VALID_PDF_BUFFER, {
          filename: 'inspection_report.pdf',
          contentType: 'application/pdf'
        });

      expect(res.status).toBe(201);
      expect(res.body.data.type).toBe('INSPECTION_REPORT');
      expect(res.body.data.mimeType).toBe('application/pdf');
    });

    it('should reject unsupported file extensions (e.g., .txt or .exe)', async () => {
      const res = await request(app)
        .post('/api/projects/proj_evidence_001/evidence')
        .set('Authorization', `Bearer ${uploaderToken}`)
        .field('title', 'Text Notes')
        .attach('file', Buffer.from('some text'), {
          filename: 'notes.txt',
          contentType: 'text/plain'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain('not supported');
    });

    it('should reject spoofed files where extension is .png but bytes are plain text', async () => {
      const res = await request(app)
        .post('/api/projects/proj_evidence_001/evidence')
        .set('Authorization', `Bearer ${uploaderToken}`)
        .field('title', 'Spoofed Image')
        .attach('file', SPOOFED_TEXT_BUFFER, {
          filename: 'spoofed_photo.png',
          contentType: 'image/png'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain('signature does not match');
    });

    it('should reject upload when title is missing', async () => {
      const res = await request(app)
        .post('/api/projects/proj_evidence_001/evidence')
        .set('Authorization', `Bearer ${uploaderToken}`)
        .attach('file', VALID_PNG_BUFFER, {
          filename: 'valid.png',
          contentType: 'image/png'
        });

      expect(res.status).toBe(400);
      expect(res.body.error.message).toContain('title is required');
    });

    it('should reject upload when file is missing', async () => {
      const res = await request(app)
        .post('/api/projects/proj_evidence_001/evidence')
        .set('Authorization', `Bearer ${uploaderToken}`)
        .field('title', 'Title without file');

      expect(res.status).toBe(400);
      expect(res.body.error.message).toContain('file is required');
    });

    it('should return 401 when uploading without authentication', async () => {
      const res = await request(app)
        .post('/api/projects/proj_evidence_001/evidence')
        .field('title', 'Unauthorized Upload')
        .attach('file', VALID_JPEG_BUFFER, {
          filename: 'unauth.jpg',
          contentType: 'image/jpeg'
        });

      expect(res.status).toBe(401);
    });

    it('should return 404 when uploading for non-existent project', async () => {
      const res = await request(app)
        .post('/api/projects/proj_non_existent/evidence')
        .set('Authorization', `Bearer ${uploaderToken}`)
        .field('title', 'Non existent project evidence')
        .attach('file', VALID_JPEG_BUFFER, {
          filename: 'photo.jpg',
          contentType: 'image/jpeg'
        });

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Evidence Retrieval & Deletion', () => {
    let seededEvidence;

    beforeEach(async () => {
      seededEvidence = await Evidence.create({
        evidenceId: 'ev_test_100',
        projectId: 'proj_evidence_001',
        title: 'Geotagged Pipe Junction',
        type: 'PHOTO',
        url: 'https://res.cloudinary.com/civictrack-demo/image/upload/sample.jpg',
        publicId: 'civictrack/evidence/sample',
        fileSize: 102400,
        mimeType: 'image/jpeg',
        uploadedBy: uploaderUser._id,
        uploaderEmail: uploaderUser.email,
        uploaderName: uploaderUser.name,
        source: 'CITIZEN',
        status: 'VERIFIED'
      });
    });

    it('should list evidence for a project', async () => {
      const res = await request(app).get('/api/projects/proj_evidence_001/evidence');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].id).toBe('ev_test_100');
    });

    it('should retrieve a single evidence item by ID', async () => {
      const res = await request(app).get('/api/evidence/ev_test_100');

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Geotagged Pipe Junction');
    });

    it('should allow the uploader to delete their own evidence', async () => {
      const res = await request(app)
        .delete('/api/evidence/ev_test_100')
        .set('Authorization', `Bearer ${uploaderToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const check = await Evidence.findOne({ evidenceId: 'ev_test_100' });
      expect(check).toBeNull();
    });

    it('should allow an ADMIN to delete any evidence', async () => {
      const res = await request(app)
        .delete('/api/evidence/ev_test_100')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should reject deletion attempt by an unauthorized non-owner user with 403 Forbidden', async () => {
      const res = await request(app)
        .delete('/api/evidence/ev_test_100')
        .set('Authorization', `Bearer ${otherToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('FORBIDDEN');
    });
  });
});
