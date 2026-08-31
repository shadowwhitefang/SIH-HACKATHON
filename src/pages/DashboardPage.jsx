import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const data = getOverviewData(selectedYear);

  const handleYearChange = (newYear) => {
    setIsLoading(true);
    setSelectedYear(newYear);
    if (onShowToast) {
      onShowToast(`Loaded financial data for FY ${newYear}`, 'info');
    }
    // Brief skeleton transition for smooth visual feedback
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  const handleNavigateToProject = (projectId, projectTitle) => {
    if (onShowToast) {
      onShowToast(`Navigating to Project: "${projectTitle}" (/projects/${projectId}) [Frontend 2 Module]`, 'info');
    }
    window.location.hash = `#/projects/${projectId}`;
  };

  const handleExternalModuleClick = (moduleName, owner) => {
    if (onShowToast) {
      onShowToast(`${moduleName} is managed by ${owner}. Frontend Developer 1 owns Landing, Login, and Dashboard.`, 'info');
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar with Desktop Sticky + Mobile Slide-out Drawer */}
      <Sidebar
        activeRoute="/dashboard"
        onSignOut={onSignOut}
        onExternalModuleClick={handleExternalModuleClick}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
      />

      <div className="dashboard-main">
        {/* Topbar with FY Selector, Search, Notifications, Avatar Menu */}
        <Topbar
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSignOut={onSignOut}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onExternalModuleClick={handleExternalModuleClick}
        />

        <main className="dashboard-content-body" id="dashboard-main-content">
          {/* 4 KPI Cards with Skeleton Loading State */}
          <KPICardGrid kpis={data.kpis} isLoading={isLoading} />

          {/* Charts Row 1: Fund Utilization (Bar) & Project Status (Donut) */}
          <section className="charts-grid-row" aria-label="Financial Overview Charts">
            {isLoading ? (
              <>
                <article className="chart-card skeleton-card">
                  <div className="skeleton" style={{ width: '40%', height: '20px', marginBottom: '20px' }}></div>
                  <div className="skeleton" style={{ width: '100%', height: '180px' }}></div>
                </article>
                <article className="chart-card skeleton-card">
                  <div className="skeleton" style={{ width: '40%', height: '20px', marginBottom: '20px' }}></div>
                  <div className="skeleton" style={{ width: '100%', height: '180px' }}></div>
                </article>
              </>
            ) : (
              <>
                <FundUtilizationChart data={data.fundChart} selectedYear={selectedYear} />
                <ProjectStatusChart data={data.statusChart} selectedYear={selectedYear} />
              </>
            )}
          </section>

          {/* Charts Row 2: Fund Utilization Over Time (Line) & Projects Needing Attention */}
          <section className="charts-grid-row" aria-label="Trend & Attention Signals">
            {isLoading ? (
              <>
                <article className="chart-card skeleton-card">
                  <div className="skeleton" style={{ width: '50%', height: '20px', marginBottom: '20px' }}></div>
                  <div className="skeleton" style={{ width: '100%', height: '180px' }}></div>
                </article>
                <article className="attention-section-card skeleton-card">
                  <div className="skeleton" style={{ width: '60%', height: '20px', marginBottom: '20px' }}></div>
                  <div className="skeleton" style={{ width: '100%', height: '50px', marginBottom: '10px' }}></div>
                  <div className="skeleton" style={{ width: '100%', height: '50px', marginBottom: '10px' }}></div>
                  <div className="skeleton" style={{ width: '100%', height: '50px' }}></div>
                </article>
              </>
            ) : (
              <>
                <UtilizationOverTimeChart data={data.trendChart} selectedYear={selectedYear} />
                <AttentionSection
                  projects={data.attentionProjects}
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                  onSelectProject={(proj) => setSelectedProject(proj)}
                  onViewAll={() => handleExternalModuleClick('Attention Center', 'Frontend Developer 3')}
                  onNavigateToProject={handleNavigateToProject}
                />
              </>
            )}
          </section>
        </main>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectSignalModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNavigateToProject={handleNavigateToProject}
        />
      )}
    </div>
  );
}
