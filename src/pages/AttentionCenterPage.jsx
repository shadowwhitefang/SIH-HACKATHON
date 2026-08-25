import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Topbar } from '../components/Topbar.jsx';
import { getAttentionCenterData } from '../data/mockData.js';

export function AttentionCenterPage({ onSignOut, onShowToast, onNavigateToProject }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'High' | 'Medium' | 'Low' | 'Resolved'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSignals, setExpandedSignals] = useState({}); // { [projId]: boolean }
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(getAttentionCenterData());
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleExpand = (id) => {
    setExpandedSignals((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleViewProject = (id, title) => {
    if (onNavigateToProject) {
      onNavigateToProject(id, title);
    } else {
      window.location.hash = `#/projects/${id}`;
    }
  };

  const handleExport = () => {
    if (onShowToast) {
      onShowToast('Exporting Attention Center audit signals dossier (CSV / PDF)...', 'info');
    }
  };

  const items = data?.items || [];
  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === 'All' || item.severityTab === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.constituency.toLowerCase().includes(q) ||
      item.mpName.toLowerCase().includes(q) ||
      item.signals.some((s) => s.toLowerCase().includes(q));
    return matchesTab && matchesSearch;
  });

  const tabCounts = {
    All: items.length,
    High: items.filter((i) => i.severityTab === 'High').length,
    Medium: items.filter((i) => i.severityTab === 'Medium').length,
    Low: items.filter((i) => i.severityTab === 'Low').length,
    Resolved: items.filter((i) => i.severityTab === 'Resolved').length
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
            {['All', 'High', 'Medium', 'Low', 'Resolved'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-attention-${tab.toLowerCase()}`}
                  className={`attention-tab-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span>{tab}</span>
                  <span className={`tab-count-badge ${tab.toLowerCase()}`}>
                    {tabCounts[tab] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="skeleton-container" aria-busy="true">
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton attention-item-skeleton" style={{ height: '90px', borderRadius: '10px', marginBottom: '12px' }}></div>
              ))}
            </div>
          ) : (
            <>
              {/* Attention Cards List */}
              <div className="attention-cards-container" role="feed" aria-label="Attention signals list">
                {filteredItems.length === 0 ? (
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
                  filteredItems.map((item) => {
                    const isExpanded = !!expandedSignals[item.id];
                    const severityClass =
                      item.severityTab === 'High'
                        ? 'badge-high'
                        : item.severityTab === 'Medium'
                        ? 'badge-medium'
                        : item.severityTab === 'Low'
                        ? 'badge-low'
                        : 'badge-completed';

                    const scoreColor =
                      item.score >= 70 ? 'var(--rose-600)' : item.score >= 40 ? 'var(--amber-600)' : 'var(--emerald-600)';

                    return (
                      <article
                        key={item.id}
                        className={`attention-center-card ${isExpanded ? 'expanded' : ''}`}
                        aria-label={`Attention alert for ${item.title}`}
                      >
                        <div className="attention-card-main-row">
                          {/* Left: Project title & location */}
                          <div className="attention-card-project-info">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span className={`badge ${severityClass}`} style={{ fontSize: '0.625rem' }}>
                                {item.severityTab}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                                MP: {item.mpName}
                              </span>
                            </div>
                            <h2 className="attention-card-title">{item.title}</h2>
                            <span className="attention-card-loc">{item.location} • {item.constituency}</span>
                          </div>

                          {/* Score Badge */}
                          <div className="attention-score-box">
                            <div className="attention-score-val" style={{ color: scoreColor }}>
                              {item.score} <span className="score-total">/ 100</span>
                            </div>
                            <span className="attention-score-label">Attention Score</span>
                          </div>

                          {/* Expandable Signals Summary Toggle */}
                          <div className="attention-signals-trigger">
                            <button
                              type="button"
                              className="btn-signals-toggle"
                              aria-expanded={isExpanded}
                              onClick={() => handleToggleExpand(item.id)}
                            >
                              <span className="signals-count-bubble">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="12" y1="8" x2="12" y2="12" />
                                  <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {item.signalsCount} signals detected
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
                            <span className="evaluated-date">{item.lastEvaluated}</span>
                          </div>

                          {/* View Project Button */}
                          <div className="attention-action-col">
                            <button
                              type="button"
                              className="btn btn-secondary btn-view-project"
                              onClick={() => handleViewProject(item.id, item.title)}
                              aria-label={`View Project details for ${item.title}`}
                            >
                              View Project
                            </button>
                          </div>
                        </div>

                        {/* Expandable Signal Checklist Details */}
                        {isExpanded && (
                          <div className="attention-card-expanded-signals" aria-live="polite">
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '8px' }}>
                              Detected Verification Signals:
                            </div>
                            <ul className="expanded-signals-list">
                              {item.signals.map((sig, sIdx) => (
                                <li key={sIdx} className="expanded-signal-item">
                                  <span className="signal-check-icon">✓</span>
                                  <span>{sig}</span>
                                </li>
                              ))}
                            </ul>
                            <div style={{ marginTop: '10px', fontSize: '0.6875rem', color: 'var(--slate-500)', fontStyle: 'italic' }}>
                              Note: These data signals are advisory and intended for administrative verification without presumption of misconduct.
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
