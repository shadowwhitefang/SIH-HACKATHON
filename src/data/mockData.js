/**
 * CivicTrack - Mock Data & Service Layer
 * Structured for easy future replacement with live backend REST / GraphQL APIs.
 */

// Multi-year dataset storage for Dashboard
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
      { year: "2024–25", rate: 63, display: "63%", spent: "₹7.1 Cr", total: "₹11.2 Cr" },
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
// 1. MP DETAILS DATA (Rahul Sharma - Patna Sahib)
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
// 2. ATTENTION CENTER DATA
// ==========================================
export const attentionCenterData = {
  summary: {
    total: 9,
    high: 3,
    medium: 4,
    low: 2,
    resolved: 5
  },
  items: [
    {
      id: "proj-1",
      title: "Road Construction — Ward 12",
      location: "Patna, Bihar",
      constituency: "Patna Sahib",
      mpName: "Rahul Sharma",
      score: 82,
      severity: "High",
      severityTab: "High",
      lastEvaluated: "Aug 24, 2026",
      signalsCount: 3,
      signals: [
        "Project is overdue by 42 days against approved timeline",
        "Physical progress is below expected level (32% vs 65% target)",
        "Last progress update was 78 days ago from field engineer"
      ],
      allocated: "₹1.00 Cr",
      spent: "₹25L",
      progress: 32
    },
    {
      id: "proj-2",
      title: "Community Health Center",
      location: "Muzaffarpur, Bihar",
      constituency: "Muzaffarpur",
      mpName: "Pawan Kumar",
      score: 54,
      severity: "High",
      severityTab: "High",
      lastEvaluated: "Aug 24, 2026",
      signalsCount: 3,
      signals: [
        "Physical progress (28%) lagging behind financial burn rate (75%)",
        "Milestone 2 pending sign-off for 35 days",
        "Site inspection verification required"
      ],
      allocated: "₹75L",
      spent: "₹56L",
      progress: 28
    },
    {
      id: "proj-101",
      title: "District Hospital ICU Wing",
      location: "Bhagalpur, Bihar",
      constituency: "Bhagalpur",
      mpName: "Sanjay Singh",
      score: 76,
      severity: "High",
      severityTab: "High",
      lastEvaluated: "Aug 23, 2026",
      signalsCount: 2,
      signals: [
        "Equipment procurement delayed by 28 days",
        "Verification audit pending for Phase 2 expenditure"
      ],
      allocated: "₹1.80 Cr",
      spent: "₹1.08 Cr",
      progress: 40
    },
    {
      id: "proj-3",
      title: "Water Supply Project — Phase 2",
      location: "Gaya, Bihar",
      constituency: "Gaya",
      mpName: "Anita Verma",
      score: 48,
      severity: "Medium",
      severityTab: "Medium",
      lastEvaluated: "Aug 24, 2026",
      signalsCount: 3,
      signals: [
        "20 days overdue on pipe laying phase",
        "Vendor supply verification pending",
        "Recent expenditure requires progress validation"
      ],
      allocated: "₹1.15 Cr",
      spent: "₹35L",
      progress: 30
    },
    {
      id: "proj-201",
      title: "Rural Drainage Improvement",
      location: "Bhagalpur, Bihar",
      constituency: "Bhagalpur",
      mpName: "Neha Reddy",
      score: 44,
      severity: "Medium",
      severityTab: "Medium",
      lastEvaluated: "Aug 22, 2026",
      signalsCount: 2,
      signals: [
        "Monsoon channel construction delayed by 22 days",
        "Third-party audit requested by district magistrate"
      ],
      allocated: "₹90L",
      spent: "₹58.5L",
      progress: 60
    },
    {
      id: "proj-102",
      title: "Solar Street Light Installation",
      location: "Araria, Bihar",
      constituency: "Araria",
      mpName: "Vikram Pratap",
      score: 42,
      severity: "Medium",
      severityTab: "Medium",
      lastEvaluated: "Aug 20, 2026",
      signalsCount: 2,
      signals: [
        "18 days overdue on block 4 pole setup",
        "Geo-tagged inspection report incomplete"
      ],
      allocated: "₹50L",
      spent: "₹24L",
      progress: 45
    },
    {
      id: "proj-202",
      title: "Panchayat Bhavan Extension",
      location: "Patna, Bihar",
      constituency: "Patna Sahib",
      mpName: "Rahul Sharma",
      score: 38,
      severity: "Medium",
      severityTab: "Medium",
      lastEvaluated: "Aug 19, 2026",
      signalsCount: 2,
      signals: [
        "Structural audit recommendation pending",
        "Quarterly expenditure verification missing"
      ],
      allocated: "₹40L",
      spent: "₹18L",
      progress: 50
    },
    {
      id: "proj-4",
      title: "Primary School Renovation",
      location: "Gaya, Bihar",
      constituency: "Gaya",
      mpName: "Anita Verma",
      score: 28,
      severity: "Low",
      severityTab: "Low",
      lastEvaluated: "Aug 21, 2026",
      signalsCount: 2,
      signals: [
        "15 days delay in roof reinforcement phase",
        "Pending updated photos from field engineer"
      ],
      allocated: "₹45L",
      spent: "₹22.5L",
      progress: 52
    },
    {
      id: "proj-203",
      title: "Anganwadi Center Repair",
      location: "Muzaffarpur, Bihar",
      constituency: "Muzaffarpur",
      mpName: "Pawan Kumar",
      score: 22,
      severity: "Low",
      severityTab: "Low",
      lastEvaluated: "Aug 18, 2026",
      signalsCount: 1,
      signals: [
        "Minor milestone delay (9 days) on paint work"
      ],
      allocated: "₹20L",
      spent: "₹12L",
      progress: 70
    },
    // Resolved items
    {
      id: "proj-301",
      title: "Community Hall Construction",
      location: "Patna, Bihar",
      constituency: "Patna Sahib",
      mpName: "Rahul Sharma",
      score: 10,
      severity: "Resolved",
      severityTab: "Resolved",
      lastEvaluated: "Aug 15, 2026",
      signalsCount: 0,
      signals: [
        "Resolved: Field engineer submitted geotagged proof on Aug 15",
        "Resolved: Treasury voucher audit completed"
      ],
      allocated: "₹60L",
      spent: "₹60L",
      progress: 100
    },
    {
      id: "proj-302",
      title: "Sub-Health Post Electrification",
      location: "Gaya, Bihar",
      constituency: "Gaya",
      mpName: "Anita Verma",
      score: 8,
      severity: "Resolved",
      severityTab: "Resolved",
      lastEvaluated: "Aug 12, 2026",
      signalsCount: 0,
      signals: [
        "Resolved: Power grid connection energized and certified"
      ],
      allocated: "₹25L",
      spent: "₹25L",
      progress: 100
    }
  ]
};

// ==========================================
// 3. EVIDENCE LIBRARY DATA
// ==========================================
export const evidenceLibraryData = [
  {
    id: "ev-1",
    title: "Road Construction — Ward 12",
    type: "Site Photograph",
    typeClass: "type-photo",
    date: "Aug 16, 2026",
    source: "Field Verification",
    uploader: "Er. Amit Raj (Field Inspector)",
    projectId: "proj-1",
    projectName: "Road Construction — Ward 12",
    location: "Patna, Bihar (25.5941° N, 85.1376° E)",
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=400&auto=format&fit=crop&q=80",
    description: "Geotagged site photograph showing unpaved roadbed at Chainage 0+450 with drainage excavation underway.",
    fileSize: "3.4 MB",
    verified: true
  },
  {
    id: "ev-2",
    title: "Road Construction — Ward 12",
    type: "Site Photograph",
    typeClass: "type-photo",
    date: "Aug 10, 2026",
    source: "Field Verification",
    uploader: "Er. Amit Raj (Field Inspector)",
    projectId: "proj-1",
    projectName: "Road Construction — Ward 12",
    location: "Patna, Bihar (25.5938° N, 85.1380° E)",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&auto=format&fit=crop&q=80",
    description: "Photographic inspection of culvert reinforcement mesh and concrete footing preparation.",
    fileSize: "4.1 MB",
    verified: true
  },
  {
    id: "ev-3",
    title: "Road Construction — Ward 12",
    type: "Progress Document",
    typeClass: "type-doc",
    date: "Aug 06, 2026",
    source: "Government Portal",
    uploader: "District Treasury Officer",
    projectId: "proj-1",
    projectName: "Road Construction — Ward 12",
    location: "Patna Sahib Treasury",
    thumbnail: "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&auto=format&fit=crop&q=80",
    description: "Official Joint Measurement Certificate & Milestone 1 Physical Verification Sanction Docket (Ref: CT-PTN-2026-088).",
    fileSize: "1.2 MB",
    verified: true,
    documentData: {
      docNumber: "MPLAD/2026/PTN/4412",
      pages: 4,
      signatory: "Superintending Engineer, RWD Bihar",
      stampDate: "06-08-2026"
    }
  },
  {
    id: "ev-4",
    title: "Primary School Renovation",
    type: "Approval Document",
    typeClass: "type-approval",
    date: "Aug 18, 2026",
    source: "Official Record",
    uploader: "District Planning Cell",
    projectId: "proj-4",
    projectName: "Primary School Renovation",
    location: "Gaya Collectorate",
    thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop&q=80",
    description: "Technical sanction order for structural renovation and smart classroom electrical works.",
    fileSize: "850 KB",
    verified: true,
    documentData: {
      docNumber: "TS-EDU-2026-902",
      pages: 2,
      signatory: "District Magistrate, Gaya",
      stampDate: "18-08-2026"
    }
  },
  {
    id: "ev-5",
    title: "Community Health Center",
    type: "Site Photograph",
    typeClass: "type-photo",
    date: "Aug 15, 2026",
    source: "Field Verification",
    uploader: "Dr. S. K. Verma (Health Officer)",
    projectId: "proj-2",
    projectName: "Community Health Center",
    location: "Muzaffarpur (26.1209° N, 85.3647° E)",
    thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&auto=format&fit=crop&q=80",
    description: "Exterior facade and completed roof slab of OPD building wing.",
    fileSize: "2.8 MB",
    verified: true
  },
  {
    id: "ev-6",
    title: "Water Supply Project — Phase 2",
    type: "Field Verification",
    typeClass: "type-verification",
    date: "Aug 12, 2026",
    source: "Field Verification",
    uploader: "PHED Inspection Wing",
    projectId: "proj-3",
    projectName: "Water Supply Project — Phase 2",
    location: "Gaya (24.7914° N, 85.0002° E)",
    thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=80",
    description: "Overhead service reservoir staging inspection and pump test log validation.",
    fileSize: "5.2 MB",
    verified: true
  },
  {
    id: "ev-7",
    title: "Drainage Improvement",
    type: "Progress Document",
    typeClass: "type-doc",
    date: "Aug 08, 2026",
    source: "Government Portal",
    uploader: "Municipal Corporation",
    projectId: "proj-105",
    projectName: "Drainage Improvement",
    location: "Bhagalpur",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&auto=format&fit=crop&q=80",
    description: "Third-party hydraulic flow report and pre-monsoon clearance certificate.",
    fileSize: "1.8 MB",
    verified: true,
    documentData: {
      docNumber: "DRN-MCB-2026-311",
      pages: 6,
      signatory: "Executive Engineer, Drainage Board",
      stampDate: "08-08-2026"
    }
  },
  {
    id: "ev-8",
    title: "Community Health Center",
    type: "Approval Document",
    typeClass: "type-approval",
    date: "Aug 01, 2026",
    source: "Official Record",
    uploader: "State Health Mission",
    projectId: "proj-2",
    projectName: "Community Health Center",
    location: "Muzaffarpur",
    thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&auto=format&fit=crop&q=80",
    description: "Final completion certificate & bio-medical waste handling compliance approval.",
    fileSize: "920 KB",
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
// 4. USER PROFILE & ACTIVITY DATA
// ==========================================
export const userProfileData = {
  name: "Admin User",
  email: "admin@civictrack.gov.in",
  role: "Administrator",
  department: "Ministry of Statistics & Programme Implementation (MoSPI)",
  phone: "+91 98765 43210",
  timezone: "Asia/Kolkata (IST +05:30)",
  language: "English (India)",
  twoFactorEnabled: true,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
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
  currentUser: userProfileData,
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

// Accessor and state helpers
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

export function getMPDetails(id = "mp-1") {
  return mpDetailsData;
}

export function getAttentionCenterData() {
  return attentionCenterData;
}

export function getEvidenceLibraryData() {
  return evidenceLibraryData;
}

export function getUserProfile() {
  return userProfileData;
}

/**
 * Authentication Service Abstraction
 */
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
