import React from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import { getLandingData } from '../data/mockData.js';

function getFeatureIcon(type) {
  switch (type) {
    case 'fund':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      );
    case 'monitoring':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'alerts':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'evidence':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export function LandingPage() {
  const data = getLandingData();

  return (
    <div className="landing-page">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="landing-hero" aria-label="Hero Section">
          <div className="hero-content">
            <h1 className="hero-title">
              Track where <span className="hero-title-accent">public funds</span> are going.
            </h1>
            <p className="hero-desc">
              Monitor allocations, project progress, utilization and evidence — and quickly identify projects that may need attention.
            </p>
            <div className="hero-actions">
              <a href="#/dashboard" className="btn btn-primary" id="hero-btn-explore">Explore Dashboard</a>
              <a href="#how-it-works" className="btn btn-secondary" id="hero-btn-how">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                How It Works
              </a>
            </div>
          </div>

          {/* Hero Visual: Perspective Dashboard Preview */}
          <div className="hero-visual-wrapper">
            <div className="hero-preview-card">
              <div className="preview-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', background: '#0f172a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14b8a6', fontSize: '10px', fontWeight: 800 }}>
                    CT
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>CivicTrack Preview</span>
                </div>
                <span className="badge badge-attention" style={{ fontSize: '0.6875rem' }}>2 projects may need attention</span>
              </div>

              {/* Preview KPIs */}
              <div className="preview-kpis">
                <div className="preview-kpi-item">
                  <div className="preview-kpi-label">Allocated</div>
                  <div className="preview-kpi-val">₹12.4 Cr</div>
                </div>
                <div className="preview-kpi-item">
                  <div className="preview-kpi-label">Spent</div>
                  <div className="preview-kpi-val">₹8.7 Cr</div>
                </div>
                <div className="preview-kpi-item">
                  <div className="preview-kpi-label">Remaining</div>
                  <div className="preview-kpi-val">₹3.7 Cr</div>
                </div>
                <div className="preview-kpi-item">
                  <div className="preview-kpi-label">Projects</div>
                  <div className="preview-kpi-val" style={{ color: '#dc2626' }}>48</div>
                </div>
              </div>

              {/* Preview Charts Mini */}
              <div className="preview-charts-grid">
                <div className="preview-chart-box">
                  <div className="preview-chart-title">Utilization Over Time</div>
                  <svg width="100%" height="80" viewBox="0 0 200 80">
                    <polyline fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" points="20,60 70,48 120,38 175,25" />
                    <circle cx="20" cy="60" r="3" fill="#fff" stroke="#0284c7" strokeWidth="2" />
                    <circle cx="70" cy="48" r="3" fill="#fff" stroke="#0284c7" strokeWidth="2" />
                    <circle cx="120" cy="38" r="3" fill="#fff" stroke="#0284c7" strokeWidth="2" />
                    <circle cx="175" cy="25" r="3" fill="#fff" stroke="#0284c7" strokeWidth="2" />
                    <text x="20" y="74" fontSize="8" fill="#94a3b8" textAnchor="middle">2022-23</text>
                    <text x="175" y="74" fontSize="8" fill="#94a3b8" textAnchor="middle">2025-26</text>
                  </svg>
                </div>
                <div className="preview-chart-box">
                  <div className="preview-chart-title">Project Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px' }}>
                    <svg width="70" height="70" viewBox="0 0 70 70">
                      <circle cx="35" cy="35" r="24" fill="transparent" stroke="#059669" strokeWidth="10" strokeDasharray="65 150" strokeDashoffset="0" />
                      <circle cx="35" cy="35" r="24" fill="transparent" stroke="#2563eb" strokeWidth="10" strokeDasharray="55 150" strokeDashoffset="-65" />
                      <circle cx="35" cy="35" r="24" fill="transparent" stroke="#f59e0b" strokeWidth="10" strokeDasharray="20 150" strokeDashoffset="-120" />
                      <circle cx="35" cy="35" r="24" fill="transparent" stroke="#dc2626" strokeWidth="10" strokeDasharray="10 150" strokeDashoffset="-140" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Landing Metrics Section */}
        <section className="landing-metrics-section" id="metrics" aria-label="Key Metrics">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">{data.metrics.fundsTracked}</div>
              <div className="metric-label">Funds Tracked</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{data.metrics.projectsMonitored}</div>
              <div className="metric-label">Projects Monitored</div>
            </div>
            <div className="metric-card attention">
              <div className="metric-value">{data.metrics.projectsNeedingAttention}</div>
              <div className="metric-label">Projects Needing Attention</div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="landing-features-section" id="features" aria-label="Platform Features">
          <div className="features-grid">
            {data.features.map((f) => (
              <div key={f.id} className="feature-card">
                <div className="feature-icon-wrapper">
                  {getFeatureIcon(f.icon)}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="landing-how-section" id="how-it-works" aria-label="How It Works">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
          </div>

          <div className="steps-container">
            {data.howItWorks.map((step, idx) => (
              <React.Fragment key={step.step}>
                <div className="step-card">
                  <span className="step-number">{step.step}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-subtitle">{step.subtitle}</p>
                </div>
                {idx < data.howItWorks.length - 1 && (
                  <div className="step-arrow" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Attention Example Section */}
        <section className="landing-attention-example" aria-label="Explainable Attention Signals">
          <div className="attention-showcase-card">
            <div>
              <h2 className="showcase-left-heading">
                Not every anomaly is misconduct.<br />
                But every signal deserves context.
              </h2>
              <p className="showcase-left-subtext">
                CivicTrack automatically detects anomalies in project milestones, spending velocity, and physical verification to surface actionable data signals without political bias.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <a href="#/dashboard" className="btn btn-primary">See how it works</a>
              </div>
            </div>

            {/* Example Project Card */}
            <div className="showcase-project-box">
              <div className="showcase-box-header">
                <div>
                  <h3 className="showcase-box-title">{data.attentionExample.title}</h3>
                  <span className="showcase-box-loc">{data.attentionExample.location}</span>
                </div>
                <span className="badge badge-high">High Attention</span>
              </div>

              {/* Progress Bars */}
              <div className="showcase-progress-grid">
                <div className="showcase-progress-item">
                  <div className="showcase-progress-label">
                    <span>Financial Utilization</span>
                    <span>{data.attentionExample.financialUtilization}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill financial" style={{ width: `${data.attentionExample.financialUtilization}%` }}></div>
                  </div>
                </div>

                <div className="showcase-progress-item">
                  <div className="showcase-progress-label">
                    <span>Physical Progress</span>
                    <span>{data.attentionExample.physicalProgress}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${data.attentionExample.physicalProgress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Overdue Alert */}
              <div className="showcase-overdue-alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{data.attentionExample.overdueDays} days overdue</span>
              </div>

              {/* 3 Attention signals */}
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-800)' }}>
                3 attention signals:
              </div>
              <ul className="showcase-signals-list">
                {data.attentionExample.signals.map((s, idx) => (
                  <li key={idx} className="showcase-signal-item">
                    <span className="signal-dot"></span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '0.5rem' }}>
                <a href="#/dashboard" className="btn btn-primary" style={{ width: '100%' }}>See how it works</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
