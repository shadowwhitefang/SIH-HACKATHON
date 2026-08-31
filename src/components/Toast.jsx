import React from 'react';

/**
 * Toast Notifications Component
 */
export function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div id="toast-container" className="toast-container">
      {toasts.map((toast) => {
        const iconColor =
          toast.type === 'success' ? '#10b981' : toast.type === 'alert' ? '#ef4444' : '#38bdf8';

        return (
          <div key={toast.id} className="toast">
            <span style={{ display: 'flex', alignItems: 'center', color: iconColor }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
