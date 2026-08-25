/**
 * CivicTrack - Mock Data & Service Layer
 * Structured for easy future replacement with live backend REST / GraphQL APIs.
 */

// Multi-year dataset storage
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
      },
      {
        id: "proj-102",
        title: "Solar Street Light Installation",
        location: "Araria, Bihar",
        constituency: "Araria",
        mpName: "Vikram Pratap",
        progress: 45,
        overdueDays: 18,
        financialUtilization: 48,
        allocated: "₹50L",
        spent: "₹24L",
        remaining: "₹26L",
        severity: "MEDIUM ATTENTION",
        severityClass: "severity-medium",
        category: "Energy",
        signals: [
          "18 days overdue on block 4 pole setup",
          "Geo-tagged inspection report incomplete"
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

export const mockData = {
  currentUser: {
    name: "Admin User",
    email: "admin@civictrack.gov.in",
    role: "Administrator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    isAuthenticated: true
  },

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

/**
 * Authentication Service Abstraction
 * Supports Default, Loading, Success, and Error states cleanly.
 * Ready for backend REST / OAuth API hookup.
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
