/**
 * Authenticated Topbar Component
 */
import { mockData } from '../data/mockData.js';

export function renderTopbar(selectedYear = "2025–26") {
  return `
    <header class="dashboard-topbar" aria-label="Dashboard Header">
      <div class="topbar-header-info">
        <h1 class="topbar-title">Accountability Overview</h1>
        <p class="topbar-subtitle">Monitor fund utilization and project progress across constituencies.</p>
      </div>

      <div class="topbar-actions">
        <!-- FY Selector -->
        <div class="fy-selector-wrapper">
          <select id="fy-select-input" class="fy-select" aria-label="Select Financial Year">
            ${mockData.years.map(yr => `
              <option value="${yr}" ${yr === selectedYear ? 'selected' : ''}>${yr}</option>
            `).join('')}
          </select>
          <span class="fy-caret">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>

        <!-- Search Bar -->
        <div class="topbar-search-box">
          <span class="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input 
            type="text" 
            id="dashboard-search-input" 
            class="search-input" 
            placeholder="Search projects, MPs, constituencies..."
            aria-label="Search dashboard"
          />
        </div>

        <!-- Notification Bell -->
        <div style="position: relative;">
          <button id="btn-notification-bell" class="notif-btn" title="View Notifications" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="notif-badge">3</span>
          </button>

          <!-- Notification Dropdown -->
          <div id="notification-dropdown-menu" class="notif-dropdown">
            <div class="notif-dropdown-header">
              <span style="font-size: 0.875rem; font-weight: 700; color: var(--slate-900);">Recent Signals</span>
              <span style="font-size: 0.75rem; color: var(--teal-600); font-weight: 600;">3 new</span>
            </div>
            <div class="notif-list">
              ${mockData.notifications.map(n => `
                <div class="notif-item">
                  <div style="font-size: 0.8125rem; font-weight: 600; color: var(--slate-800);">${n.title}</div>
                  <div style="font-size: 0.75rem; color: var(--slate-500); margin-top: 2px;">${n.message}</div>
                  <div style="font-size: 0.6875rem; color: var(--slate-400); margin-top: 4px;">${n.time}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- User Avatar -->
        <div class="user-avatar-btn" style="cursor: pointer;" id="topbar-avatar-btn" title="User Settings">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: #0f766e; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            AU
          </div>
        </div>
      </div>
    </header>
  `;
}
