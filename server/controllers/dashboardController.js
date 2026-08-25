/**
 * Dashboard Controller
 * Thin controller returning aggregated data for the CivicTrack dashboard.
 */

const dashboardService = require('../services/dashboardService');
const { sendSuccess } = require('../utils/apiResponse');

async function getDashboard(req, res, next) {
  try {
    const { financialYear } = req.query;
    const summary = await dashboardService.getDashboardSummary(financialYear);
    return sendSuccess(res, summary, 200);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getDashboard
};
