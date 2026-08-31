/**
 * Evidence Mongoose Model
 * Stores metadata and Cloudinary references for project media, inspections, and documents.
 */

const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  evidenceId: {
    type: String,
    required: [true, 'evidenceId is required'],
    unique: true,
    trim: true,
    index: true
  },
  projectId: {
    type: String,
    required: [true, 'projectId is required'],
    trim: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Evidence title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: null
  },
  type: {
    type: String,
    enum: {
      values: ['PHOTO', 'DOCUMENT', 'INSPECTION_REPORT', 'UTILIZATION_CERTIFICATE', 'OTHER'],
      message: '{VALUE} is not a valid evidence type'
    },
    default: 'PHOTO',
    index: true
  },
  url: {
    type: String,
    required: [true, 'Evidence URL is required']
  },
  publicId: {
    type: String,
    required: [true, 'Cloudinary publicId is required']
  },
  fileSize: {
    type: Number,
    min: [0, 'File size must be positive']
  },
  mimeType: {
    type: String,
    trim: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  uploaderEmail: {
    type: String,
    trim: true
  },
  uploaderName: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    enum: {
      values: ['CITIZEN', 'OFFICIAL', 'AUDITOR', 'COMMUNITY_VERIFIER'],
      message: '{VALUE} is not a valid evidence source'
    },
    default: 'CITIZEN',
    index: true
  },
  metadata: {
    location: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null }
    },
    captureDate: { type: Date, default: null },
    originalFileName: { type: String, default: null }
  },
  status: {
    type: String,
    enum: {
      values: ['PENDING_REVIEW', 'VERIFIED', 'REJECTED'],
      message: '{VALUE} is not a valid verification status'
    },
    default: 'VERIFIED',
    index: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.evidenceId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.evidenceId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

evidenceSchema.index({ projectId: 1, type: 1 });
evidenceSchema.index({ createdAt: -1 });

const Evidence = mongoose.models.Evidence || mongoose.model('Evidence', evidenceSchema);

module.exports = Evidence;
