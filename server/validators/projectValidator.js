/**
 * Project Validator
 * Validates payloads for project creation, partial updates, and query parameters.
 */

const { ValidationError } = require('../utils/errors');

const VALID_STATUSES = ['COMPLETED', 'ONGOING', 'DELAYED', 'NEEDS_ATTENTION', 'PLANNED'];
const VALID_DATA_SOURCES = ['official', 'curated', 'demo'];

function isValidDate(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

function validateCreateProject(data) {
  const errors = {};

  if (!data.projectId || typeof data.projectId !== 'string' || !data.projectId.trim()) {
    errors.projectId = 'projectId is required and must be a non-empty string';
  }

  if (!data.mpId || typeof data.mpId !== 'string' || !data.mpId.trim()) {
    errors.mpId = 'mpId is required and must be a valid MP identifier';
  }

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.name = 'name is required and must be a non-empty string';
  }

  if (!data.category || typeof data.category !== 'string' || !data.category.trim()) {
    errors.category = 'category is required (e.g. Road, Healthcare, Water Supply, Education, Sanitation)';
  }

  if (!data.location || typeof data.location !== 'string' || !data.location.trim()) {
    errors.location = 'location is required';
  }

  // Allocated Amount
  if (data.allocatedAmount === undefined || data.allocatedAmount === null || typeof data.allocatedAmount !== 'number' || isNaN(data.allocatedAmount) || data.allocatedAmount < 0) {
    errors.allocatedAmount = 'allocatedAmount is required and must be a non-negative number';
  }

  // Spent Amount (optional on create, defaults to 0)
  if (data.spentAmount !== undefined && data.spentAmount !== null) {
    if (typeof data.spentAmount !== 'number' || isNaN(data.spentAmount) || data.spentAmount < 0) {
      errors.spentAmount = 'spentAmount must be a non-negative number';
    }
  }

  // Progress Percent (optional on create, defaults to 0)
  if (data.progressPercent !== undefined && data.progressPercent !== null) {
    if (typeof data.progressPercent !== 'number' || isNaN(data.progressPercent) || data.progressPercent < 0 || data.progressPercent > 100) {
      errors.progressPercent = 'progressPercent must be a number between 0 and 100';
    }
  }

  // Dates
  if (!data.startDate || !isValidDate(data.startDate)) {
    errors.startDate = 'startDate is required and must be a valid date';
  }

  if (!data.expectedCompletionDate || !isValidDate(data.expectedCompletionDate)) {
    errors.expectedCompletionDate = 'expectedCompletionDate is required and must be a valid date';
  }

  if (isValidDate(data.startDate) && isValidDate(data.expectedCompletionDate)) {
    if (new Date(data.expectedCompletionDate) < new Date(data.startDate)) {
      errors.expectedCompletionDate = 'expectedCompletionDate cannot be earlier than startDate';
    }
  }

  // Status
  if (data.status !== undefined && data.status !== null) {
    if (!VALID_STATUSES.includes(data.status)) {
      errors.status = `status must be one of: ${VALID_STATUSES.join(', ')}`;
    }
  }

  // Data Source Provenance
  if (data.dataSource !== undefined && data.dataSource !== null) {
    if (typeof data.dataSource !== 'object' || data.dataSource === null) {
      errors.dataSource = 'dataSource must be an object';
    } else if (data.dataSource.type && !VALID_DATA_SOURCES.includes(data.dataSource.type)) {
      errors.dataSource = `dataSource.type must be one of: ${VALID_DATA_SOURCES.join(', ')}`;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Project validation failed', errors);
  }
}

function validateUpdateProject(data) {
  const errors = {};

  // Check if body is empty
  if (!data || Object.keys(data).length === 0) {
    throw new ValidationError('Update payload cannot be empty');
  }

  if (data.projectId !== undefined) {
    errors.projectId = 'projectId cannot be modified';
  }

  if (data.name !== undefined && (typeof data.name !== 'string' || !data.name.trim())) {
    errors.name = 'name must be a non-empty string';
  }

  if (data.category !== undefined && (typeof data.category !== 'string' || !data.category.trim())) {
    errors.category = 'category must be a non-empty string';
  }

  if (data.location !== undefined && (typeof data.location !== 'string' || !data.location.trim())) {
    errors.location = 'location must be a non-empty string';
  }

  if (data.allocatedAmount !== undefined) {
    if (typeof data.allocatedAmount !== 'number' || isNaN(data.allocatedAmount) || data.allocatedAmount < 0) {
      errors.allocatedAmount = 'allocatedAmount must be a non-negative number';
    }
  }

  if (data.spentAmount !== undefined) {
    if (typeof data.spentAmount !== 'number' || isNaN(data.spentAmount) || data.spentAmount < 0) {
      errors.spentAmount = 'spentAmount must be a non-negative number';
    }
  }

  if (data.progressPercent !== undefined) {
    if (typeof data.progressPercent !== 'number' || isNaN(data.progressPercent) || data.progressPercent < 0 || data.progressPercent > 100) {
      errors.progressPercent = 'progressPercent must be a number between 0 and 100';
    }
  }

  if (data.startDate !== undefined && !isValidDate(data.startDate)) {
    errors.startDate = 'startDate must be a valid date';
  }

  if (data.expectedCompletionDate !== undefined && !isValidDate(data.expectedCompletionDate)) {
    errors.expectedCompletionDate = 'expectedCompletionDate must be a valid date';
  }

  if (data.status !== undefined && !VALID_STATUSES.includes(data.status)) {
    errors.status = `status must be one of: ${VALID_STATUSES.join(', ')}`;
  }

  if (data.dataSource !== undefined && data.dataSource !== null) {
    if (typeof data.dataSource !== 'object') {
      errors.dataSource = 'dataSource must be an object';
    } else if (data.dataSource.type && !VALID_DATA_SOURCES.includes(data.dataSource.type)) {
      errors.dataSource = `dataSource.type must be one of: ${VALID_DATA_SOURCES.join(', ')}`;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Project update validation failed', errors);
  }
}

function parsePaginationParams(query) {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  // Restrict limit to avoid memory strain (max 100)
  if (isNaN(limit) || limit < 1) {
    limit = 20;
  } else if (limit > 100) {
    limit = 100;
  }

  return { page, limit };
}

module.exports = {
  VALID_STATUSES,
  VALID_DATA_SOURCES,
  validateCreateProject,
  validateUpdateProject,
  parsePaginationParams
};
