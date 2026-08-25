# Project Roadmap & Developer Ownership Matrix

## 🗺️ Milestone Plan

### Phase 1: MVP Core Experience (Current — Frontend Developer 1)
- [x] Comprehensive platform documentation (`README.md`, `Prd.md`, `Architecture.md`, `Roadmap.md`)
- [x] Complete Design System & CSS Tokens matching approved reference
- [x] Page 1: Landing Page (`/`) with Hero preview, Metrics, Feature cards, Stepper, and Attention showcase
- [x] Page 2: Login Page (`/login`) with Google OAuth trigger, security notes, and neutrality disclaimer
- [x] Page 3: Dashboard / Overview (`/dashboard`) with Topbar, Sidebar, 4 KPI cards, 3 interactive charts (Bar, Donut, Line), and Attention project cards
- [x] Modular mock data layer (`mockData.js`)

---

### Phase 2: Detailed Explorer Modules (Frontend Developer 2)
- [ ] Page 4: Projects Directory (`/projects`) with multi-filter search (FY, Status, Category, MP, Constituency)
- [ ] Page 5: Project Details View (`/projects/:id`) with milestone timeline, financial vs. physical progress, and evidence gallery
- [ ] Page 6: MPs / Constituencies Explorer (`/mps`) with constituency cards, utilization stats, and search

---

### Phase 3: Attention Intelligence & Evidence Verification (Frontend Developer 3)
- [ ] Page 7: MP Details View (`/mps/:id`) with constituency breakdown and project status distribution
- [ ] Page 8: Attention Center (`/attention`) with attention scoring (0-100), signal breakdowns, and evaluation logs
- [ ] Page 9: Evidence Library (`/evidence`) with media upload, geotagged site photographs, and completion certificates
- [ ] Page 10: Profile Settings (`/profile`)

---

### Phase 4: Production Integration
- [ ] Real-time backend API integration with MPLADS & State open data feeds
- [ ] Live OAuth 2.0 / OpenID Connect provider configuration
- [ ] Automated daily data scraping and attention scoring pipelines
