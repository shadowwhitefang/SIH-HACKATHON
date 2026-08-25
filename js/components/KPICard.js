/**
 * KPI Cards Grid Component
 */

export function renderKPICards(kpis) {
  return `
    <section class="kpi-cards-grid" aria-label="Key Performance Indicators">
      <!-- 1. Total Allocation -->
      <article class="kpi-card" id="kpi-allocation">
        <div class="kpi-header">
          <span class="kpi-label">Total Allocation</span>
        </div>
        <div class="kpi-value">${kpis.totalAllocation.value}</div>
        <div class="kpi-footer">
          <span class="badge badge-positive">${kpis.totalAllocation.subtext}</span>
        </div>
      </article>

      <!-- 2. Total Expenditure -->
      <article class="kpi-card" id="kpi-expenditure">
        <div class="kpi-header">
          <span class="kpi-label">Total Expenditure</span>
        </div>
        <div class="kpi-value">${kpis.totalExpenditure.value}</div>
        <div class="kpi-footer" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <span class="kpi-footer-subtext"><strong>${kpis.totalExpenditure.subtext}</strong></span>
          <div class="kpi-progress-bar" style="width: 100%;">
            <div class="kpi-progress-fill" style="width: ${kpis.totalExpenditure.progress}%;"></div>
          </div>
        </div>
      </article>

      <!-- 3. Remaining -->
      <article class="kpi-card" id="kpi-remaining">
        <div class="kpi-header">
          <span class="kpi-label">Remaining</span>
        </div>
        <div class="kpi-value">${kpis.remaining.value}</div>
        <div class="kpi-footer">
          <span class="kpi-footer-subtext">${kpis.remaining.subtext}</span>
        </div>
      </article>

      <!-- 4. Projects & Attention -->
      <article class="kpi-card" id="kpi-projects">
        <div class="kpi-header">
          <span class="kpi-label">Projects</span>
          <span class="kpi-alert-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" stroke-width="1.5">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="#fff" stroke-width="2"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="#fff" stroke-width="2"/>
            </svg>
          </span>
        </div>
        <div class="kpi-value">${kpis.projects.value}</div>
        <div class="kpi-footer">
          <span class="badge badge-attention">${kpis.projects.subtext}</span>
        </div>
      </article>
    </section>
  `;
}
