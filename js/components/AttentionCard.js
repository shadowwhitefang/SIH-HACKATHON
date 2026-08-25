/**
 * Attention Section & Project Cards Component
 */

export function renderAttentionSection(projects) {
  return `
    <article class="attention-section-card" id="section-attention-projects">
      <div class="attention-section-header">
        <h2 class="chart-title">Projects that may need attention</h2>
        <button class="btn-ghost external-module-btn" data-module="Attention Center" data-owner="Frontend Developer 3" style="font-size: 0.8125rem; font-weight: 600; color: var(--teal-600);">
          View all
        </button>
      </div>

      <div class="attention-list-wrapper" id="attention-projects-list">
        ${projects.map(proj => renderAttentionItem(proj)).join('')}
      </div>
    </article>
  `;
}

export function renderAttentionItem(proj) {
  const badgeClass = proj.severityClass === 'severity-high' ? 'badge-high' : proj.severityClass === 'severity-medium' ? 'badge-medium' : 'badge-low';

  return `
    <div class="attention-item-row" data-project-id="${proj.id}" tabindex="0" role="button" aria-label="View details for ${proj.title}">
      <div class="attention-item-left">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
          <span class="badge ${badgeClass}" style="font-size: 0.625rem; padding: 1px 6px;">
            ${proj.severity}
          </span>
        </div>
        <span class="attention-item-title">${proj.title}</span>
        <span class="attention-item-loc">${proj.location}</span>
      </div>

      <div class="attention-item-progress-box">
        <div class="progress-track" style="width: 90px; height: 6px;">
          <div class="progress-fill" style="width: ${proj.progress}%;"></div>
        </div>
        <span class="attention-progress-pct">${proj.progress}%</span>
      </div>

      <div class="attention-item-right">
        <span class="attention-overdue-tag">${proj.overdueDays} days overdue</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--slate-400);">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
  `;
}

export function renderProjectSignalModal(proj) {
  return `
    <div class="modal-backdrop" id="project-detail-modal">
      <div class="modal-card">
        <button class="modal-close" id="btn-close-modal" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span class="badge ${proj.severityClass === 'severity-high' ? 'badge-high' : proj.severityClass === 'severity-medium' ? 'badge-medium' : 'badge-low'}">
            ${proj.severity}
          </span>
          <span style="font-size: 0.8125rem; color: var(--slate-500);">${proj.constituency}</span>
        </div>

        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--slate-900); margin-bottom: 4px;">
          ${proj.title}
        </h3>
        <p style="font-size: 0.875rem; color: var(--slate-500); margin-bottom: 16px;">
          ${proj.location}
        </p>

        <!-- Progress Summary -->
        <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; text-align: center; margin-bottom: 12px;">
            <div>
              <div style="font-size: 0.6875rem; color: var(--slate-500);">Allocated</div>
              <div style="font-size: 0.9375rem; font-weight: 700; color: var(--slate-900);">${proj.allocated}</div>
            </div>
            <div>
              <div style="font-size: 0.6875rem; color: var(--slate-500);">Spent</div>
              <div style="font-size: 0.9375rem; font-weight: 700; color: var(--slate-900);">${proj.spent}</div>
            </div>
            <div>
              <div style="font-size: 0.6875rem; color: var(--slate-500);">Physical Progress</div>
              <div style="font-size: 0.9375rem; font-weight: 700; color: var(--teal-700);">${proj.progress}%</div>
            </div>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${proj.progress}%;"></div>
          </div>
        </div>

        <!-- Attention Signals -->
        <div style="margin-bottom: 16px;">
          <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--slate-900); margin-bottom: 8px;">
            Why does this project need attention?
          </h4>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${proj.signals.map(sig => `
              <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--slate-700);">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--rose-500); flex-shrink: 0;"></span>
                <span>${sig}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Neutrality Note -->
        <div class="login-disclaimer-box" style="margin-bottom: 18px;">
          <div class="login-disclaimer-text">
            <strong>Data Signal Context:</strong> These indicators suggest that the project may require administrative follow-up or verification. This is not a finding of wrongdoing.
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn btn-secondary" id="btn-modal-close-action">Close</button>
        </div>
      </div>
    </div>
  `;
}
