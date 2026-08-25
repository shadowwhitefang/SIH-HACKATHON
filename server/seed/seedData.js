/**
 * CivicTrack Curated Demo Seed Dataset
 * Contains multi-state MPs, multi-year fund allocations, and projects across diverse categories and statuses.
 * Provenance is explicitly tagged as 'demo' / 'curated'.
 */

const DEMO_PROVENANCE = {
  type: 'demo',
  name: 'CivicTrack Curated Demo Dataset',
  url: null,
  retrievedAt: new Date('2026-08-25T00:00:00.000Z')
};

const mps = [
  {
    mpId: 'mp_patna_sahib',
    name: 'Ravi Shankar Prasad',
    constituency: 'Patna Sahib',
    state: 'Bihar',
    party: 'BJP',
    dataSource: DEMO_PROVENANCE
  },
  {
    mpId: 'mp_muzaffarpur',
    name: 'Raj Bhushan Choudhary',
    constituency: 'Muzaffarpur',
    state: 'Bihar',
    party: 'BJP',
    dataSource: DEMO_PROVENANCE
  },
  {
    mpId: 'mp_gaya',
    name: 'Jitan Ram Manjhi',
    constituency: 'Gaya',
    state: 'Bihar',
    party: 'HAM',
    dataSource: DEMO_PROVENANCE
  },
  {
    mpId: 'mp_varanasi',
    name: 'Narendra Modi',
    constituency: 'Varanasi',
    state: 'Uttar Pradesh',
    party: 'BJP',
    dataSource: DEMO_PROVENANCE
  },
  {
    mpId: 'mp_new_delhi',
    name: 'Bansuri Swaraj',
    constituency: 'New Delhi',
    state: 'Delhi',
    party: 'BJP',
    dataSource: DEMO_PROVENANCE
  },
  {
    mpId: 'mp_bangalore_south',
    name: 'Tejasvi Surya',
    constituency: 'Bangalore South',
    state: 'Karnataka',
    party: 'BJP',
    dataSource: DEMO_PROVENANCE
  },
  {
    mpId: 'mp_ernakulam',
    name: 'Hibi Eden',
    constituency: 'Ernakulam',
    state: 'Kerala',
    party: 'INC',
    dataSource: DEMO_PROVENANCE
  },
  {
    mpId: 'mp_pune',
    name: 'Murlidhar Mohol',
    constituency: 'Pune',
    state: 'Maharashtra',
    party: 'BJP',
    dataSource: DEMO_PROVENANCE
  }
];

const fundAllocations = [
  // Patna Sahib Allocations
  {
    allocationId: 'alloc_2025_patna_sahib',
    mpId: 'mp_patna_sahib',
    financialYear: '2025–26',
    allocatedAmount: 50000000, // 5 Cr
    releasedAmount: 40000000,
    spentAmount: 35100000,     // 3.51 Cr (70.2% util)
    dataSource: DEMO_PROVENANCE
  },
  {
    allocationId: 'alloc_2024_patna_sahib',
    mpId: 'mp_patna_sahib',
    financialYear: '2024–25',
    allocatedAmount: 50000000,
    releasedAmount: 50000000,
    spentAmount: 42000000,
    dataSource: DEMO_PROVENANCE
  },
  {
    allocationId: 'alloc_2023_patna_sahib',
    mpId: 'mp_patna_sahib',
    financialYear: '2023–24',
    allocatedAmount: 50000000,
    releasedAmount: 50000000,
    spentAmount: 38000000,
    dataSource: DEMO_PROVENANCE
  },
  {
    allocationId: 'alloc_2022_patna_sahib',
    mpId: 'mp_patna_sahib',
    financialYear: '2022–23',
    allocatedAmount: 50000000,
    releasedAmount: 50000000,
    spentAmount: 32000000,
    dataSource: DEMO_PROVENANCE
  },

  // Muzaffarpur Allocations
  {
    allocationId: 'alloc_2025_muzaffarpur',
    mpId: 'mp_muzaffarpur',
    financialYear: '2025–26',
    allocatedAmount: 50000000,
    releasedAmount: 35000000,
    spentAmount: 26000000,
    dataSource: DEMO_PROVENANCE
  },
  {
    allocationId: 'alloc_2024_muzaffarpur',
    mpId: 'mp_muzaffarpur',
    financialYear: '2024–25',
    allocatedAmount: 50000000,
    releasedAmount: 45000000,
    spentAmount: 39000000,
    dataSource: DEMO_PROVENANCE
  },

  // Gaya Allocations
  {
    allocationId: 'alloc_2025_gaya',
    mpId: 'mp_gaya',
    financialYear: '2025–26',
    allocatedAmount: 24000000, // 2.4 Cr
    releasedAmount: 20000000,
    spentAmount: 15900000,
    dataSource: DEMO_PROVENANCE
  },

  // Varanasi Allocations
  {
    allocationId: 'alloc_2025_varanasi',
    mpId: 'mp_varanasi',
    financialYear: '2025–26',
    allocatedAmount: 50000000,
    releasedAmount: 45000000,
    spentAmount: 41000000,
    dataSource: DEMO_PROVENANCE
  },

  // Bangalore South Allocations
  {
    allocationId: 'alloc_2025_bangalore_south',
    mpId: 'mp_bangalore_south',
    financialYear: '2025–26',
    allocatedAmount: 50000000,
    releasedAmount: 48000000,
    spentAmount: 39500000,
    dataSource: DEMO_PROVENANCE
  }
];

const projects = [
  // 1. Road Construction - Ward 12 (Overdue/Delayed)
  {
    projectId: 'proj_001',
    mpId: 'mp_patna_sahib',
    name: 'Road Construction — Ward 12',
    category: 'Road',
    location: 'Kankarbagh, Patna, Bihar',
    constituency: 'Patna Sahib',
    state: 'Bihar',
    financialYear: '2025–26',
    allocatedAmount: 10000000, // 1.00 Cr
    spentAmount: 2500000,      // 25L (25% util)
    progressPercent: 32,
    startDate: new Date('2025-04-01'),
    expectedCompletionDate: new Date('2025-10-31'),
    status: 'DELAYED',
    lastUpdatedAt: new Date('2026-06-01'),
    dataSource: DEMO_PROVENANCE
  },

  // 2. Community Health Center (Needs Attention)
  {
    projectId: 'proj_002',
    mpId: 'mp_muzaffarpur',
    name: 'Community Health Center Renovation',
    category: 'Healthcare',
    location: 'Maripur, Muzaffarpur, Bihar',
    constituency: 'Muzaffarpur',
    state: 'Bihar',
    financialYear: '2025–26',
    allocatedAmount: 7500000,  // 75L
    spentAmount: 5625000,      // 56.25L (75% util)
    progressPercent: 28,
    startDate: new Date('2025-05-15'),
    expectedCompletionDate: new Date('2026-02-28'),
    status: 'NEEDS_ATTENTION',
    lastUpdatedAt: new Date('2026-07-15'),
    dataSource: DEMO_PROVENANCE
  },

  // 3. Water Supply Pipeline Phase 2 (Ongoing)
  {
    projectId: 'proj_003',
    mpId: 'mp_gaya',
    name: 'Water Supply Project — Phase 2',
    category: 'Water Supply',
    location: 'Bodhigaya Road, Gaya, Bihar',
    constituency: 'Gaya',
    state: 'Bihar',
    financialYear: '2025–26',
    allocatedAmount: 11500000, // 1.15 Cr
    spentAmount: 3450000,      // 34.5L (30% util)
    progressPercent: 30,
    startDate: new Date('2025-06-01'),
    expectedCompletionDate: new Date('2026-05-30'),
    status: 'ONGOING',
    lastUpdatedAt: new Date('2026-08-01'),
    dataSource: DEMO_PROVENANCE
  },

  // 4. Primary School Smart Classrooms (Completed)
  {
    projectId: 'proj_004',
    mpId: 'mp_patna_sahib',
    name: 'Primary School Smart Classrooms Installation',
    category: 'Education',
    location: 'Gulzarbagh, Patna, Bihar',
    constituency: 'Patna Sahib',
    state: 'Bihar',
    financialYear: '2025–26',
    allocatedAmount: 5000000,  // 50L
    spentAmount: 4950000,      // 49.5L
    progressPercent: 100,
    startDate: new Date('2025-04-10'),
    expectedCompletionDate: new Date('2025-09-30'),
    status: 'COMPLETED',
    lastUpdatedAt: new Date('2025-10-05'),
    dataSource: DEMO_PROVENANCE
  },

  // 5. Public Sanitation Facility (Completed)
  {
    projectId: 'proj_005',
    mpId: 'mp_varanasi',
    name: 'Modern Public Sanitation Complex',
    category: 'Sanitation',
    location: 'Dashashwamedh Ghat, Varanasi, UP',
    constituency: 'Varanasi',
    state: 'Uttar Pradesh',
    financialYear: '2025–26',
    allocatedAmount: 6000000,
    spentAmount: 5800000,
    progressPercent: 100,
    startDate: new Date('2025-05-01'),
    expectedCompletionDate: new Date('2025-11-15'),
    status: 'COMPLETED',
    lastUpdatedAt: new Date('2025-11-20'),
    dataSource: DEMO_PROVENANCE
  },

  // 6. Solar Street Lighting Grid (Ongoing)
  {
    projectId: 'proj_006',
    mpId: 'mp_bangalore_south',
    name: 'Solar Street Lighting Installation',
    category: 'Energy',
    location: 'Jayanagar, Bangalore, Karnataka',
    constituency: 'Bangalore South',
    state: 'Karnataka',
    financialYear: '2025–26',
    allocatedAmount: 8000000,
    spentAmount: 5200000,
    progressPercent: 65,
    startDate: new Date('2025-07-01'),
    expectedCompletionDate: new Date('2026-03-31'),
    status: 'ONGOING',
    lastUpdatedAt: new Date('2026-08-10'),
    dataSource: DEMO_PROVENANCE
  },

  // 7. Community Skill Development Center (Ongoing)
  {
    projectId: 'proj_007',
    mpId: 'mp_ernakulam',
    name: 'Vocational Skill Center Upgrade',
    category: 'Education',
    location: 'Kochi, Ernakulam, Kerala',
    constituency: 'Ernakulam',
    state: 'Kerala',
    financialYear: '2025–26',
    allocatedAmount: 4500000,
    spentAmount: 2700000,
    progressPercent: 60,
    startDate: new Date('2025-08-01'),
    expectedCompletionDate: new Date('2026-04-30'),
    status: 'ONGOING',
    lastUpdatedAt: new Date('2026-08-15'),
    dataSource: DEMO_PROVENANCE
  },

  // 8. Storm Water Drainage Improvement (Needs Attention)
  {
    projectId: 'proj_008',
    mpId: 'mp_pune',
    name: 'Storm Water Drainage Improvement',
    category: 'Sanitation',
    location: 'Shivajinagar, Pune, Maharashtra',
    constituency: 'Pune',
    state: 'Maharashtra',
    financialYear: '2025–26',
    allocatedAmount: 12000000,
    spentAmount: 9000000,
    progressPercent: 40,
    startDate: new Date('2025-03-01'),
    expectedCompletionDate: new Date('2025-12-31'),
    status: 'NEEDS_ATTENTION',
    lastUpdatedAt: new Date('2026-07-01'),
    dataSource: DEMO_PROVENANCE
  },

  // 9. Dialysis Unit at District Hospital (Completed - FY 2024-25)
  {
    projectId: 'proj_009',
    mpId: 'mp_patna_sahib',
    name: 'Dialysis Unit at District Hospital',
    category: 'Healthcare',
    location: 'Patna City, Bihar',
    constituency: 'Patna Sahib',
    state: 'Bihar',
    financialYear: '2024–25',
    allocatedAmount: 15000000,
    spentAmount: 14800000,
    progressPercent: 100,
    startDate: new Date('2024-05-01'),
    expectedCompletionDate: new Date('2025-01-31'),
    status: 'COMPLETED',
    lastUpdatedAt: new Date('2025-02-10'),
    dataSource: DEMO_PROVENANCE
  },

  // 10. High School Science Laboratory (Planned)
  {
    projectId: 'proj_010',
    mpId: 'mp_new_delhi',
    name: 'Modern Science Laboratory Construction',
    category: 'Education',
    location: 'Laxmi Bai Nagar, New Delhi',
    constituency: 'New Delhi',
    state: 'Delhi',
    financialYear: '2025–26',
    allocatedAmount: 3500000,
    spentAmount: 0,
    progressPercent: 0,
    startDate: new Date('2026-01-15'),
    expectedCompletionDate: new Date('2026-09-30'),
    status: 'PLANNED',
    lastUpdatedAt: new Date('2026-08-20'),
    dataSource: DEMO_PROVENANCE
  }
];

module.exports = {
  mps,
  fundAllocations,
  projects
};
