import React from 'react';

/**
 * KPI Cards Grid Component
 * Supports live data rendering and skeleton loading placeholders
 */
export function KPICardGrid({ kpis, isLoading = false }) {
  if (isLoading) {
    return (
      <section className="kpi-cards-grid" aria-label="Loading Key Performance Indicators" aria-busy="true">
        {[1, 2, 3, 4].map((n) => (
          <article key={n} className="kpi-card skeleton-card">
            <div className="skeleton skeleton-label" style={{ width: '40%', height: '14px', marginBottom: '12px' }}></div>
            <div className="skeleton skeleton-value" style={{ width: '60%', height: '32px', marginBottom: '12px' }}></div>
            <div className="skeleton skeleton-badge" style={{ width: '50%', height: '18px' }}></div>
          </article>
        ))}
      </section>
    );
  }

  if (!kpis) return null;

  return (
    <section className="kpi-cards-grid" aria-label="Key Performance Indicators">
      {/* 1. Total Allocation */}
      <article className="kpi-card" id="kpi-allocation" tabIndex={0} aria-label={`Total Allocation: ${kpis.totalAllocation?.value}, ${kpis.totalAllocation?.subtext}`}>
        <div className="kpi-header">
          <span className="kpi-label">Total Allocation</span>
        </div>
        <div className="kpi-value">{kpis.totalAllocation?.value}</div>
        <div className="kpi-footer">
          <span className="badge badge-positive">{kpis.totalAllocation?.subtext}</span>
        </div>
      </article>

      {/* 2. Total Expenditure */}
      <article className="kpi-card" id="kpi-expenditure" tabIndex={0} aria-label={`Total Expenditure: ${kpis.totalExpenditure?.value}, ${kpis.totalExpenditure?.subtext}`}>
        <div className="kpi-header">
          <span className="kpi-label">Total Expenditure</span>
        </div>
        <div className="kpi-value">{kpis.totalExpenditure?.value}</div>
        <div className="kpi-footer" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
          <span className="kpi-footer-subtext"><strong>{kpis.totalExpenditure?.subtext}</strong></span>
          <div className="kpi-progress-bar" style={{ width: '100%' }}>
            <div className="kpi-progress-fill" style={{ width: `${kpis.totalExpenditure?.progress || 0}%` }}></div>
          </div>
        </div>
      </article>

      {/* 3. Remaining */}
      <article className="kpi-card" id="kpi-remaining" tabIndex={0} aria-label={`Remaining Funds: ${kpis.remaining?.value}, ${kpis.remaining?.subtext}`}>
        <div className="kpi-header">
          <span className="kpi-label">Remaining</span>
        </div>
        <div className="kpi-value">{kpis.remaining?.value}</div>
        <div className="kpi-footer">
          <span className="kpi-footer-subtext">{kpis.remaining?.subtext}</span>
        </div>
      </article>

      {/* 4. Projects & Attention */}
      <article className="kpi-card" id="kpi-projects" tabIndex={0} aria-label={`Total Projects: ${kpis.projects?.value}, ${kpis.projects?.subtext}`}>
        <div className="kpi-header">
          <span className="kpi-label">Projects</span>
          <span className="kpi-alert-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" strokeWidth="1.5">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" stroke="#fff" strokeWidth="2" />
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="#fff" strokeWidth="2" />
            </svg>
          </span>
        </div>
        <div className="kpi-value">{kpis.projects?.value}</div>
        <div className="kpi-footer">
          <span className="badge badge-attention">{kpis.projects?.subtext}</span>
        </div>
      </article>
    </section>
  );
}
