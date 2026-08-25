# Architecture Specification — CivicTrack

## 1. High-Level Architecture Overview

CivicTrack is built as a high-performance, dependency-light single-page application (SPA) optimized for reliability, clean separation of concerns, and instant client-side interactions.

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser Client                        │
│                                                             │
│  ┌─────────────────┐   ┌─────────────────┐   ┌────────────┐ │
│  │   Router & App  │   │  Design Tokens  │   │  Mock Data │ │
│  │    Controller   │──▶│   & UI Theme    │──▶│ Abstraction│ │
│  └────────┬────────┘   └─────────────────┘   └────────────┘ │
│           │                                                 │
│     ┌─────┴─────────────────────────┐                       │
│     ▼                               ▼                       │
│ ┌──────────────────────────┐  ┌───────────────────────────┐ │
│ │ Public Views             │  │ Authenticated Views       │ │
│ │ • Landing (Hero/Metrics) │  │ • Dashboard / Overview    │ │
│ │ • Login (Google SSO Mock)│  │ • Charts (SVG Bar/Donut)  │ │
│ └──────────────────────────┘  │ • Attention Signals Grid  │ │
│                               └───────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Design System & Visual Tokens

The visual design is derived directly from the approved UI reference:

### 2.1 Color Palette
- **Primary / Sidebar Background**: `#0b1528` / `#0f172a` (Deep Slate Navy)
- **Primary Accent / Brand**: `#0f766e` / `#0d9488` (Teal / Cyan)
- **Background Main**: `#f8fafc` (Soft cool slate)
- **Card Background**: `#ffffff` (Pure white) with border `#e2e8f0`
- **Text Headings**: `#0f172a` (Slate 900)
- **Text Body / Muted**: `#475569` (Slate 600) / `#64748b` (Slate 500)
- **Status Badges**:
  - `High Attention`: `#fee2e2` bg, `#dc2626` text / `#ef4444` border
  - `Medium Attention`: `#fef3c7` bg, `#d97706` text / `#f59e0b` border
  - `Attention / Low`: `#ffedd5` bg, `#ea580c` text
  - `Ongoing`: `#e0f2fe` bg, `#0284c7` text
  - `Completed`: `#dcfce7` bg, `#16a34a` text

### 2.2 Typography
- **Primary Font**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`
- **Heading Accents**: `Plus Jakarta Sans` for high-impact metric counters and titles.

---

## 3. Data Abstraction Layer (`mockData.js`)

All data operations are decoupled through a unified data module:

```javascript
// Data Models:
export const mockCivicData = {
  overview: {
    totalAllocation: "₹12.4 Cr",
    totalExpenditure: "₹8.7 Cr",
    remaining: "₹3.7 Cr",
    totalProjects: 48,
    utilizationRate: 70.2,
    attentionCount: 9,
    yoyAllocationGrowth: "+8.2%"
  },
  fundUtilization: [
    { label: "Allocated", amount: 12.4, display: "₹12.4 Cr", color: "#0f172a" },
    { label: "Spent", amount: 8.7, display: "₹8.7 Cr", color: "#0d9488" },
    { label: "Remaining", amount: 3.7, display: "₹3.7 Cr", color: "#f59e0b" }
  ],
  projectStatus: [
    { status: "Completed", count: 21, percentage: 43.8, color: "#059669" },
    { status: "Ongoing", count: 18, percentage: 37.5, color: "#2563eb" },
    { status: "Delayed", count: 6, percentage: 12.5, color: "#f59e0b" },
    { status: "Attention", count: 3, percentage: 6.2, color: "#dc2626" }
  ],
  utilizationOverTime: [
    { year: "2022–23", rate: 45 },
    { year: "2023–24", rate: 55 },
    { year: "2024–25", rate: 63 },
    { year: "2025–26", rate: 70 }
  ],
  attentionProjects: [ ... ]
};
```

---

## 4. Component Hierarchy

- `App`: Main layout manager, listens to route changes and user session state.
  - `PublicLayout`:
    - `Navbar`: Header with logo, links, and action buttons.
    - `LandingView`: Hero, metrics, feature grid, stepper, attention example.
    - `LoginView`: Centered card, Google authentication trigger, disclaimer.
    - `Footer`: Global neutral footer.
  - `AuthenticatedLayout`:
    - `Sidebar`: Dark navy sidebar with active route indicator.
    - `Topbar`: Search, FY filter, notification badge, profile dropdown.
    - `DashboardView`:
      - `KPIGrid`: 4 key performance cards with deltas and progress indicators.
      - `ChartsGrid`: Bar chart, Donut chart, Line chart (SVG with hover tooltips).
      - `AttentionSection`: Project attention cards with progress bars and signals.
