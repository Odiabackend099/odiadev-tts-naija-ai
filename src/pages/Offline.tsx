import React from "react";
import Layout from "./_Layout";
import { Link } from "react-router-dom";

export default function Offline(){
  return (
    <Layout>
      <h1 style={{ fontSize:"clamp(24px,3vw,36px)" }}>Offline</h1>
      <p style={{ color:"#a9b6a4" }}>If you are offline, dial 112 or 199 to reach national emergency lines.</p>
      <p style={{ marginTop:12 }}><Link to="/report">Open Voice Assistant</Link></p>
    </Layout>
  );
}
