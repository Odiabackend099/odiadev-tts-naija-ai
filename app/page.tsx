import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="grid hero-grid">
            <div className="hero-content">
              <h1>
                Nigeria's First 
                <br />Voice-Led Emergency 
                <br />Response Platform
              </h1>
              <p className="hero-subtitle">
                Report emergencies instantly using AI-powered voice assistant. 
                Works offline, responds in Nigerian languages, and connects you 
                to help in under 90 seconds.
              </p>
              <div className="hero-cta">
                <Link href="/get-started" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link href="/report" className="btn btn-secondary btn-lg">
                  Try Voice Assistant
                </Link>
              </div>
              <div className="trust-strip">
                <div className="trust-item">
                  <span>✓</span>
                  <span>24/7 Available</span>
                </div>
                <div className="trust-item">
                  <span>✓</span>
                  <span>Works Offline</span>
                </div>
                <div className="trust-item">
                  <span>✓</span>
                  <span>5 Nigerian Languages</span>
                </div>
                <div className="trust-item">
                  <span>✓</span>
                  <span>NDPR Compliant</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div style={{ textAlign: 'center', color: 'var(--muted-3)' }}>
                <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🎤</div>
                <p>Interactive Voice Assistant</p>
                <p style={{ fontSize: '14px', opacity: 0.7 }}>Click "Try Voice Assistant" to experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">&lt; 90s</div>
              <div className="stat-label">Average Response Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime Guarantee</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Nigerian Languages</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-xl">
            <h2>How Protect.NG CrossAI Works</h2>
            <p>Emergency response simplified through voice-first technology</p>
          </div>
          <div className="feature-grid">
            <div className="card feature-card card-hover">
              <div className="feature-icon">🎤</div>
              <h3>Speak Your Emergency</h3>
              <p>Just speak naturally in English, Pidgin, Hausa, Yoruba, or Igbo. Our AI understands context and urgency levels automatically.</p>
            </div>
            <div className="card feature-card card-hover">
              <div className="feature-icon">🌍</div>
              <h3>Instant Location Detection</h3>
              <p>GPS + network triangulation provides precise location. Manual entry available as backup for remote areas.</p>
            </div>
            <div className="card feature-card card-hover">
              <div className="feature-icon">⚡</div>
              <h3>Real-Time Dispatch</h3>
              <p>Emergency services receive structured reports instantly via our n8n workflow integration and Supabase real-time sync.</p>
            </div>
            <div className="card feature-card card-hover">
              <div className="feature-icon">📱</div>
              <h3>Works Offline</h3>
              <p>PWA technology queues reports when network is poor. Auto-syncs when connection returns.</p>
            </div>
            <div className="card feature-card card-hover">
              <div className="feature-icon">🔊</div>
              <h3>Voice Confirmation</h3>
              <p>Hear instant confirmation in your language via ElevenLabs TTS. Know your report was received and help is coming.</p>
            </div>
            <div className="card feature-card card-hover">
              <div className="feature-icon">🛡️</div>
              <h3>Privacy Protected</h3>
              <p>NDPR compliant with opt-in data usage. HMAC security and encrypted transmission protect your information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center">
            <h2>Ready to Secure Your Community?</h2>
            <p className="mb-lg">Join thousands of Nigerians using voice-first emergency response</p>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <Link href="/get-started" className="btn btn-primary btn-lg">
                Start Free Trial
              </Link>
              <Link href="/solutions" className="btn btn-secondary btn-lg">
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Emergency Info */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>Emergency Numbers Nigeria</h3>
              <div style={{ marginTop: 'var(--space-md)' }}>
                <p><strong>112</strong> - National Emergency Number</p>
                <p><strong>199</strong> - Fire Service</p>
                <p><strong>919</strong> - Lagos Emergency</p>
                <p><strong>911</strong> - Some Networks</p>
              </div>
              <Link href="/offline" className="btn btn-secondary mt-md">
                Offline Quick Dial
              </Link>
            </div>
            <div className="card">
              <h3>System Status</h3>
              <div style={{ marginTop: 'var(--space-md)' }}>
                <div className="trust-item mb-sm">
                  <span style={{ color: 'var(--accent-lime)' }}>✓</span>
                  <span>Voice Assistant: Online</span>
                </div>
                <div className="trust-item mb-sm">
                  <span style={{ color: 'var(--accent-lime)' }}>✓</span>
                  <span>Database: Operational</span>
                </div>
                <div className="trust-item mb-sm">
                  <span style={{ color: 'var(--accent-lime)' }}>✓</span>
                  <span>TTS Service: Active</span>
                </div>
                <div className="trust-item mb-sm">
                  <span style={{ color: 'var(--accent-lime)' }}>✓</span>
                  <span>Emergency Dispatch: Ready</span>
                </div>
              </div>
              <Link href="/status" className="btn btn-secondary mt-md">
                View Full Status
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}