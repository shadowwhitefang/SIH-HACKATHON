import React, { useState, useEffect } from 'react';

/**
 * Public Landing Navbar Component
 * Features:
 * - Smooth scroll navigation
 * - Responsive mobile drawer with hamburger toggle
 * - Keyboard accessibility (ESC close, ARIA attributes)
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile drawer on window resize above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Check if we are currently on the landing page
    if (window.location.hash && window.location.hash !== '#/' && !window.location.hash.startsWith('#how-') && !window.location.hash.startsWith('#metric') && !window.location.hash.startsWith('#feature')) {
      window.location.hash = '#/';
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="landing-nav" aria-label="Main Navigation">
        <a href="#/" className="civic-logo" id="nav-logo" aria-label="CivicTrack Homepage">
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

        {/* Desktop Navigation Links */}
        <ul className="landing-nav-links" role="menubar">
          <li role="none">
            <a
              href="#how-it-works"
              className="landing-nav-link"
              role="menuitem"
              onClick={(e) => handleNavClick(e, 'how-it-works')}
            >
              How It Works
            </a>
          </li>
          <li role="none">
            <a
              href="#metrics"
              className="landing-nav-link"
              role="menuitem"
              onClick={(e) => handleNavClick(e, 'metrics')}
            >
              Monitoring
            </a>
          </li>
          <li role="none">
            <a
              href="#features"
              className="landing-nav-link"
              role="menuitem"
              onClick={(e) => handleNavClick(e, 'features')}
            >
              About
            </a>
          </li>
        </ul>

        {/* Desktop Action Buttons */}
        <div className="landing-nav-actions">
          <a href="#/login" className="btn btn-ghost" id="nav-login-btn">
            Sign in
          </a>
          <a href="#/dashboard" className="btn btn-primary" id="nav-explore-btn">
            Explore Dashboard
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-nav-toggle"
          id="btn-mobile-nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-header">
          <span className="civic-logo-title" style={{ fontSize: '1rem', fontWeight: 700 }}>Menu</span>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '4px' }}
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="mobile-nav-list">
          <li>
            <a
              href="#how-it-works"
              className="mobile-nav-item"
              onClick={(e) => handleNavClick(e, 'how-it-works')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14 14" />
              </svg>
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#metrics"
              className="mobile-nav-item"
              onClick={(e) => handleNavClick(e, 'metrics')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              Monitoring
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="mobile-nav-item"
              onClick={(e) => handleNavClick(e, 'features')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              About
            </a>
          </li>
        </ul>

        <div className="mobile-drawer-actions">
          <a
            href="#/login"
            className="btn btn-secondary"
            style={{ width: '100%' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign in
          </a>
          <a
            href="#/dashboard"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore Dashboard
          </a>
        </div>
      </div>
    </>
  );
}
