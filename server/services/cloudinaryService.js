/**
 * Cloudinary Upload Service
 * Handles streaming uploads to Cloudinary with transparent mock fallback for local/test environments.
 */

const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

/**
 * Uploads a memory buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer
 * @param {Object} [options] - Upload options (folder, resourceType, filename)
 * @returns {Promise<{ url: String, publicId: String, bytes: Number, format: String }>}
 */
async function uploadBuffer(buffer, options = {}) {
  const folder = options.folder || 'civictrack/evidence';
  const resourceType = options.resourceType || 'auto';

  // Fallback if Cloudinary is not configured or in test mode
  if (!isCloudinaryConfigured() || process.env.NODE_ENV === 'test') {
    const mockId = `mock_ev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const ext = options.filename ? options.filename.split('.').pop() : 'jpg';
    return {
      url: `https://res.cloudinary.com/civictrack-demo/${resourceType}/upload/v${Date.now()}/${folder}/${mockId}.${ext}`,
      publicId: `${folder}/${mockId}`,
      bytes: buffer.length,
      format: ext
    };
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        filename_override: options.filename
      },
      (error, result) => {
        if (error) {
          return reject(new Error(`Cloudinary upload failed: ${error.message}`));
        }
        resolve({
          url: result.secure_url || result.url,
          publicId: result.public_id,
          bytes: result.bytes || buffer.length,
          format: result.format
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Deletes an uploaded asset from Cloudinary.
 * @param {String} publicId - Cloudinary public_id
 * @param {String} [resourceType='image'] - Resource type (image, raw)
 * @returns {Promise<Object>} Deletion result
 */
async function deleteFile(publicId, resourceType = 'image') {
  if (!isCloudinaryConfigured() || process.env.NODE_ENV === 'test' || publicId.startsWith('civictrack/evidence/mock_')) {
    return { result: 'ok', mock: true };
  }

  try {
    return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error(`[Cloudinary Service] Error deleting publicId ${publicId}:`, error.message);
    return { result: 'error', error: error.message };
  }
}

module.exports = {
  uploadBuffer,
  deleteFile
};
