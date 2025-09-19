'use client';

import { useState } from 'react';
import { playDataUriOrFallback } from '../../src/lib/voice';

declare global { interface Window { webkitSpeechRecognition: any } }
const hasSR = typeof window !== "undefined" && (("webkitSpeechRecognition" in window) || (("SpeechRecognition" in window) as any));

export default function ReportPage() {
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  async function sendReport() {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    try {
      const resp = await fetch("/api/voice", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text: text || "Test emergency in Lagos", lang: "en-NG" })
      }).catch(() => null);
      
      let data: any = null;
      if (resp && resp.ok) data = await resp.json();
      
      const r = data?.text ?? "I heard your report. Help is being notified.";
      const a = data?.audio_url ?? null;
      setReply(r);
      await playDataUriOrFallback(a, r);
    } catch (error) {
      console.error('Error sending report:', error);
      setReply("There was an error processing your request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  function startListening() {
    if (!hasSR) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-NG";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        }
      }
      if (finalTranscript) {
        setText(finalTranscript);
      }
    };

    recognition.start();
  }

  return (
    <div className="container">
      <section className="section">
        <div className="text-center mb-xl">
          <h1>Voice Emergency Assistant</h1>
          <p>Report emergencies using voice or text. The floating assistant on every page provides hands-free operation.</p>
        </div>

        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Full-Screen Emergency Reporter</h2>
          <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--muted-3)' }}>
            Use this page for detailed emergency reporting or testing the voice system.
          </p>

          <div style={{ marginBottom: 'var(--space-md)' }}>
            <label htmlFor="emergency-text" style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: 'bold' }}>
              Describe your emergency:
            </label>
            <textarea
              id="emergency-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe your emergency situation in detail..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: 'var(--space-md)',
                border: '1px solid var(--muted-2)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-primary)',
                color: 'var(--text-on-dark)',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <button
              onClick={startListening}
              disabled={isListening || isProcessing}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              {isListening ? "🎤 Listening..." : "🎤 Voice Input"}
            </button>
            <button
              onClick={sendReport}
              disabled={!text.trim() || isProcessing}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              {isProcessing ? "Processing..." : "🚨 Send Emergency Report"}
            </button>
          </div>

          {reply && (
            <div style={{ 
              padding: 'var(--space-md)', 
              background: 'var(--bg-secondary)', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent-lime)'
            }}>
              <h3 style={{ color: 'var(--accent-lime)', marginBottom: 'var(--space-sm)' }}>System Response:</h3>
              <p>{reply}</p>
            </div>
          )}

          <div style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <h3>Emergency Tips:</h3>
            <ul style={{ marginTop: 'var(--space-sm)' }}>
              <li>Stay calm and speak clearly</li>
              <li>Provide your location if known</li>
              <li>Describe the type of emergency (medical, fire, security, etc.)</li>
              <li>Mention any immediate dangers</li>
              <li>Stay on the line until help arrives</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <p style={{ color: 'var(--muted-3)' }}>
            For immediate emergencies, you can also call: <strong>112</strong> (National Emergency) or <strong>199</strong> (Fire Service)
          </p>
        </div>
      </section>
    </div>
  );
}
