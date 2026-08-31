/**
 * Project Adapter
 * Decouples Developer 2's Intelligence and Evidence services from Developer 1's core data implementations.
 * Interfaces safely with the Project Mongoose model or mock fallback.
 */

const Project = require('../models/Project');

const MOCK_PROJECT_FALLBACK = {
  id: 'project_001',
  projectId: 'project_001',
  name: 'Road Construction & Drainage',
  mpId: 'mp_101',
  category: 'Road',
  location: 'North Ward',
  constituency: 'Varanasi',
  state: 'Uttar Pradesh',
  financialYear: '2025–26',
  allocatedAmount: 10000000,
  spentAmount: 2500000,
  progressPercent: 30,
  startDate: new Date('2026-01-01T00:00:00.000Z'),
  expectedCompletionDate: new Date('2026-06-30T00:00:00.000Z'),
  status: 'ONGOING',
  lastUpdatedAt: new Date('2026-07-10T00:00:00.000Z')
};

/**
 * Fetches a project by its unique identifier.
 * @param {String} projectId - Unique project identifier
 * @returns {Promise<Object|null>} Project contract object
 */
async function getProjectById(projectId) {
  try {
    const project = await Project.findOne({ projectId }).lean();
    if (project) {
      return {
        ...project,
        id: project.projectId
      };
    }
  } catch (error) {
    // If DB is unavailable and mock matches
    if (projectId === MOCK_PROJECT_FALLBACK.id) {
      return MOCK_PROJECT_FALLBACK;
    }
  }
  return null;
}

/**
 * Fetches all projects matching an optional filter.
 * @param {Object} [filter] - Mongo filter object
 * @returns {Promise<Array<Object>>} List of projects
 */
async function getAllProjects(filter = {}) {
  try {
    const projects = await Project.find(filter).lean();
    return projects.map(p => ({
      ...p,
      id: p.projectId
    }));
  } catch (error) {
    return [MOCK_PROJECT_FALLBACK];
  }
}

/**
 * Checks whether a project exists.
 * @param {String} projectId - Unique project identifier
 * @returns {Promise<Boolean>}
 */
async function projectExists(projectId) {
  try {
    const count = await Project.countDocuments({ projectId });
    return count > 0;
  } catch (error) {
    return projectId === MOCK_PROJECT_FALLBACK.id;
  }
}

module.exports = {
  getProjectById,
  getAllProjects,
  projectExists,
  MOCK_PROJECT_FALLBACK
};
