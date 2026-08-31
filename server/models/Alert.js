/**
 * Alert Mongoose Model
 * Stores explainable attention alerts triggered by the Intelligence Engine.
 */

const mongoose = require('mongoose');

const ruleTriggeredSchema = new mongoose.Schema({
  rule: {
    type: String,
    required: true,
    enum: [
      'OVERDUE',
      'LOW_PROGRESS',
      'LOW_UTILIZATION',
      'STALE_UPDATE',
      'FINANCIAL_PHYSICAL_MISMATCH',
      'OTHER'
    ]
  },
  severity: {
    type: String,
    required: true,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  message: {
    type: String,
    required: true
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { _id: false });

const alertSchema = new mongoose.Schema({
  alertId: {
    type: String,
    required: [true, 'alertId is required'],
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
  mpId: {
    type: String,
    trim: true,
    index: true,
    default: null
  },
  severity: {
    type: String,
    required: [true, 'Severity is required'],
    enum: {
      values: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      message: '{VALUE} is not a valid severity level'
    },
    index: true
  },
  score: {
    type: Number,
    required: [true, 'Attention score is required'],
    min: [0, 'Score cannot be less than 0'],
    max: [100, 'Score cannot exceed 100']
  },
  rulesTriggered: {
    type: [ruleTriggeredSchema],
    default: []
  },
  status: {
    type: String,
    required: [true, 'Alert status is required'],
    enum: {
      values: ['OPEN', 'ACKNOWLEDGED', 'RESOLVED', 'DISMISSED'],
      message: '{VALUE} is not a valid alert status'
    },
    default: 'OPEN',
    index: true
  },
  resolutionNote: {
    type: String,
    default: null,
    trim: true
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  acknowledgedAt: {
    type: Date,
    default: null
  },
  lastEvaluatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.alertId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.alertId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

alertSchema.index({ projectId: 1, status: 1 });
alertSchema.index({ severity: 1, status: 1 });
alertSchema.index({ score: -1 });

const Alert = mongoose.models.Alert || mongoose.model('Alert', alertSchema);

module.exports = Alert;
