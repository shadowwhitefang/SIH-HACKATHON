/**
 * Evidence Service
 * Handles evidence uploads, metadata enrichment, retrieval, and access-controlled deletion.
 */

const Evidence = require('../models/Evidence');
const cloudinaryService = require('./cloudinaryService');
const projectAdapter = require('./projectAdapter');
const { NotFoundError, ForbiddenError, BadRequestError } = require('../utils/errors');

function generateEvidenceId() {
  const timestamp = Date.now().toString(36);
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `ev_${timestamp}_${randomSuffix}`;
}

/**
 * Creates and uploads new evidence for a project.
 * @param {String} projectId - Target project ID
 * @param {Object} file - Multer file object
 * @param {Object} data - Metadata payload (title, description, type, source, latitude, longitude, captureDate)
 * @param {Object} user - Authenticated user object
 * @returns {Promise<Object>} Created evidence record
 */
async function createEvidence(projectId, file, data = {}, user = null) {
  if (!file || !file.buffer) {
    throw new BadRequestError('Evidence file is required');
  }

  if (!data.title || data.title.trim().length === 0) {
    throw new BadRequestError('Evidence title is required');
  }

  // Validate that project exists in system
  const exists = await projectAdapter.projectExists(projectId);
  if (!exists) {
    throw new NotFoundError(`Project with ID '${projectId}' not found`);
  }

  // Upload to Cloudinary
  const uploadResult = await cloudinaryService.uploadBuffer(file.buffer, {
    folder: `civictrack/evidence/${projectId}`,
    filename: file.originalname,
    resourceType: file.mimetype.startsWith('image/') ? 'image' : 'raw'
  });

  let location = null;
  if (data.latitude !== undefined && data.longitude !== undefined) {
    location = {
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude)
    };
  }

  const evidence = await Evidence.create({
    evidenceId: generateEvidenceId(),
    projectId,
    title: data.title.trim(),
    description: data.description ? data.description.trim() : null,
    type: data.type || 'PHOTO',
    url: uploadResult.url,
    publicId: uploadResult.publicId,
    fileSize: file.size,
    mimeType: file.mimetype,
    uploadedBy: user ? (user._id || user.id) : null,
    uploaderEmail: user ? user.email : null,
    uploaderName: user ? user.name : null,
    source: data.source || (user && user.role === 'ADMIN' ? 'OFFICIAL' : 'CITIZEN'),
    metadata: {
      location,
      captureDate: data.captureDate ? new Date(data.captureDate) : new Date(),
      originalFileName: file.originalname
    },
    status: 'VERIFIED'
  });

  return evidence.toJSON();
}

/**
 * Retrieves paginated evidence list for a project.
 * @param {String} projectId - Project identifier
 * @param {Object} filters - Filtering options (type, source, status)
 * @param {Object} pagination - Pagination options (page, limit)
 * @returns {Promise<Object>}
 */
async function getEvidenceByProject(projectId, filters = {}, pagination = {}) {
  const query = { projectId };

  if (filters.type) {
    query.type = filters.type.toUpperCase();
  }

  if (filters.source) {
    query.source = filters.source.toUpperCase();
  }

  if (filters.status) {
    query.status = filters.status.toUpperCase();
  }

  const page = Math.max(1, parseInt(pagination.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(pagination.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [evidenceList, total] = await Promise.all([
    Evidence.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploadedBy', 'name email role avatar')
      .lean(),
    Evidence.countDocuments(query)
  ]);

  const formattedEvidence = evidenceList.map(e => ({
    ...e,
    id: e.evidenceId
  }));

  return {
    evidence: formattedEvidence,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit) || 1
  };
}

/**
 * Retrieves a single evidence document by its evidenceId.
 * @param {String} evidenceId - Unique evidence ID
 * @returns {Promise<Object>}
 */
async function getEvidenceById(evidenceId) {
  const evidence = await Evidence.findOne({ evidenceId })
    .populate('uploadedBy', 'name email role avatar')
    .lean();

  if (!evidence) {
    throw new NotFoundError(`Evidence with ID '${evidenceId}' not found`);
  }

  return {
    ...evidence,
    id: evidence.evidenceId
  };
}

/**
 * Deletes an evidence item from Cloudinary and MongoDB with permission verification.
 * @param {String} evidenceId - Unique evidence identifier
 * @param {Object} user - Authenticated user making the request
 * @returns {Promise<Object>}
 */
async function deleteEvidence(evidenceId, user) {
  const evidence = await Evidence.findOne({ evidenceId });
  if (!evidence) {
    throw new NotFoundError(`Evidence with ID '${evidenceId}' not found`);
  }

  // Authorization check: Only ADMIN or the uploader can delete evidence
  const isOwner = user && evidence.uploadedBy && (
    evidence.uploadedBy.toString() === (user._id ? user._id.toString() : user.id.toString())
  );
  const isAdmin = user && user.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw new ForbiddenError('You do not have permission to delete this evidence record');
  }

  // Remove from Cloudinary
  const resourceType = evidence.mimeType && evidence.mimeType.startsWith('image/') ? 'image' : 'raw';
  await cloudinaryService.deleteFile(evidence.publicId, resourceType);

  // Remove from DB
  await Evidence.deleteOne({ evidenceId });

  return {
    success: true,
    message: 'Evidence successfully deleted',
    evidenceId
  };
}

module.exports = {
  createEvidence,
  getEvidenceByProject,
  getEvidenceById,
  deleteEvidence
};
