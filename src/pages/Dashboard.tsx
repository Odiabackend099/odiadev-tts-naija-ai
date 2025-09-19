import React from "react";
import Layout from "./_Layout";
import { Link } from "react-router-dom";

export default function Dashboard(){
  return (
    <Layout>
      <h1 style={{ fontSize:"clamp(24px,3vw,36px)" }}>Dashboard</h1>
      <p style={{ color:"#a9b6a4" }}>Live incidents, dispatch status, and response metrics.</p>
      <p style={{ marginTop:12 }}><Link to="/report">Open Voice Assistant</Link></p>
    </Layout>
  );
}
