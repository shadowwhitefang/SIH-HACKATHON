import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import all Design System & Page Styles directly into React
import '../css/design-tokens.css';
import '../css/base.css';
import '../css/landing.css';
import '../css/login.css';
import '../css/dashboard.css';
import '../css/modules.css';

const rootElement = document.getElementById('root') || document.getElementById('app');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
