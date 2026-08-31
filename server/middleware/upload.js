/**
 * Upload Validation & Security Middleware
 * Performs multi-layered file validation (MIME, file extension, file size, and magic bytes).
 */

const multer = require('multer');
const path = require('path');
const { BadRequestError } = require('../utils/errors');

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf'
];

// Configure Multer Memory Storage
const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return cb(new BadRequestError(`File extension '${ext}' is not supported. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`), false);
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new BadRequestError(`MIME type '${file.mimetype}' is not permitted. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`), false);
    }

    cb(null, true);
  }
});

/**
 * Validates the raw buffer's magic bytes to detect spoofed MIME types.
 * @param {Buffer} buffer - File buffer
 * @returns {Boolean} True if signature is valid
 */
function validateMagicBytes(buffer) {
  if (!buffer || buffer.length < 4) return false;

  const hex = buffer.toString('hex', 0, 4).toLowerCase();

  // JPEG / JPG (ffd8ff)
  if (hex.startsWith('ffd8')) return true;

  // PNG (89504e47)
  if (hex === '89504e47') return true;

  // PDF (25504446 -> %PDF)
  if (hex === '25504446') return true;

  // WebP (RIFF....WEBP)
  if (hex === '52494646' && buffer.length >= 12) {
    const webpHex = buffer.toString('hex', 8, 12).toLowerCase();
    if (webpHex === '57454250') return true;
  }

  return false;
}

/**
 * Express middleware to handle single file upload with magic byte inspection.
 * @param {String} fieldName - Form field name (default: 'file')
 */
function uploadSingle(fieldName = 'file') {
  const single = multerUpload.single(fieldName);

  return (req, res, next) => {
    single(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new BadRequestError(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`));
          }
          return next(new BadRequestError(`Upload error: ${err.message}`));
        }
        return next(err);
      }

      // If a file was uploaded, perform magic byte verification
      if (req.file) {
        if (!validateMagicBytes(req.file.buffer)) {
          return next(new BadRequestError('File content signature does not match an allowed format (JPEG, PNG, WebP, PDF). Upload rejected.'));
        }
      }

      next();
    });
  };
}

module.exports = {
  uploadSingle,
  validateMagicBytes,
  MAX_FILE_SIZE,
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES
};
