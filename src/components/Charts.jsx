import React from 'react';

/**
 * Responsive Interactive Charts Component (SVG-based)
 * - Fund Utilization (Bar Chart)
 * - Project Status (Donut Chart)
 * - Fund Utilization Over Time (Line Chart)
 */

export function FundUtilizationChart({ data }) {
  const maxVal = 15; // 15 Cr max scale
  const barWidth = 38;
  const startX = 65;
  const gap = 70;

  return (
    <article className="chart-card" id="chart-fund-utilization">
      <div className="chart-card-header">
        <h2 className="chart-title">Fund Utilization</h2>
      </div>

      <div className="chart-container-svg">
        <svg width="100%" height="100%" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet">
          {/* Y-Axis Grid Lines & Labels */}
          <g className="grid-lines" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3">
            <line x1="45" y1="20" x2="310" y2="20" />
            <line x1="45" y1="65" x2="310" y2="65" />
            <line x1="45" y1="110" x2="310" y2="110" />
            <line x1="45" y1="155" x2="310" y2="155" />
            <line x1="45" y1="190" x2="310" y2="190" strokeDasharray="none" stroke="#cbd5e1" />
          </g>

          <g className="y-labels" fontSize="10" fill="#64748b" textAnchor="end" fontFamily="Inter, sans-serif">
            <text x="38" y="24">15 Cr</text>
            <text x="38" y="69">10 Cr</text>
            <text x="38" y="114">5 Cr</text>
            <text x="38" y="193">0</text>
          </g>

          {/* Bars */}
          {data.map((item, idx) => {
            const h = (item.amount / maxVal) * 170;
            const x = startX + (idx * gap);
            const y = 190 - h;
            return (
              <g key={item.label} className="bar-group" tabIndex="0">
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  fill={item.color}
                  rx="4"
                  className="chart-bar"
                  style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                  data-label={item.label}
                  data-val={item.display}
                >
                  <title>{`${item.label}: ${item.display}`}</title>
                </rect>
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  fontSize="10"
                  fontWeight="700"
                  fill="#0f172a"
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                >
                  {item.display}
                </text>
                <text
                  x={x + barWidth / 2}
                  y="206"
                  fontSize="11"
                  fontWeight="500"
                  fill="#64748b"
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </article>
  );
}

export function ProjectStatusChart({ data }) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  const size = 160;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <article className="chart-card" id="chart-project-status">
      <div className="chart-card-header">
        <h2 className="chart-title">Project Status</h2>
      </div>

      <div className="donut-chart-wrapper">
        <div className="donut-svg-box">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {data.map((item) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += item.percentage;

              return (
                <circle
                  key={item.status}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-width 0.2s ease', cursor: 'pointer' }}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                >
                  <title>{`${item.status}: ${item.count} (${item.percentage}%)`}</title>
                </circle>
              );
            })}
            <circle cx={size / 2} cy={size / 2} r={radius - strokeWidth / 2 - 2} fill="#ffffff" />
            <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fontSize="18" fontWeight="800" fill="#0f172a" fontFamily="Inter, sans-serif">
              {total}
            </text>
            <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize="10" fontWeight="500" fill="#64748b" fontFamily="Inter, sans-serif">
              Projects
            </text>
          </svg>
        </div>

        <div className="donut-legend-list">
          {data.map((item) => (
            <div key={item.status} className="donut-legend-row">
              <div className="donut-legend-label">
                <span className="legend-color-dot" style={{ backgroundColor: item.color }}></span>
                <span>{item.status}</span>
              </div>
              <div>
                <span className="donut-legend-count">{item.count}</span>
                <span className="donut-legend-pct">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function UtilizationOverTimeChart({ data }) {
  const points = [
    { x: 60, y: 175 - (45 / 100) * 140, val: "45%", year: "2022–23" },
    { x: 140, y: 175 - (55 / 100) * 140, val: "55%", year: "2023–24" },
    { x: 220, y: 175 - (63 / 100) * 140, val: "63%", year: "2024–25" },
    { x: 300, y: 175 - (70 / 100) * 140, val: "70%", year: "2025–26" }
  ];

  const pathD = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`;
  const areaD = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y} L ${points[3].x} 175 L ${points[0].x} 175 Z`;

  return (
    <article className="chart-card" id="chart-utilization-trend">
      <div className="chart-card-header">
        <h2 className="chart-title">Fund Utilization Over Time</h2>
      </div>

      <div className="chart-container-svg">
        <svg width="100%" height="100%" viewBox="0 0 340 220" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Y Grid lines */}
          <g stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3">
            <line x1="45" y1="35" x2="325" y2="35" />
            <line x1="45" y1="70" x2="325" y2="70" />
            <line x1="45" y1="105" x2="325" y2="105" />
            <line x1="45" y1="140" x2="325" y2="140" />
            <line x1="45" y1="175" x2="325" y2="175" strokeDasharray="none" stroke="#cbd5e1" />
          </g>

          {/* Y Labels */}
          <g fontSize="10" fill="#64748b" textAnchor="end" fontFamily="Inter, sans-serif">
            <text x="38" y="39">100%</text>
            <text x="38" y="74">75%</text>
            <text x="38" y="109">50%</text>
            <text x="38" y="144">25%</text>
            <text x="38" y="178">0%</text>
          </g>

          {/* Area Gradient */}
          <path d={areaD} fill="url(#areaGradient)" />

          {/* Line */}
          <path d={pathD} fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Points and Labels */}
          {points.map((p) => (
            <g key={p.year} className="chart-point-group" style={{ cursor: 'pointer' }}>
              <circle cx={p.x} cy={p.y} r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
              <text x={p.x} y={p.y - 10} fontSize="11" fontWeight="700" fill="#0f172a" textAnchor="middle" fontFamily="Inter, sans-serif">
                {p.val}
              </text>
              <text x={p.x} y="196" fontSize="11" fontWeight="500" fill="#64748b" textAnchor="middle" fontFamily="Inter, sans-serif">
                {p.year}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </article>
  );
}
