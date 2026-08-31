/**
 * Authentication Controller
 * Handles Google OAuth, dev logins, current user retrieval, and session termination.
 */

const authService = require('../services/authService');
const { sendSuccess } = require('../utils/apiResponse');
const { BadRequestError } = require('../utils/errors');

/**
 * Handles Google OAuth login and token verification.
 * POST /api/auth/google
 */
async function googleLogin(req, res, next) {
  try {
    const { idToken, credential } = req.body;
    const tokenToVerify = idToken || credential;

    if (!tokenToVerify) {
      throw new BadRequestError('Google credential token (idToken or credential) is required');
    }

    const profile = await authService.verifyGoogleIdToken(tokenToVerify);
    const user = await authService.findOrCreateGoogleUser(profile);
    const token = authService.generateToken(user);

    return sendSuccess(res, {
      user: user.toJSON ? user.toJSON() : user,
      token
    }, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles quick dev-login for testing and development environments.
 * POST /api/auth/dev-login
 */
async function devLogin(req, res, next) {
  try {
    const { email, name, role } = req.body;
    const { user, token } = await authService.devLogin({ email, name, role });

    return sendSuccess(res, {
      user: user.toJSON ? user.toJSON() : user,
      token
    }, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves the currently authenticated user profile.
 * GET /api/auth/me
 */
async function getMe(req, res, next) {
  try {
    return sendSuccess(res, {
      user: req.user
    }, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * Acknowledges user logout.
 * POST /api/auth/logout
 */
async function logout(req, res) {
  return sendSuccess(res, {
    message: 'Logged out successfully'
  }, 200);
}

module.exports = {
  googleLogin,
  devLogin,
  getMe,
  logout
};
