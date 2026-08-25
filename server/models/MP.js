/**
 * MP (Member of Parliament) Mongoose Model
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

const mpSchema = new mongoose.Schema({
  mpId: {
    type: String,
    required: [true, 'mpId is required'],
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'MP name is required'],
    trim: true,
    index: true
  },
  constituency: {
    type: String,
    required: [true, 'Constituency is required'],
    trim: true,
    index: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
    index: true
  },
  party: {
    type: String,
    required: [true, 'Political party is required'],
    trim: true,
    index: true
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
      ret.id = ret.mpId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.mpId;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Text index for search
mpSchema.index({ name: 'text', constituency: 'text', state: 'text', party: 'text' });

const MP = mongoose.models.MP || mongoose.model('MP', mpSchema);

module.exports = MP;
