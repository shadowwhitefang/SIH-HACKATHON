import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Topbar } from '../components/Topbar.jsx';
import { getEvidenceLibraryData } from '../data/mockData.js';

export function EvidenceLibraryPage({ onSignOut, onShowToast }) {
  const [evidenceList, setEvidenceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');
  const [previewItem, setPreviewItem] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvidenceList(getEvidenceLibraryData());
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedProject('All');
    setSelectedType('All');
    setSelectedDateFilter('All');
    if (onShowToast) onShowToast('Evidence filters reset', 'info');
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setShowUploadModal(false);
    if (onShowToast) {
      onShowToast('Evidence uploaded successfully. Verification workflow initiated.', 'success');
    }
  };

  const filteredEvidence = evidenceList.filter((item) => {
    const matchesProject = selectedProject === 'All' || item.projectName === selectedProject;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      item.title.toLowerCase().includes(q) ||
      item.projectName.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesProject && matchesType && matchesSearch;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeRoute="/evidence"
        onSignOut={onSignOut}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
      />

      <div className="dashboard-main">
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSignOut={onSignOut}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="dashboard-content-body" id="evidence-library-content">
          {/* Header */}
          <div className="module-page-header">
            <div>
              <h1 className="topbar-title">Evidence Library</h1>
              <p className="topbar-subtitle">
                Supporting documents and timestamped photographic verification records.
              </p>
            </div>

            <div className="header-actions-group">
              <button
                type="button"
                className="btn btn-primary"
                id="btn-upload-evidence"
                onClick={() => setShowUploadModal(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload Evidence
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="evidence-filter-bar" aria-label="Evidence Filters">
            {/* Search Input inside filter row */}
            <div className="evidence-search-wrapper">
              <span className="search-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search evidence records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search evidence records"
              />
            </div>

            {/* Project Filter */}
            <div className="filter-select-box">
              <label htmlFor="evidence-project-select" className="sr-only">Project</label>
              <select
                id="evidence-project-select"
                className="fy-select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="All">All Projects</option>
                <option value="Road Construction — Ward 12">Road Construction — Ward 12</option>
                <option value="Community Health Center">Community Health Center</option>
                <option value="Water Supply Project — Phase 2">Water Supply Project — Phase 2</option>
                <option value="Primary School Renovation">Primary School Renovation</option>
                <option value="Drainage Improvement">Drainage Improvement</option>
              </select>
            </div>

            {/* Evidence Type Filter */}
            <div className="filter-select-box">
              <label htmlFor="evidence-type-select" className="sr-only">Evidence Type</label>
              <select
                id="evidence-type-select"
                className="fy-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">Evidence Type: All</option>
                <option value="Site Photograph">Site Photograph</option>
                <option value="Progress Document">Progress Document</option>
                <option value="Approval Document">Approval Document</option>
                <option value="Field Verification">Field Verification</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="filter-select-box">
              <label htmlFor="evidence-date-select" className="sr-only">Date</label>
              <select
                id="evidence-date-select"
                className="fy-select"
                value={selectedDateFilter}
                onChange={(e) => setSelectedDateFilter(e.target.value)}
              >
                <option value="All">Date: All Time</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            <button
              type="button"
              className="btn-ghost"
              style={{ fontSize: '0.8125rem', color: 'var(--teal-700)', fontWeight: 600 }}
              onClick={handleResetFilters}
            >
              Reset
            </button>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                title="Grid View"
                aria-label="Grid View"
                onClick={() => setViewMode('grid')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                type="button"
                className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
                title="Table View"
                aria-label="Table View"
                onClick={() => setViewMode('table')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="skeleton-container" aria-busy="true">
              <div className="evidence-cards-grid">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="skeleton" style={{ height: '220px', borderRadius: '12px' }}></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {filteredEvidence.length === 0 ? (
                <div className="attention-empty-state" role="status">
                  <div className="empty-state-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <h3 className="empty-state-title">No evidence available for this project</h3>
                  <p className="empty-state-text">
                    No records match the selected filter criteria. Try resetting filters or uploading new verification items.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ marginTop: '12px' }}
                    onClick={handleResetFilters}
                  >
                    Reset all filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                /* Grid View */
                <div className="evidence-cards-grid" role="feed" aria-label="Evidence cards grid">
                  {filteredEvidence.map((item) => (
                    <article
                      key={item.id}
                      className="evidence-card"
                      tabIndex={0}
                      role="button"
                      aria-label={`Open evidence preview for ${item.title} (${item.type})`}
                      onClick={() => setPreviewItem(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setPreviewItem(item);
                        }
                      }}
                    >
                      {/* Thumbnail Container */}
                      <div className="evidence-thumb-wrapper">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="evidence-thumb-img"
                          loading="lazy"
                        />
                        <span className={`evidence-type-tag ${item.typeClass}`}>
                          {item.type}
                        </span>
                        {item.verified && (
                          <span className="evidence-verified-badge" title="Verified by field auditor">
                            ✓ Verified
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="evidence-card-content">
                        <div className="evidence-card-project">{item.projectName}</div>
                        <h2 className="evidence-card-title">{item.type}</h2>
                        <div className="evidence-card-date">{item.date}</div>
                        <div className="evidence-card-source">
                          <span style={{ color: 'var(--slate-400)' }}>Source:</span> {item.source}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                /* Table View */
                <div className="responsive-table-wrapper">
                  <table className="mp-projects-table" aria-label="Evidence Table">
                    <thead>
                      <tr>
                        <th>Evidence Type</th>
                        <th>Project</th>
                        <th>Date</th>
                        <th>Source</th>
                        <th>Uploader</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvidence.map((item) => (
                        <tr
                          key={item.id}
                          className="clickable-project-row"
                          onClick={() => setPreviewItem(item)}
                        >
                          <td>
                            <span className={`badge ${item.typeClass === 'type-photo' ? 'badge-ongoing' : 'badge-positive'}`}>
                              {item.type}
                            </span>
                          </td>
                          <td>
                            <span className="table-project-name">{item.projectName}</span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--slate-600)' }}>{item.date}</span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--slate-600)' }}>{item.source}</span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{item.uploader}</span>
                          </td>
                          <td>
                            <span className="badge badge-completed" style={{ fontSize: '0.6875rem' }}>Verified</span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn-ghost"
                              style={{ fontSize: '0.75rem', padding: '2px 6px', color: 'var(--teal-700)' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewItem(item);
                              }}
                            >
                              Preview
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="evidence-pagination-bar">
                <span className="pagination-info">
                  Showing 1 to {filteredEvidence.length} of 64 evidence items
                </span>
                <div className="pagination-buttons">
                  <button type="button" className="pagination-btn disabled" disabled aria-label="Previous page">‹</button>
                  <button type="button" className="pagination-btn active" aria-label="Page 1">1</button>
                  <button type="button" className="pagination-btn" aria-label="Page 2">2</button>
                  <button type="button" className="pagination-btn" aria-label="Page 3">3</button>
                  <button type="button" className="pagination-btn" aria-label="Page 4">4</button>
                  <button type="button" className="pagination-btn" aria-label="Page 5">5</button>
                  <button type="button" className="pagination-btn" aria-label="Next page">›</button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Evidence Modal Preview (Photo Lightbox OR Document Reader State) */}
      {previewItem && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewItem(null);
          }}
        >
          <div className="modal-card evidence-preview-modal">
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setPreviewItem(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge ${previewItem.typeClass}`}>{previewItem.type}</span>
              <span className="badge badge-completed">Verified Evidence</span>
            </div>

            <h3 id="preview-modal-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '4px' }}>
              {previewItem.title}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginBottom: '16px' }}>
              {previewItem.projectName} • {previewItem.date}
            </p>

            {/* Content Display: Site Photo Lightbox OR Document Preview Reader State */}
            {previewItem.type === 'Site Photograph' || previewItem.type === 'Field Verification' ? (
              <div className="modal-photo-box">
                <img
                  src={previewItem.thumbnail}
                  alt={previewItem.title}
                  className="modal-photo-full"
                />
                <div className="modal-photo-overlay-data">
                  <span>📍 {previewItem.location}</span>
                  <span>📷 Timestamped on {previewItem.date}</span>
                </div>
              </div>
            ) : (
              <div className="modal-doc-box" role="region" aria-label="Document Reader Preview">
                <div className="doc-preview-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="doc-pdf-badge">PDF</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--slate-900)' }}>
                        {previewItem.documentData?.docNumber || 'DOC-REF-2026'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                        {previewItem.documentData?.pages || 3} pages • Official Sanction Docket
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-completed">Digitally Signed</span>
                </div>

                <div className="doc-preview-body">
                  <div className="doc-mock-page">
                    <div className="doc-seal-stamp">
                      GOVERNMENT OF BIHAR<br />
                      RURAL WORKS DEPARTMENT<br />
                      OFFICIALLY VERIFIED
                    </div>
                    <p style={{ fontWeight: 700, marginBottom: '6px' }}>
                      JOINT MEASUREMENT &amp; PHYSICAL SANCTION VOUCHER
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                      {previewItem.description}
                    </p>
                    <div style={{ marginTop: '16px', borderTop: '1px solid #cbd5e1', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--slate-500)' }}>
                      <span>Signatory: {previewItem.documentData?.signatory || 'District Officer'}</span>
                      <span>Date: {previewItem.documentData?.stampDate || previewItem.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description & Metadata List */}
            <div className="modal-evidence-meta-grid">
              <div>
                <span className="meta-label">Description</span>
                <p className="meta-val">{previewItem.description}</p>
              </div>
              <div className="meta-2col">
                <div>
                  <span className="meta-label">Submitted by</span>
                  <span className="meta-val">{previewItem.uploader}</span>
                </div>
                <div>
                  <span className="meta-label">Source System</span>
                  <span className="meta-val">{previewItem.source}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  if (onShowToast) onShowToast('Evidence record file downloading...', 'info');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Original File
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPreviewItem(null)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Evidence Modal Dialog */}
      {showUploadModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowUploadModal(false);
          }}
        >
          <div className="modal-card">
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setShowUploadModal(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h3 id="upload-modal-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '4px' }}>
              Upload Supporting Evidence
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginBottom: '16px' }}>
              Attach geotagged site photographs or joint measurement documents to the public project ledger.
            </p>

            <form onSubmit={handleUploadSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="upload-project-name">Associated Project</label>
                <select id="upload-project-name" className="form-input" required>
                  <option value="Road Construction — Ward 12">Road Construction — Ward 12 (Patna)</option>
                  <option value="Community Health Center">Community Health Center (Muzaffarpur)</option>
                  <option value="Water Supply Project — Phase 2">Water Supply Project — Phase 2 (Gaya)</option>
                  <option value="Primary School Renovation">Primary School Renovation (Gaya)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="upload-evidence-type">Evidence Category</label>
                <select id="upload-evidence-type" className="form-input" required>
                  <option value="Site Photograph">Site Photograph (Geotagged JPEG/PNG)</option>
                  <option value="Progress Document">Progress Document (Measurement Book / Certificate)</option>
                  <option value="Approval Document">Approval Document (Sanction / Clearance)</option>
                  <option value="Field Verification">Field Verification (Inspection Log)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="upload-description">Description &amp; Observations</label>
                <textarea
                  id="upload-description"
                  className="form-input"
                  rows="3"
                  placeholder="Describe the physical progress and milestone state..."
                  required
                ></textarea>
              </div>

              <div className="upload-drag-drop-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--teal-600)" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <div style={{ marginTop: '8px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-800)' }}>
                  Drag and drop files here, or <span style={{ color: 'var(--teal-600)', textDecoration: 'underline', cursor: 'pointer' }}>browse</span>
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--slate-400)', marginTop: '2px' }}>
                  Supported formats: JPG, PNG, PDF, TIFF (Max 25MB)
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
