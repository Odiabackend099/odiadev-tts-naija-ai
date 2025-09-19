'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // In production, send error to monitoring service
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Send to Sentry or similar error tracking service
      console.error('Production error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #DC2626',
          borderRadius: '8px',
          backgroundColor: '#2d1818',
          color: '#ecf5e4'
        }}>
          <h2 style={{ color: '#DC2626', marginBottom: '16px' }}>
            🚨 Something went wrong
          </h2>
          <p style={{ marginBottom: '16px' }}>
            The application encountered an unexpected error. For emergency assistance, 
            please call <strong>112</strong> (National Emergency) or <strong>199</strong> (Fire Service).
          </p>
          
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined, errorInfo: undefined });
                window.location.reload();
              }}
              style={{
                backgroundColor: '#eaf6c3',
                color: '#0b1a1c',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                marginRight: '8px',
                cursor: 'pointer'
              }}
            >
              🔄 Reload Page
            </button>
            
            <a
              href="/report"
              style={{
                backgroundColor: '#78877f',
                color: '#ecf5e4',
                padding: '8px 16px',
                textDecoration: 'none',
                borderRadius: '4px',
                display: 'inline-block'
              }}
            >
              📞 Emergency Report
            </a>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '16px' }}>
              <summary style={{ cursor: 'pointer', color: '#a9b6a4' }}>
                Technical Details (Development Only)
              </summary>
              <pre style={{
                backgroundColor: '#182d31',
                padding: '12px',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
                marginTop: '8px'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      console.error('Production error via hook:', {
        error: error.message,
        stack: error.stack,
        ...errorInfo
      });
    }
  };
}

export default ErrorBoundary;
