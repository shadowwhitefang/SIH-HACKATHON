/**
 * Evidence Controller
 * Handles HTTP requests for evidence uploads, project evidence galleries, and secure deletions.
 */

const evidenceService = require('../services/evidenceService');
const { sendSuccess } = require('../utils/apiResponse');

/**
 * Uploads new project evidence (image or document).
 * POST /api/projects/:id/evidence
 */
async function uploadEvidence(req, res, next) {
  try {
    const projectId = req.params.id;
    const file = req.file;
    const data = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      source: req.body.source,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      captureDate: req.body.captureDate
    };

    const evidence = await evidenceService.createEvidence(projectId, file, data, req.user);
    return sendSuccess(res, evidence, 201);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves all evidence associated with a project.
 * GET /api/projects/:id/evidence
 */
async function listProjectEvidence(req, res, next) {
  try {
    const projectId = req.params.id;
    const filters = {
      type: req.query.type,
      source: req.query.source,
      status: req.query.status
    };

    const pagination = {
      page: req.query.page,
      limit: req.query.limit
    };

    const result = await evidenceService.getEvidenceByProject(projectId, filters, pagination);

    return sendSuccess(res, result.evidence, 200, {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.pages
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves a single evidence document by its ID.
 * GET /api/evidence/:id
 */
async function getEvidenceById(req, res, next) {
  try {
    const evidence = await evidenceService.getEvidenceById(req.params.id);
    return sendSuccess(res, evidence, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * Deletes an evidence item (restricted to owner or admin).
 * DELETE /api/evidence/:id
 */
async function deleteEvidence(req, res, next) {
  try {
    const result = await evidenceService.deleteEvidence(req.params.id, req.user);
    return sendSuccess(res, result, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadEvidence,
  listProjectEvidence,
  getEvidenceById,
  deleteEvidence
};
