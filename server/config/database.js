/**
 * MongoDB Connection and Lifecycle Configuration
 * Automatically connects to local/remote MongoDB, or falls back to an embedded in-memory database.
 * Seeds initial demo data, evaluates attention alerts, and initializes evidence library.
 */

const mongoose = require('mongoose');

let mongoMemoryServer = null;

async function seedInitialData() {
  try {
    const MP = require('../models/MP');
    const FundAllocation = require('../models/FundAllocation');
    const Project = require('../models/Project');
    const Alert = require('../models/Alert');
    const Evidence = require('../models/Evidence');
    const User = require('../models/User');
    const seedData = require('../seed/seedData');
    const { evaluateAllProjects } = require('../services/alertService');

    const count = await MP.countDocuments();
    if (count === 0) {
      await MP.insertMany(seedData.mps);
      await FundAllocation.insertMany(seedData.fundAllocations);
      await Project.insertMany(seedData.projects);

      // Create Admin & Auditor demo users
      await User.create([
        {
          googleId: 'google_demo_chief_auditor',
          email: 'chief.auditor@civictrack.gov.in',
          name: 'Dr. Ramesh Chandra',
          role: 'ADMIN',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        },
        {
          googleId: 'google_demo_citizen_user',
          email: 'citizen.patna@civictrack.gov.in',
          name: 'Aakash Verma',
          role: 'USER',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        }
      ]);

      // Seed Initial Verified Evidence Records
      await Evidence.create([
        {
          evidenceId: 'ev_demo_001',
          projectId: 'proj_001',
          title: 'Road Foundation Sub-base Inspection Photo',
          description: 'Geotagged physical ground capture verifying trench depth and gravel layer before paving.',
          type: 'PHOTO',
          source: 'CITIZEN',
          url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
          publicId: 'civictrack/evidence/demo_001',
          mimeType: 'image/jpeg',
          fileSize: 2450192,
          metadata: {
            location: {
              latitude: 25.6100,
              longitude: 85.1415
            },
            captureDate: new Date('2026-06-15T10:30:00Z')
          },
          uploaderEmail: 'citizen.patna@civictrack.gov.in'
        },
        {
          evidenceId: 'ev_demo_002',
          projectId: 'proj_002',
          title: 'CHC Facility Structural Assessment Report',
          description: 'Third-party structural audit report assessing civil renovation delays and ceiling dampness.',
          type: 'INSPECTION_REPORT',
          source: 'OFFICIAL',
          url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
          publicId: 'civictrack/evidence/demo_002',
          mimeType: 'application/pdf',
          fileSize: 1845200,
          metadata: {
            location: {
              latitude: 26.1209,
              longitude: 85.3647
            },
            captureDate: new Date('2026-07-20T14:15:00Z')
          },
          uploaderEmail: 'chief.auditor@civictrack.gov.in'
        },
        {
          evidenceId: 'ev_demo_003',
          projectId: 'proj_004',
          title: 'Smart Classroom Commissioning Utilization Certificate',
          description: 'Official utilization and completion certificate signed by District Education Officer.',
          type: 'UTILIZATION_CERTIFICATE',
          source: 'OFFICIAL',
          url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
          publicId: 'civictrack/evidence/demo_003',
          mimeType: 'image/jpeg',
          fileSize: 3120400,
          metadata: {
            location: {
              latitude: 25.5941,
              longitude: 85.1834
            },
            captureDate: new Date('2025-10-05T09:00:00Z')
          },
          uploaderEmail: 'chief.auditor@civictrack.gov.in'
        }
      ]);

      // Automatically evaluate all projects to populate Attention Center alerts
      await evaluateAllProjects();
      console.log(`[CivicTrack DB] Auto-seeded 8 MPs, 9 Allocations, 10 Projects, 3 Evidence Records, and evaluated all Attention Alerts.`);
    }
  } catch (err) {
    console.warn(`[CivicTrack DB] Seeding warning:`, err.message);
  }
}

async function connectDB(customUri = null) {
  const uri = customUri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/civictrack';

  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    // Attempt connecting to local/provided MongoDB with a 2.5-second timeout
    const conn = await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 2500
    });

    if (process.env.NODE_ENV !== 'test') {
      console.log(`[CivicTrack DB] Connected successfully to MongoDB host: ${conn.connection.host}`);
    }

    await seedInitialData();
    return conn.connection;
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn(`[CivicTrack DB] Local MongoDB not reachable (${error.message}). Initializing embedded memory database for demo...`);
    }

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();

      const conn = await mongoose.connect(memoryUri, { autoIndex: true });
      console.log(`[CivicTrack DB] Embedded database started and connected successfully!`);

      await seedInitialData();
      return conn.connection;
    } catch (memError) {
      console.error(`[CivicTrack DB] Failed to start embedded database:`, memError.message);
      throw memError;
    }
  }
}

async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
}

module.exports = {
  connectDB,
  disconnectDB
};
