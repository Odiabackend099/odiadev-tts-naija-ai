import React from "react";
import Layout from "./_Layout";
import { Link } from "react-router-dom";

export default function GetStarted(){
  return (
    <Layout>
      <h1 style={{ fontSize:"clamp(24px,3vw,36px)" }}>Get Started</h1>
      <p style={{ color:"#a9b6a4" }}>Tell us about your agency. We will provision your workspace.</p>
      <p style={{ marginTop:12 }}><Link to="/report">Open Voice Assistant</Link></p>
    </Layout>
  );
}
