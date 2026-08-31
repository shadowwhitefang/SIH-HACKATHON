/**
 * User Mongoose Model
 * Manages user identities, Google OAuth associations, and role-based access control.
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  avatar: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: {
      values: ['USER', 'ADMIN', 'AUDITOR'],
      message: '{VALUE} is not a supported user role'
    },
    default: 'USER',
    index: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
