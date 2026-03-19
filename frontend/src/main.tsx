import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppErrorBoundary } from './components/layout/AppErrorBoundary';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

// Inject a skip-to-content link as the very first focusable element (WCAG 2.4.1)
if (!document.getElementById('gfg-skip-link')) {
  const skip = document.createElement('a');
  skip.id = 'gfg-skip-link';
  skip.href = '#gfg-main-content';
  skip.className = 'skip-to-content';
  skip.textContent = 'Skip to main content';
  document.body.insertBefore(skip, document.body.firstChild);
}

createRoot(rootEl).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
);
