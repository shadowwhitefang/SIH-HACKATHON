/**
 * Responsive Interactive Charts Component (SVG-based)
 * - Fund Utilization (Bar Chart)
 * - Project Status (Donut Chart)
 * - Fund Utilization Over Time (Line Chart)
 */

export function renderFundUtilizationChart(data) {
  const maxVal = 15; // 15 Cr max scale
  const chartHeight = 160;
  const barWidth = 38;
  const startX = 65;
  const gap = 70;

  return `
    <article class="chart-card" id="chart-fund-utilization">
      <div class="chart-card-header">
        <h2 class="chart-title">Fund Utilization</h2>
      </div>

      <div class="chart-container-svg">
        <svg width="100%" height="100%" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet">
          <!-- Y-Axis Grid Lines & Labels -->
          <g class="grid-lines" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3">
            <line x1="45" y1="20" x2="310" y2="20" />
            <line x1="45" y1="65" x2="310" y2="65" />
            <line x1="45" y1="110" x2="310" y2="110" />
            <line x1="45" y1="155" x2="310" y2="155" />
            <line x1="45" y1="190" x2="310" y2="190" stroke-dasharray="none" stroke="#cbd5e1"/>
          </g>

          <g class="y-labels" font-size="10" fill="#64748b" text-anchor="end" font-family="Inter, sans-serif">
            <text x="38" y="24">15 Cr</text>
            <text x="38" y="69">10 Cr</text>
            <text x="38" y="114">5 Cr</text>
            <text x="38" y="193">0</text>
          </g>

          <!-- Bars -->
          ${data.map((item, idx) => {
            const h = (item.amount / maxVal) * 170;
            const x = startX + (idx * gap);
            const y = 190 - h;
            return `
              <g class="bar-group" tabindex="0">
                <rect 
                  x="${x}" 
                  y="${y}" 
                  width="${barWidth}" 
                  height="${h}" 
                  fill="${item.color}" 
                  rx="4"
                  class="chart-bar"
                  style="transition: all 0.3s ease; cursor: pointer;"
                  data-label="${item.label}"
                  data-val="${item.display}"
                >
                  <title>${item.label}: ${item.display}</title>
                </rect>
                <text 
                  x="${x + barWidth/2}" 
                  y="${y - 6}" 
                  font-size="10" 
                  font-weight="700" 
                  fill="#0f172a" 
                  text-anchor="middle"
                  font-family="Inter, sans-serif"
                >
                  ${item.display}
                </text>
                <text 
                  x="${x + barWidth/2}" 
                  y="206" 
                  font-size="11" 
                  font-weight="500" 
                  fill="#64748b" 
                  text-anchor="middle"
                  font-family="Inter, sans-serif"
                >
                  ${item.label}
                </text>
              </g>
            `;
          }).join('')}
        </svg>
      </div>
    </article>
  `;
}

export function renderProjectStatusChart(data) {
  // Total 48 projects
  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  const size = 160;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativePercent = 0;

  const slices = data.map((item) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += item.percentage;

    return `
      <circle 
        cx="${size/2}" 
        cy="${size/2}" 
        r="${radius}" 
        fill="transparent" 
        stroke="${item.color}" 
        stroke-width="${strokeWidth}" 
        stroke-dasharray="${strokeDasharray}" 
        stroke-dashoffset="${strokeDashoffset}"
        style="transition: stroke-width 0.2s ease; cursor: pointer;"
        transform="rotate(-90 ${size/2} ${size/2})"
      >
        <title>${item.status}: ${item.count} (${item.percentage}%)</title>
      </circle>
    `;
  }).join('');

  return `
    <article class="chart-card" id="chart-project-status">
      <div class="chart-card-header">
        <h2 class="chart-title">Project Status</h2>
      </div>

      <div class="donut-chart-wrapper">
        <div class="donut-svg-box">
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
            ${slices}
            <circle cx="${size/2}" cy="${size/2}" r="${radius - strokeWidth/2 - 2}" fill="#ffffff"/>
            <text x="${size/2}" y="${size/2 - 2}" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a" font-family="Inter, sans-serif">48</text>
            <text x="${size/2}" y="${size/2 + 14}" text-anchor="middle" font-size="10" font-weight="500" fill="#64748b" font-family="Inter, sans-serif">Projects</text>
          </svg>
        </div>

        <div class="donut-legend-list">
          ${data.map(item => `
            <div class="donut-legend-row">
              <div class="donut-legend-label">
                <span class="legend-color-dot" style="background-color: ${item.color};"></span>
                <span>${item.status}</span>
              </div>
              <div>
                <span class="donut-legend-count">${item.count}</span>
                <span class="donut-legend-pct">(${item.percentage}%)</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </article>
  `;
}

export function renderUtilizationOverTimeChart(data) {
  // Coordinates mapped to SVG 340 x 200
  // X: 50, 130, 210, 290
  // Y: 0%=175, 25%=140, 50%=105, 75%=70, 100%=35
  const points = [
    { x: 60, y: 175 - (45/100)*140, val: "45%", year: "2022–23" },
    { x: 140, y: 175 - (55/100)*140, val: "55%", year: "2023–24" },
    { x: 220, y: 175 - (63/100)*140, val: "63%", year: "2024–25" },
    { x: 300, y: 175 - (70/100)*140, val: "70%", year: "2025–26" }
  ];

  const pathD = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`;
  const areaD = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y} L ${points[3].x} 175 L ${points[0].x} 175 Z`;

  return `
    <article class="chart-card" id="chart-utilization-trend">
      <div class="chart-card-header">
        <h2 class="chart-title">Fund Utilization Over Time</h2>
      </div>

      <div class="chart-container-svg">
        <svg width="100%" height="100%" viewBox="0 0 340 220" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.0"/>
            </linearGradient>
          </defs>

          <!-- Y Grid lines -->
          <g stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3">
            <line x1="45" y1="35" x2="325" y2="35" />
            <line x1="45" y1="70" x2="325" y2="70" />
            <line x1="45" y1="105" x2="325" y2="105" />
            <line x1="45" y1="140" x2="325" y2="140" />
            <line x1="45" y1="175" x2="325" y2="175" stroke-dasharray="none" stroke="#cbd5e1" />
          </g>

          <!-- Y Labels -->
          <g font-size="10" fill="#64748b" text-anchor="end" font-family="Inter, sans-serif">
            <text x="38" y="39">100%</text>
            <text x="38" y="74">75%</text>
            <text x="38" y="109">50%</text>
            <text x="38" y="144">25%</text>
            <text x="38" y="178">0%</text>
          </g>

          <!-- Area Gradient -->
          <path d="${areaD}" fill="url(#areaGradient)" />

          <!-- Line -->
          <path d="${pathD}" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

          <!-- Points and Labels -->
          ${points.map((p) => `
            <g class="chart-point-group" style="cursor: pointer;">
              <circle cx="${p.x}" cy="${p.y}" r="5" fill="#ffffff" stroke="#0284c7" stroke-width="2.5" />
              <text x="${p.x}" y="${p.y - 10}" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle" font-family="Inter, sans-serif">
                ${p.val}
              </text>
              <text x="${p.x}" y="196" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle" font-family="Inter, sans-serif">
                ${p.year}
              </text>
            </g>
          `).join('')}
        </svg>
      </div>
    </article>
  `;
}
