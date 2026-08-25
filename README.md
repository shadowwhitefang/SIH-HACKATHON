# CivicTrack — MP Accountability & Fund Monitoring Platform

> **«Track the money. Track the work. Understand what needs attention.»**

CivicTrack is an open, data-driven platform designed to provide transparent monitoring of public development funds (MPLADS / central / state allocations), physical project progress, utilization rates, and explainable data signals across constituencies.

---

## 🏛️ Core Principles & Neutrality Standard

CivicTrack is built as an **accountability, transparency, and data signal platform**, not a system for declaring legal wrongdoing or political judgments.

- **Data-Driven & Explainable**: Every flagged anomaly is grounded in measurable data signals (timelines, utilization gaps, update staleness).
- **Politically Neutral**: Language is strictly objective and evidence-oriented.
  - ✅ **Approved Terminology**: `Needs Attention`, `Attention Signal`, `Requires Verification`, `Data Signal`, `Delayed`, `Under-Utilized`.
  - ❌ **Prohibited Terminology**: `Corrupt`, `Fraud`, `Scam`, `Guilty`, `Misconduct`.

---

## 👥 Frontend Team Ownership Breakdown

| Developer | Assigned Pages / Modules | Routes | Status |
|---|---|---|---|
| **Frontend Developer 1 (Current)** | **1. Landing Page**<br>**2. Login Screen**<br>**3. Dashboard / Overview** | `/`, `/login`, `/dashboard` | **Active / Complete** |
| Frontend Developer 2 | 4. Projects Directory<br>5. Project Details View<br>6. MPs / Constituencies Explorer | `/projects`, `/projects/:id`, `/mps` | *Phase 2* |
| Frontend Developer 3 | 7. MP Profile Details<br>8. Attention Center<br>9. Evidence Library | `/mps/:id`, `/attention`, `/evidence` | *Phase 2* |

---

## 🚀 Quick Start (Local Server)

Run the lightweight development server:

```powershell
# From the project root (C:\Users\DELL\.gemini\antigravity-ide\scratch\civictrack)
python -m http.server 8000
```

Open your browser at:
- **Landing Page**: `http://localhost:8000/` or `http://localhost:8000/#/`
- **Login Screen**: `http://localhost:8000/#/login`
- **Dashboard / Overview**: `http://localhost:8000/#/dashboard`

---

## 📦 Project Architecture

```
civictrack/
├── README.md               # Project documentation & overview
├── Prd.md                  # Comprehensive Product Requirements Document
├── Architecture.md         # Architecture, design system & data contract spec
├── Roadmap.md              # Milestones and ownership timeline
├── index.html              # Main HTML5 entry
├── css/
│   ├── design-tokens.css   # Color palette, elevations, spacing variables
│   ├── base.css            # Base styles, typography, reset, grid utilities
│   ├── landing.css         # Hero preview, metric cards, feature grid, stepper
│   ├── login.css           # Centered authentication card & security layout
│   └── dashboard.css       # Dark sidebar, topbar, KPI cards, charts, attention grid
└── js/
    ├── data/
    │   └── mockData.js     # Unified data abstraction for metrics, charts & projects
    ├── components/
    │   ├── Navbar.js       # Public landing navigation
    │   ├── Sidebar.js      # Authenticated dark navy sidebar
    │   ├── Topbar.js       # Top control bar with search, FY filter & notifications
    │   ├── KPICard.js      # Key Performance Indicator card component
    │   ├── Charts.js       # Interactive SVG chart rendering (Bar, Donut, Line)
    │   ├── AttentionCard.js# Explainable attention signal project cards
    │   └── Footer.js       # CivicTrack footer & disclaimer
    ├── router.js           # Lightweight client-side router
    └── app.js              # State manager & page orchestrator
```
