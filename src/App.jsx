import React, { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './pages/LandingPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ToastContainer } from './components/Toast.jsx';
import { authService, logoutUser } from './data/mockData.js';

export function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [toasts, setToasts] = useState([]);

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const handleSignOut = () => {
    logoutUser();
    showToast('Signed out successfully', 'info');
    window.location.hash = '#/';
  };

  const handleLoginSuccess = () => {
    showToast('Signed in successfully as Administrator', 'success');
    window.location.hash = '#/dashboard';
  };

  // Route normalization
  const rawRoute = currentHash.replace(/^#/, '').split('?')[0] || '/';
  const route = rawRoute.startsWith('/') ? rawRoute : `/${rawRoute}`;

  let pageContent;
  if (route === '/login') {
    pageContent = <LoginPage onLoginSuccess={handleLoginSuccess} />;
  } else if (route === '/dashboard') {
    pageContent = <DashboardPage onSignOut={handleSignOut} onShowToast={showToast} />;
  } else if (route.startsWith('/projects/')) {
    const projectId = route.replace('/projects/', '');
    pageContent = (
      <div className="external-route-placeholder">
        <div className="external-route-card">
          <div className="badge badge-ongoing" style={{ marginBottom: '12px', alignSelf: 'center' }}>
            Frontend 2 Ownership Boundary
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '8px' }}>
            Project Details: {projectId}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '20px', lineHeight: '1.5' }}>
            This page (<code>/projects/:id</code>) is owned and implemented by <strong>Frontend Developer 2</strong>.
            Frontend Developer 1's navigation call was dispatched successfully.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="#/dashboard" className="btn btn-primary">
              ← Return to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    pageContent = <LandingPage />;
  }

  return (
    <div className="civictrack-app-root">
      {pageContent}
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default App;
