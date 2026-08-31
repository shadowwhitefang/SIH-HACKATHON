/**
 * Authentication & OAuth Configuration
 * Centralizes JWT secrets, expiration windows, and Google OAuth credentials.
 */

const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || process.env.SESSION_SECRET || 'civictrack_dev_jwt_secret_key_change_in_production_2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
  },
  sessionSecret: process.env.SESSION_SECRET || 'civictrack_session_secret_2026',
  isGoogleOAuthConfigured() {
    return Boolean(this.google.clientId && this.google.clientId.trim().length > 0);
  }
};

module.exports = authConfig;
