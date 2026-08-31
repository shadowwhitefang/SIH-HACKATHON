/**
 * Authentication Service
 * Manages Google OAuth token verification, JWT issuance, user resolution, and dev-login.
 */

const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const authConfig = require('../config/authConfig');
const { UnauthorizedError, BadRequestError } = require('../utils/errors');

let googleOAuthClient = null;

function getGoogleClient() {
  if (!googleOAuthClient && authConfig.google.clientId) {
    googleOAuthClient = new OAuth2Client(authConfig.google.clientId);
  }
  return googleOAuthClient;
}

/**
 * Generates a signed JWT payload for an authenticated user.
 * @param {Object} user - User document
 * @returns {String} Signed JWT token
 */
function generateToken(user) {
  const payload = {
    id: user.id || user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role || 'USER'
  };

  return jwt.sign(payload, authConfig.jwt.secret, {
    expiresIn: authConfig.jwt.expiresIn
  });
}

/**
 * Verifies a JWT token and returns its decoded payload.
 * @param {String} token - Raw JWT string
 * @returns {Object} Decoded token payload
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, authConfig.jwt.secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Authentication token has expired', 'TOKEN_EXPIRED');
    }
    throw new UnauthorizedError('Invalid authentication token');
  }
}

/**
 * Verifies a Google ID token from the frontend client.
 * @param {String} idToken - Google credential ID token
 * @returns {Promise<Object>} Decoded user profile
 */
async function verifyGoogleIdToken(idToken) {
  if (!idToken) {
    throw new BadRequestError('Google ID token is required');
  }

  // In test / offline mode or if ID token is a mock token
  if (process.env.NODE_ENV === 'test' || idToken.startsWith('mock-google-token:')) {
    const parts = idToken.split(':');
    const email = parts[1] || 'test.user@civictrack.org';
    const name = parts[2] || 'CivicTrack Test User';
    const googleId = parts[3] || `google_mock_${Date.now()}`;
    return {
      googleId,
      email,
      name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    };
  }

  const client = getGoogleClient();
  if (!client) {
    throw new BadRequestError('Google OAuth is not configured on this server');
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: authConfig.google.clientId
    });
    const payload = ticket.getPayload();

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name || payload.email.split('@')[0],
      avatar: payload.picture || null
    };
  } catch (error) {
    throw new UnauthorizedError(`Google token verification failed: ${error.message}`);
  }
}

/**
 * Resolves or creates a user account from Google profile data.
 * @param {Object} profile - User profile data from Google
 * @returns {Promise<Object>} User document
 */
async function findOrCreateGoogleUser(profile) {
  const { googleId, email, name, avatar } = profile;

  let user = await User.findOne({
    $or: [{ googleId }, { email: email.toLowerCase() }]
  });

  if (user) {
    let modified = false;
    if (!user.googleId) {
      user.googleId = googleId;
      modified = true;
    }
    if (avatar && !user.avatar) {
      user.avatar = avatar;
      modified = true;
    }
    user.lastLoginAt = new Date();
    await user.save();
    return user;
  }

  user = await User.create({
    googleId,
    name,
    email: email.toLowerCase(),
    avatar,
    role: 'USER',
    isActive: true,
    lastLoginAt: new Date()
  });

  return user;
}

/**
 * Development & Test login helper to obtain tokens without live OAuth.
 * @param {Object} data - { email, name, role }
 * @returns {Promise<{ user: Object, token: String }>}
 */
async function devLogin(data = {}) {
  const email = (data.email || 'developer@civictrack.org').toLowerCase().trim();
  const name = data.name || 'CivicTrack Developer';
  const role = data.role === 'ADMIN' ? 'ADMIN' : (data.role === 'AUDITOR' ? 'AUDITOR' : 'USER');

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      email,
      name,
      role,
      isActive: true,
      lastLoginAt: new Date()
    });
  } else {
    user.role = role;
    user.lastLoginAt = new Date();
    await user.save();
  }

  const token = generateToken(user);
  return { user, token };
}

module.exports = {
  generateToken,
  verifyToken,
  verifyGoogleIdToken,
  findOrCreateGoogleUser,
  devLogin
};
