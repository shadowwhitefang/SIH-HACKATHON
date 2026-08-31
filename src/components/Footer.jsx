import React from 'react';

/**
 * Neutral CivicTrack Footer Component
 */
export function Footer() {
  return (
    <footer className="landing-footer" aria-label="Page Footer">
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontSize: '0.8125rem', color: 'var(--slate-600)' }}>
          CivicTrack is an accountability and monitoring tool, not a system for declaring wrongdoing.
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
          &copy; 2026 CivicTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
