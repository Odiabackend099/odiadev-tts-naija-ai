'use client';

import { useState, useEffect } from 'react';

interface StatusItem {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  responseTime?: number;
  lastChecked: string;
}

export default function StatusPage() {
  const [statusItems, setStatusItems] = useState<StatusItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  async function checkSystemStatus() {
    const checks = [
      { name: 'Voice API', endpoint: '/api/voice' },
      { name: 'Status API', endpoint: '/api/status' },
      { name: 'TTS Service', endpoint: '/api/tts' },
    ];

    const results: StatusItem[] = [];

    for (const check of checks) {
      const startTime = Date.now();
      try {
        const response = await fetch(check.endpoint, { method: 'GET' });
        const responseTime = Date.now() - startTime;
        
        results.push({
          name: check.name,
          status: response.ok ? 'operational' : 'degraded',
          responseTime,
          lastChecked: new Date().toLocaleTimeString()
        });
      } catch (error) {
        results.push({
          name: check.name,
          status: 'down',
          lastChecked: new Date().toLocaleTimeString()
        });
      }
    }

    setStatusItems(results);
    setLoading(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'var(--accent-lime)';
      case 'degraded': return '#FFA500';
      case 'down': return 'var(--danger)';
      default: return 'var(--muted-2)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return '✓';
      case 'degraded': return '⚠';
      case 'down': return '✗';
      default: return '?';
    }
  };

  const overallStatus = statusItems.every(item => item.status === 'operational') 
    ? 'All Systems Operational' 
    : statusItems.some(item => item.status === 'down')
    ? 'System Issues Detected'
    : 'Degraded Performance';

  return (
    <div className="container">
      <section className="section">
        <div className="text-center mb-xl">
          <h1>System Status</h1>
          <p>Real-time monitoring of Protect.NG CrossAI services</p>
        </div>

        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
            <h2 style={{ 
              color: overallStatus === 'All Systems Operational' ? 'var(--accent-lime)' : 'var(--danger)',
              marginBottom: 'var(--space-sm)'
            }}>
              {overallStatus}
            </h2>
            <p style={{ color: 'var(--muted-3)' }}>
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <p>Checking system status...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
              {statusItems.map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: 'var(--space-md)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${getStatusColor(item.status)}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ color: getStatusColor(item.status), fontSize: '18px' }}>
                      {getStatusIcon(item.status)}
                    </span>
                    <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '14px', color: 'var(--muted-3)' }}>
                    <div style={{ color: getStatusColor(item.status), textTransform: 'capitalize' }}>
                      {item.status}
                    </div>
                    {item.responseTime && (
                      <div>{item.responseTime}ms</div>
                    )}
                    <div>Updated: {item.lastChecked}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <h3>Service Information</h3>
            <div style={{ marginTop: 'var(--space-sm)', display: 'grid', gap: 'var(--space-sm)' }}>
              <p><strong>Voice API:</strong> Handles emergency voice reports and text-to-speech</p>
              <p><strong>Status API:</strong> Provides system health monitoring</p>
              <p><strong>TTS Service:</strong> Text-to-speech for voice confirmations</p>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
            <button 
              onClick={checkSystemStatus}
              className="btn btn-secondary"
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Refresh Status'}
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <p style={{ color: 'var(--muted-3)' }}>
            If you experience issues, contact support or use emergency numbers: <strong>112</strong> or <strong>199</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
