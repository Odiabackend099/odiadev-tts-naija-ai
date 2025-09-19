import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import VoiceWidgetClient from '../components/VoiceWidgetClient';
import ErrorBoundary from '../components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Protect.NG CrossAI - Voice-First Emergency Platform',
  description: 'Nigeria-first emergency assistant with AI-powered voice response, offline support, and real-time reporting.',
  manifest: '/manifest.json',
  themeColor: '#182d31',
  keywords: 'emergency, Nigeria, voice assistant, PWA, offline, safety',
  authors: [{ name: 'Adaqua AI (ODIADEV)' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <div className="header-content">
              <Link href="/" className="logo">
                <img src="/assets/brand/logo.svg" alt="Protect.NG CrossAI" style={{ height: '32px' }} />
              </Link>
              <nav className="nav">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/solutions" className="nav-link">Solutions</Link>
                <Link href="/pricing" className="nav-link">Pricing</Link>
                <Link href="/stories" className="nav-link">Stories</Link>
                <Link href="/resources" className="nav-link">Resources</Link>
                <Link href="/status" className="nav-link">Status</Link>
                <Link href="/login" className="btn btn-secondary">Login</Link>
                <Link href="/get-started" className="btn btn-primary">Get Started</Link>
              </nav>
            </div>
          </div>
        </header>
        
        <main>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-section">
                <h4>Platform</h4>
                <ul className="footer-links">
                  <li><Link href="/report">Voice Assistant</Link></li>
                  <li><Link href="/dashboard">Dashboard</Link></li>
                  <li><Link href="/status">System Status</Link></li>
                  <li><Link href="/offline">Offline Mode</Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Solutions</h4>
                <ul className="footer-links">
                  <li><Link href="/solutions#medical">Medical Emergency</Link></li>
                  <li><Link href="/solutions#fire">Fire Safety</Link></li>
                  <li><Link href="/solutions#security">Security</Link></li>
                  <li><Link href="/solutions#disaster">Disaster Response</Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Resources</h4>
                <ul className="footer-links">
                  <li><Link href="/resources#docs">Documentation</Link></li>
                  <li><Link href="/resources#api">API Reference</Link></li>
                  <li><Link href="/resources#support">Support</Link></li>
                  <li><Link href="/resources#community">Community</Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>About</h4>
                <ul className="footer-links">
                  <li><Link href="/stories">Success Stories</Link></li>
                  <li><Link href="/pricing">Pricing</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/privacy">Privacy</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Protect.NG CrossAI by Adaqua AI (ODIADEV). Securing Nigeria, one voice at a time.</p>
            </div>
          </div>
        </footer>
        
        <ErrorBoundary fallback={
          <div style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            padding: 12,
            backgroundColor: '#DC2626',
            color: '#ecf5e4',
            borderRadius: 8,
            fontSize: 12
          }}>
            Voice widget error. <a href="/report" style={{ color: '#eaf6c3' }}>Use /report</a>
          </div>
        }>
          <VoiceWidgetClient />
        </ErrorBoundary>
        
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }} 
        />
      </body>
    </html>
  );
}
