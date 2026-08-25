# Roadmap

## Phase 0 — Project Setup

**Goal:** Create a clean development foundation.

- [ ] Create Git repository
- [ ] Create client/server structure
- [ ] Initialize React frontend
- [ ] Initialize Node.js + Express backend
- [ ] Configure environment variables
- [ ] Connect MongoDB
- [ ] Create API health-check route
- [ ] Create README, PRD and architecture documentation

**Deliverable:** Running frontend + backend + database connection.

---

## Phase 1 — Data Foundation

**Goal:** Build a reliable data model.

- [ ] Define MP schema
- [ ] Define fund allocation schema
- [ ] Define project schema
- [ ] Define evidence schema
- [ ] Define alert schema
- [ ] Create seed/demo dataset
- [ ] Add source metadata
- [ ] Validate imported data

**Important:** Clearly distinguish official/public records from demo or manually curated project-progress fields.

**Deliverable:** MongoDB contains usable project and financial records.

---

## Phase 2 — Backend API

**Goal:** Expose clean APIs to the frontend.

- [ ] Build MP endpoints
- [ ] Build allocation endpoints
- [ ] Build project endpoints
- [ ] Build dashboard endpoint
- [ ] Build alert endpoints
- [ ] Add validation
- [ ] Add error handling
- [ ] Add pagination
- [ ] Add filtering

**Deliverable:** Backend can serve the complete MVP dataset.

---

## Phase 3 — Attention Engine

**Goal:** Answer the core question: "What needs attention and why?"

### Start with deterministic rules

- [ ] Overdue-project rule
- [ ] Low-progress rule
- [ ] Low-utilization rule
- [ ] Stale-update rule
- [ ] Financial/physical mismatch rule
- [ ] Severity calculation
- [ ] Explainable alert generation
- [ ] Unit tests for each rule

### Example

```text
Project:
Allocated: ₹10,00,000
Spent: ₹2,00,000
Progress: 25%
Deadline: 60 days ago

Possible result:
HIGH ATTENTION

Reasons:
- Project is overdue.
- Physical progress is low.
- Utilization is low.
```

**Deliverable:** Every alert has measurable reasons.

---

## Phase 4 — Frontend Dashboard

**Goal:** Turn backend data into a usable product.

- [ ] Create app layout
- [ ] Create navigation
- [ ] Build overview dashboard
- [ ] Add KPI cards
- [ ] Add project table
- [ ] Add filters
- [ ] Add project detail page
- [ ] Add alert indicators
- [ ] Add attention explanation panel
- [ ] Add loading/error/empty states

**Deliverable:** A user can understand the project/fund situation without opening the database.

---

## Phase 5 — Authentication

- [ ] Configure Google OAuth
- [ ] Implement login
- [ ] Implement logout
- [ ] Protect dashboard routes
- [ ] Protect write APIs
- [ ] Add user roles if required

**Deliverable:** Secure authenticated prototype.

---

## Phase 6 — Evidence

**Goal:** Allow project records to carry supporting evidence.

- [ ] Integrate Cloudinary
- [ ] Build upload endpoint
- [ ] Validate file type
- [ ] Validate file size
- [ ] Store Cloudinary metadata in MongoDB
- [ ] Display evidence on project page
- [ ] Add uploader and timestamp information

**Deliverable:** Project → evidence workflow.

---

## Phase 7 — Data Integration

**Goal:** Replace or supplement demo data with real public data.

- [ ] Identify authoritative public sources
- [ ] Build ingestion scripts
- [ ] Normalize records
- [ ] Map financial years
- [ ] Deduplicate records
- [ ] Preserve source URLs
- [ ] Add retrieval timestamps
- [ ] Validate imported values

Do not assume that a public allocation dataset contains project progress. Add project-level sources only where they can be verified.

---

## Phase 8 — Analytics

- [ ] Historical utilization charts
- [ ] Constituency comparisons
- [ ] Project category analysis
- [ ] Year-over-year trends
- [ ] Alert trends
- [ ] Search and advanced filters

---

## Phase 9 — Quality & Security

- [ ] Backend unit tests
- [ ] API integration tests
- [ ] Frontend component tests
- [ ] Authentication tests
- [ ] Input validation tests
- [ ] Upload security tests
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Production environment variables
- [ ] Error logging

---

## Phase 10 — Deployment

- [ ] Deploy React frontend
- [ ] Deploy Express backend
- [ ] Configure MongoDB Atlas
- [ ] Configure Cloudinary
- [ ] Configure Google OAuth production URLs
- [ ] Configure environment variables
- [ ] Test production APIs
- [ ] Test authentication
- [ ] Test uploads

**Deliverable:** Publicly accessible working prototype.

---

# Recommended Build Order

```text
MongoDB
   ↓
Express API
   ↓
Attention Engine
   ↓
React Dashboard
   ↓
Google OAuth
   ↓
Cloudinary
   ↓
Real Data Integration
   ↓
Analytics
   ↓
Deployment
```

# MVP Cut Line

If time is limited, stop after Phase 5.

The strongest MVP should contain:

1. Real/traceable financial data
2. Project-level records
3. Dashboard
4. Explainable attention engine
5. Project detail page
6. Google authentication

Cloudinary, advanced analytics, maps, and ML can come later.

# Future ML Direction

Do not begin with ML.

First collect:
- Project attributes
- Historical progress
- Financial utilization
- Deadlines
- Alert outcomes
- Human verification results

After enough reliable historical labels exist, ML can be evaluated for anomaly/risk ranking.

The rule-based system should remain available as an explainability baseline.
