import { Component, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

/**
 * Catches runtime errors so React renders a fallback rather than a blank page.
 */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[AppErrorBoundary] Caught an error:', error, info);
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
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <a
            href="#/"
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
