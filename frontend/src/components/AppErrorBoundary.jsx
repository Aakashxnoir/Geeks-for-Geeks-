import { Component } from 'react';

/**
 * Catches runtime errors so the app shows a fallback instead of a blank page.
 */
export class AppErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            fontFamily: 'system-ui, sans-serif',
            background: '#0d1117',
            color: '#e5e7eb',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: '#9ca3af', marginBottom: 16, textAlign: 'center' }}>
            {this.state.error?.message || 'An error occurred.'}
          </p>
          <a
            href="/"
            style={{
              padding: '10px 20px',
              background: '#22C55E',
              color: '#052e16',
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Go to Home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
