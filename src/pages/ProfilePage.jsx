import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Topbar } from '../components/Topbar.jsx';
import { getUserProfile } from '../data/mockData.js';

export function ProfilePage({ onSignOut, onShowToast }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('account'); // 'account' | 'authentication' | 'activity'
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Form edit states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    timezone: '',
    language: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUserProfile();
      setProfile(data);
      setFormData({
        name: data.name,
        email: data.email,
        department: data.department,
        phone: data.phone,
        timezone: data.timezone,
        language: data.language
      });
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      ...formData
    }));
    setShowEditModal(false);
    if (onShowToast) {
      onShowToast('Profile settings saved successfully', 'success');
    }
  };

  const handleToggle2FA = () => {
    setProfile((prev) => {
      const updated = !prev.twoFactorEnabled;
      if (onShowToast) {
        onShowToast(updated ? 'Two-Factor Authentication enabled' : 'Two-Factor Authentication disabled', 'info');
      }
      return { ...prev, twoFactorEnabled: updated };
    });
  };

  const handleConfirmSignOut = () => {
    setShowSignOutConfirm(false);
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeRoute="/profile"
        onSignOut={onSignOut}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
      />

      <div className="dashboard-main">
        <Topbar
          onSignOut={onSignOut}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="dashboard-content-body" id="profile-page-content">
          {/* Header */}
          <div className="module-page-header">
            <div>
              <h1 className="topbar-title">Profile</h1>
              <p className="topbar-subtitle">
                Manage your account settings, authentication, and system activity logs.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="skeleton-container" aria-busy="true">
              <div className="skeleton" style={{ height: '140px', borderRadius: '12px', marginBottom: '20px' }}></div>
              <div className="skeleton" style={{ height: '280px', borderRadius: '12px' }}></div>
            </div>
          ) : (
            <>
              {/* Profile User Banner Card */}
              <section className="profile-hero-card" aria-label="User Profile Card">
                <div className="profile-hero-left">
                  <div className="profile-hero-avatar">
                    AU
                  </div>
                  <div className="profile-hero-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h2 className="profile-hero-name">{profile.name}</h2>
                      <span className="badge badge-positive" style={{ fontSize: '0.6875rem' }}>Verified Admin</span>
                    </div>
                    <p className="profile-hero-email">{profile.email}</p>
                    <p className="profile-hero-role">Role: <strong>{profile.role}</strong> • {profile.department}</p>
                  </div>
                </div>

                <div className="profile-hero-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="btn-edit-profile"
                    onClick={() => setShowEditModal(true)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </section>

              {/* Profile Workspace Layout (Left Tabs Nav + Right Content Pane) */}
              <div className="profile-workspace-grid">
                {/* Left Navigation Menu */}
                <nav className="profile-side-menu" aria-label="Profile navigation sections">
                  <button
                    type="button"
                    className={`profile-side-nav-item ${activeTab === 'account' ? 'active' : ''}`}
                    onClick={() => setActiveTab('account')}
                  >
                    <div className="side-nav-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      </svg>
                    </div>
                    <div className="side-nav-text">
                      <span className="nav-item-title">Account</span>
                      <span className="nav-item-desc">Manage your personal information and preferences.</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`profile-side-nav-item ${activeTab === 'authentication' ? 'active' : ''}`}
                    onClick={() => setActiveTab('authentication')}
                  >
                    <div className="side-nav-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="side-nav-text">
                      <span className="nav-item-title">Authentication</span>
                      <span className="nav-item-desc">Update your login methods and 2FA credentials.</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`profile-side-nav-item ${activeTab === 'activity' ? 'active' : ''}`}
                    onClick={() => setActiveTab('activity')}
                  >
                    <div className="side-nav-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <div className="side-nav-text">
                      <span className="nav-item-title">Activity</span>
                      <span className="nav-item-desc">View your recent actions and system audit logs.</span>
                    </div>
                  </button>

                  <div className="side-menu-divider"></div>

                  <button
                    type="button"
                    className="profile-side-nav-item text-danger"
                    id="btn-profile-signout"
                    onClick={() => setShowSignOutConfirm(true)}
                  >
                    <div className="side-nav-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                    </div>
                    <div className="side-nav-text">
                      <span className="nav-item-title" style={{ color: 'var(--rose-600)' }}>Sign Out</span>
                      <span className="nav-item-desc">Terminate your active administrator session.</span>
                    </div>
                  </button>
                </nav>

                {/* Right Tab Content Container */}
                <div className="profile-content-pane">
                  {/* 1. Account Section */}
                  {activeTab === 'account' && (
                    <div className="profile-section-card" role="tabpanel" aria-label="Account Settings">
                      <div className="pane-header">
                        <h3 className="pane-title">Personal Information &amp; Preferences</h3>
                        <p className="pane-subtitle">Update your official administrative profile and regional display settings.</p>
                      </div>

                      <div className="profile-fields-grid">
                        <div className="profile-field-row">
                          <span className="field-label">Full Name</span>
                          <span className="field-value">{profile.name}</span>
                        </div>
                        <div className="profile-field-row">
                          <span className="field-label">Official Email</span>
                          <span className="field-value">{profile.email}</span>
                        </div>
                        <div className="profile-field-row">
                          <span className="field-label">Department</span>
                          <span className="field-value">{profile.department}</span>
                        </div>
                        <div className="profile-field-row">
                          <span className="field-label">Contact Phone</span>
                          <span className="field-value">{profile.phone}</span>
                        </div>
                        <div className="profile-field-row">
                          <span className="field-label">Timezone</span>
                          <span className="field-value">{profile.timezone}</span>
                        </div>
                        <div className="profile-field-row">
                          <span className="field-label">System Language</span>
                          <span className="field-value">{profile.language}</span>
                        </div>
                      </div>

                      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--slate-100)', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setShowEditModal(true)}
                        >
                          Modify Information
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2. Authentication Section */}
                  {activeTab === 'authentication' && (
                    <div className="profile-section-card" role="tabpanel" aria-label="Authentication Settings">
                      <div className="pane-header">
                        <h3 className="pane-title">Authentication &amp; Security</h3>
                        <p className="pane-subtitle">Manage single sign-on identity providers and multi-factor security.</p>
                      </div>

                      {/* 2FA Toggle Card */}
                      <div className="auth-security-item">
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--slate-900)' }}>
                            Two-Factor Authentication (2FA)
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                            Add an extra layer of security requiring Google Authenticator OTP on login.
                          </div>
                        </div>
                        <button
                          type="button"
                          className={`btn ${profile.twoFactorEnabled ? 'btn-secondary' : 'btn-primary'}`}
                          style={{ fontSize: '0.8125rem', padding: '6px 14px' }}
                          onClick={handleToggle2FA}
                        >
                          {profile.twoFactorEnabled ? 'Enabled ✓' : 'Enable 2FA'}
                        </button>
                      </div>

                      {/* Connected Identity Accounts */}
                      <div style={{ marginTop: '20px' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '10px' }}>
                          Connected Accounts
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {profile.linkedAccounts.map((acc, idx) => (
                            <div key={idx} className="linked-account-row">
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className="google-icon-box" style={{ width: '28px', height: '28px' }}>
                                  <svg width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                  </svg>
                                </div>
                                <div>
                                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-900)' }}>{acc.provider}</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{acc.email}</div>
                                </div>
                              </div>
                              <span className="badge badge-positive">{acc.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Activity Logs Section */}
                  {activeTab === 'activity' && (
                    <div className="profile-section-card" role="tabpanel" aria-label="Activity Logs">
                      <div className="pane-header">
                        <h3 className="pane-title">System Activity &amp; Audit Trail</h3>
                        <p className="pane-subtitle">Immutable chronological log of all administrator operations and signal reviews.</p>
                      </div>

                      <div className="activity-timeline">
                        {profile.activityLogs.map((log) => {
                          const dotColor =
                            log.type === 'alert'
                              ? 'var(--rose-500)'
                              : log.type === 'success'
                              ? 'var(--emerald-500)'
                              : log.type === 'security'
                              ? 'var(--blue-500)'
                              : 'var(--teal-600)';

                          return (
                            <div key={log.id} className="timeline-item">
                              <div className="timeline-dot" style={{ backgroundColor: dotColor }}></div>
                              <div className="timeline-content">
                                <div className="timeline-header">
                                  <span className="timeline-action">{log.action}</span>
                                  <span className="timeline-time">{log.timestamp}</span>
                                </div>
                                <p className="timeline-desc">{log.details}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEditModal(false);
          }}
        >
          <div className="modal-card">
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setShowEditModal(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h3 id="edit-profile-modal-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '4px' }}>
              Edit Administrator Profile
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginBottom: '16px' }}>
              Update your contact details and administrative department assignment.
            </p>

            <form onSubmit={handleSaveProfile} className="upload-form">
              <div className="form-group">
                <label htmlFor="edit-name">Full Name</label>
                <input
                  type="text"
                  id="edit-name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-email">Official Email</label>
                <input
                  type="email"
                  id="edit-email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-dept">Department / Ministry</label>
                <input
                  type="text"
                  id="edit-dept"
                  className="form-input"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-phone">Phone Number</label>
                <input
                  type="text"
                  id="edit-phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signout-confirm-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSignOutConfirm(false);
          }}
        >
          <div className="modal-card" style={{ maxWidth: '440px' }}>
            <h3 id="signout-confirm-title" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '8px' }}>
              Confirm Sign Out
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '20px', lineHeight: '1.5' }}>
              Are you sure you want to end your administrator session? Any unsaved edits will be discarded.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowSignOutConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--rose-600)' }}
                id="btn-confirm-signout-action"
                onClick={handleConfirmSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
