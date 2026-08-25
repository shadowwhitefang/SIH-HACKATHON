/**
 * Project Service
 * Handles business logic, database queries, CRUD operations, filtering, search, and pagination.
 */

const mongoose = require('mongoose');
const Project = require('../models/Project');
const MP = require('../models/MP');
const { NotFoundError, ConflictError, ValidationError } = require('../utils/errors');
const { calculateRemaining, calculateUtilization } = require('./financialService');

function formatProjectResponse(doc) {
  if (!doc) return null;
  const raw = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  const allocated = Number(raw.allocatedAmount) || 0;
  const spent = Number(raw.spentAmount) || 0;

  return {
    id: raw.projectId || raw._id?.toString(),
    projectId: raw.projectId,
    name: raw.name,
    mpId: raw.mpId,
    category: raw.category,
    location: raw.location,
    constituency: raw.constituency || null,
    state: raw.state || null,
    financialYear: raw.financialYear || null,
    allocatedAmount: allocated,
    spentAmount: spent,
    remainingAmount: calculateRemaining(allocated, spent),
    utilizationPercentage: calculateUtilization(allocated, spent),
    progressPercent: Number(raw.progressPercent) || 0,
    startDate: raw.startDate ? new Date(raw.startDate).toISOString() : null,
    expectedCompletionDate: raw.expectedCompletionDate ? new Date(raw.expectedCompletionDate).toISOString() : null,
    status: raw.status,
    lastUpdatedAt: raw.lastUpdatedAt ? new Date(raw.lastUpdatedAt).toISOString() : (raw.updatedAt ? new Date(raw.updatedAt).toISOString() : new Date().toISOString()),
    dataSource: raw.dataSource || { type: 'demo', name: 'CivicTrack Demo Dataset', url: null, retrievedAt: new Date().toISOString() },
    createdAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : undefined,
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt).toISOString() : undefined
  };
}

async function listProjects(filters = {}, pagination = { page: 1, limit: 20 }) {
  const query = {};

  // Text / regex search across name, category, and location
  if (filters.search && typeof filters.search === 'string' && filters.search.trim()) {
    const searchRegex = new RegExp(filters.search.trim(), 'i');
    query.$or = [
      { name: searchRegex },
      { category: searchRegex },
      { location: searchRegex }
    ];
  }

  // Exact / regex filters
  if (filters.status) {
    query.status = filters.status.trim().toUpperCase();
  }

  if (filters.category) {
    query.category = new RegExp(`^${filters.category.trim()}$`, 'i');
  }

  if (filters.mpId) {
    query.mpId = filters.mpId.trim();
  }

  if (filters.constituency) {
    query.constituency = new RegExp(`^${filters.constituency.trim()}$`, 'i');
  }

  if (filters.state) {
    query.state = new RegExp(`^${filters.state.trim()}$`, 'i');
  }

  if (filters.financialYear) {
    query.financialYear = filters.financialYear.trim();
  }

  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  const [total, projects] = await Promise.all([
    Project.countDocuments(query),
    Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
  ]);

  const transformedData = projects.map(p => formatProjectResponse(p));
  const pages = Math.ceil(total / limit) || 1;

  return {
    data: transformedData,
    pagination: {
      page,
      limit,
      total,
      pages
    }
  };
}

async function getProjectById(id) {
  if (!id) {
    throw new NotFoundError('Project ID is required');
  }

  let query = { projectId: id };
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { $or: [{ projectId: id }, { _id: id }] };
  }

  const project = await Project.findOne(query).lean();
  if (!project) {
    throw new NotFoundError(`Project with ID '${id}' not found`);
  }

  return formatProjectResponse(project);
}

async function createProject(projectData) {
  // Check for duplicate projectId
  const existingProject = await Project.findOne({ projectId: projectData.projectId }).lean();
  if (existingProject) {
    throw new ConflictError(`Project with ID '${projectData.projectId}' already exists`);
  }

  // Verify associated MP or populate constituency/state if available
  const associatedMP = await MP.findOne({ mpId: projectData.mpId }).lean();
  if (associatedMP) {
    if (!projectData.constituency) {
      projectData.constituency = associatedMP.constituency;
    }
    if (!projectData.state) {
      projectData.state = associatedMP.state;
    }
  }

  const newProject = new Project({
    ...projectData,
    lastUpdatedAt: new Date()
  });

  const savedProject = await newProject.save();
  return formatProjectResponse(savedProject);
}

async function updateProject(id, updateData) {
  if (!id) {
    throw new NotFoundError('Project ID is required');
  }

  let query = { projectId: id };
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { $or: [{ projectId: id }, { _id: id }] };
  }

  const project = await Project.findOne(query);
  if (!project) {
    throw new NotFoundError(`Project with ID '${id}' not found`);
  }

  // Prevent modifying projectId
  delete updateData.projectId;
  delete updateData._id;

  // Apply updates
  Object.keys(updateData).forEach(key => {
    project[key] = updateData[key];
  });

  project.lastUpdatedAt = new Date();

  const updatedProject = await project.save();
  return formatProjectResponse(updatedProject);
}

module.exports = {
  formatProjectResponse,
  listProjects,
  getProjectById,
  createProject,
  updateProject
};
