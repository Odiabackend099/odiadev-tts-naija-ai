import React from "react";
import Layout from "./_Layout";
import { Link } from "react-router-dom";

export default function Pricing(){
  return (
    <Layout>
      <h1 style={{ fontSize:"clamp(24px,3vw,36px)" }}>Pricing</h1>
      <p style={{ color:"#a9b6a4" }}>Transparent pricing in NGN and USD. Choose a plan and get started.</p>
      <p style={{ marginTop:12 }}><Link to="/report">Open Voice Assistant</Link></p>
    </Layout>
  );
}
