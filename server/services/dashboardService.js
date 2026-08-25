/**
 * Dashboard Aggregation Service
 * Dynamically aggregates project metrics, fund utilization, status breakdown, and KPIs from the database.
 * Does NOT hardcode mock values or calculate speculative attention scores.
 */

const Project = require('../models/Project');
const FundAllocation = require('../models/FundAllocation');
const { calculateRemaining, calculateUtilization } = require('./financialService');

async function getDashboardSummary(financialYear = null) {
  const projectQuery = {};
  const fundQuery = {};

  if (financialYear && typeof financialYear === 'string' && financialYear.trim() && financialYear.trim() !== 'All') {
    projectQuery.financialYear = financialYear.trim();
    fundQuery.financialYear = financialYear.trim();
  }

  const [projects, fundAllocations] = await Promise.all([
    Project.find(projectQuery).lean(),
    FundAllocation.find(fundQuery).lean()
  ]);

  // Aggregate project statistics
  const totalProjects = projects.length;
  let completedProjects = 0;
  let activeProjects = 0; // ONGOING
  let delayedProjects = 0;
  let attentionProjectsCount = 0;
  let plannedProjects = 0;

  let projectAllocatedSum = 0;
  let projectSpentSum = 0;

  projects.forEach(p => {
    projectAllocatedSum += Number(p.allocatedAmount) || 0;
    projectSpentSum += Number(p.spentAmount) || 0;

    switch (p.status) {
      case 'COMPLETED':
        completedProjects++;
        break;
      case 'ONGOING':
        activeProjects++;
        break;
      case 'DELAYED':
        delayedProjects++;
        break;
      case 'NEEDS_ATTENTION':
        attentionProjectsCount++;
        break;
      case 'PLANNED':
        plannedProjects++;
        break;
      default:
        break;
    }
  });

  // Calculate fund allocation aggregates from FundAllocation records (or fallback to projects sum if no allocations exist)
  let totalAllocation = fundAllocations.reduce((sum, f) => sum + (Number(f.allocatedAmount) || 0), 0);
  let totalExpenditure = fundAllocations.reduce((sum, f) => sum + (Number(f.spentAmount) || 0), 0);

  if (fundAllocations.length === 0 && projects.length > 0) {
    totalAllocation = projectAllocatedSum;
    totalExpenditure = projectSpentSum;
  }

  const remainingAmount = calculateRemaining(totalAllocation, totalExpenditure);
  const utilizationPercentage = calculateUtilization(totalAllocation, totalExpenditure);

  // Status breakdown array for charts
  const calcPercent = (count) => (totalProjects > 0 ? Math.round((count / totalProjects) * 1000) / 10 : 0);

  const projectStatusBreakdown = [
    { status: 'Completed', count: completedProjects, percentage: calcPercent(completedProjects) },
    { status: 'Ongoing', count: activeProjects, percentage: calcPercent(activeProjects) },
    { status: 'Delayed', count: delayedProjects, percentage: calcPercent(delayedProjects) },
    { status: 'Needs Attention', count: attentionProjectsCount, percentage: calcPercent(attentionProjectsCount) }
  ];

  if (plannedProjects > 0) {
    projectStatusBreakdown.push({
      status: 'Planned',
      count: plannedProjects,
      percentage: calcPercent(plannedProjects)
    });
  }

  const fundUtilizationBreakdown = [
    { label: 'Allocated', amount: totalAllocation },
    { label: 'Spent', amount: totalExpenditure },
    { label: 'Remaining', amount: remainingAmount }
  ];

  return {
    financialYear: financialYear || 'All Years',
    kpis: {
      totalAllocation,
      totalExpenditure,
      remainingAmount,
      utilizationPercentage,
      totalProjects,
      activeProjects,
      completedProjects,
      delayedProjects,
      attentionProjectsCount
    },
    projectStatusBreakdown,
    fundUtilizationBreakdown
  };
}

module.exports = {
  getDashboardSummary
};
