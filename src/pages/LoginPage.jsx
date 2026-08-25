import React, { useState } from 'react';
import { loginUser } from '../data/mockData.js';

export function LoginPage({ onLoginSuccess }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginUser();
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.hash = "#/dashboard";
      }
    }, 500);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-backdrop-decor"></div>

      <div className="login-card" role="main">
        <div className="login-logo-container">
          <a href="#/" className="civic-logo" style={{ justifyContent: 'center' }}>
            <div className="civic-logo-icon">
              <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" stroke="#0f172a" strokeWidth="2.5" fill="#f8fafc" />
                <circle cx="16" cy="16" r="4.5" fill="#0d9488" />
                <line x1="16" y1="3" x2="16" y2="11.5" stroke="#0d9488" strokeWidth="2" />
                <line x1="28" y1="22" x2="19.5" y2="18.5" stroke="#0d9488" strokeWidth="2" />
                <line x1="4" y1="22" x2="12.5" y2="18.5" stroke="#0d9488" strokeWidth="2" />
              </svg>
            </div>
            <div className="civic-logo-text" style={{ textAlign: 'left' }}>
              <span className="civic-logo-title">CivicTrack</span>
              <span className="civic-logo-subtitle">MP Accountability &amp; Fund Monitoring</span>
            </div>
          </a>
        </div>

        <div className="login-header-text">
          <h1 className="login-title">Welcome to CivicTrack</h1>
          <p className="login-subtitle">Sign in to continue monitoring public development projects.</p>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          id="btn-google-login"
          className="btn-google-auth"
          aria-label="Continue with Google"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
              <span>Signing in securely...</span>
            </>
          ) : (
            <>
              <div className="google-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

        <div className="login-security-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Secure authentication for authorized users.</span>
        </div>

        <div className="login-disclaimer-box">
          <div className="login-disclaimer-text">
            <strong>CivicTrack</strong> is an accountability and monitoring tool, not a system for declaring wrongdoing.
          </div>
        </div>

        <div className="login-footer-copy">
          &copy; 2026 CivicTrack. All rights reserved.
        </div>
      </div>
    </div>
  );
}
