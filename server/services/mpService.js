/**
 * MP Service
 * Handles business logic, database queries, search, filtering, and pagination for MPs.
 */

const mongoose = require('mongoose');
const MP = require('../models/MP');
const FundAllocation = require('../models/FundAllocation');
const Project = require('../models/Project');
const { NotFoundError } = require('../utils/errors');
const { calculateRemaining, calculateUtilization } = require('./financialService');

async function listMPs(filters = {}, pagination = { page: 1, limit: 20 }) {
  const query = {};

  // Text / regex search across name, constituency, state, and party
  if (filters.search && typeof filters.search === 'string' && filters.search.trim()) {
    const searchRegex = new RegExp(filters.search.trim(), 'i');
    query.$or = [
      { name: searchRegex },
      { constituency: searchRegex },
      { state: searchRegex },
      { party: searchRegex }
    ];
  }

  // Exact / case-insensitive filters
  if (filters.state) {
    query.state = new RegExp(`^${filters.state.trim()}$`, 'i');
  }

  if (filters.constituency) {
    query.constituency = new RegExp(`^${filters.constituency.trim()}$`, 'i');
  }

  if (filters.party) {
    query.party = new RegExp(`^${filters.party.trim()}$`, 'i');
  }

  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  const [total, mps] = await Promise.all([
    MP.countDocuments(query),
    MP.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean()
  ]);

  const transformedData = mps.map(doc => ({
    id: doc.mpId,
    mpId: doc.mpId,
    name: doc.name,
    constituency: doc.constituency,
    state: doc.state,
    party: doc.party,
    dataSource: doc.dataSource,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  }));

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

async function getMPById(id) {
  if (!id) {
    throw new NotFoundError('MP ID is required');
  }

  // Query either by mpId or MongoDB _id
  let query = { mpId: id };
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { $or: [{ mpId: id }, { _id: id }] };
  }

  const mp = await MP.findOne(query).lean();
  if (!mp) {
    throw new NotFoundError(`MP with ID '${id}' not found`);
  }

  // Fetch associated fund allocations and project statistics
  const [allocations, projects] = await Promise.all([
    FundAllocation.find({ mpId: mp.mpId }).sort({ financialYear: -1 }).lean(),
    Project.find({ mpId: mp.mpId }).lean()
  ]);

  const totalAllocated = allocations.reduce((sum, a) => sum + (Number(a.allocatedAmount) || 0), 0);
  const totalSpent = allocations.reduce((sum, a) => sum + (Number(a.spentAmount) || 0), 0);

  const formattedAllocations = allocations.map(a => ({
    id: a.allocationId,
    allocationId: a.allocationId,
    financialYear: a.financialYear,
    allocatedAmount: a.allocatedAmount,
    releasedAmount: a.releasedAmount,
    spentAmount: a.spentAmount,
    remainingAmount: calculateRemaining(a.allocatedAmount, a.spentAmount),
    utilizationPercentage: calculateUtilization(a.allocatedAmount, a.spentAmount),
    dataSource: a.dataSource
  }));

  const projectSummary = {
    totalProjects: projects.length,
    completed: projects.filter(p => p.status === 'COMPLETED').length,
    ongoing: projects.filter(p => p.status === 'ONGOING').length,
    delayed: projects.filter(p => p.status === 'DELAYED').length,
    needsAttention: projects.filter(p => p.status === 'NEEDS_ATTENTION').length
  };

  return {
    id: mp.mpId,
    mpId: mp.mpId,
    name: mp.name,
    constituency: mp.constituency,
    state: mp.state,
    party: mp.party,
    dataSource: mp.dataSource,
    financialSummary: {
      totalAllocated,
      totalSpent,
      remainingAmount: calculateRemaining(totalAllocated, totalSpent),
      utilizationPercentage: calculateUtilization(totalAllocated, totalSpent)
    },
    fundAllocations: formattedAllocations,
    projectSummary,
    createdAt: mp.createdAt,
    updatedAt: mp.updatedAt
  };
}

module.exports = {
  listMPs,
  getMPById
};
