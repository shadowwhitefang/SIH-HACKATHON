import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Topbar } from '../components/Topbar.jsx';
import { KPICardGrid } from '../components/KPICard.jsx';
import { FundUtilizationChart, ProjectStatusChart, UtilizationOverTimeChart } from '../components/Charts.jsx';
import { AttentionSection, ProjectSignalModal } from '../components/AttentionCard.jsx';
import { getOverviewData } from '../data/mockData.js';

export function DashboardPage({ onSignOut, onShowToast }) {
  const [selectedYear, setSelectedYear] = useState('2025–26');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const data = getOverviewData(selectedYear);

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
    if (onShowToast) {
      onShowToast(`Filtered dashboard data for Financial Year ${newYear}`, 'info');
    }
  };

  const handleExternalModuleClick = (moduleName, owner) => {
    if (onShowToast) {
      onShowToast(`${moduleName} is managed by ${owner}. Frontend Developer 1 owns Landing, Login, and Dashboard.`, 'info');
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeRoute="/dashboard"
        onSignOut={onSignOut}
        onExternalModuleClick={handleExternalModuleClick}
      />

      <div className="dashboard-main">
        <Topbar
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="dashboard-content-body">
          {/* 4 KPI Cards */}
          <KPICardGrid kpis={data.kpis} />

          {/* Charts Row 1: Fund Utilization (Bar) & Project Status (Donut) */}
          <section className="charts-grid-row">
            <FundUtilizationChart data={data.fundChart} />
            <ProjectStatusChart data={data.statusChart} />
          </section>

          {/* Charts Row 2: Fund Utilization Over Time (Line) & Projects Needing Attention */}
          <section className="charts-grid-row">
            <UtilizationOverTimeChart data={data.trendChart} />
            <AttentionSection
              projects={data.attentionProjects}
              searchQuery={searchQuery}
              onSelectProject={(proj) => setSelectedProject(proj)}
              onViewAll={() => handleExternalModuleClick('Attention Center', 'Frontend Developer 3')}
            />
          </section>
        </main>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectSignalModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
