/**
 * Authentication and Authorization Middleware
 * Protects endpoints and enforces role-based access control.
 */

const { verifyToken } = require('../services/authService');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');
const User = require('../models/User');

/**
 * Extracts the Bearer token from the request headers or cookies.
 * @param {Object} req - Express request
 * @returns {String|null}
 */
function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

/**
 * Middleware: Requires valid authentication token.
 * Populates req.user with the authenticated user object.
 */
async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      throw new UnauthorizedError('Authentication token missing. Please provide a Bearer token in the Authorization header.');
    }

    const decoded = verifyToken(token);
    let user = null;

    if (decoded.id) {
      user = await User.findById(decoded.id).lean();
    }

    if (!user) {
      user = {
        _id: decoded.id,
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role || 'USER'
      };
    } else {
      user = {
        ...user,
        id: user._id.toString()
      };
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware: Requires ADMIN role.
 * Must be preceded by requireAuth in the middleware chain.
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return next(new UnauthorizedError('Authentication required'));
  }

  if (req.user.role !== 'ADMIN') {
    return next(new ForbiddenError('Admin access required for this operation'));
  }

  next();
}

/**
 * Middleware: Optional authentication.
 * Attaches user to req.user if a valid token is provided, otherwise continues silently.
 */
async function optionalAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id).lean();
      if (user) {
        req.user = {
          ...user,
          id: user._id.toString()
        };
      } else {
        req.user = {
          _id: decoded.id,
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role || 'USER'
        };
      }
    }
  } catch (error) {
    // Ignore invalid tokens for optional auth
    req.user = null;
  }
  next();
}

module.exports = {
  requireAuth,
  requireAdmin,
  optionalAuth
};
