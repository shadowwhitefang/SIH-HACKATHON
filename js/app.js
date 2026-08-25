/**
 * CivicTrack Frontend Application Entry
 * Frontend Developer 1: Landing Page, Login Page, Dashboard / Overview
 */

import { mockData, getOverviewData, getLandingData, loginUser, logoutUser, isUserAuthenticated } from './data/mockData.js';
import { Router } from './router.js';
import { renderNavbar } from './components/Navbar.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderTopbar } from './components/Topbar.js';
import { renderKPICards } from './components/KPICard.js';
import { renderFundUtilizationChart, renderProjectStatusChart, renderUtilizationOverTimeChart } from './components/Charts.js';
import { renderAttentionSection, renderAttentionItem, renderProjectSignalModal } from './components/AttentionCard.js';
import { renderFooter } from './components/Footer.js';

// Application State
const appState = {
  selectedYear: "2025–26",
  searchQuery: "",
  activeModal: null
};

// Toast notification helper
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span style="display: flex; align-items: center; color: ${type === 'success' ? '#10b981' : type === 'alert' ? '#ef4444' : '#38bdf8'};">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    </span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// -------------------------------------------------------------
// PAGE 1: LANDING PAGE VIEW
// -------------------------------------------------------------
function renderLandingPage(container) {
  const data = getLandingData();

  container.innerHTML = `
    <div class="landing-page">
      ${renderNavbar()}

      <main>
        <!-- Hero Section -->
        <section class="landing-hero" aria-label="Hero Section">
          <div class="hero-content">
            <h1 class="hero-title">
              Track where <span class="hero-title-accent">public funds</span> are going.
            </h1>
            <p class="hero-desc">
              Monitor allocations, project progress, utilization and evidence — and quickly identify projects that may need attention.
            </p>
            <div class="hero-actions">
              <a href="#/dashboard" class="btn btn-primary" id="hero-btn-explore">Explore Dashboard</a>
              <a href="#how-it-works" class="btn btn-secondary" id="hero-btn-how">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                How It Works
              </a>
            </div>
          </div>

          <!-- Hero Visual: Perspective Dashboard Preview -->
          <div class="hero-visual-wrapper">
            <div class="hero-preview-card">
              <div class="preview-topbar">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="width: 20px; height: 20px; background: #0f172a; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #14b8a6; font-size: 10px; font-weight: 800;">
                    CT
                  </div>
                  <span style="font-size: 0.75rem; font-weight: 700; color: #0f172a;">CivicTrack Preview</span>
                </div>
                <span class="badge badge-attention" style="font-size: 0.6875rem;">2 projects may need attention</span>
              </div>

              <!-- Preview KPIs -->
              <div class="preview-kpis">
                <div class="preview-kpi-item">
                  <div class="preview-kpi-label">Allocated</div>
                  <div class="preview-kpi-val">₹12.4 Cr</div>
                </div>
                <div class="preview-kpi-item">
                  <div class="preview-kpi-label">Spent</div>
                  <div class="preview-kpi-val">₹8.7 Cr</div>
                </div>
                <div class="preview-kpi-item">
                  <div class="preview-kpi-label">Remaining</div>
                  <div class="preview-kpi-val">₹3.7 Cr</div>
                </div>
                <div class="preview-kpi-item">
                  <div class="preview-kpi-label">Projects</div>
                  <div class="preview-kpi-val" style="color: #dc2626;">48</div>
                </div>
              </div>

              <!-- Preview Charts Mini -->
              <div class="preview-charts-grid">
                <div class="preview-chart-box">
                  <div class="preview-chart-title">Utilization Over Time</div>
                  <svg width="100%" height="80" viewBox="0 0 200 80">
                    <polyline fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" points="20,60 70,48 120,38 175,25" />
                    <circle cx="20" cy="60" r="3" fill="#fff" stroke="#0284c7" stroke-width="2"/>
                    <circle cx="70" cy="48" r="3" fill="#fff" stroke="#0284c7" stroke-width="2"/>
                    <circle cx="120" cy="38" r="3" fill="#fff" stroke="#0284c7" stroke-width="2"/>
                    <circle cx="175" cy="25" r="3" fill="#fff" stroke="#0284c7" stroke-width="2"/>
                    <text x="20" y="74" font-size="8" fill="#94a3b8" text-anchor="middle">2022-23</text>
                    <text x="175" y="74" font-size="8" fill="#94a3b8" text-anchor="middle">2025-26</text>
                  </svg>
                </div>
                <div class="preview-chart-box">
                  <div class="preview-chart-title">Project Status</div>
                  <div style="display: flex; align-items: center; justify-content: center; height: 80px;">
                    <svg width="70" height="70" viewBox="0 0 70 70">
                      <circle cx="35" cy="35" r="24" fill="transparent" stroke="#059669" stroke-width="10" stroke-dasharray="65 150" stroke-dashoffset="0"/>
                      <circle cx="35" cy="35" r="24" fill="transparent" stroke="#2563eb" stroke-width="10" stroke-dasharray="55 150" stroke-dashoffset="-65"/>
                      <circle cx="35" cy="35" r="24" fill="transparent" stroke="#f59e0b" stroke-width="10" stroke-dasharray="20 150" stroke-dashoffset="-120"/>
                      <circle cx="35" cy="35" r="24" fill="transparent" stroke="#dc2626" stroke-width="10" stroke-dasharray="10 150" stroke-dashoffset="-140"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Landing Metrics Section -->
        <section class="landing-metrics-section" id="metrics" aria-label="Key Metrics">
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-value">${data.metrics.fundsTracked}</div>
              <div class="metric-label">Funds Tracked</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${data.metrics.projectsMonitored}</div>
              <div class="metric-label">Projects Monitored</div>
            </div>
            <div class="metric-card attention">
              <div class="metric-value">${data.metrics.projectsNeedingAttention}</div>
              <div class="metric-label">Projects Needing Attention</div>
            </div>
          </div>
        </section>

        <!-- Feature Cards -->
        <section class="landing-features-section" id="features" aria-label="Platform Features">
          <div class="features-grid">
            ${data.features.map(f => `
              <div class="feature-card">
                <div class="feature-icon-wrapper">
                  ${getFeatureIcon(f.icon)}
                </div>
                <h3 class="feature-title">${f.title}</h3>
                <p class="feature-desc">${f.description}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- How It Works Section -->
        <section class="landing-how-section" id="how-it-works" aria-label="How It Works">
          <div class="section-header">
            <h2 class="section-title">How It Works</h2>
          </div>

          <div class="steps-container">
            ${data.howItWorks.map((step, idx) => `
              <div class="step-card">
                <span class="step-number">${step.step}</span>
                <h3 class="step-title">${step.title}</h3>
                <p class="step-subtitle">${step.subtitle}</p>
              </div>
              ${idx < data.howItWorks.length - 1 ? `
                <div class="step-arrow" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              ` : ''}
            `).join('')}
          </div>
        </section>

        <!-- Attention Example Section -->
        <section class="landing-attention-example" aria-label="Explainable Attention Signals">
          <div class="attention-showcase-card">
            <div>
              <h2 class="showcase-left-heading">
                Not every anomaly is misconduct.<br>
                But every signal deserves context.
              </h2>
              <p class="showcase-left-subtext">
                CivicTrack automatically detects anomalies in project milestones, spending velocity, and physical verification to surface actionable data signals without political bias.
              </p>
              <div style="margin-top: 1.5rem;">
                <a href="#/dashboard" class="btn btn-primary">See how it works</a>
              </div>
            </div>

            <!-- Example Project Card -->
            <div class="showcase-project-box">
              <div class="showcase-box-header">
                <div>
                  <h3 class="showcase-box-title">${data.attentionExample.title}</h3>
                  <span class="showcase-box-loc">${data.attentionExample.location}</span>
                </div>
                <span class="badge badge-high">High Attention</span>
              </div>

              <!-- Progress Bars -->
              <div class="showcase-progress-grid">
                <div class="showcase-progress-item">
                  <div class="showcase-progress-label">
                    <span>Financial Utilization</span>
                    <span>${data.attentionExample.financialUtilization}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill financial" style="width: ${data.attentionExample.financialUtilization}%;"></div>
                  </div>
                </div>

                <div class="showcase-progress-item">
                  <div class="showcase-progress-label">
                    <span>Physical Progress</span>
                    <span>${data.attentionExample.physicalProgress}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill" style="width: ${data.attentionExample.physicalProgress}%;"></div>
                  </div>
                </div>
              </div>

              <!-- Overdue Alert -->
              <div class="showcase-overdue-alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>${data.attentionExample.overdueDays} days overdue</span>
              </div>

              <!-- 3 Attention signals -->
              <div style="font-size: 0.8125rem; font-weight: 600; color: var(--slate-800);">
                3 attention signals:
              </div>
              <ul class="showcase-signals-list">
                ${data.attentionExample.signals.map(s => `
                  <li class="showcase-signal-item">
                    <span class="signal-dot"></span>
                    <span>${s}</span>
                  </li>
                `).join('')}
              </ul>

              <div style="margin-top: 0.5rem;">
                <a href="#/dashboard" class="btn btn-primary" style="width: 100%;">See how it works</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      ${renderFooter()}
    </div>
  `;
}

// -------------------------------------------------------------
// PAGE 2: LOGIN PAGE VIEW
// -------------------------------------------------------------
function renderLoginPage(container) {
  container.innerHTML = `
    <div class="login-page-wrapper">
      <div class="login-backdrop-decor"></div>

      <div class="login-card" role="main">
        <div class="login-logo-container">
          <a href="#/" class="civic-logo" style="justify-content: center;">
            <div class="civic-logo-icon">
              <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" stroke="#0f172a" stroke-width="2.5" fill="#f8fafc"/>
                <circle cx="16" cy="16" r="4.5" fill="#0d9488"/>
                <line x1="16" y1="3" x2="16" y2="11.5" stroke="#0d9488" stroke-width="2"/>
                <line x1="28" y1="22" x2="19.5" y2="18.5" stroke="#0d9488" stroke-width="2"/>
                <line x1="4" y1="22" x2="12.5" y2="18.5" stroke="#0d9488" stroke-width="2"/>
              </svg>
            </div>
            <div class="civic-logo-text" style="text-align: left;">
              <span class="civic-logo-title">CivicTrack</span>
              <span class="civic-logo-subtitle">MP Accountability &amp; Fund Monitoring</span>
            </div>
          </a>
        </div>

        <div class="login-header-text">
          <h1 class="login-title">Welcome to CivicTrack</h1>
          <p class="login-subtitle">Sign in to continue monitoring public development projects.</p>
        </div>

        <!-- Google OAuth Button -->
        <button id="btn-google-login" class="btn-google-auth" aria-label="Continue with Google">
          <div class="google-icon-box">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
          <span>Continue with Google</span>
        </button>

        <div class="login-divider">
          <span>or</span>
        </div>

        <div class="login-security-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Secure authentication for authorized users.</span>
        </div>

        <div class="login-disclaimer-box">
          <div class="login-disclaimer-text">
            <strong>CivicTrack</strong> is an accountability and monitoring tool, not a system for declaring wrongdoing.
          </div>
        </div>

        <div class="login-footer-copy">
          &copy; 2026 CivicTrack. All rights reserved.
        </div>
      </div>
    </div>
  `;

  // Attach Google Login Handler
  const googleBtn = document.getElementById("btn-google-login");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      googleBtn.innerHTML = `
        <span style="display:inline-block; animation: spin 1s linear infinite;">⏳</span>
        <span>Signing in securely...</span>
      `;
      setTimeout(() => {
        loginUser();
        showToast("Signed in successfully as Administrator", "success");
        window.location.hash = "#/dashboard";
      }, 500);
    });
  }
}

// -------------------------------------------------------------
// PAGE 3: DASHBOARD / OVERVIEW VIEW
// -------------------------------------------------------------
function renderDashboardPage(container) {
  const data = getOverviewData(appState.selectedYear);

  container.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar("/dashboard")}

      <div class="dashboard-main">
        ${renderTopbar(appState.selectedYear)}

        <main class="dashboard-content-body">
          <!-- 4 KPI Cards -->
          ${renderKPICards(data.kpis)}

          <!-- Charts Row 1: Fund Utilization (Bar) & Project Status (Donut) -->
          <section class="charts-grid-row">
            ${renderFundUtilizationChart(data.fundChart)}
            ${renderProjectStatusChart(data.statusChart)}
          </section>

          <!-- Charts Row 2: Fund Utilization Over Time (Line) & Projects Needing Attention -->
          <section class="charts-grid-row">
            ${renderUtilizationOverTimeChart(data.trendChart)}
            ${renderAttentionSection(filterAttentionProjects(data.attentionProjects, appState.searchQuery))}
          </section>
        </main>
      </div>
    </div>
  `;

  // Attach Dashboard Event Listeners
  attachDashboardEvents(data);
}

function filterAttentionProjects(projects, query) {
  if (!query || query.trim() === "") return projects;
  const q = query.toLowerCase();
  return projects.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.location.toLowerCase().includes(q) || 
    p.constituency.toLowerCase().includes(q)
  );
}

function attachDashboardEvents(data) {
  // Financial Year Selector Change
  const fySelect = document.getElementById("fy-select-input");
  if (fySelect) {
    fySelect.addEventListener("change", (e) => {
      appState.selectedYear = e.target.value;
      showToast(`Filtered dashboard data for Financial Year ${appState.selectedYear}`, "info");
      renderDashboardPage(document.getElementById("app"));
    });
  }

  // Search Input Event
  const searchInput = document.getElementById("dashboard-search-input");
  if (searchInput) {
    searchInput.value = appState.searchQuery;
    searchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value;
      const filtered = filterAttentionProjects(data.attentionProjects, appState.searchQuery);
      const listContainer = document.getElementById("attention-projects-list");
      if (listContainer) {
        if (filtered.length === 0) {
          listContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; color: var(--slate-500); font-size: 0.875rem;">
              No attention projects match "${appState.searchQuery}".
            </div>
          `;
        } else {
          listContainer.innerHTML = filtered.map(p => renderAttentionItem(p)).join('');
          attachProjectModalEvents(data.attentionProjects);
        }
      }
    });
  }

  // Notification Bell Toggle
  const notifBtn = document.getElementById("btn-notification-bell");
  const notifMenu = document.getElementById("notification-dropdown-menu");
  if (notifBtn && notifMenu) {
    notifBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      notifMenu.classList.toggle("open");
    });
    document.addEventListener("click", () => {
      notifMenu.classList.remove("open");
    });
  }

  // Logout Handler
  const logoutBtn = document.getElementById("btn-sidebar-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
      showToast("Signed out successfully", "info");
      window.location.hash = "#/";
    });
  }

  // External Modules Notice Handlers
  document.querySelectorAll(".external-module-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mod = btn.getAttribute("data-module");
      const owner = btn.getAttribute("data-owner");
      showToast(`${mod} is managed by ${owner}. Frontend Developer 1 owns Landing, Login, and Dashboard.`, "info");
    });
  });

  // Attach Project Detail Modal Clicks
  attachProjectModalEvents(data.attentionProjects);
}

function attachProjectModalEvents(projects) {
  document.querySelectorAll(".attention-item-row").forEach(item => {
    item.addEventListener("click", () => {
      const projId = item.getAttribute("data-project-id");
      const proj = projects.find(p => p.id === projId);
      if (proj) {
        openProjectModal(proj);
      }
    });
  });
}

function openProjectModal(proj) {
  const modalHTML = renderProjectSignalModal(proj);
  const modalWrapper = document.createElement("div");
  modalWrapper.id = "active-modal-wrapper";
  modalWrapper.innerHTML = modalHTML;
  document.body.appendChild(modalWrapper);

  const closeModal = () => {
    modalWrapper.remove();
  };

  const closeBtn = modalWrapper.querySelector("#btn-close-modal");
  const actionCloseBtn = modalWrapper.querySelector("#btn-modal-close-action");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (actionCloseBtn) actionCloseBtn.addEventListener("click", closeModal);

  const backdrop = modalWrapper.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
  }
}

// Icon Helper for Features
function getFeatureIcon(type) {
  switch (type) {
    case "fund":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`;
    case "monitoring":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
    case "alerts":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    case "evidence":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
    default:
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

// -------------------------------------------------------------
// APP INITIALIZATION
// -------------------------------------------------------------
const routes = {
  "/": renderLandingPage,
  "/login": renderLoginPage,
  "/dashboard": renderDashboardPage
};

const router = new Router(routes, "app");
router.start();
