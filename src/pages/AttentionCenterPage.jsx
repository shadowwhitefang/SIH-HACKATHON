import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Topbar } from '../components/Topbar.jsx';
import { getAlerts } from '../services/apiService.js';

export function AttentionCenterPage({ onSignOut, onShowToast, onNavigateToProject }) {
  const [alertsList, setAlertsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'High' | 'Medium' | 'Low' | 'Resolved'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSignals, setExpandedSignals] = useState({}); // { [alertId]: boolean }
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load Alerts through Service Layer
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getAlerts({
          severity: activeTab,
          search: searchQuery
        });
        if (isMounted) {
          setAlertsList(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setIsLoading(false);
          if (onShowToast) onShowToast('Failed to load attention alerts', 'alert');
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [activeTab, searchQuery, onShowToast]);

  const handleToggleExpand = (id) => {
    setExpandedSignals((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleViewProject = (projId, title) => {
    if (onNavigateToProject) {
      onNavigateToProject(projId, title);
    } else {
      window.location.hash = `#/projects/${projId}`;
    }
  };

  const handleExport = () => {
    if (onShowToast) {
      onShowToast('Exporting Attention Center audit signals dossier (CSV / PDF)...', 'info');
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeRoute="/attention"
        onSignOut={onSignOut}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
      />

      <div className="dashboard-main">
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSignOut={onSignOut}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="dashboard-content-body" id="attention-center-content">
          {/* Header */}
          <div className="module-page-header">
            <div>
              <h1 className="topbar-title">Attention Center</h1>
              <p className="topbar-subtitle">
                Review projects with data signals that may require further administrative verification.
              </p>
            </div>

            <div className="header-actions-group">
              <button
                type="button"
                className="btn btn-secondary"
                id="btn-export-attention"
                onClick={handleExport}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="attention-tabs-bar" role="tablist" aria-label="Attention severity filters">
            {[
              { label: 'All', key: 'All', count: 9 },
              { label: 'High', key: 'High', count: 3 },
              { label: 'Medium', key: 'Medium', count: 4 },
              { label: 'Low', key: 'Low', count: 2 },
              { label: 'Resolved', key: 'Resolved', count: 2 }
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-attention-${tab.key.toLowerCase()}`}
                  className={`attention-tab-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span>{tab.label}</span>
                  <span className={`tab-count-badge ${tab.key.toLowerCase()}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {isLoading && alertsList.length === 0 ? (
            <div className="skeleton-container" aria-busy="true">
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton" style={{ height: '90px', borderRadius: '10px', marginBottom: '12px' }}></div>
              ))}
            </div>
          ) : (
            <>
              {/* Attention Cards List */}
              <div className="attention-cards-container" role="feed" aria-label="Attention signals list">
                {alertsList.length === 0 ? (
                  <div className="attention-empty-state" role="status">
                    <div className="empty-state-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <h3 className="empty-state-title">No attention signals found</h3>
                    <p className="empty-state-text">
                      {searchQuery
                        ? `No attention projects matched "${searchQuery}" in the ${activeTab} tab.`
                        : `There are currently no projects marked with ${activeTab} severity.`}
                    </p>
                    {searchQuery && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ marginTop: '10px' }}
                        onClick={() => setSearchQuery('')}
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  alertsList.map((alert) => {
                    const isExpanded = !!expandedSignals[alert.alertId];
                    const sev = alert.severity.toUpperCase();
                    const severityClass =
                      sev === 'HIGH'
                        ? 'badge-high'
                        : sev === 'MEDIUM'
                        ? 'badge-medium'
                        : sev === 'LOW'
                        ? 'badge-low'
                        : 'badge-completed';

                    const scoreColor =
                      alert.score >= 70 ? 'var(--rose-600)' : alert.score >= 40 ? 'var(--amber-600)' : 'var(--emerald-600)';

                    const dateDisplay = new Date(alert.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });

                    return (
                      <article
                        key={alert.alertId}
                        className={`attention-center-card ${isExpanded ? 'expanded' : ''}`}
                        aria-label={`Attention alert for ${alert.projectTitle}`}
                      >
                        <div className="attention-card-main-row">
                          {/* Left: Project title & location */}
                          <div className="attention-card-project-info">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span className={`badge ${severityClass}`} style={{ fontSize: '0.625rem' }}>
                                {alert.severity}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                                MP: {alert.mpName}
                              </span>
                            </div>
                            <h2 className="attention-card-title">{alert.projectTitle}</h2>
                            <span className="attention-card-loc">{alert.location} • {alert.constituency}</span>
                          </div>

                          {/* Score Badge */}
                          <div className="attention-score-box">
                            <div className="attention-score-val" style={{ color: scoreColor }}>
                              {alert.score} <span className="score-total">/ 100</span>
                            </div>
                            <span className="attention-score-label">Attention Score</span>
                          </div>

                          {/* Expandable Signals Summary Toggle */}
                          <div className="attention-signals-trigger">
                            <button
                              type="button"
                              className="btn-signals-toggle"
                              aria-expanded={isExpanded}
                              onClick={() => handleToggleExpand(alert.alertId)}
                            >
                              <span className="signals-count-bubble">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="12" y1="8" x2="12" y2="12" />
                                  <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {alert.rulesTriggered.length} signals detected
                              </span>
                              <svg
                                className={`chevron-icon ${isExpanded ? 'rotated' : ''}`}
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                          </div>

                          {/* Last Evaluated */}
                          <div className="attention-evaluated-col">
                            <span className="evaluated-label">Last evaluated</span>
                            <span className="evaluated-date">{dateDisplay}</span>
                          </div>

                          {/* View Project Button */}
                          <div className="attention-action-col">
                            <button
                              type="button"
                              className="btn btn-secondary btn-view-project"
                              onClick={() => handleViewProject(alert.projectId, alert.projectTitle)}
                              aria-label={`View Project details for ${alert.projectTitle}`}
                            >
                              View Project
                            </button>
                          </div>
                        </div>

                        {/* Expandable Signal Checklist Details from Data Contract */}
                        {isExpanded && (
                          <div className="attention-card-expanded-signals" aria-live="polite">
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '8px' }}>
                              Detected Verification Signals:
                            </div>
                            <ul className="expanded-signals-list">
                              {alert.rulesTriggered.map((ruleItem, rIdx) => (
                                <li key={rIdx} className="expanded-signal-item">
                                  <span className="signal-check-icon">✓</span>
                                  <div>
                                    <span style={{ fontWeight: 600 }}>{ruleItem.message}</span>
                                    {ruleItem.relevantValues && (
                                      <span style={{ fontSize: '0.6875rem', color: 'var(--slate-500)', marginLeft: '6px' }}>
                                        ({Object.entries(ruleItem.relevantValues).map(([k, v]) => `${k}: ${v}`).join(', ')})
                                      </span>
                                    )}
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div style={{ marginTop: '10px', fontSize: '0.6875rem', color: 'var(--slate-500)', fontStyle: 'italic' }}>
                              Note: These data signals are advisory indicators designed to aid verification without presumption of wrongdoing.
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })
                )}
              </div>

              {/* How Attention Scoring Works Info Card */}
              <section className="how-scoring-works-card" aria-label="Attention Scoring Methodology">
                <div className="scoring-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <div className="scoring-text-content">
                  <h3 className="scoring-title">How attention scoring works</h3>
                  <p className="scoring-desc">
                    The score combines measurable indicators such as project deadline, physical progress, fund utilization,
                    update freshness, and financial vs physical progress to surface projects that may require further verification.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-ghost scoring-learn-more"
                  onClick={() => {
                    if (onShowToast) onShowToast('Scoring methodology documentation: Multi-factor composite index (0–100).', 'info');
                  }}
                >
                  Learn more →
                </button>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
