# MP Accountability & Fund Monitoring Platform

A web platform for monitoring the utilization of funds allocated to Members of Parliament (MPs), identifying projects that may require attention, and presenting evidence-backed insights through a simple dashboard.

## Problem

An allocated amount alone does not tell whether an MP's constituency development work needs attention. The system therefore combines allocation, expenditure, project/work status, timelines, and supporting evidence to create useful accountability signals.

## Core Idea

The platform converts raw fund/project data into actionable indicators such as:

- Unspent or under-utilized funds
- Projects delayed beyond expected timelines
- Projects with abnormal expenditure patterns
- Projects with missing or outdated progress information
- Projects requiring verification or attention
- Constituency-level summaries and trends

> The platform is an accountability and monitoring tool, not a system for declaring an MP guilty of wrongdoing.

## Key Features

### Dashboard
- Total allocated funds
- Total expenditure
- Remaining funds
- Utilization percentage
- Active/completed/delayed projects
- Attention-required projects

### Project Monitoring
- Project details
- Allocated amount
- Sanctioned/released/expenditure amount
- Start and expected completion dates
- Current status
- Progress updates
- Evidence/document/image uploads

### Attention Engine
A rule-based scoring system flags projects using measurable signals instead of subjective judgments.

Example signals:
- High remaining amount after a long project period
- Low progress near the expected completion date
- Project overdue
- Missing progress updates
- Significant mismatch between financial and physical progress

### Evidence
Cloudinary can be used for project photographs and supporting documents where required.

### Authentication
Google OAuth can provide secure user authentication for authorized dashboard users.

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: Google OAuth
- Media: Cloudinary (optional/when evidence uploads are required)

## Data Strategy

The initial public dataset may contain allocation/expenditure information but may not contain enough fields to determine whether a project needs attention.

Therefore, the project should combine:

1. Public financial/allocation data
2. Project-level information where available
3. Official/public project status information
4. Manually curated/demo project-progress data for the prototype
5. Evidence uploads for demonstration and verification workflows

The prototype must clearly label simulated/demo fields instead of presenting them as official government data.

## Architecture

React communicates with the Express API. The API handles authentication, project/fund logic, attention scoring, and MongoDB access. Cloudinary is used only when media storage is needed.

See [Architecture.md](./Architecture.md).

## Development Roadmap

See [Roadmap.md](./Roadmap.md).

## Product Requirements

See [Prd.md](./Prd.md).

## Important Design Principle

The system should answer:

> "Which projects or fund-utilization records deserve attention, and why?"

It should not answer:

> "Which MP is corrupt?"

Every alert should be backed by visible data and an explainable rule.

## Suggested Repository Structure

```text
mp-accountability/
├── client/
│   └── React application
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── config/
├── docs/
│   ├── Prd.md
│   ├── Architecture.md
│   └── Roadmap.md
├── .env.example
├── README.md
└── package.json
```

## MVP Goal

Build a working dashboard where an authenticated user can:

1. View constituency/MP fund summaries.
2. View individual projects.
3. See allocation vs expenditure vs remaining amount.
4. See project progress and deadlines.
5. Understand why a project has been flagged.
6. Upload/view supporting evidence when enabled.

## Disclaimer

This project is intended as a software prototype for public accountability and monitoring. Data provenance and labeling are essential. No alert should be interpreted as proof of misconduct.
