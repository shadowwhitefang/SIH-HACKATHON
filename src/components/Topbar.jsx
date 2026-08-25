import React, { useState, useEffect, useRef } from 'react';
import { mockData } from '../data/mockData.js';

/**
 * Authenticated Topbar Component
 */
export function Topbar({
  selectedYear = "2025–26",
  onYearChange,
  searchQuery = "",
  onSearchChange
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const bellBtnRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        bellBtnRef.current && 
        !bellBtnRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="dashboard-topbar" aria-label="Dashboard Header">
      <div className="topbar-header-info">
        <h1 className="topbar-title">Accountability Overview</h1>
        <p className="topbar-subtitle">Monitor fund utilization and project progress across constituencies.</p>
      </div>

      <div className="topbar-actions">
        {/* FY Selector */}
        <div className="fy-selector-wrapper">
          <select
            id="fy-select-input"
            className="fy-select"
            aria-label="Select Financial Year"
            value={selectedYear}
            onChange={(e) => onYearChange && onYearChange(e.target.value)}
          >
            {mockData.years.map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
          <span className="fy-caret">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {/* Search Bar */}
        <div className="topbar-search-box">
          <span className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            id="dashboard-search-input"
            className="search-input"
            placeholder="Search projects, MPs, constituencies..."
            aria-label="Search dashboard"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            ref={bellBtnRef}
            type="button"
            id="btn-notification-bell"
            className="notif-btn"
            title="View Notifications"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="notif-badge">3</span>
          </button>

          {/* Notification Dropdown */}
          <div
            ref={dropdownRef}
            id="notification-dropdown-menu"
            className={`notif-dropdown ${showNotifications ? 'open' : ''}`}
          >
            <div className="notif-dropdown-header">
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)' }}>Recent Signals</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--teal-600)', fontWeight: 600 }}>3 new</span>
            </div>
            <div className="notif-list">
              {mockData.notifications.map((n) => (
                <div key={n.id} className="notif-item">
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-800)' }}>{n.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '2px' }}>{n.message}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--slate-400)', marginTop: '4px' }}>{n.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Avatar */}
        <div className="user-avatar-btn" style={{ cursor: 'pointer' }} id="topbar-avatar-btn" title="User Settings">
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0f766e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            AU
          </div>
        </div>
      </div>
    </header>
  );
}
