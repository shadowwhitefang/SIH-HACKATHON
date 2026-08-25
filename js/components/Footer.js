/**
 * Neutral CivicTrack Footer Component
 */

export function renderFooter() {
  return `
    <footer class="landing-footer" aria-label="Page Footer">
      <div style="max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="font-size: 0.8125rem; color: var(--slate-600);">
          CivicTrack is an accountability and monitoring tool, not a system for declaring wrongdoing.
        </div>
        <div style="font-size: 0.75rem; color: var(--slate-400);">
          &copy; 2026 CivicTrack. All rights reserved.
        </div>
      </div>
    </footer>
  `;
}
