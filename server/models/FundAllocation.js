/**
 * FundAllocation Mongoose Model
 * Tracks budget allocations, releases, and expenditures per MP / Financial Year.
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
    default: 'CivicTrack Curated Dataset'
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

const fundAllocationSchema = new mongoose.Schema({
  allocationId: {
    type: String,
    required: [true, 'allocationId is required'],
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
  financialYear: {
    type: String,
    required: [true, 'financialYear is required (e.g. 2025–26)'],
    trim: true,
    index: true
  },
  allocatedAmount: {
    type: Number,
    required: [true, 'allocatedAmount is required'],
    min: [0, 'allocatedAmount cannot be negative']
  },
  releasedAmount: {
    type: Number,
    default: 0,
    min: [0, 'releasedAmount cannot be negative']
  },
  spentAmount: {
    type: Number,
    default: 0,
    min: [0, 'spentAmount cannot be negative']
  },
  dataSource: {
    type: dataSourceSchema,
    default: () => ({ type: 'demo', name: 'CivicTrack Curated Dataset', url: null, retrievedAt: new Date() })
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.allocationId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.allocationId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Composite index for fast MP + FY queries
fundAllocationSchema.index({ mpId: 1, financialYear: 1 });

const FundAllocation = mongoose.models.FundAllocation || mongoose.model('FundAllocation', fundAllocationSchema);

module.exports = FundAllocation;
