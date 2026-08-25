/**
 * Unit Tests for Financial Calculation Service
 */

const {
  calculateRemaining,
  calculateUtilization,
  enrichProjectFinancials
} = require('../services/financialService');

describe('Financial Service — Pure Mathematical Functions', () => {
  describe('calculateRemaining', () => {
    it('should correctly calculate remaining funds for normal inputs', () => {
      expect(calculateRemaining(10000000, 2500000)).toBe(7500000);
      expect(calculateRemaining(5000, 5000)).toBe(0);
    });

    it('should return 0 when spent exceeds allocated', () => {
      expect(calculateRemaining(5000, 7000)).toBe(0);
    });

    it('should handle zero, null, undefined, or negative values safely', () => {
      expect(calculateRemaining(0, 0)).toBe(0);
      expect(calculateRemaining(null, 500)).toBe(0);
      expect(calculateRemaining(500, null)).toBe(500);
      expect(calculateRemaining(undefined, undefined)).toBe(0);
      expect(calculateRemaining(-1000, 500)).toBe(0);
      expect(calculateRemaining(1000, -500)).toBe(1000);
    });
  });

  describe('calculateUtilization', () => {
    it('should correctly compute utilization percentage', () => {
      expect(calculateUtilization(10000000, 2500000)).toBe(25);
      expect(calculateUtilization(12400000, 8700000)).toBe(70.16);
      expect(calculateUtilization(5000, 5000)).toBe(100);
    });

    it('should return 0 when allocated is 0 to avoid division by zero', () => {
      expect(calculateUtilization(0, 5000)).toBe(0);
      expect(calculateUtilization(0, 0)).toBe(0);
    });

    it('should safely handle negative or non-numeric inputs', () => {
      expect(calculateUtilization(-1000, 500)).toBe(0);
      expect(calculateUtilization(1000, -500)).toBe(0);
      expect(calculateUtilization(null, undefined)).toBe(0);
    });
  });

  describe('enrichProjectFinancials', () => {
    it('should append remainingAmount and utilizationPercentage to a project', () => {
      const project = {
        projectId: 'p1',
        allocatedAmount: 1000,
        spentAmount: 250
      };

      const enriched = enrichProjectFinancials(project);
      expect(enriched.remainingAmount).toBe(750);
      expect(enriched.utilizationPercentage).toBe(25);
    });

    it('should return null for null input', () => {
      expect(enrichProjectFinancials(null)).toBeNull();
    });
  });
});
