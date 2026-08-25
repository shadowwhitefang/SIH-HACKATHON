/**
 * Financial Calculation Service
 * Reusable, pure mathematical service for financial calculations.
 * Ensures consistent remaining funds and utilization rate calculations across the entire application.
 */

/**
 * Calculates remaining funds from allocated and spent amounts.
 * @param {number} allocated - Total allocated amount
 * @param {number} spent - Total spent amount
 * @returns {number} Remaining amount (allocated - spent)
 */
function calculateRemaining(allocated, spent) {
  const safeAllocated = typeof allocated === 'number' && Number.isFinite(allocated) && allocated >= 0 ? allocated : 0;
  const safeSpent = typeof spent === 'number' && Number.isFinite(spent) && spent >= 0 ? spent : 0;
  return Math.max(0, safeAllocated - safeSpent);
}

/**
 * Calculates fund utilization percentage.
 * @param {number} allocated - Total allocated amount
 * @param {number} spent - Total spent amount
 * @param {number} decimalPlaces - Rounding precision (default 2)
 * @returns {number} Utilization percentage (0 - 100+)
 */
function calculateUtilization(allocated, spent, decimalPlaces = 2) {
  const safeAllocated = typeof allocated === 'number' && Number.isFinite(allocated) && allocated > 0 ? allocated : 0;
  const safeSpent = typeof spent === 'number' && Number.isFinite(spent) && spent >= 0 ? spent : 0;

  if (safeAllocated === 0) {
    return 0;
  }

  const rawPercent = (safeSpent / safeAllocated) * 100;
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(rawPercent * factor) / factor;
}

/**
 * Enriches a project document/object with computed financial fields.
 * @param {Object} project - Plain project object or Mongoose document
 * @returns {Object} Project object with remainingAmount and utilizationPercentage
 */
function enrichProjectFinancials(project) {
  if (!project) return null;

  const obj = typeof project.toJSON === 'function' ? project.toJSON() : { ...project };
  const allocated = Number(obj.allocatedAmount) || 0;
  const spent = Number(obj.spentAmount) || 0;

  obj.remainingAmount = calculateRemaining(allocated, spent);
  obj.utilizationPercentage = calculateUtilization(allocated, spent);

  return obj;
}

module.exports = {
  calculateRemaining,
  calculateUtilization,
  enrichProjectFinancials
};
