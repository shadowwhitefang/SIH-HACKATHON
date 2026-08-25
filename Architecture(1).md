# Architecture

## 1. System Overview

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │ HTTPS / REST
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │       API           │
                    └───────┬─────┬───────┘
                            │     │
             ┌──────────────┘     └──────────────┐
             ▼                                   ▼
    ┌─────────────────┐                 ┌─────────────────┐
    │    MongoDB      │                 │    Cloudinary   │
    │ Structured data │                 │ Images/docs     │
    └─────────────────┘                 └─────────────────┘
                            ▲
                            │
                    ┌───────┴───────┐
                    │ Google OAuth   │
                    │ Authentication│
                    └───────────────┘
```

## 2. Frontend

**Technology:** React.js

Responsibilities:
- Authentication UI
- Dashboard
- Filters
- Project list
- Project details
- Alert visualization
- Evidence upload UI
- API communication

Suggested structure:

```text
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   └── utils/
└── package.json
```

## 3. Backend

**Technology:** Node.js + Express.js

Responsibilities:
- REST API
- Authentication/session handling
- Input validation
- Business logic
- Attention scoring
- Database access
- Evidence metadata
- Authorization

Suggested structure:

```text
server/
├── controllers/
├── models/
├── routes/
├── services/
├── middleware/
├── validators/
├── config/
└── server.js
```

## 4. Database

**Technology:** MongoDB

MongoDB stores:
- MPs
- Fund allocations
- Projects
- Alerts
- Evidence metadata
- Users

### Relationships

```text
MP
 │
 ├── FundAllocation
 │
 └── Project
       │
       ├── Alert
       └── Evidence
```

MongoDB references should be used for major entities rather than duplicating large records.

## 5. Attention Engine

The attention engine is a backend service.

```text
Project Data
     │
     ▼
Calculate Signals
     │
     ├── overdue?
     ├── progress too low?
     ├── utilization too low?
     ├── update stale?
     └── financial/physical mismatch?
     │
     ▼
Calculate Score
     │
     ▼
Generate Explainable Alert
```

### Why rule-based first?

The prototype may not have enough reliable historical labels to train a useful ML model.

A rule-based system:
- Requires less data.
- Is explainable.
- Is easy to demonstrate.
- Can be validated manually.
- Can later generate training data for ML.

## 6. Financial Metrics

### Remaining Amount

```text
remaining = allocatedAmount - spentAmount
```

### Utilization

```text
utilization =
    spentAmount / allocatedAmount * 100
```

Division by zero must be handled.

### Progress

Physical progress should be stored separately from financial utilization.

This is important because:

```text
₹80 lakh spent ≠ 80% physical completion
```

The relationship between financial and physical progress is a signal, not proof of a problem.

## 7. Data Provenance

Every important record should contain source metadata.

```text
source:
  type: official | curated | demo
  name: ...
  url: ...
  retrievedAt: ...
```

For prototype/demo records, explicitly mark the data as demo or curated.

## 8. Authentication Flow

```text
User
 │
 ▼
React
 │
 ▼
Google OAuth
 │
 ▼
Backend callback
 │
 ▼
Create/find user
 │
 ▼
Session / token
 │
 ▼
Protected API
```

OAuth secrets remain on the backend.

## 9. Evidence Upload Flow

```text
React
 │
 │ multipart/form-data
 ▼
Express API
 │
 ▼
Validate file
 │
 ▼
Cloudinary
 │
 ├── secure URL
 └── public ID
 │
 ▼
MongoDB
 │
 └── Evidence metadata
```

Cloudinary is optional. If the MVP does not need uploads, it can be added in a later phase.

## 10. API Layer

Example request flow:

```text
GET /api/projects/:id
        │
        ▼
Route
        │
        ▼
Controller
        │
        ▼
Service
        │
        ▼
MongoDB
        │
        ▼
JSON Response
```

Keep controllers thin and put business rules inside services.

## 11. Security

- Use environment variables for secrets.
- Validate request bodies.
- Sanitize user-controlled input.
- Add authentication middleware.
- Add authorization checks.
- Restrict upload types and sizes.
- Use HTTPS in production.
- Configure CORS explicitly.
- Add rate limiting to sensitive endpoints.

## 12. Deployment

Prototype deployment can use:

```text
Frontend  → Static hosting
Backend   → Node-compatible hosting
Database  → MongoDB Atlas
Media     → Cloudinary
OAuth     → Google Cloud configuration
```

## 13. Architectural Principle

The most important architectural rule is:

> Separate data collection, calculation, and presentation.

This allows the attention algorithm to change without rebuilding the dashboard.
