/**
 * Integration Test for Database Seeder
 */

const { setupTestDB, teardownTestDB, clearCollections } = require('./setup');
const { seedDatabase } = require('../seed/seed');
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
});

describe('Database Seeder Verification', () => {
  it('should cleanly insert all seed data (MPs, Allocations, Projects) into MongoDB', async () => {
    const result = await seedDatabase();

    expect(result.mpsCount).toBe(8);
    expect(result.allocationsCount).toBe(9);
    expect(result.projectsCount).toBe(10);

    const [mpCount, allocCount, projCount] = await Promise.all([
      MP.countDocuments(),
      FundAllocation.countDocuments(),
      Project.countDocuments()
    ]);

    expect(mpCount).toBe(8);
    expect(allocCount).toBe(9);
    expect(projCount).toBe(10);

    // Verify MP record integrity
    const sampleMP = await MP.findOne({ mpId: 'mp_patna_sahib' });
    expect(sampleMP).not.toBeNull();
    expect(sampleMP.name).toBe('Ravi Shankar Prasad');
    expect(sampleMP.dataSource.type).toBe('demo');

    // Verify Project record integrity
    const sampleProj = await Project.findOne({ projectId: 'proj_001' });
    expect(sampleProj).not.toBeNull();
    expect(sampleProj.status).toBe('DELAYED');
    expect(sampleProj.allocatedAmount).toBe(10000000);
    expect(sampleProj.spentAmount).toBe(2500000);
  });
});
