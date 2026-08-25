# Product Requirement Document (PRD) — CivicTrack

## 1. Product Overview

**CivicTrack** is an MP Accountability & Fund Monitoring Platform that empowers citizens, researchers, oversight committees, and administrators to track the lifecycle of public development funds from allocation to ground execution.

### Core Mission Statement
> **«Track the money. Track the work. Understand what needs attention.»**

---

## 2. Target Audience & Personas

1. **Citizens & Community Leaders**: Desire transparent visibility into local development projects (roads, water supply, health clinics) in their constituency.
2. **Civic Researchers & Journalists**: Need aggregated data, trend tracking, and verifiable evidence sources.
3. **Public Representatives & Administrators**: Need high-level dashboard summaries, fund utilization metrics, and early-warning attention signals to unblock stalled works.

---

## 3. Product Scope & Functional Modules

### 3.1 Public Landing Page (`/`)
- **Hero & Value Proposition**: High-impact introduction with interactive dashboard preview.
- **Key Metrics Highlight**: Real-time aggregate statistics (`₹12.4 Cr Tracked`, `48 Projects`, `9 Needing Attention`).
- **Feature Cards**:
  - *Fund Transparency*: Allocation, expenditure, and balance breakdowns.
  - *Project Monitoring*: Physical vs. financial milestones and expected completion dates.
  - *Explainable Alerts*: Clear, rule-based explanations for flagged items.
  - *Evidence*: Direct correlation between financial logs and geotagged photographs/reports.
- **Workflow Pipeline (How It Works)**:
  1. `01 Collect`: Multi-source data ingestion (MPLADS, state funds, municipal tenders).
  2. `02 Analyze`: Cross-referencing financial burn rate, physical progress, and deadlines.
  3. `03 Surface`: Rule-based highlighting of projects requiring intervention.
- **Explainable Anomaly Demonstration**: Example project breakdown demonstrating how signals provide context rather than accusation.

### 3.2 Authentication (`/login`)
- **Purpose**: Access control for authorized administrators, verifiers, and monitored stakeholders.
- **OAuth Single Sign-On**: Seamless Google Workspace / OpenID Connect frontend integration.
- **Security & Neutrality Assurance**: Prominent disclaimer emphasizing monitoring purpose without bias.

### 3.3 Accountability Dashboard & Overview (`/dashboard`)
- **Financial Year Filter**: Switch context between FY 2025–26, 2024–25, 2023–24, 2022–23.
- **High-Level KPIs**:
  - `Total Allocation`: ₹12.4 Cr (+8.2% YoY)
  - `Total Expenditure`: ₹8.7 Cr (70.2% utilization)
  - `Remaining Balance`: ₹3.7 Cr (29.8% unspent)
  - `Total Projects`: 48 (9 requiring attention)
- **Interactive Visualizations**:
  - *Fund Utilization Breakdown*: Categorical bar comparison of allocated vs. spent vs. remaining.
  - *Project Status Breakdown*: Status donut chart (Completed 21, Ongoing 18, Delayed 6, Attention 3).
  - *Historical Utilization Trend*: Multi-year trend line (45% in 2022-23 to 70% in 2025-26).
- **Attention Section ("Projects that may need attention")**:
  - Priority ranking (High, Medium, Low attention).
  - Key indicators: Overdue days, physical progress percentage, and stale update flags.

---

## 4. Tone & Political Neutrality Guidelines

The platform must maintain absolute objectivity:
- **No accusatory terms**: Avoid words like *corrupt*, *fraud*, *scam*, *guilty*, *embezzlement*, *criminal*.
- **Objective data indicators**: Use *Needs Attention*, *Attention Signal*, *Requires Verification*, *Data Signal*, *Overdue by X days*, *Progress Gap*.
- **Contextual Framing**: "Not every anomaly is misconduct. But every signal deserves context."

---

## 5. Non-Functional Requirements

- **Performance**: Instant page load (<100ms) with lightweight native assets.
- **Responsiveness**: Pixel-perfect scaling across mobile, tablet, and widescreen displays.
- **Accessibility**: High-contrast text compliance (WCAG AA), descriptive ARIA attributes, semantic HTML5 elements.
- **Extensibility**: Modular JS mock data layer designed for simple REST/GraphQL endpoint swapping.
