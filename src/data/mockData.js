/**
 * CivicTrack - Data Storage & Contracts
 * Exact contract schemas ready for production backend synchronization.
 */

// 1. Dashboard Multi-Year Storage
export const yearDatasets = {
  "2025–26": {
    kpis: {
      totalAllocation: {
        value: "₹12.4 Cr",
        rawAmount: 12.4,
        subtext: "↑ 8.2% from previous year",
        badgeType: "positive"
      },
      totalExpenditure: {
        value: "₹8.7 Cr",
        rawAmount: 8.7,
        subtext: "70.2% utilization",
        progress: 70.2,
        badgeType: "neutral"
      },
      remaining: {
        value: "₹3.7 Cr",
        rawAmount: 3.7,
        subtext: "30% of allocation",
        badgeType: "neutral"
      },
      projects: {
        value: "48",
        subtext: "9 need attention",
        badgeType: "attention"
      }
    },
    fundChart: [
      { label: "Allocated", amount: 12.4, display: "₹12.4 Cr", color: "#0f172a", pct: "100%" },
      { label: "Spent", amount: 8.7, display: "₹8.7 Cr", color: "#0d9488", pct: "70.2%" },
      { label: "Remaining", amount: 3.7, display: "₹3.7 Cr", color: "#f59e0b", pct: "29.8%" }
    ],
    statusChart: [
      { status: "Completed", count: 21, percentage: 43.8, color: "#059669" },
      { status: "Ongoing", count: 18, percentage: 37.5, color: "#2563eb" },
      { status: "Delayed", count: 6, percentage: 12.5, color: "#f59e0b" },
      { status: "Attention", count: 3, percentage: 6.2, color: "#dc2626" }
    ],
    trendChart: [
      { year: "2022–23", rate: 45, display: "45%", spent: "₹4.1 Cr", total: "₹9.1 Cr" },
      { year: "2023–24", rate: 55, display: "55%", spent: "₹5.4 Cr", total: "₹9.8 Cr" },
      { year: "2024–25", rate: 63, display: "63%", spent: "₹7.1 Cr", total: "₹11.2 Cr" },
      { year: "2025–26", rate: 70, display: "70%", spent: "₹8.7 Cr", total: "₹12.4 Cr" }
    ],
    attentionProjects: [
      {
        id: "proj-1",
        title: "Road Construction — Ward 12",
        location: "Patna, Bihar",
        constituency: "Patna Sahib",
        mpName: "Rahul Sharma",
        progress: 32,
        overdueDays: 42,
        financialUtilization: 25,
        allocated: "₹1.00 Cr",
        spent: "₹25L",
        remaining: "₹75L",
        severity: "HIGH ATTENTION",
        severityClass: "severity-high",
        category: "Infrastructure",
        signals: [
          "Project is overdue by 42 days",
          "Physical progress is below expected level (32% vs 65% target)",
          "Last progress update was 78 days ago"
        ]
      },
      {
        id: "proj-2",
        title: "Community Health Center",
        location: "Muzaffarpur, Bihar",
        constituency: "Muzaffarpur",
        mpName: "Pawan Kumar",
        progress: 28,
        overdueDays: 35,
        financialUtilization: 75,
        allocated: "₹75L",
        spent: "₹56L",
        remaining: "₹19L",
        severity: "MEDIUM ATTENTION",
        severityClass: "severity-medium",
        category: "Healthcare",
        signals: [
          "Physical progress (28%) lagging behind financial burn rate (75%)",
          "Milestone 2 pending sign-off for 35 days",
          "Site inspection verification required"
        ]
      },
      {
        id: "proj-3",
        title: "Water Supply Project — Phase 2",
        location: "Gaya, Bihar",
        constituency: "Gaya",
        mpName: "Anita Verma",
        progress: 30,
        overdueDays: 20,
        financialUtilization: 30,
        allocated: "₹1.15 Cr",
        spent: "₹35L",
        remaining: "₹80L",
        severity: "ATTENTION",
        severityClass: "severity-low",
        category: "Sanitation",
        signals: [
          "20 days overdue on pipe laying phase",
          "Vendor supply verification pending",
          "Recent expenditure requires progress validation"
        ]
      },
      {
        id: "proj-4",
        title: "Primary School Renovation",
        location: "Gaya, Bihar",
        constituency: "Gaya",
        mpName: "Anita Verma",
        progress: 52,
        overdueDays: 15,
        financialUtilization: 50,
        allocated: "₹45L",
        spent: "₹22.5L",
        remaining: "₹22.5L",
        severity: "ATTENTION",
        severityClass: "severity-low",
        category: "Education",
        signals: [
          "15 days delay in roof reinforcement phase",
          "Pending updated photos from field engineer"
        ]
      }
    ]
  },

  "2024–25": {
    kpis: {
      totalAllocation: {
        value: "₹11.2 Cr",
        rawAmount: 11.2,
        subtext: "↑ 14.3% from previous year",
        badgeType: "positive"
      },
      totalExpenditure: {
        value: "₹7.1 Cr",
        rawAmount: 7.1,
        subtext: "63.4% utilization",
        progress: 63.4,
        badgeType: "neutral"
      },
      remaining: {
        value: "₹4.1 Cr",
        rawAmount: 4.1,
        subtext: "36.6% of allocation",
        badgeType: "neutral"
      },
      projects: {
        value: "44",
        subtext: "6 need attention",
        badgeType: "attention"
      }
    },
    fundChart: [
      { label: "Allocated", amount: 11.2, display: "₹11.2 Cr", color: "#0f172a", pct: "100%" },
      { label: "Spent", amount: 7.1, display: "₹7.1 Cr", color: "#0d9488", pct: "63.4%" },
      { label: "Remaining", amount: 4.1, display: "₹4.1 Cr", color: "#f59e0b", pct: "36.6%" }
    ],
    statusChart: [
      { status: "Completed", count: 26, percentage: 59.1, color: "#059669" },
      { status: "Ongoing", count: 12, percentage: 27.3, color: "#2563eb" },
      { status: "Delayed", count: 4, percentage: 9.1, color: "#f59e0b" },
      { status: "Attention", count: 2, percentage: 4.5, color: "#dc2626" }
    ],
    trendChart: [
      { year: "2022–23", rate: 45, display: "45%", spent: "₹4.1 Cr", total: "₹9.1 Cr" },
      { year: "2023–24", rate: 55, display: "55%", spent: "₹5.4 Cr", total: "₹9.8 Cr" },
      { year: "2024–25", rate: 63, display: "63%", spent: "₹7.1 Cr", total: "₹11.2 Cr" },
      { year: "2025–26", rate: 70, display: "70%", spent: "₹8.7 Cr", total: "₹12.4 Cr" }
    ],
    attentionProjects: [
      {
        id: "proj-101",
        title: "District Hospital ICU Wing",
        location: "Bhagalpur, Bihar",
        constituency: "Bhagalpur",
        mpName: "Sanjay Singh",
        progress: 40,
        overdueDays: 28,
        financialUtilization: 60,
        allocated: "₹1.80 Cr",
        spent: "₹1.08 Cr",
        remaining: "₹72L",
        severity: "HIGH ATTENTION",
        severityClass: "severity-high",
        category: "Healthcare",
        signals: [
          "Equipment procurement delayed by 28 days",
          "Verification audit pending for Phase 2 expenditure"
        ]
      }
    ]
  },

  "2023–24": {
    kpis: {
      totalAllocation: {
        value: "₹9.8 Cr",
        rawAmount: 9.8,
        subtext: "↑ 7.7% from previous year",
        badgeType: "positive"
      },
      totalExpenditure: {
        value: "₹5.4 Cr",
        rawAmount: 5.4,
        subtext: "55.1% utilization",
        progress: 55.1,
        badgeType: "neutral"
      },
      remaining: {
        value: "₹4.4 Cr",
        rawAmount: 4.4,
        subtext: "44.9% of allocation",
        badgeType: "neutral"
      },
      projects: {
        value: "38",
        subtext: "4 need attention",
        badgeType: "attention"
      }
    },
    fundChart: [
      { label: "Allocated", amount: 9.8, display: "₹9.8 Cr", color: "#0f172a", pct: "100%" },
      { label: "Spent", amount: 5.4, display: "₹5.4 Cr", color: "#0d9488", pct: "55.1%" },
      { label: "Remaining", amount: 4.4, display: "₹4.4 Cr", color: "#f59e0b", pct: "44.9%" }
    ],
    statusChart: [
      { status: "Completed", count: 28, percentage: 73.7, color: "#059669" },
      { status: "Ongoing", count: 6, percentage: 15.8, color: "#2563eb" },
      { status: "Delayed", count: 2, percentage: 5.3, color: "#f59e0b" },
      { status: "Attention", count: 2, percentage: 5.3, color: "#dc2626" }
    ],
    trendChart: [
      { year: "2022–23", rate: 45, display: "45%", spent: "₹4.1 Cr", total: "₹9.1 Cr" },
      { year: "2023–24", rate: 55, display: "55%", spent: "₹5.4 Cr", total: "₹9.8 Cr" },
      { year: "2024–25", rate: 63, display: "63%", spent: "₹7.1 Cr", total: "11.2 Cr" },
      { year: "2025–26", rate: 70, display: "70%", spent: "₹8.7 Cr", total: "₹12.4 Cr" }
    ],
    attentionProjects: [
      {
        id: "proj-201",
        title: "Rural Drainage Improvement",
        location: "Bhagalpur, Bihar",
        constituency: "Bhagalpur",
        mpName: "Neha Reddy",
        progress: 60,
        overdueDays: 22,
        financialUtilization: 65,
        allocated: "₹90L",
        spent: "₹58.5L",
        remaining: "₹31.5L",
        severity: "MEDIUM ATTENTION",
        severityClass: "severity-medium",
        category: "Sanitation",
        signals: [
          "Monsoon channel construction delayed by 22 days",
          "Third-party audit requested by district magistrate"
        ]
      }
    ]
  }
};

// ==========================================
// 2. MP DETAILS DATA
// ==========================================
export const mpDetailsData = {
  id: "mp-1",
  name: "Rahul Sharma",
  constituency: "Patna Sahib",
  state: "Bihar",
  term: "18th Lok Sabha (2024–2029)",
  party: "Democratic Coalition",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  kpis: {
    allocation: "₹2.4 Cr",
    spent: "₹1.8 Cr",
    utilization: "75%",
    projects: 12,
    attention: 2
  },
  fundChart: [
    { label: "Allocated", amount: 2.4, display: "₹2.4 Cr", color: "#0f172a", pct: "100%" },
    { label: "Spent", amount: 1.8, display: "₹1.8 Cr", color: "#0d9488", pct: "75%" },
    { label: "Remaining", amount: 0.6, display: "₹0.6 Cr", color: "#f59e0b", pct: "25%" }
  ],
  statusChart: [
    { status: "Completed", count: 6, percentage: 50.0, color: "#059669" },
    { status: "Ongoing", count: 4, percentage: 33.3, color: "#2563eb" },
    { status: "Delayed", count: 1, percentage: 8.3, color: "#f59e0b" },
    { status: "Attention", count: 1, percentage: 8.3, color: "#dc2626" }
  ],
  categoryChart: [
    { category: "Roads", count: 5, percentage: 41.7, color: "#0f766e" },
    { category: "Education", count: 3, percentage: 25.0, color: "#2563eb" },
    { category: "Healthcare", count: 2, percentage: 16.7, color: "#059669" },
    { category: "Water", count: 1, percentage: 8.3, color: "#0284c7" },
    { category: "Other", count: 1, percentage: 8.3, color: "#64748b" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Road Construction — Ward 12",
      allocated: "₹1.00 Cr",
      spent: "₹25L",
      progress: 32,
      status: "Ongoing",
      attention: "High",
      category: "Roads",
      deadline: "42 days overdue"
    },
    {
      id: "proj-102",
      title: "Primary School Renovation",
      allocated: "₹45L",
      spent: "₹38L",
      progress: 82,
      status: "Ongoing",
      attention: "Normal",
      category: "Education",
      deadline: "On schedule"
    },
    {
      id: "proj-103",
      title: "Community Health Center",
      allocated: "₹75L",
      spent: "₹75L",
      progress: 100,
      status: "Completed",
      attention: "Low",
      category: "Healthcare",
      deadline: "Completed"
    },
    {
      id: "proj-104",
      title: "Water Supply Project — Phase 2",
      allocated: "₹1.15 Cr",
      spent: "₹35L",
      progress: 30,
      status: "Ongoing",
      attention: "Medium",
      category: "Water",
      deadline: "20 days overdue"
    },
    {
      id: "proj-105",
      title: "Drainage Improvement",
      allocated: "₹50L",
      spent: "₹22L",
      progress: 45,
      status: "Ongoing",
      attention: "Normal",
      category: "Roads",
      deadline: "15 days remaining"
    },
    {
      id: "proj-106",
      title: "Solar Street Light Installation",
      allocated: "₹30L",
      spent: "₹30L",
      progress: 100,
      status: "Completed",
      attention: "Normal",
      category: "Other",
      deadline: "Completed"
    }
  ]
};

// ==========================================
// 3. ATTENTION CENTER DATA CONTRACT
// ==========================================
export const attentionAlertsContractData = [
  {
    alertId: "alt-001",
    projectId: "proj-1",
    projectTitle: "Road Construction — Ward 12",
    location: "Patna, Bihar",
    constituency: "Patna Sahib",
    mpName: "Rahul Sharma",
    severity: "HIGH",
    score: 82,
    rulesTriggered: [
      {
        rule: "OVERDUE_DEADLINE",
        message: "Project is overdue by 42 days",
        relevantValues: { overdueDays: 42, targetDate: "2026-07-14", threshold: 0 }
      },
      {
        rule: "PHYSICAL_PROGRESS_LAG",
        message: "Physical progress is below expected level",
        relevantValues: { actualProgress: 32, expectedProgress: 65, variance: -33 }
      },
      {
        rule: "STALE_UPDATE",
        message: "Last update was 78 days ago",
        relevantValues: { lastUpdateDays: 78, maxAllowedFreshness: 30 }
      }
    ],
    createdAt: "2026-08-24T08:30:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-002",
    projectId: "proj-2",
    projectTitle: "Community Health Center",
    location: "Muzaffarpur, Bihar",
    constituency: "Muzaffarpur",
    mpName: "Pawan Kumar",
    severity: "HIGH",
    score: 54,
    rulesTriggered: [
      {
        rule: "FINANCIAL_BURNOUT_MISMATCH",
        message: "Physical progress (28%) lagging behind financial burn rate (75%)",
        relevantValues: { physicalPct: 28, financialPct: 75, divergence: 47 }
      },
      {
        rule: "MILESTONE_SIGN_OFF_DELAY",
        message: "Milestone 2 pending sign-off for 35 days",
        relevantValues: { milestoneIndex: 2, pendingDays: 35 }
      },
      {
        rule: "INSPECTION_PENDING",
        message: "Site inspection verification required",
        relevantValues: { auditStatus: "REQUIRED" }
      }
    ],
    createdAt: "2026-08-24T06:15:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-003",
    projectId: "proj-101",
    projectTitle: "District Hospital ICU Wing",
    location: "Bhagalpur, Bihar",
    constituency: "Bhagalpur",
    mpName: "Sanjay Singh",
    severity: "HIGH",
    score: 76,
    rulesTriggered: [
      {
        rule: "EQUIPMENT_PROCUREMENT_DELAY",
        message: "Equipment procurement delayed by 28 days",
        relevantValues: { delayedDays: 28 }
      },
      {
        rule: "AUDIT_VERIFICATION_PENDING",
        message: "Verification audit pending for Phase 2 expenditure",
        relevantValues: { phase: 2, amount: "₹1.08 Cr" }
      }
    ],
    createdAt: "2026-08-23T11:45:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-004",
    projectId: "proj-3",
    projectTitle: "Water Supply Project — Phase 2",
    location: "Gaya, Bihar",
    constituency: "Gaya",
    mpName: "Anita Verma",
    severity: "MEDIUM",
    score: 48,
    rulesTriggered: [
      {
        rule: "PHASE_OVERDUE",
        message: "20 days overdue on pipe laying phase",
        relevantValues: { overdueDays: 20, phaseName: "Pipe Laying" }
      },
      {
        rule: "VENDOR_SUPPLY_UNVERIFIED",
        message: "Vendor supply verification pending",
        relevantValues: { vendorId: "VEND-8841" }
      },
      {
        rule: "EXPENDITURE_PROGRESS_VALIDATION",
        message: "Recent expenditure requires progress validation",
        relevantValues: { recentDisbursement: "₹35L" }
      }
    ],
    createdAt: "2026-08-24T04:20:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-005",
    projectId: "proj-201",
    projectTitle: "Rural Drainage Improvement",
    location: "Bhagalpur, Bihar",
    constituency: "Bhagalpur",
    mpName: "Neha Reddy",
    severity: "MEDIUM",
    score: 44,
    rulesTriggered: [
      {
        rule: "MONSOON_CHANNEL_DELAY",
        message: "Monsoon channel construction delayed by 22 days",
        relevantValues: { delayedDays: 22 }
      },
      {
        rule: "MAGISTRATE_AUDIT_REQUEST",
        message: "Third-party audit requested by district magistrate",
        relevantValues: { authority: "District Magistrate" }
      }
    ],
    createdAt: "2026-08-22T09:10:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-006",
    projectId: "proj-102",
    projectTitle: "Solar Street Light Installation",
    location: "Araria, Bihar",
    constituency: "Araria",
    mpName: "Vikram Pratap",
    severity: "MEDIUM",
    score: 42,
    rulesTriggered: [
      {
        rule: "POLE_SETUP_OVERDUE",
        message: "18 days overdue on block 4 pole setup",
        relevantValues: { overdueDays: 18, block: 4 }
      },
      {
        rule: "GEOTAGGED_REPORT_INCOMPLETE",
        message: "Geo-tagged inspection report incomplete",
        relevantValues: { submittedPhotos: 2, requiredPhotos: 8 }
      }
    ],
    createdAt: "2026-08-20T14:30:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-007",
    projectId: "proj-202",
    projectTitle: "Panchayat Bhavan Extension",
    location: "Patna, Bihar",
    constituency: "Patna Sahib",
    mpName: "Rahul Sharma",
    severity: "MEDIUM",
    score: 38,
    rulesTriggered: [
      {
        rule: "STRUCTURAL_AUDIT_RECOMMENDED",
        message: "Structural audit recommendation pending",
        relevantValues: { recommendationId: "STR-09" }
      },
      {
        rule: "QUARTERLY_EXPENDITURE_MISSING",
        message: "Quarterly expenditure verification missing",
        relevantValues: { quarter: "Q1" }
      }
    ],
    createdAt: "2026-08-19T10:00:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-008",
    projectId: "proj-4",
    projectTitle: "Primary School Renovation",
    location: "Gaya, Bihar",
    constituency: "Gaya",
    mpName: "Anita Verma",
    severity: "LOW",
    score: 28,
    rulesTriggered: [
      {
        rule: "ROOF_REINFORCEMENT_DELAY",
        message: "15 days delay in roof reinforcement phase",
        relevantValues: { delayedDays: 15 }
      },
      {
        rule: "PHOTO_UPDATE_PENDING",
        message: "Pending updated photos from field engineer",
        relevantValues: { inspector: "Er. Anita" }
      }
    ],
    createdAt: "2026-08-21T07:45:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-009",
    projectId: "proj-203",
    projectTitle: "Anganwadi Center Repair",
    location: "Muzaffarpur, Bihar",
    constituency: "Muzaffarpur",
    mpName: "Pawan Kumar",
    severity: "LOW",
    score: 22,
    rulesTriggered: [
      {
        rule: "MINOR_PAINT_DELAY",
        message: "Minor milestone delay (9 days) on paint work",
        relevantValues: { delayedDays: 9 }
      }
    ],
    createdAt: "2026-08-18T13:20:00Z",
    resolvedAt: null,
    status: "OPEN"
  },
  {
    alertId: "alt-010",
    projectId: "proj-301",
    projectTitle: "Community Hall Construction",
    location: "Patna, Bihar",
    constituency: "Patna Sahib",
    mpName: "Rahul Sharma",
    severity: "RESOLVED",
    score: 10,
    rulesTriggered: [
      {
        rule: "RESOLVED_AUDIT",
        message: "Resolved: Field engineer submitted geotagged proof on Aug 15",
        relevantValues: { resolutionType: "FIELD_VERIFIED" }
      },
      {
        rule: "TREASURY_VOUCHER_VERIFIED",
        message: "Resolved: Treasury voucher audit completed",
        relevantValues: { auditNumber: "TR-9022" }
      }
    ],
    createdAt: "2026-08-10T09:00:00Z",
    resolvedAt: "2026-08-15T16:30:00Z",
    status: "RESOLVED"
  },
  {
    alertId: "alt-011",
    projectId: "proj-302",
    projectTitle: "Sub-Health Post Electrification",
    location: "Gaya, Bihar",
    constituency: "Gaya",
    mpName: "Anita Verma",
    severity: "RESOLVED",
    score: 8,
    rulesTriggered: [
      {
        rule: "GRID_CONNECTION_ENERGIZED",
        message: "Resolved: Power grid connection energized and certified",
        relevantValues: { meterId: "GRID-771" }
      }
    ],
    createdAt: "2026-08-08T11:00:00Z",
    resolvedAt: "2026-08-12T14:20:00Z",
    status: "RESOLVED"
  }
];

// ==========================================
// 4. EVIDENCE DATA CONTRACT
// ==========================================
export const evidenceContractData = [
  {
    evidenceId: "ev-001",
    projectId: "proj-1",
    projectName: "Road Construction — Ward 12",
    type: "Site Photograph",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80",
    publicId: "civictrack/evidence/proj-1/site-photo-01",
    uploadedBy: "Er. Amit Raj (Field Inspector)",
    createdAt: "2026-08-16T09:15:00Z",
    source: "Field Verification",
    description: "Geotagged site photograph showing unpaved roadbed at Chainage 0+450 with drainage excavation underway.",
    location: "Patna, Bihar (25.5941° N, 85.1376° E)",
    verified: true
  },
  {
    evidenceId: "ev-002",
    projectId: "proj-1",
    projectName: "Road Construction — Ward 12",
    type: "Site Photograph",
    url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
    publicId: "civictrack/evidence/proj-1/site-photo-02",
    uploadedBy: "Er. Amit Raj (Field Inspector)",
    createdAt: "2026-08-10T14:30:00Z",
    source: "Field Verification",
    description: "Photographic inspection of culvert reinforcement mesh and concrete footing preparation.",
    location: "Patna, Bihar (25.5938° N, 85.1380° E)",
    verified: true
  },
  {
    evidenceId: "ev-003",
    projectId: "proj-1",
    projectName: "Road Construction — Ward 12",
    type: "Progress Document",
    url: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=80",
    publicId: "civictrack/evidence/proj-1/joint-measurement-docket",
    uploadedBy: "District Treasury Officer",
    createdAt: "2026-08-06T11:00:00Z",
    source: "Government Portal",
    description: "Official Joint Measurement Certificate & Milestone 1 Physical Verification Sanction Docket (Ref: CT-PTN-2026-088).",
    location: "Patna Sahib Treasury",
    verified: true,
    documentData: {
      docNumber: "MPLAD/2026/PTN/4412",
      pages: 4,
      signatory: "Superintending Engineer, RWD Bihar",
      stampDate: "06-08-2026"
    }
  },
  {
    evidenceId: "ev-004",
    projectId: "proj-4",
    projectName: "Primary School Renovation",
    type: "Approval Document",
    url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80",
    publicId: "civictrack/evidence/proj-4/technical-sanction",
    uploadedBy: "District Planning Cell",
    createdAt: "2026-08-18T10:20:00Z",
    source: "Official Record",
    description: "Technical sanction order for structural renovation and smart classroom electrical works.",
    location: "Gaya Collectorate",
    verified: true,
    documentData: {
      docNumber: "TS-EDU-2026-902",
      pages: 2,
      signatory: "District Magistrate, Gaya",
      stampDate: "18-08-2026"
    }
  },
  {
    evidenceId: "ev-005",
    projectId: "proj-2",
    projectName: "Community Health Center",
    type: "Site Photograph",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    publicId: "civictrack/evidence/proj-2/facade-inspection",
    uploadedBy: "Dr. S. K. Verma (Health Officer)",
    createdAt: "2026-08-15T15:40:00Z",
    source: "Field Verification",
    description: "Exterior facade and completed roof slab of OPD building wing.",
    location: "Muzaffarpur (26.1209° N, 85.3647° E)",
    verified: true
  },
  {
    evidenceId: "ev-006",
    projectId: "proj-3",
    projectName: "Water Supply Project — Phase 2",
    type: "Field Verification",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
    publicId: "civictrack/evidence/proj-3/reservoir-inspection",
    uploadedBy: "PHED Inspection Wing",
    createdAt: "2026-08-12T12:10:00Z",
    source: "Field Verification",
    description: "Overhead service reservoir staging inspection and pump test log validation.",
    location: "Gaya (24.7914° N, 85.0002° E)",
    verified: true
  },
  {
    evidenceId: "ev-007",
    projectId: "proj-105",
    projectName: "Drainage Improvement",
    type: "Progress Document",
    url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80",
    publicId: "civictrack/evidence/proj-105/hydraulic-report",
    uploadedBy: "Municipal Corporation",
    createdAt: "2026-08-08T16:00:00Z",
    source: "Government Portal",
    description: "Third-party hydraulic flow report and pre-monsoon clearance certificate.",
    location: "Bhagalpur",
    verified: true,
    documentData: {
      docNumber: "DRN-MCB-2026-311",
      pages: 6,
      signatory: "Executive Engineer, Drainage Board",
      stampDate: "08-08-2026"
    }
  },
  {
    evidenceId: "ev-008",
    projectId: "proj-2",
    projectName: "Community Health Center",
    type: "Approval Document",
    url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
    publicId: "civictrack/evidence/proj-2/completion-cert",
    uploadedBy: "State Health Mission",
    createdAt: "2026-08-01T08:50:00Z",
    source: "Official Record",
    description: "Final completion certificate & bio-medical waste handling compliance approval.",
    location: "Muzaffarpur",
    verified: true,
    documentData: {
      docNumber: "SHM-BIH-COMP-108",
      pages: 3,
      signatory: "Chief Medical Officer",
      stampDate: "01-08-2026"
    }
  }
];

// ==========================================
// 5. PROFILE DATA CONTRACT
// ==========================================
export const userProfileContractData = {
  name: "Admin User",
  email: "admin@civictrack.gov.in",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "Administrator",
  department: "Ministry of Statistics & Programme Implementation (MoSPI)",
  phone: "+91 98765 43210",
  timezone: "Asia/Kolkata (IST +05:30)",
  language: "English (India)",
  twoFactorEnabled: true,
  linkedAccounts: [
    { provider: "Google Workspace", email: "admin@civictrack.gov.in", status: "Active" },
    { provider: "National Informatics Centre (NIC)", email: "admin-nic@gov.in", status: "Connected" }
  ],
  activityLogs: [
    {
      id: "act-1",
      action: "Attention Signal Reviewed",
      details: "Inspected signal details for Road Construction — Ward 12 (42 days overdue).",
      timestamp: "Today at 11:20 AM",
      type: "alert"
    },
    {
      id: "act-2",
      action: "Filtered Financial Year Overview",
      details: "Switched dashboard overview dataset to FY 2025–26 across 48 monitored projects.",
      timestamp: "Today at 09:45 AM",
      type: "info"
    },
    {
      id: "act-3",
      action: "Evidence Verified",
      details: "Approved photographic verification record for Community Health Center.",
      timestamp: "Yesterday at 04:15 PM",
      type: "success"
    },
    {
      id: "act-4",
      action: "MP LAD Report Generated",
      details: "Downloaded comprehensive audit dossier for Rahul Sharma (Patna Sahib).",
      timestamp: "Aug 23, 2026, 02:30 PM",
      type: "info"
    },
    {
      id: "act-5",
      action: "System Session Authenticated",
      details: "Successful OAuth login from IP 103.24.12.89 (Patna, India).",
      timestamp: "Aug 22, 2026, 08:00 AM",
      type: "security"
    }
  ]
};

export const mockData = {
  currentUser: userProfileContractData,
  years: ["2025–26", "2024–25", "2023–24"],
  selectedYear: "2025–26",

  landingMetrics: {
    fundsTracked: "₹12.4 Cr",
    projectsMonitored: "48",
    projectsNeedingAttention: "9"
  },

  features: [
    {
      id: "transparency",
      title: "Fund Transparency",
      description: "Understand allocation, expenditure and remaining funds with full audit fidelity.",
      icon: "fund"
    },
    {
      id: "monitoring",
      title: "Project Monitoring",
      description: "Track project progress, milestone completions, and expected completion timelines.",
      icon: "monitoring"
    },
    {
      id: "alerts",
      title: "Explainable Alerts",
      description: "Understand exactly why a project was flagged through contextual signals.",
      icon: "alerts"
    },
    {
      id: "evidence",
      title: "Evidence",
      description: "Connect project records with timestamped photographic and physical evidence.",
      icon: "evidence"
    }
  ],

  howItWorksSteps: [
    {
      step: "01",
      title: "Collect",
      subtitle: "Fund and project data",
      details: "Aggregate MP LAD fund sanction orders, treasury disbursements, and contractor allocations into an immutable civic ledger."
    },
    {
      step: "02",
      title: "Analyze",
      subtitle: "Financial + physical progress + timeline",
      details: "Cross-reference financial disbursements with verified on-site milestones, satellite inspection tags, and scheduled deliverables."
    },
    {
      step: "03",
      title: "Surface",
      subtitle: "Projects that may require attention",
      details: "Detect milestone stalls, abnormal spending velocity, or overdue delivery to surface explainable civic signals for administrators."
    }
  ],

  attentionExample: {
    title: "Road Construction — Ward 12",
    location: "Patna, Bihar",
    financialUtilization: 25,
    physicalProgress: 32,
    overdueDays: 42,
    signals: [
      "Project is overdue by 42 days",
      "Progress is below expected level",
      "Last update is stale (78 days ago)"
    ],
    explanation: "These indicators suggest that the project may require further verification. This is not a finding of wrongdoing."
  },

  notifications: [
    {
      id: "notif-1",
      title: "Attention Signal Logged",
      message: "Road Construction — Ward 12 flagged: 42 days overdue.",
      time: "10 mins ago",
      type: "alert",
      read: false
    },
    {
      id: "notif-2",
      title: "Quarterly Utilization Update",
      message: "FY 2025–26 fund utilization reached 70.2% across constituencies.",
      time: "2 hours ago",
      type: "info",
      read: false
    },
    {
      id: "notif-3",
      title: "New Verification Evidence",
      message: "Photographic record uploaded for Primary School Renovation.",
      time: "1 day ago",
      type: "success",
      read: false
    }
  ]
};

// Accessor helpers
export function getOverviewData(year = "2025–26") {
  const dataset = yearDatasets[year] || yearDatasets["2025–26"];
  return {
    kpis: dataset.kpis,
    fundChart: dataset.fundChart,
    statusChart: dataset.statusChart,
    trendChart: dataset.trendChart,
    attentionProjects: dataset.attentionProjects,
    selectedYear: year
  };
}

export function getLandingData() {
  return {
    metrics: mockData.landingMetrics,
    features: mockData.features,
    howItWorks: mockData.howItWorksSteps,
    attentionExample: mockData.attentionExample
  };
}

export const authService = {
  loginWithGoogle(simulateFailure = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateFailure) {
          reject(new Error("Unable to connect to Google Identity Services. Please verify your network and try again."));
        } else {
          localStorage.setItem("civictrack_auth", "true");
          mockData.currentUser.isAuthenticated = true;
          resolve(mockData.currentUser);
        }
      }, 1000);
    });
  },

  logout() {
    localStorage.removeItem("civictrack_auth");
    mockData.currentUser.isAuthenticated = false;
    return Promise.resolve();
  },

  isAuthenticated() {
    return localStorage.getItem("civictrack_auth") === "true" || mockData.currentUser.isAuthenticated;
  }
};

export function loginUser() {
  localStorage.setItem("civictrack_auth", "true");
  mockData.currentUser.isAuthenticated = true;
  return mockData.currentUser;
}

export function logoutUser() {
  localStorage.removeItem("civictrack_auth");
  mockData.currentUser.isAuthenticated = false;
}

export function isUserAuthenticated() {
  return authService.isAuthenticated();
}
