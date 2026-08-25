/**
 * Project Mongoose Model
 * Tracks public development works, financial burn rates, physical progress, and timelines.
 */

const mongoose = require('mongoose');

const dataSourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['official', 'curated', 'demo'],
    default: 'demo',
    required: true
  },
  name: {
    type: String,
    default: 'CivicTrack Demo Dataset'
  },
  url: {
    type: String,
    default: null
  },
  retrievedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: [true, 'projectId is required'],
    unique: true,
    trim: true,
    index: true
  },
  mpId: {
    type: String,
    required: [true, 'mpId is required'],
    ref: 'MP',
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    index: true
  },
  category: {
    type: String,
    required: [true, 'Category is required (e.g. Road, Healthcare, Water Supply, Education, Sanitation)'],
    trim: true,
    index: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  constituency: {
    type: String,
    trim: true,
    index: true
  },
  state: {
    type: String,
    trim: true,
    index: true
  },
  financialYear: {
    type: String,
    trim: true,
    index: true
  },
  allocatedAmount: {
    type: Number,
    required: [true, 'allocatedAmount is required'],
    min: [0, 'allocatedAmount must be non-negative']
  },
  spentAmount: {
    type: Number,
    default: 0,
    min: [0, 'spentAmount must be non-negative']
  },
  progressPercent: {
    type: Number,
    default: 0,
    min: [0, 'progressPercent must be between 0 and 100'],
    max: [100, 'progressPercent must be between 0 and 100']
  },
  startDate: {
    type: Date,
    required: [true, 'startDate is required']
  },
  expectedCompletionDate: {
    type: Date,
    required: [true, 'expectedCompletionDate is required']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['COMPLETED', 'ONGOING', 'DELAYED', 'NEEDS_ATTENTION', 'PLANNED'],
      message: '{VALUE} is not a supported project status'
    },
    default: 'ONGOING',
    index: true
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now
  },
  dataSource: {
    type: dataSourceSchema,
    default: () => ({ type: 'demo', name: 'CivicTrack Demo Dataset', url: null, retrievedAt: new Date() })
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.projectId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.projectId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Text and multi-field indexes for search and query filtering
projectSchema.index({ name: 'text', category: 'text', location: 'text' });
projectSchema.index({ status: 1, category: 1, mpId: 1, financialYear: 1 });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;
