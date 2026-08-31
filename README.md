# CivicTrack — MP Accountability & Fund Monitoring Platform (React)

> **«Track the money. Track the work. Understand what needs attention.»**

CivicTrack is an open, data-driven React platform designed to provide transparent monitoring of public development funds (MPLADS / central / state allocations), physical project progress, utilization rates, and explainable data signals across constituencies.

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
| **Frontend Developer 1 (Current)** | **1. Landing Page**<br>**2. Login Screen**<br>**3. Dashboard / Overview** | `/`, `/login`, `/dashboard` | **Active / Complete (React 18)** |
| Frontend Developer 2 | 4. Projects Directory<br>5. Project Details View<br>6. MPs / Constituencies Explorer | `/projects`, `/projects/:id`, `/mps` | *Phase 2* |
| Frontend Developer 3 | 7. MP Profile Details<br>8. Attention Center<br>9. Evidence Library | `/mps/:id`, `/attention`, `/evidence` | *Phase 2* |

---

## 🚀 Quick Start (React Local Server)

Run with Python or Vite:

### Option A: Direct Browser Preview (Zero-Config)
```powershell
# From the project root (C:\Users\DELL\.gemini\antigravity-ide\scratch\civictrack)
python -m http.server 3000
```
Open your browser at:
- **Landing Page**: `http://localhost:3000/#/`
- **Login Screen**: `http://localhost:3000/#/login`
- **Dashboard / Overview**: `http://localhost:3000/#/dashboard`

### Option B: Vite Dev Server (Node.js / npm)
```powershell
npm install
npm run dev
```

---

## 📦 React Project Architecture

```
civictrack/
├── README.md               # Project documentation & overview
├── package.json            # React 18 dependencies & scripts
├── vite.config.js          # Vite React configuration
├── index.html              # Main HTML5 entry with React 18 & Babel
├── css/
│   ├── design-tokens.css   # Color palette, elevations, spacing variables
│   ├── base.css            # Base styles, typography, reset, grid utilities
│   ├── landing.css         # Hero preview, metric cards, feature grid, stepper
│   ├── login.css           # Centered authentication card & security layout
│   └── dashboard.css       # Dark sidebar, topbar, KPI cards, charts, attention grid
└── src/
    ├── App.jsx             # Hash-router & root application coordinator
    ├── main.jsx            # React 18 createRoot bootstrap
    ├── data/
    │   └── mockData.js     # Unified data abstraction for metrics, charts & projects
    ├── components/
    │   ├── Navbar.jsx      # Public landing navigation
    │   ├── Sidebar.jsx     # Authenticated dark navy sidebar
    │   ├── Topbar.jsx      # Top control bar with search, FY filter & notifications
    │   ├── KPICard.jsx     # Key Performance Indicator card component
    │   ├── Charts.jsx      # Interactive SVG chart rendering (Bar, Donut, Line)
    │   ├── AttentionCard.jsx # Explainable attention signal project cards & detail modal
    │   ├── Toast.jsx       # Floating notification alert component
    │   └── Footer.jsx      # CivicTrack footer & disclaimer
    └── pages/
        ├── LandingPage.jsx  # Hero preview, metrics, features & attention showcase
        ├── LoginPage.jsx    # Google OAuth button & security notice
        └── DashboardPage.jsx# Full interactive overview dashboard
```
