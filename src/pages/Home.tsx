import React from "react";
import Layout from "./_Layout";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <Layout>
      <section style={{ display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:24, alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:"clamp(32px,4vw,52px)", lineHeight:1.1 }}>
            Nigeria's First<br/>Voice-Led Emergency<br/>Response Platform
          </h1>
          <p style={{ marginTop:12, color:"#a9b6a4" }}>
            Report emergencies instantly using AI voice assistant. Works offline, responds in Nigerian languages,
            and connects you to help in under 90 seconds.
          </p>
          <div style={{ display:"flex", gap:12, marginTop:16 }}>
            <Link to="/get-started" style={{ background:"#eaf6c3", color:"#0b1a1c", padding:"10px 14px", borderRadius:8 }}>Get Started Free</Link>
            <Link to="/report" style={{ border:"1px solid #78877f", padding:"9px 14px", borderRadius:8, color:"#ecf5e4" }}>Try Voice Assistant</Link>
          </div>
          <div style={{ marginTop:18, color:"#a9b6a4", fontSize:12 }}>
            ✓ 24/7 • ✓ Offline • ✓ 5 Nigerian Languages • ✓ NDPR Compliant
          </div>
        </div>
        <div style={{ background:"#344448", borderRadius:16, minHeight:300, display:"flex", alignItems:"center", justifyContent:"center", color:"#a9b6a4" }}>
          <div>Interactive Voice Assistant — open <Link to="/report">/report</Link></div>
        </div>
      </section>
    </Layout>
  );
}
