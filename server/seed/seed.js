/**
 * Database Seeder Script
 * Inserts curated demo records for MPs, FundAllocations, and Projects into MongoDB.
 * Run with: npm run seed
 */

const dotenv = require('dotenv');
dotenv.config();

const { connectDB, disconnectDB } = require('../config/database');
const MP = require('../models/MP');
const FundAllocation = require('../models/FundAllocation');
const Project = require('../models/Project');
const { mps, fundAllocations, projects } = require('./seedData');

async function seedDatabase(customUri = null) {
  try {
    console.log('[CivicTrack Seeder] Connecting to database...');
    await connectDB(customUri);

    console.log('[CivicTrack Seeder] Clearing existing core records...');
    await Promise.all([
      MP.deleteMany({}),
      FundAllocation.deleteMany({}),
      Project.deleteMany({})
    ]);

    console.log(`[CivicTrack Seeder] Inserting ${mps.length} MPs...`);
    const insertedMPs = await MP.insertMany(mps);

    console.log(`[CivicTrack Seeder] Inserting ${fundAllocations.length} Fund Allocations...`);
    const insertedAllocations = await FundAllocation.insertMany(fundAllocations);

    console.log(`[CivicTrack Seeder] Inserting ${projects.length} Projects...`);
    const insertedProjects = await Project.insertMany(projects);

    console.log('----------------------------------------------------');
    console.log('[CivicTrack Seeder] Database seeded successfully!');
    console.log(`- MPs inserted: ${insertedMPs.length}`);
    console.log(`- Fund Allocations inserted: ${insertedAllocations.length}`);
    console.log(`- Projects inserted: ${insertedProjects.length}`);
    console.log('----------------------------------------------------');

    return {
      mpsCount: insertedMPs.length,
      allocationsCount: insertedAllocations.length,
      projectsCount: insertedProjects.length
    };
  } catch (error) {
    console.error('[CivicTrack Seeder] Seeding error:', error.message);
    throw error;
  } finally {
    if (require.main === module) {
      await disconnectDB();
      process.exit(0);
    }
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
