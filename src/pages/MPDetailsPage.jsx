import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Topbar } from '../components/Topbar.jsx';
import { getMPDetails } from '../data/mockData.js';

export function MPDetailsPage({ onSignOut, onShowToast, onNavigateToProject }) {
  const [mpData, setMpData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredStatusSlice, setHoveredStatusSlice] = useState(null);
  const [hoveredCatSlice, setHoveredCatSlice] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulated load for skeleton state
    const timer = setTimeout(() => {
      setMpData(getMPDetails());
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleRowClick = (projId, title) => {
    if (onNavigateToProject) {
      onNavigateToProject(projId, title);
    } else {
      window.location.hash = `#/projects/${projId}`;
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('Link to MP Dossier copied to clipboard', 'success');
    } else {
      if (onShowToast) onShowToast('MP Dossier link ready to share', 'info');
    }
  };

  const handleDownload = () => {
    if (onShowToast) onShowToast('Generating and downloading official MP LAD Audit Report (PDF)...', 'info');
  };

  const projects = mpData?.projects || [];
  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    const matchesSearch = !searchQuery.trim() || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.deadline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeRoute="/mps"
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

        <main className="dashboard-content-body" id="mp-details-content">
          {/* Breadcrumb Navigation */}
          <nav className="module-breadcrumb" aria-label="Breadcrumb">
            <a href="#/dashboard" className="breadcrumb-link">Overview</a>
            <span className="breadcrumb-sep">/</span>
            <a href="#/mps" className="breadcrumb-link">MPs &amp; Constituencies</a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Rahul Sharma</span>
          </nav>

          {isLoading ? (
            <div className="skeleton-container" aria-busy="true">
              <div className="skeleton skeleton-mp-hero" style={{ height: '140px', borderRadius: '12px', marginBottom: '20px' }}></div>
              <div className="skeleton" style={{ height: '100px', borderRadius: '12px', marginBottom: '20px' }}></div>
              <div className="skeleton" style={{ height: '240px', borderRadius: '12px', marginBottom: '20px' }}></div>
            </div>
          ) : (
            <>
              {/* MP Profile Hero Card */}
              <section className="mp-hero-card" aria-label="Member of Parliament Details">
                <div className="mp-hero-left">
                  <img
                    src={mpData.avatar}
                    alt={mpData.name}
                    className="mp-hero-avatar"
                  />
                  <div className="mp-hero-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h1 className="mp-hero-name">{mpData.name}</h1>
                      <span className="badge badge-positive" style={{ fontSize: '0.6875rem' }}>Active MP</span>
                    </div>
                    <p className="mp-hero-constituency">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {mpData.constituency}, {mpData.state} • <span style={{ color: 'var(--slate-500)' }}>{mpData.term}</span>
                    </p>
                  </div>
                </div>

                <div className="mp-hero-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleShare} id="btn-share-mp">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    Share
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleDownload} id="btn-download-mp-report">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Report
                  </button>
                </div>
              </section>

              {/* 5 KPI Summary Cards */}
              <section className="mp-kpis-grid" aria-label="Constituency Financial KPIs">
                <div className="mp-kpi-box" tabIndex={0}>
                  <span className="mp-kpi-title">Allocation</span>
                  <div className="mp-kpi-value">{mpData.kpis.allocation}</div>
                </div>
                <div className="mp-kpi-box" tabIndex={0}>
                  <span className="mp-kpi-title">Spent</span>
                  <div className="mp-kpi-value">{mpData.kpis.spent}</div>
                </div>
                <div className="mp-kpi-box" tabIndex={0}>
                  <span className="mp-kpi-title">Utilization</span>
                  <div className="mp-kpi-value" style={{ color: 'var(--teal-700)' }}>{mpData.kpis.utilization}</div>
                </div>
                <div className="mp-kpi-box" tabIndex={0}>
                  <span className="mp-kpi-title">Total Projects</span>
                  <div className="mp-kpi-value">{mpData.kpis.projects}</div>
                </div>
                <div className="mp-kpi-box attention-highlight" tabIndex={0}>
                  <span className="mp-kpi-title" style={{ color: 'var(--rose-600)' }}>Attention</span>
                  <div className="mp-kpi-value" style={{ color: 'var(--rose-600)' }}>{mpData.kpis.attention}</div>
                </div>
              </section>

              {/* 3 Interactive Charts Row */}
              <section className="mp-charts-3col-grid" aria-label="Constituency Data Analytics">
                {/* 1. Fund Utilization Bar */}
                <article className="chart-card" id="mp-chart-fund" style={{ position: 'relative' }}>
                  <div className="chart-card-header">
                    <h2 className="chart-title">Fund Utilization</h2>
                  </div>
                  <div className="chart-container-svg" style={{ height: '190px' }}>
                    <svg width="100%" height="100%" viewBox="0 0 260 170" preserveAspectRatio="xMidYMid meet">
                      {/* Grid */}
                      <line x1="40" y1="20" x2="250" y2="20" stroke="#e2e8f0" strokeDasharray="3,3" />
                      <line x1="40" y1="70" x2="250" y2="70" stroke="#e2e8f0" strokeDasharray="3,3" />
                      <line x1="40" y1="120" x2="250" y2="120" stroke="#e2e8f0" strokeDasharray="3,3" />
                      <line x1="40" y1="145" x2="250" y2="145" stroke="#cbd5e1" />
                      <text x="32" y="24" fontSize="9" fill="#64748b" textAnchor="end">3 Cr</text>
                      <text x="32" y="74" fontSize="9" fill="#64748b" textAnchor="end">2 Cr</text>
                      <text x="32" y="124" fontSize="9" fill="#64748b" textAnchor="end">1 Cr</text>
                      <text x="32" y="148" fontSize="9" fill="#64748b" textAnchor="end">0</text>

                      {mpData.fundChart.map((item, idx) => {
                        const max = 3;
                        const h = (item.amount / max) * 125;
                        const x = 60 + (idx * 65);
                        const y = 145 - h;
                        const isHovered = hoveredBar?.label === item.label;

                        return (
                          <g
                            key={item.label}
                            tabIndex={0}
                            role="graphics-symbol"
                            aria-label={`${item.label}: ${item.display} (${item.pct})`}
                            onMouseEnter={() => setHoveredBar(item)}
                            onMouseLeave={() => setHoveredBar(null)}
                            onFocus={() => setHoveredBar(item)}
                            onBlur={() => setHoveredBar(null)}
                            style={{ cursor: 'pointer', outline: 'none' }}
                          >
                            <rect
                              x={x}
                              y={y}
                              width={32}
                              height={h}
                              fill={item.color}
                              rx="4"
                              opacity={hoveredBar && !isHovered ? 0.6 : 1}
                              style={{ transition: 'all 0.2s ease' }}
                            />
                            <text x={x + 16} y={y - 5} fontSize="9" fontWeight="700" fill="#0f172a" textAnchor="middle">{item.display}</text>
                            <text x={x + 16} y="158" fontSize="10" fontWeight="500" fill="#64748b" textAnchor="middle">{item.label}</text>
                          </g>
                        );
                      })}
                    </svg>

                    {hoveredBar && (
                      <div className="chart-interactive-tooltip" role="tooltip">
                        <div style={{ fontWeight: 700, color: '#fff' }}>{hoveredBar.label}</div>
                        <div style={{ color: '#99f6e4', fontSize: '0.8125rem' }}>{hoveredBar.display} ({hoveredBar.pct})</div>
                      </div>
                    )}
                  </div>
                </article>

                {/* 2. Project Status Donut */}
                <article className="chart-card" id="mp-chart-status">
                  <div className="chart-card-header">
                    <h2 className="chart-title">Project Status</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '190px', gap: '12px' }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      {(() => {
                        const total = mpData.statusChart.reduce((a, c) => a + c.count, 0);
                        const radius = 46;
                        const circum = 2 * Math.PI * radius;
                        let acc = 0;
                        return mpData.statusChart.map((s) => {
                          const dash = `${(s.percentage / 100) * circum} ${circum}`;
                          const offset = -((acc / 100) * circum);
                          acc += s.percentage;
                          const isHovered = hoveredStatusSlice?.status === s.status;

                          return (
                            <circle
                              key={s.status}
                              cx="60"
                              cy="60"
                              r={radius}
                              fill="transparent"
                              stroke={s.color}
                              strokeWidth={isHovered ? 22 : 18}
                              strokeDasharray={dash}
                              strokeDashoffset={offset}
                              transform="rotate(-90 60 60)"
                              tabIndex={0}
                              onMouseEnter={() => setHoveredStatusSlice(s)}
                              onMouseLeave={() => setHoveredStatusSlice(null)}
                              style={{ transition: 'all 0.2s ease', cursor: 'pointer', outline: 'none' }}
                            />
                          );
                        });
                      })()}
                      <circle cx="60" cy="60" r="32" fill="#fff" />
                      <text x="60" y="58" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">
                        {hoveredStatusSlice ? hoveredStatusSlice.count : 12}
                      </text>
                      <text x="60" y="70" textAnchor="middle" fontSize="8" fill="#64748b">
                        {hoveredStatusSlice ? hoveredStatusSlice.status : 'Total'}
                      </text>
                    </svg>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
                      {mpData.statusChart.map((s) => (
                        <div
                          key={s.status}
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredStatusSlice(s)}
                          onMouseLeave={() => setHoveredStatusSlice(null)}
                        >
                          <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: s.color }}></span>
                          <span style={{ color: 'var(--slate-700)' }}>{s.status}</span>
                          <span style={{ fontWeight: 700, marginLeft: 'auto' }}>{s.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                {/* 3. Project Categories Donut */}
                <article className="chart-card" id="mp-chart-categories">
                  <div className="chart-card-header">
                    <h2 className="chart-title">Project Categories</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '190px', gap: '12px' }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      {(() => {
                        const radius = 46;
                        const circum = 2 * Math.PI * radius;
                        let acc = 0;
                        return mpData.categoryChart.map((c) => {
                          const dash = `${(c.percentage / 100) * circum} ${circum}`;
                          const offset = -((acc / 100) * circum);
                          acc += c.percentage;
                          const isHovered = hoveredCatSlice?.category === c.category;

                          return (
                            <circle
                              key={c.category}
                              cx="60"
                              cy="60"
                              r={radius}
                              fill="transparent"
                              stroke={c.color}
                              strokeWidth={isHovered ? 22 : 18}
                              strokeDasharray={dash}
                              strokeDashoffset={offset}
                              transform="rotate(-90 60 60)"
                              tabIndex={0}
                              onMouseEnter={() => setHoveredCatSlice(c)}
                              onMouseLeave={() => setHoveredCatSlice(null)}
                              style={{ transition: 'all 0.2s ease', cursor: 'pointer', outline: 'none' }}
                            />
                          );
                        });
                      })()}
                      <circle cx="60" cy="60" r="32" fill="#fff" />
                      <text x="60" y="58" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">
                        {hoveredCatSlice ? hoveredCatSlice.count : 5}
                      </text>
                      <text x="60" y="70" textAnchor="middle" fontSize="8" fill="#64748b">
                        {hoveredCatSlice ? hoveredCatSlice.category : 'Sectors'}
                      </text>
                    </svg>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.6875rem' }}>
                      {mpData.categoryChart.map((c) => (
                        <div
                          key={c.category}
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredCatSlice(c)}
                          onMouseLeave={() => setHoveredCatSlice(null)}
                        >
                          <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: c.color }}></span>
                          <span style={{ color: 'var(--slate-700)' }}>{c.category}</span>
                          <span style={{ fontWeight: 700, marginLeft: 'auto' }}>{c.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </section>

              {/* Projects Table with Filters */}
              <section className="mp-projects-section" aria-label="Projects List">
                <div className="section-header-with-filters">
                  <h2 className="chart-title">Constituency Development Projects</h2>

                  {/* Filter Controls */}
                  <div className="filter-controls-cluster">
                    {/* Category Filter */}
                    <div className="filter-select-box">
                      <label htmlFor="mp-category-filter" className="sr-only">Filter by Category</label>
                      <select
                        id="mp-category-filter"
                        className="fy-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="All">All Categories</option>
                        <option value="Roads">Roads</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Water">Water</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div className="filter-select-box">
                      <label htmlFor="mp-status-filter" className="sr-only">Filter by Status</label>
                      <select
                        id="mp-status-filter"
                        className="fy-select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="All">All Statuses</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Delayed">Delayed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {filteredProjects.length === 0 ? (
                  <div className="attention-empty-state" role="status">
                    <div className="empty-state-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                    <h3 className="empty-state-title">No projects found</h3>
                    <p className="empty-state-text">No projects matched the selected filters.</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ marginTop: '10px' }}
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedStatus('All');
                        setSearchQuery('');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="responsive-table-wrapper">
                    <table className="mp-projects-table" aria-label="MP Projects List">
                      <thead>
                        <tr>
                          <th>Project Name</th>
                          <th>Category</th>
                          <th>Allocated</th>
                          <th>Spent</th>
                          <th>Progress</th>
                          <th>Status</th>
                          <th>Attention</th>
                          <th>Deadline / Phase</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProjects.map((p) => {
                          const attentionClass =
                            p.attention === 'High'
                              ? 'badge-high'
                              : p.attention === 'Medium'
                              ? 'badge-medium'
                              : p.attention === 'Low'
                              ? 'badge-low'
                              : 'badge-completed';

                          const statusClass =
                            p.status === 'Completed'
                              ? 'badge-completed'
                              : p.status === 'Ongoing'
                              ? 'badge-ongoing'
                              : 'badge-low';

                          return (
                            <tr
                              key={p.id}
                              className="clickable-project-row"
                              tabIndex={0}
                              role="button"
                              aria-label={`Open project details for ${p.title}`}
                              onClick={() => handleRowClick(p.id, p.title)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleRowClick(p.id, p.title);
                                }
                              }}
                            >
                              <td>
                                <span className="table-project-name">{p.title}</span>
                              </td>
                              <td>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--slate-600)' }}>{p.category}</span>
                              </td>
                              <td>
                                <span className="table-num">{p.allocated}</span>
                              </td>
                              <td>
                                <span className="table-num">{p.spent}</span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div className="progress-track" style={{ width: '60px', height: '6px' }}>
                                    <div className="progress-fill" style={{ width: `${p.progress}%` }}></div>
                                  </div>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{p.progress}%</span>
                                </div>
                              </td>
                              <td>
                                <span className={`badge ${statusClass}`} style={{ fontSize: '0.6875rem' }}>
                                  {p.status}
                                </span>
                              </td>
                              <td>
                                <span className={`badge ${attentionClass}`} style={{ fontSize: '0.6875rem' }}>
                                  {p.attention}
                                </span>
                              </td>
                              <td>
                                <span style={{ fontSize: '0.75rem', color: p.deadline.includes('overdue') ? 'var(--rose-600)' : 'var(--slate-500)', fontWeight: p.deadline.includes('overdue') ? 700 : 500 }}>
                                  {p.deadline}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
