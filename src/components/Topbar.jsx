import React, { useState, useEffect, useRef } from 'react';
import { mockData } from '../data/mockData.js';

/**
 * Authenticated Topbar Component
 * Features:
 * - FY Selector (2025-26, 2024-25, 2023-24)
 * - Interactive Search with live clear
 * - Notification Panel (dismiss, count, outside click / ESC dismiss)
 * - User Avatar Menu (profile info, settings, sign out, outside click / ESC dismiss)
 * - Mobile Sidebar Drawer Hamburger Toggle
 */
export function Topbar({
  selectedYear = "2025–26",
  onYearChange,
  searchQuery = "",
  onSearchChange,
  onSignOut,
  onOpenMobileSidebar,
  onExternalModuleClick
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(mockData.notifications);

  const notifDropdownRef = useRef(null);
  const notifBtnRef = useRef(null);
  const userMenuRef = useRef(null);
  const userBtnRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target) &&
        notifBtnRef.current &&
        !notifBtnRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userBtnRef.current &&
        !userBtnRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Close dropdowns on ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDismissNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.length;

  return (
    <header className="dashboard-topbar" aria-label="Dashboard Header">
      <div className="topbar-left-cluster">
        {/* Mobile Hamburger Toggle for Sidebar */}
        <button
          type="button"
          className="topbar-sidebar-toggle"
          id="btn-topbar-sidebar-toggle"
          aria-label="Open navigation sidebar"
          onClick={onOpenMobileSidebar}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="topbar-header-info">
          <h1 className="topbar-title">Accountability Overview</h1>
          <p className="topbar-subtitle">Monitor fund utilization and project progress across constituencies.</p>
        </div>
      </div>

      <div className="topbar-actions">
        {/* Financial Year Selector */}
        <div className="fy-selector-wrapper">
          <label htmlFor="fy-select-input" className="sr-only">Financial Year</label>
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
          <span className="fy-caret" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {/* Interactive Search Bar */}
        <div className="topbar-search-box">
          <span className="search-icon" aria-hidden="true">
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
            aria-label="Search projects, MPs, constituencies"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              aria-label="Clear search input"
              onClick={() => onSearchChange && onSearchChange('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Notifications Panel Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            ref={notifBtnRef}
            type="button"
            id="btn-notification-bell"
            className={`notif-btn ${showNotifications ? 'active' : ''}`}
            title="View Notifications"
            aria-label={`Notifications (${unreadCount} unread)`}
            aria-expanded={showNotifications}
            aria-haspopup="true"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </button>

          {/* Notification Dropdown Panel */}
          {showNotifications && (
            <div
              ref={notifDropdownRef}
              id="notification-dropdown-menu"
              className="notif-dropdown open"
              role="dialog"
              aria-label="Recent Civic Signals"
            >
              <div className="notif-dropdown-header">
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)' }}>Recent Signals</span>
                  {unreadCount > 0 && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--teal-600)', fontWeight: 600, marginLeft: '6px' }}>
                      ({unreadCount} new)
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    className="notif-clear-all"
                    onClick={handleClearAllNotifs}
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div style={{ padding: '1.5rem 1rem', textAlign: 'center', color: 'var(--slate-400)', fontSize: '0.8125rem' }}>
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="notif-item">
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-800)' }}>
                          {n.title}
                        </div>
                        <button
                          type="button"
                          className="notif-item-dismiss"
                          title="Dismiss notification"
                          aria-label={`Dismiss ${n.title}`}
                          onClick={() => handleDismissNotif(n.id)}
                        >
                          ✕
                        </button>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)', marginTop: '2px' }}>
                        {n.message}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--slate-400)', marginTop: '4px' }}>
                        {n.time}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Dropdown Menu */}
        <div style={{ position: 'relative' }}>
          <button
            ref={userBtnRef}
            type="button"
            className="user-avatar-btn"
            id="topbar-avatar-btn"
            title="User Account Menu"
            aria-label="User Account Menu for Admin User"
            aria-expanded={showUserMenu}
            aria-haspopup="menu"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
          >
            <div className="user-avatar-circle">
              AU
            </div>
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div
              ref={userMenuRef}
              id="user-account-menu"
              className="user-menu-dropdown"
              role="menu"
              aria-label="User profile options"
            >
              <div className="user-menu-header">
                <div className="user-menu-name">Admin User</div>
                <div className="user-menu-email">admin@civictrack.gov.in</div>
                <span className="badge badge-positive" style={{ marginTop: '4px', alignSelf: 'flex-start' }}>
                  Administrator
                </span>
              </div>

              <div className="user-menu-divider"></div>

              <ul className="user-menu-list">
                <li>
                  <button
                    type="button"
                    className="user-menu-item"
                    role="menuitem"
                    onClick={() => {
                      setShowUserMenu(false);
                      onExternalModuleClick && onExternalModuleClick('Account Profile', 'Frontend Developer 3');
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span>Profile &amp; Settings</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="user-menu-item text-danger"
                    role="menuitem"
                    onClick={() => {
                      setShowUserMenu(false);
                      onSignOut && onSignOut();
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
