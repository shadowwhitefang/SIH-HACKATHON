import React, { useState } from 'react';

/**
 * Responsive Interactive Charts Component (SVG-based)
 * - Fund Utilization (Bar Chart) with exact value hover tooltips & FY response
 * - Project Status (Donut Chart) with interactive slice/legend highlights & exact value tooltips
 * - Fund Utilization Over Time (Line Chart) with active year highlight & data point tooltips
 */

export function FundUtilizationChart({ data, selectedYear }) {
  const [hoveredBar, setHoveredBar] = useState(null);
  const maxVal = 15; // 15 Cr scale
  const barWidth = 42;
  const startX = 70;
  const gap = 75;

  return (
    <article className="chart-card" id="chart-fund-utilization" aria-label={`Fund Utilization breakdown for FY ${selectedYear}`}>
      <div className="chart-card-header">
        <h2 className="chart-title">Fund Utilization</h2>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)' }}>
          FY {selectedYear}
        </span>
      </div>

      <div className="chart-container-svg" style={{ position: 'relative' }}>
        <svg width="100%" height="100%" viewBox="0 0 340 220" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Fund Utilization Bar Chart">
          {/* Y-Axis Grid Lines */}
          <g className="grid-lines" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3">
            <line x1="50" y1="25" x2="325" y2="25" />
            <line x1="50" y1="65" x2="325" y2="65" />
            <line x1="50" y1="105" x2="325" y2="105" />
            <line x1="50" y1="145" x2="325" y2="145" />
            <line x1="50" y1="185" x2="325" y2="185" strokeDasharray="none" stroke="#cbd5e1" />
          </g>

          {/* Y-Labels */}
          <g className="y-labels" fontSize="10" fill="#64748b" textAnchor="end" fontFamily="Inter, sans-serif">
            <text x="42" y="29">15 Cr</text>
            <text x="42" y="69">10 Cr</text>
            <text x="42" y="109">5 Cr</text>
            <text x="42" y="188">0</text>
          </g>

          {/* Bars */}
          {data.map((item, idx) => {
            const h = (item.amount / maxVal) * 160;
            const x = startX + (idx * gap);
            const y = 185 - h;
            const isHovered = hoveredBar?.label === item.label;

            return (
              <g
                key={item.label}
                className="bar-group"
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${item.label}: ${item.display} (${item.pct} of allocation)`}
                onMouseEnter={() => setHoveredBar(item)}
                onMouseLeave={() => setHoveredBar(null)}
                onFocus={() => setHoveredBar(item)}
                onBlur={() => setHoveredBar(null)}
                style={{ outline: 'none', cursor: 'pointer' }}
              >
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  fill={item.color}
                  rx="4"
                  className="chart-bar"
                  opacity={hoveredBar && !isHovered ? 0.6 : 1}
                  style={{
                    transition: 'all 0.25s ease',
                    filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'none'
                  }}
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  fontSize="11"
                  fontWeight="700"
                  fill="#0f172a"
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                >
                  {item.display}
                </text>
                <text
                  x={x + barWidth / 2}
                  y="202"
                  fontSize="11"
                  fontWeight="600"
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

        {/* Interactive Floating Tooltip */}
        {hoveredBar && (
          <div className="chart-interactive-tooltip" role="tooltip">
            <div style={{ fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
              {hoveredBar.label} Fund
            </div>
            <div style={{ color: '#99f6e4', fontSize: '0.875rem', fontWeight: 800 }}>
              {hoveredBar.display}
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.6875rem' }}>
              Share: {hoveredBar.pct}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function ProjectStatusChart({ data, selectedYear }) {
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <article className="chart-card" id="chart-project-status" aria-label={`Project Status breakdown for FY ${selectedYear}`}>
      <div className="chart-card-header">
        <h2 className="chart-title">Project Status</h2>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)' }}>
          FY {selectedYear}
        </span>
      </div>

      <div className="donut-chart-wrapper">
        <div className="donut-svg-box">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Project Status Donut Chart">
            {data.map((item) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += item.percentage;
              const isHovered = hoveredStatus?.status === item.status;

              return (
                <circle
                  key={item.status}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  tabIndex={0}
                  role="graphics-symbol"
                  aria-label={`${item.status}: ${item.count} projects (${item.percentage}%)`}
                  onMouseEnter={() => setHoveredStatus(item)}
                  onMouseLeave={() => setHoveredStatus(null)}
                  onFocus={() => setHoveredStatus(item)}
                  onBlur={() => setHoveredStatus(null)}
                  style={{
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    outline: 'none',
                    opacity: hoveredStatus && !isHovered ? 0.6 : 1
                  }}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              );
            })}
            <circle cx={size / 2} cy={size / 2} r={radius - strokeWidth / 2 - 2} fill="#ffffff" />
            <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fontSize="18" fontWeight="800" fill="#0f172a" fontFamily="Inter, sans-serif">
              {hoveredStatus ? hoveredStatus.count : total}
            </text>
            <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b" fontFamily="Inter, sans-serif">
              {hoveredStatus ? hoveredStatus.status : 'Projects'}
            </text>
          </svg>
        </div>

        <div className="donut-legend-list" role="list">
          {data.map((item) => {
            const isHovered = hoveredStatus?.status === item.status;
            return (
              <div
                key={item.status}
                className={`donut-legend-row ${isHovered ? 'legend-row-active' : ''}`}
                role="listitem"
                tabIndex={0}
                onMouseEnter={() => setHoveredStatus(item)}
                onMouseLeave={() => setHoveredStatus(null)}
                onFocus={() => setHoveredStatus(item)}
                onBlur={() => setHoveredStatus(null)}
                style={{ cursor: 'pointer', padding: '3px 6px', borderRadius: '4px', transition: 'background-color 0.15s ease' }}
              >
                <div className="donut-legend-label">
                  <span className="legend-color-dot" style={{ backgroundColor: item.color }}></span>
                  <span style={{ fontWeight: isHovered ? 700 : 500 }}>{item.status}</span>
                </div>
                <div>
                  <span className="donut-legend-count">{item.count}</span>
                  <span className="donut-legend-pct">({item.percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export function UtilizationOverTimeChart({ data, selectedYear }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const points = [
    { x: 55, y: 175 - (45 / 100) * 140, val: "45%", year: "2022–23", spent: "₹4.1 Cr", total: "₹9.1 Cr" },
    { x: 135, y: 175 - (55 / 100) * 140, val: "55%", year: "2023–24", spent: "₹5.4 Cr", total: "₹9.8 Cr" },
    { x: 215, y: 175 - (63 / 100) * 140, val: "63%", year: "2024–25", spent: "₹7.1 Cr", total: "₹11.2 Cr" },
    { x: 295, y: 175 - (70 / 100) * 140, val: "70%", year: "2025–26", spent: "₹8.7 Cr", total: "₹12.4 Cr" }
  ];

  const pathD = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`;
  const areaD = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y} L ${points[3].x} 175 L ${points[0].x} 175 Z`;

  return (
    <article className="chart-card" id="chart-utilization-trend" aria-label="Fund Utilization Over Time Trend">
      <div className="chart-card-header">
        <h2 className="chart-title">Fund Utilization Over Time</h2>
        <span className="badge badge-positive" style={{ fontSize: '0.6875rem' }}>
          4-Year Growth Trend
        </span>
      </div>

      <div className="chart-container-svg" style={{ position: 'relative' }}>
        <svg width="100%" height="100%" viewBox="0 0 340 220" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Line Chart: Fund Utilization Over Time">
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
          {points.map((p) => {
            const isCurrentYear = p.year === selectedYear;
            const isHovered = hoveredPoint?.year === p.year;

            return (
              <g
                key={p.year}
                className="chart-point-group"
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`FY ${p.year}: ${p.val} utilization (${p.spent} of ${p.total})`}
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
                onFocus={() => setHoveredPoint(p)}
                onBlur={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 7 : isCurrentYear ? 6 : 4.5}
                  fill={isCurrentYear ? "#0d9488" : "#ffffff"}
                  stroke={isCurrentYear ? "#0f766e" : "#0284c7"}
                  strokeWidth={isHovered ? 3.5 : 2.5}
                  style={{ transition: 'all 0.2s ease' }}
                />
                <text
                  x={p.x}
                  y={p.y - 10}
                  fontSize="11"
                  fontWeight="700"
                  fill={isCurrentYear ? "#0f766e" : "#0f172a"}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                >
                  {p.val}
                </text>
                <text
                  x={p.x}
                  y="196"
                  fontSize="11"
                  fontWeight={isCurrentYear ? "700" : "500"}
                  fill={isCurrentYear ? "#0f172a" : "#64748b"}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                >
                  {p.year}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div className="chart-interactive-tooltip" role="tooltip">
            <div style={{ fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
              Financial Year {hoveredPoint.year}
            </div>
            <div style={{ color: '#38bdf8', fontSize: '0.875rem', fontWeight: 800 }}>
              {hoveredPoint.val} Utilization
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.6875rem' }}>
              Expenditure: {hoveredPoint.spent} / {hoveredPoint.total}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
