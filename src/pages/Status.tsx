import React from "react";
import Layout from "./_Layout";
import { Link } from "react-router-dom";

export default function Status(){
  return (
    <Layout>
      <h1 style={{ fontSize:"clamp(24px,3vw,36px)" }}>System Status</h1>
      <p style={{ color:"#a9b6a4" }}>Realtime health checks for API, TTS, STT, and realtime map.</p>
      <p style={{ marginTop:12 }}><Link to="/report">Open Voice Assistant</Link></p>
    </Layout>
  );
}
