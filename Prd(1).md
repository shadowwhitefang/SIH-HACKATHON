# Product Requirements Document

## 1. Product Overview

**Product:** MP Accountability & Fund Monitoring Platform

The platform helps users monitor how allocated public-development funds are being utilized and identify projects that require further attention based on transparent, explainable indicators.

## 2. Problem Statement

Financial allocation data by itself is insufficient to determine whether a project is progressing normally.

For example, a dataset may show that an MP received ₹X in allocated funds, but it may not tell us:

- What projects were approved?
- How much has been spent?
- How much physical progress has been achieved?
- Is the project overdue?
- When was the last progress update?
- Is supporting evidence available?

The product therefore needs a project-level monitoring layer.

## 3. Target Users

### Primary
- Citizens
- Researchers
- Journalists
- Civil-society/public-accountability organizations

### Secondary
- Administrators
- Authorized data-entry/verification users

## 4. Goals

- Make fund utilization understandable.
- Surface projects requiring attention.
- Explain every alert.
- Keep financial and project data traceable.
- Provide an easy-to-use dashboard.
- Separate official data from manually entered/demo data.

## 5. Non-Goals

- Declaring an MP guilty of corruption.
- Replacing government audit mechanisms.
- Making accusations from a single metric.
- Presenting simulated prototype data as official data.
- Providing legal judgments.

## 6. MVP Features

### F1 — Authentication
Users can sign in using Google OAuth.

**Acceptance criteria**
- User can sign in.
- User session is maintained securely.
- Protected dashboard routes require authentication.

### F2 — Dashboard
Show:
- Total allocation
- Total expenditure
- Remaining amount
- Utilization percentage
- Project counts by status
- Attention-required count

**Acceptance criteria**
- Values are calculated from stored records.
- User can filter the dashboard by MP/constituency/year where supported.

### F3 — Project Management
Each project should support:
- Project name
- MP/constituency
- Location
- Category
- Allocated amount
- Expenditure
- Progress percentage
- Start date
- Expected completion date
- Current status
- Last update date
- Data source
- Evidence references

### F4 — Attention Detection

The system should calculate an attention score from explainable rules.

Possible rules:

| Signal | Example |
|---|---|
| Overdue | Expected completion date has passed |
| Low progress | Physical progress is low near deadline |
| Low utilization | Expenditure is unusually low for project age |
| Stale update | No recent progress update |
| Financial/physical mismatch | Spending and physical progress differ significantly |

The exact thresholds should be configurable.

### F5 — Explainable Alerts

Every flagged project should show:
- Severity
- Triggered rules
- Relevant values
- Date of evaluation
- Recommended next action

Example:

> Attention: Project is 45 days overdue and reported physical progress is 35%.

### F6 — Evidence

Authorized users can upload:
- Project photographs
- Documents
- Progress evidence

Cloudinary can store media while MongoDB stores metadata and URLs.

### F7 — Project Details

A project page should show:
- Financial summary
- Timeline
- Progress
- Alert history
- Evidence
- Data sources

## 7. Data Model

### MP

```text
_mpId
name
constituency
state
party
source
```

### FundAllocation

```text
allocationId
mpId
financialYear
allocatedAmount
releasedAmount
spentAmount
source
```

### Project

```text
projectId
mpId
name
category
location
allocatedAmount
spentAmount
progressPercent
startDate
expectedCompletionDate
status
lastUpdatedAt
dataSource
```

### Evidence

```text
evidenceId
projectId
type
url
publicId
uploadedBy
createdAt
source
```

### Alert

```text
alertId
projectId
severity
score
rulesTriggered[]
createdAt
resolvedAt
status
```

## 8. Attention Score

A simple MVP score can combine normalized signals:

```text
attentionScore =
    overdueScore
  + lowProgressScore
  + lowUtilizationScore
  + staleUpdateScore
  + mismatchScore
```

The score must remain explainable. Avoid an opaque ML model in the MVP.

## 9. API Requirements

Suggested endpoints:

```text
POST   /api/auth/google
GET    /api/dashboard
GET    /api/mps
GET    /api/mps/:id
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PATCH  /api/projects/:id
GET    /api/projects/:id/alerts
POST   /api/projects/:id/evidence
GET    /api/alerts
PATCH  /api/alerts/:id
```

## 10. Non-Functional Requirements

### Security
- Validate all input.
- Protect private endpoints.
- Store secrets in environment variables.
- Never expose OAuth secrets to the frontend.
- Validate uploaded files.

### Performance
- Dashboard APIs should return quickly for normal prototype datasets.
- Add pagination to project lists.

### Reliability
- Preserve data source information.
- Avoid silent overwrites.
- Record timestamps for updates.

### Explainability
Every alert must expose the underlying rule and values.

## 11. Success Metrics

For the MVP:

- User can understand fund utilization within one dashboard view.
- Every attention flag has an explanation.
- Project records can be traced to a source.
- Dashboard calculations match database values.
- Authentication and protected APIs work correctly.
- Evidence can be attached to a project.

## 12. Future Enhancements

- Automated ingestion from official portals.
- GIS/map visualization.
- Historical trend analysis.
- Anomaly detection.
- Citizen verification workflow.
- Notifications.
- Advanced analytics.
