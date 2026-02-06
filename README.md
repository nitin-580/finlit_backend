<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DEBROI – Backend Architecture & Documentation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.7;
      padding: 20px 40px;
      max-width: 980px;
      margin: auto;
      color: #222;
    }
    h1, h2, h3 {
      color: #0b4f9c;
    }
    code, pre {
      background: #f4f4f4;
      padding: 6px 10px;
      border-radius: 5px;
      display: block;
      overflow-x: auto;
      margin-top: 10px;
    }
    .section {
      margin-bottom: 40px;
    }
    .img-box img {
      max-width: 100%;
      border-radius: 8px;
      border: 1px solid #ddd;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 10px;
    }
    table td, table th {
      border: 1px solid #ccc;
      padding: 10px;
    }
    table th {
      background: #e9f0f8;
    }
    .center {
      text-align: center;
    }
  </style>
</head>

<body>

<!-- Header / Logo -->
<div align="center" id="top">
  <picture>
    <img src="assets/debroi.png" alt="Debroi" width="300">
  </picture>
</div>

<p align="center">
  <em>A production-grade backend for Finance + AI — built with stability, correctness & scalable intelligence.</em>
</p>

<p align="center">
  <a href="README.html">🇬🇧 English</a> •
  <a href="#">🇮🇳 Hindi</a> •
  <a href="#">🇺🇸 US</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" />
  <img src="https://img.shields.io/badge/version-0.1.0-blue" />
  <img src="https://img.shields.io/badge/built%20for-finance%20%2B%20AI-yellow" />
  <img src="https://img.shields.io/github/stars/debroi" />
</p>

<hr/>

<!-- Overview -->
<h1>🚀 DEBROI – Backend Architecture & Progress</h1>
<p>
  A scalable, production-ready backend for a Finance + AI platform, built with 
  reliability, security, and future AI extensibility in mind.
</p>

<hr/>

<!-- Milestone -->
<h2>📌 Current Milestone Overview</h2>
<p>
  This milestone focuses on infrastructure stability, authentication, and core service foundations required 
  before introducing analytics and AI.
</p>

<hr/>

<!-- Core Infra -->
<h2>🏗️ Infrastructure & Core Setup</h2>

<h3>🔴 Redis (Ephemeral Layer)</h3>
<ul>
  <li>Configured using Docker with persistent volumes</li>
  <li>Connected via <code>ioredis</code></li>
  <li>Used for:
    <ul>
      <li>OTP storage</li>
      <li>Short-lived tokens</li>
      <li>Future caching + rate limiting</li>
    </ul>
  </li>
  <li>Ensured single global connection instance</li>
</ul>

<h3>🟢 MongoDB (Persistent Layer)</h3>
<ul>
  <li>Configured using Docker</li>
  <li>Connected via <code>Mongoose</code></li>
  <li>Used strictly for persistent domain data:
    <ul>
      <li>Users</li>
      <li>Authentication</li>
      <li>Preferences</li>
    </ul>
  </li>
</ul>

<h3>🔐 Environment Management</h3>
<ul>
  <li>Centralized environment variables using dotenv</li>
  <li>No secrets are hardcoded</li>
</ul>

<hr/>

<!-- Startup -->
<h2>⚙️ Server Startup & Reliability</h2>

<h3>Production-Ready Startup</h3>
<ul>
  <li>MongoDB must connect before server starts</li>
  <li>Redis must connect before server starts</li>
  <li>Fail-fast if any dependency fails</li>
</ul>

<h3>Graceful Shutdown</h3>
<ul>
  <li>Closes Redis connection</li>
  <li>Stops HTTP server accepting new requests</li>
  <li>Ensures safe cleanup before process exit</li>
</ul>

<hr/>

<!-- Routing -->
<h2>🧩 API & Routing Structure</h2>

<p><b>Namespace:</b> <code>/api/v1/auth</code></p>

<h3>Routing Fixes</h3>
<ul>
  <li>Resolved missing controllers</li>
  <li>Connected all routes to valid handlers</li>
  <li>Modular, scalable folder structure</li>
</ul>

<h3>Folder Structure</h3>

<pre><code>
routes/
controllers/
services/
utils/
config/
</code></pre>

<hr/>

<!-- OTP -->
<h2>🔐 Authentication & OTP System</h2>

<h3>Secure OTP Flow</h3>
<ul>
  <li>Strong OTP generation utility</li>
  <li>OTP hashed before storage</li>
  <li>Stored in Redis with strict TTL</li>
  <li>Delivery abstracted (Email/SMS ready)</li>
  <li>No OTP ever exposed to the user</li>
</ul>

<h3>Use Cases</h3>
<ul>
  <li>OTP-based login</li>
  <li>Password recovery</li>
  <li>Future 2FA support</li>
</ul>

<hr/>

<!-- User Profile -->
<h2>👤 User Profile Service</h2>

<h3>User Information</h3>
<ul>
  <li>Name</li>
  <li>Experience level: Beginner / Intermediate / Advanced</li>
  <li>Country & Market: India (initial)</li>
</ul>

<h3>Investor Preferences</h3>
<ul>
  <li>Investment style: Long-term / Swing / Intraday</li>
  <li>Risk appetite: Low / Medium / High</li>
  <li>Goals: Learning / Wealth creation / Trading</li>
</ul>

<p>
  This service enables personalization for analytics and future AI layers.
</p>

<hr/>

<!-- Market Ingestor -->
<h2>📡 Market Data Ingestor Service</h2>

<p>The only service responsible for calling external market APIs.</p>

<h3>Responsibilities</h3>
<ul>
  <li>Fetch price & metadata from external providers</li>
  <li>Normalize data into internal schemas</li>
  <li>Store clean & reproducible market data</li>
</ul>

<h3>Data Types</h3>
<ol>
  <li><b>Price Data</b> (Daily candles)</li>
  <li>Company Metadata (NSE/BSE)</li>
  <li>Fundamentals (basic metrics)</li>
  <li>Corporate Actions (planned)</li>
</ol>

<hr/>

<!-- Analysis Engine -->
<h2>📊 Analysis Engine (Deterministic Intelligence Layer)</h2>

<p>A pure mathematical engine. No AI, no predictions.</p>

<h3>Technical Indicators</h3>
<ul>
  <li>SMA</li>
  <li>EMA</li>
  <li>RSI</li>
  <li>MACD</li>
</ul>

<h3>Risk & Trend</h3>
<ul>
  <li>Volatility</li>
  <li>Trend (Up / Down / Sideways)</li>
  <li>Basic support/resistance</li>
</ul>

<h3>Design Principles</h3>
<ul>
  <li>Deterministic → same input → same output</li>
  <li>No randomness</li>
  <li>No AI or LLM usage</li>
</ul>

<hr/>

<!-- Best Practices -->
<h2>✅ Best Practices Followed</h2>

<ul>
  <li>Infrastructure-first design</li>
  <li>Fail-fast startup validation</li>
  <li>Graceful shutdown</li>
  <li>Secure environment management</li>
  <li>Clear service boundaries</li>
  <li>Redis → ephemeral</li>
  <li>MongoDB → persistent</li>
  <li>AI-ready design (no AI yet)</li>
</ul>

<hr/>

<!-- Architecture -->
<h2>🗺️ High-Level Architecture</h2>

<pre><code>
Auth Service
 ↓
User Profile Service
 ↓
Market Data Ingestor
 ↓
Market Data Database
 ↓
Analysis Engine
 ↓
AI / Alerts / APIs (upcoming)
</code></pre>

<hr/>

<!-- Next -->
<h2>🚧 What’s Next</h2>

<ul>
  <li>Redis caching for hot data</li>
  <li>Kafka-based ingestion → scalable producer</li>
  <li>InfluxDB consumer</li>
  <li>AI explanation layer (LangChain + LangGraph)</li>
  <li>Alerts & watchlist system</li>
  <li>Role-based access & monetization</li>
</ul>

<hr/>

<!-- Philosophy -->
<h2>🧠 Philosophy</h2>
<pre><code>
Math first.
Data second.
AI last.

Trust is built on correctness — not predictions.
</code></pre>

<hr/>

<!-- Kafka -->
<h2>⚙️ Kafka + InfluxDB Progress</h2>

<ul>
  <li>go-influx → build Kafka producer/consumer</li>
  <li>verify-producer → add logging & safeguards</li>
  <li>multi-symbol ingestion scaling</li>
  <li>replay-test → replay Kafka history into InfluxDB</li>
</ul>

<hr/>

<h2>📜 About</h2>
<p>
  Debroi is a scalable backend providing real-time financial data, indicators, 
  and market research endpoints.
</p>

<hr/>

<h2>📚 License</h2>
<p>MIT License</p>

<hr/>

<p align="center">
  <strong>Built with ❤️ by the Debroi Team</strong><br/>
  <em>Accuracy. Reliability. Intelligence.</em>
</p>

</body>
</html>