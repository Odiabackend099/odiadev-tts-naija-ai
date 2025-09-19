import React from "react";
import { Link, Outlet } from "react-router-dom";
import VoiceAssistantWidget from "../components/VoiceAssistantWidget";

export default function Layout(){
  return (
    <div style={{ background:"#182d31", minHeight:"100vh", color:"#ecf5e4" }}>
      <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                       padding:"16px 28px", borderBottom:"1px solid #344448" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src="/assets/brand/logo.svg" alt="logo" style={{ width:32, height:32 }}/>
          <b>Protect.NG CrossAI</b>
        </div>
        <nav style={{ display:"flex", gap:18 }}>
          <Link to="/">Home</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/stories">Stories</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/status">Status</Link>
          <Link to="/login">Login</Link>
          <Link to="/get-started" style={{ background:"#eaf6c3", color:"#0b1a1c", padding:"8px 12px", borderRadius:8 }}>Get Started</Link>
        </nav>
      </header>

      <main style={{ padding:"24px" }}>
        <Outlet/>
      </main>

      <footer style={{ borderTop:"1px solid #344448", padding:"28px", color:"#a9b6a4" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
          <div><b>Platform</b><ul>
            <li><Link to="/solutions">End-to-End</Link></li>
            <li><Link to="/report">Calls</Link></li>
            <li><Link to="/dashboard">Dispatch</Link></li>
            <li><Link to="/resources">QA</Link></li>
          </ul></div>
          <div><b>Solutions</b><ul>
            <li><Link to="/solutions">911-equivalent</Link></li>
            <li><Link to="/solutions">Field Responders</Link></li>
            <li><Link to="/solutions">Communities</Link></li>
          </ul></div>
          <div><b>Resources</b><ul>
            <li><Link to="/stories">Case Studies</Link></li>
            <li><Link to="/resources">Blog</Link></li>
            <li><Link to="/resources">Events</Link></li>
            <li><Link to="/resources">Videos</Link></li>
          </ul></div>
          <div><b>About</b><ul>
            <li><Link to="/get-started">Contact</Link></li>
            <li><Link to="/status">Trust</Link></li>
          </ul></div>
        </div>
      </footer>

      <VoiceAssistantWidget />
    </div>
  );
}
