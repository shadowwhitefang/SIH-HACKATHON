import React, { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './pages/LandingPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ToastContainer } from './components/Toast.jsx';
import { isUserAuthenticated, logoutUser } from './data/mockData.js';

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
    }, 3500);
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
  const route = currentHash.replace(/^#/, '').split('?')[0] || '/';

  let pageContent;
  if (route === '/login') {
    pageContent = <LoginPage onLoginSuccess={handleLoginSuccess} />;
  } else if (route === '/dashboard') {
    pageContent = <DashboardPage onSignOut={handleSignOut} onShowToast={showToast} />;
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
