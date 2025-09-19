import React, { useEffect, useRef, useState } from "react";
import { playDataUriOrFallback } from "../lib/voice";

declare global { interface Window { webkitSpeechRecognition: any } }
const hasSR = typeof window !== "undefined" && (("webkitSpeechRecognition" in window) || (("SpeechRecognition" in window) as any));

export default function VoiceAssistantWidget() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<"idle"|"listening"|"thinking"|"speaking">("idle");
  const [transcript, setTranscript] = useState("");
  const recRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled || !hasSR) return;
    const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = "en-NG";
    recRef.current = rec;

    rec.onstart = () => setStatus("listening");
    rec.onerror = () => {};
    rec.onend = () => { if (enabled) rec.start(); };

    rec.onresult = async (e: any) => {
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript + " ";
      }
      finalText = finalText.trim();
      if (!finalText) return;

      setTranscript(finalText);
      rec.stop(); setStatus("thinking");

      let data: any = null;
      try {
        const resp = await fetch("/api/voice", {
          method: "POST", headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ text: finalText, lang: "en-NG" })
        }).catch(() => null);
        if (resp && resp.ok) data = await resp.json();
      } catch {}

      const reply = data?.text ?? "I heard you. Help is on the way.";
      const audio = data?.audio_url ?? null; // prefer data:audio/mpeg;base64,...
      setStatus("speaking");
      await playDataUriOrFallback(audio, reply);

      if (enabled) { try { rec.start(); } catch {} setStatus("listening"); }
    };

    rec.start();
    return () => { try { rec.stop(); } catch {} };
  }, [enabled]);

  return (
    <div style={{ position:"fixed", right:20, bottom:20, zIndex: 9999 }}>
      <div style={{ background:"#344448", color:"#ecf5e4", borderRadius:16, padding:12,
                    boxShadow:"0 8px 24px rgba(0,0,0,.3)", minWidth: 260 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src="/assets/brand/logo.svg" alt="logo" style={{ width:28, height:28 }}/>
          <b>CrossAI Assistant</b>
        </div>
        <div style={{ fontSize: 12, opacity: .85, marginTop: 6 }}>
          {!hasSR ? "Speech Recognition not supported; use /report." :
            (enabled ? (status === "listening" ? "Listening speak freely." :
                         status === "thinking" ? "Processing" :
                         status === "speaking" ? "Responding" : "Ready.") :
                        "Click Enable to start hands-free assistant.")}
        </div>
        <div style={{ display:"flex", gap:8, marginTop:8 }}>
          {!enabled ? (
            <button onClick={() => setEnabled(true)}
                    style={{ background:"#eaf6c3", color:"#0b1a1c", padding:"8px 12px", borderRadius:8, border:"none" }}>
              Enable Voice
            </button>
          ) : (
            <button onClick={() => setEnabled(false)}
                    style={{ background:"#78877f", color:"#ecf5e4", padding:"8px 12px", borderRadius:8, border:"none" }}>
              Pause
            </button>
          )}
          <a href="/report" style={{ color:"#eaf6c3", textDecoration:"underline", alignSelf:"center" }}>Full Assistant</a>
        </div>
        {transcript && <div style={{ fontSize:12, opacity:.8, marginTop:6 }}>You said: "{transcript}"</div>}
      </div>
    </div>
  );
}
