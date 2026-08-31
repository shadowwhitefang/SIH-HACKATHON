/**
 * Authentication and Authorization Tests
 * Verifies User creation, Google OAuth token verification, JWT issuance, and RBAC middleware.
 */

const request = require('supertest');
const app = require('../app');
const { setupTestDB, teardownTestDB, clearCollections } = require('./setup');
const User = require('../models/User');
const authService = require('../services/authService');

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

beforeEach(async () => {
  await clearCollections();
});

describe('Authentication & Authorization Module', () => {
  describe('User Model', () => {
    it('should create a valid user document with default role USER', async () => {
      const user = await User.create({
        googleId: 'google_12345',
        name: 'Aarav Sharma',
        email: 'aarav@civictrack.org',
        avatar: 'https://avatar.com/aarav.png'
      });

      expect(user.id).toBeDefined();
      expect(user.email).toBe('aarav@civictrack.org');
      expect(user.role).toBe('USER');
      expect(user.isActive).toBe(true);
      expect(user.createdAt).toBeDefined();
    });

    it('should enforce unique email constraint', async () => {
      await User.create({
        googleId: 'google_001',
        name: 'User One',
        email: 'duplicate@civictrack.org'
      });

      await expect(User.create({
        googleId: 'google_002',
        name: 'User Two',
        email: 'duplicate@civictrack.org'
      })).rejects.toThrow();
    });
  });

  describe('JWT Token Lifecycle', () => {
    it('should generate and verify signed JWT tokens', () => {
      const mockUser = {
        id: 'usr_test_123',
        email: 'test@civictrack.org',
        name: 'Test Officer',
        role: 'ADMIN'
      };

      const token = authService.generateToken(mockUser);
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);

      const decoded = authService.verifyToken(token);
      expect(decoded.id).toBe('usr_test_123');
      expect(decoded.email).toBe('test@civictrack.org');
      expect(decoded.role).toBe('ADMIN');
    });

    it('should reject invalid or tampered tokens', () => {
      expect(() => {
        authService.verifyToken('invalid.token.signature');
      }).toThrow();
    });
  });

  describe('POST /api/auth/dev-login', () => {
    it('should log in or create a user and return a valid JWT token', async () => {
      const res = await request(app)
        .post('/api/auth/dev-login')
        .send({
          email: 'citizen@civictrack.org',
          name: 'Priya Patel',
          role: 'USER'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user.email).toBe('citizen@civictrack.org');
      expect(res.body.data.user.role).toBe('USER');
    });

    it('should support admin dev-login', async () => {
      const res = await request(app)
        .post('/api/auth/dev-login')
        .send({
          email: 'admin@civictrack.org',
          name: 'Chief Auditor',
          role: 'ADMIN'
        });

      expect(res.status).toBe(200);
      expect(res.body.data.user.role).toBe('ADMIN');
    });
  });

  describe('POST /api/auth/google', () => {
    it('should verify mock Google token and return user profile and JWT', async () => {
      const res = await request(app)
        .post('/api/auth/google')
        .send({
          idToken: 'mock-google-token:priya.verma@civictrack.org:Priya Verma:google_987654'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('priya.verma@civictrack.org');
      expect(res.body.data.user.name).toBe('Priya Verma');
      expect(res.body.data).toHaveProperty('token');
    });

    it('should return 400 when idToken / credential is missing', async () => {
      const res = await request(app)
        .post('/api/auth/google')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('BAD_REQUEST');
    });
  });

  describe('GET /api/auth/me (Protected Route)', () => {
    it('should return the current user profile when supplied a valid Bearer token', async () => {
      const user = await User.create({
        name: 'Authenticated User',
        email: 'authenticated@civictrack.org',
        role: 'USER'
      });
      const token = authService.generateToken(user);

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('authenticated@civictrack.org');
    });

    it('should return 401 Unauthorized when Authorization header is missing', async () => {
      const res = await request(app).get('/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should return 401 Unauthorized when Bearer token is malformed', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token-value');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should acknowledge logout successfully', async () => {
      const res = await request(app).post('/api/auth/logout');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
