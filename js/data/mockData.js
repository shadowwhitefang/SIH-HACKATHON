/**
 * CivicTrack - Mock Data Abstraction Layer
 * Structured for easy future replacement with live backend REST / GraphQL APIs.
 */

export const mockData = {
  currentUser: {
    name: "Admin User",
    email: "admin@civictrack.gov.in",
    role: "Administrator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    isAuthenticated: true
  },

  years: ["2025–26", "2024–25", "2023–24", "2022–23"],
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
      description: "Understand allocation, expenditure and remaining funds.",
      icon: "fund"
    },
    {
      id: "monitoring",
      title: "Project Monitoring",
      description: "Track project progress and expected completion.",
      icon: "monitoring"
    },
    {
      id: "alerts",
      title: "Explainable Alerts",
      description: "Understand exactly why a project was flagged.",
      icon: "alerts"
    },
    {
      id: "evidence",
      title: "Evidence",
      description: "Connect project records with supporting evidence.",
      icon: "evidence"
    }
  ],

  howItWorksSteps: [
    {
      step: "01",
      title: "Collect",
      subtitle: "Fund and project data"
    },
    {
      step: "02",
      title: "Analyze",
      subtitle: "Financial + physical progress + timeline"
    },
    {
      step: "03",
      title: "Surface",
      subtitle: "Projects that may require attention"
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

  dashboardKPIs: {
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

  fundUtilizationChart: [
    { label: "Allocated", amount: 12.4, display: "₹12.4 Cr", color: "#0f172a" },
    { label: "Spent", amount: 8.7, display: "₹8.7 Cr", color: "#0d9488" },
    { label: "Remaining", amount: 3.7, display: "₹3.7 Cr", color: "#f59e0b" }
  ],

  projectStatusChart: [
    { status: "Completed", count: 21, percentage: 43.8, color: "#059669" },
    { status: "Ongoing", count: 18, percentage: 37.5, color: "#2563eb" },
    { status: "Delayed", count: 6, percentage: 12.5, color: "#f59e0b" },
    { status: "Attention", count: 3, percentage: 6.2, color: "#dc2626" }
  ],

  utilizationOverTimeChart: [
    { year: "2022–23", rate: 45 },
    { year: "2023–24", rate: 55 },
    { year: "2024–25", rate: 63 },
    { year: "2025–26", rate: 70 }
  ],

  attentionProjects: [
    {
      id: "proj-1",
      title: "Road Construction — Ward 12",
      location: "Patna, Bihar",
      constituency: "Patna Sahib",
      progress: 32,
      overdueDays: 42,
      financialUtilization: 25,
      allocated: "₹1.00 Cr",
      spent: "₹25L",
      remaining: "₹75L",
      severity: "HIGH ATTENTION",
      severityClass: "severity-high",
      signals: [
        "Project is overdue by 42 days",
        "Physical progress is below expected level",
        "Last progress update was 78 days ago"
      ]
    },
    {
      id: "proj-2",
      title: "Community Health Center",
      location: "Muzaffarpur, Bihar",
      constituency: "Muzaffarpur",
      progress: 28,
      overdueDays: 35,
      financialUtilization: 75,
      allocated: "₹75L",
      spent: "₹56L",
      remaining: "₹19L",
      severity: "MEDIUM ATTENTION",
      severityClass: "severity-medium",
      signals: [
        "Physical progress lagging behind financial burn rate",
        "Milestone 2 pending sign-off for 35 days",
        "Site inspection verification required"
      ]
    },
    {
      id: "proj-3",
      title: "Water Supply Project — Phase 2",
      location: "Gaya, Bihar",
      constituency: "Gaya",
      progress: 30,
      overdueDays: 20,
      financialUtilization: 30,
      allocated: "₹1.15 Cr",
      spent: "₹35L",
      remaining: "₹80L",
      severity: "ATTENTION",
      severityClass: "severity-low",
      signals: [
        "20 days overdue on pipe laying phase",
        "Vendor supply verification pending",
        "Recent expenditure requires progress validation"
      ]
    }
  ],

  notifications: [
    {
      id: "notif-1",
      title: "Attention Signal Logged",
      message: "Road Construction — Ward 12 flagged: 42 days overdue.",
      time: "10 mins ago",
      type: "alert"
    },
    {
      id: "notif-2",
      title: "Quarterly Utilization Update",
      message: "FY 2025-26 utilization reached 70.2%.",
      time: "2 hours ago",
      type: "info"
    },
    {
      id: "notif-3",
      title: "New Verification Evidence",
      message: "Photographic record uploaded for Primary School Renovation.",
      time: "1 day ago",
      type: "success"
    }
  ]
};

// Accessor and state helpers
export function getOverviewData(year = "2025–26") {
  return {
    kpis: mockData.dashboardKPIs,
    fundChart: mockData.fundUtilizationChart,
    statusChart: mockData.projectStatusChart,
    trendChart: mockData.utilizationOverTimeChart,
    attentionProjects: mockData.attentionProjects,
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
  return localStorage.getItem("civictrack_auth") === "true" || mockData.currentUser.isAuthenticated;
}
