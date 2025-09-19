import React, { useState } from "react";
import Layout from "./_Layout";
import { playDataUriOrFallback } from "../lib/voice";

export default function Report(){
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");

  async function send(){
    const resp = await fetch("/api/voice", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ text: text || "Test emergency in Lagos", lang:"en-NG" })
    }).catch(()=>null);
    let data: any = null;
    if (resp && resp.ok) data = await resp.json();
    const r = data?.text ?? "I heard your report. Help is being notified.";
    const a = data?.audio_url ?? null;
    setReply(r);
    await playDataUriOrFallback(a, r);
  }

  return (
    <Layout>
      <h1 style={{ fontSize:"clamp(24px,3vw,36px)" }}>Voice Assistant</h1>
      <p style={{ color:"#a9b6a4" }}>
        Hands-free assistant runs as a floating widget on every page. Use this page for full-screen tests.
      </p>
      <div style={{ display:"flex", gap:8, marginTop:12 }}>
        <input placeholder="Say or type something" value={text} onChange={e=>setText(e.target.value)}
               style={{ padding:"8px 10px", borderRadius:8, border:"1px solid #78877f", minWidth:320,
                        background:"#182d31", color:"#ecf5e4" }}/>
        <button onClick={send} style={{ background:"#eaf6c3", color:"#0b1a1c", padding:"8px 12px", borderRadius:8, border:"none" }}>Send</button>
      </div>
      {reply && <div style={{ marginTop:12 }}>Assistant: {reply}</div>}
    </Layout>
  );
}
