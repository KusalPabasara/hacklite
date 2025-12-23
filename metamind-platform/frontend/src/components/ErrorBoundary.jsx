import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // Log to error tracking service (e.g., Sentry) in production
    if (import.meta.env.PROD) {
      // TODO: Add error tracking service integration
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <AlertTriangle 
                size={64} 
                className="mx-auto mb-4" 
                style={{ color: 'var(--accent-red)' }}
              />
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Oops! Something went wrong
              </h1>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                We're sorry, but something unexpected happened.
              </p>
            </div>

            <div 
              className="rounded-lg p-6 mb-6"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)'
              }}
            >
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Error Details
              </h2>
              {this.state.error && (
                <div className="mb-4">
                  <p className="font-mono text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {this.state.error.toString()}
                  </p>
                  {import.meta.env.DEV && this.state.errorInfo && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Stack Trace (Development Only)
                      </summary>
                      <pre 
                        className="text-xs overflow-auto p-4 rounded mt-2"
                        style={{ 
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                          maxHeight: '300px'
                        }}
                      >
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: 'var(--accent-blue)',
                  color: 'white'
                }}
              >
                <Home size={20} />
                Go to Homepage
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: 'var(--bg-button-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)'
                }}
              >
                <RefreshCw size={20} />
                Reload Page
              </button>
            </div>

            {import.meta.env.DEV && (
              <div className="mt-8 text-center">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  This error screen only appears in development. In production, users will see a friendlier message.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

