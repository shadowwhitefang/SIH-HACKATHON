import React from 'react';

/**
 * Public Landing Navbar Component
 */
export function Navbar() {
  return (
    <nav className="landing-nav" aria-label="Main Navigation">
      <a href="#/" className="civic-logo" id="nav-logo">
        <div className="civic-logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" stroke="#0f172a" strokeWidth="2.5" fill="#f8fafc" />
            <circle cx="16" cy="16" r="4.5" fill="#0d9488" />
            <line x1="16" y1="3" x2="16" y2="11.5" stroke="#0d9488" strokeWidth="2" />
            <line x1="28" y1="22" x2="19.5" y2="18.5" stroke="#0d9488" strokeWidth="2" />
            <line x1="4" y1="22" x2="12.5" y2="18.5" stroke="#0d9488" strokeWidth="2" />
          </svg>
        </div>
        <div className="civic-logo-text">
          <span className="civic-logo-title">CivicTrack</span>
          <span className="civic-logo-subtitle">MP Accountability &amp; Fund Monitoring</span>
        </div>
      </a>

      <ul className="landing-nav-links">
        <li><a href="#how-it-works" className="landing-nav-link">How It Works</a></li>
        <li><a href="#metrics" className="landing-nav-link">Monitoring</a></li>
        <li><a href="#features" className="landing-nav-link">About</a></li>
      </ul>

      <div className="landing-nav-actions">
        <a href="#/login" className="btn btn-ghost" id="nav-login-btn">Sign in</a>
        <a href="#/dashboard" className="btn btn-primary" id="nav-explore-btn">Explore Dashboard</a>
      </div>
    </nav>
  );
}
