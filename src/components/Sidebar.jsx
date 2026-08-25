import React from 'react';

/**
 * Authenticated Sidebar Component
 */
export function Sidebar({ activeRoute = "/dashboard", onSignOut, onExternalModuleClick }) {
  const handleExternalClick = (moduleName, owner) => {
    if (onExternalModuleClick) {
      onExternalModuleClick(moduleName, owner);
    }
  };

  return (
    <aside className="dashboard-sidebar" aria-label="Sidebar Navigation">
      <div className="sidebar-header">
        <a href="#/dashboard" className="civic-logo">
          <div className="civic-logo-icon">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" stroke="#38bdf8" strokeWidth="2.5" fill="#0f1f38" />
              <circle cx="16" cy="16" r="4.5" fill="#14b8a6" />
              <line x1="16" y1="3" x2="16" y2="11.5" stroke="#14b8a6" strokeWidth="2" />
              <line x1="28" y1="22" x2="19.5" y2="18.5" stroke="#14b8a6" strokeWidth="2" />
              <line x1="4" y1="22" x2="12.5" y2="18.5" stroke="#14b8a6" strokeWidth="2" />
            </svg>
          </div>
          <div className="civic-logo-text">
            <span className="civic-logo-title">CivicTrack</span>
            <span className="civic-logo-subtitle">MP Accountability &amp; Fund Monitoring</span>
          </div>
        </a>
      </div>

      <nav className="sidebar-nav">
        {/* Section: Overview */}
        <div className="nav-section">
          <div className="nav-section-title">Overview</div>
          <ul className="nav-items-list">
            <li>
              <a href="#/dashboard" className={`nav-item-btn ${activeRoute === '/dashboard' ? 'active' : ''}`} id="nav-dashboard">
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </span>
                <span>Dashboard</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Section: Monitoring */}
        <div className="nav-section">
          <div className="nav-section-title">Monitoring</div>
          <ul className="nav-items-list">
            <li>
              <button
                type="button"
                className="nav-item-btn external-module-btn"
                onClick={() => handleExternalClick("Projects Directory", "Frontend Developer 2")}
                id="nav-projects"
              >
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <span>Projects</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-item-btn external-module-btn"
                onClick={() => handleExternalClick("MPs & Constituencies", "Frontend Developer 2")}
                id="nav-mps"
              >
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <span>MPs / Constituencies</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-item-btn external-module-btn"
                onClick={() => handleExternalClick("Attention Center", "Frontend Developer 3")}
                id="nav-attention"
              >
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </span>
                <span>Attention Center</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-item-btn external-module-btn"
                onClick={() => handleExternalClick("Evidence Library", "Frontend Developer 3")}
                id="nav-evidence"
              >
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </span>
                <span>Evidence</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Section: Account */}
        <div className="nav-section">
          <div className="nav-section-title">Account</div>
          <ul className="nav-items-list">
            <li>
              <button
                type="button"
                className="nav-item-btn external-module-btn"
                onClick={() => handleExternalClick("Account Profile", "Frontend Developer 3")}
                id="nav-profile"
              >
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </span>
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile-widget">
          <div className="user-avatar-img" style={{ background: '#0d9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
            AU
          </div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
        <button
          type="button"
          id="btn-sidebar-logout"
          title="Sign Out"
          onClick={onSignOut}
          style={{ color: 'var(--slate-400)', cursor: 'pointer', padding: '4px', background: 'none', border: 'none' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
