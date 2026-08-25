import React from 'react';

/**
 * Attention Section, Item & Project Modal Component
 */

export function AttentionSection({ projects, searchQuery = "", onSelectProject, onViewAll }) {
  const filtered = !searchQuery.trim()
    ? projects
    : projects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.constituency.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <article className="attention-section-card" id="section-attention-projects">
      <div className="attention-section-header">
        <h2 className="chart-title">Projects that may need attention</h2>
        <button
          type="button"
          className="btn-ghost external-module-btn"
          onClick={onViewAll}
          style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--teal-600)' }}
        >
          View all
        </button>
      </div>

      <div className="attention-list-wrapper" id="attention-projects-list">
        {filtered.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--slate-500)', fontSize: '0.875rem' }}>
            No attention projects match "{searchQuery}".
          </div>
        ) : (
          filtered.map((proj) => (
            <AttentionItem
              key={proj.id}
              proj={proj}
              onClick={() => onSelectProject && onSelectProject(proj)}
            />
          ))
        )}
      </div>
    </article>
  );
}

export function AttentionItem({ proj, onClick }) {
  const badgeClass =
    proj.severityClass === 'severity-high'
      ? 'badge-high'
      : proj.severityClass === 'severity-medium'
      ? 'badge-medium'
      : 'badge-low';

  return (
    <div
      className="attention-item-row"
      data-project-id={proj.id}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${proj.title}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      <div className="attention-item-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <span className={`badge ${badgeClass}`} style={{ fontSize: '0.625rem', padding: '1px 6px' }}>
            {proj.severity}
          </span>
        </div>
        <span className="attention-item-title">{proj.title}</span>
        <span className="attention-item-loc">{proj.location}</span>
      </div>

      <div className="attention-item-progress-box">
        <div className="progress-track" style={{ width: '90px', height: '6px' }}>
          <div className="progress-fill" style={{ width: `${proj.progress}%` }}></div>
        </div>
        <span className="attention-progress-pct">{proj.progress}%</span>
      </div>

      <div className="attention-item-right">
        <span className="attention-overdue-tag">{proj.overdueDays} days overdue</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--slate-400)' }}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}

export function ProjectSignalModal({ project, onClose }) {
  if (!project) return null;

  const badgeClass =
    project.severityClass === 'severity-high'
      ? 'badge-high'
      : project.severityClass === 'severity-medium'
      ? 'badge-medium'
      : 'badge-low';

  return (
    <div
      className="modal-backdrop"
      id="project-detail-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-close"
          id="btn-close-modal"
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className={`badge ${badgeClass}`}>{project.severity}</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>{project.constituency}</span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '4px' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginBottom: '16px' }}>
          {project.location}
        </p>

        {/* Progress Summary */}
        <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--slate-500)' }}>Allocated</div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--slate-900)' }}>{project.allocated}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--slate-500)' }}>Spent</div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--slate-900)' }}>{project.spent}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--slate-500)' }}>Physical Progress</div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--teal-700)' }}>{project.progress}%</div>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>

        {/* Attention Signals */}
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '8px' }}>
            Why does this project need attention?
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {project.signals?.map((sig, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--slate-700)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--rose-500)', flexShrink: 0 }}></span>
                <span>{sig}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Neutrality Note */}
        <div className="login-disclaimer-box" style={{ marginBottom: '18px' }}>
          <div className="login-disclaimer-text">
            <strong>Data Signal Context:</strong> These indicators suggest that the project may require administrative follow-up or verification. This is not a finding of wrongdoing.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" className="btn btn-secondary" id="btn-modal-close-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
