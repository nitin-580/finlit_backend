🚀 DEBROI – Backend Architecture & Progress

A scalable, production-ready backend for a Finance + AI platform, built with reliability, security, and future AI extensibility in mind.

⸻

📌 Current Milestone Overview

This milestone focuses on infrastructure stability, authentication, and core service foundations required before introducing analytics and AI.

⸻

🏗️ Infrastructure & Core Setup

🔴 Redis (Ephemeral Data Layer)
	•	Configured Redis using Docker with persistent volumes
	•	Verified connectivity using ioredis
	•	Used for:
	•	OTP storage
	•	Short-lived tokens
	•	Future rate limiting & caching
	•	Ensured single auto-connection (no duplicate client creation)

🟢 MongoDB (Persistent Data Layer)
	•	Configured MongoDB using Docker
	•	Validated connections using Mongoose
	•	Reserved strictly for:
	•	User data
	•	Authentication data
	•	Long-lived domain data

🔐 Environment Management
	•	Centralized environment variables using dotenv
	•	Resolved path and load-order issues
	•	No secrets hard-coded in the codebase

⸻

⚙️ Server Startup & Reliability

Production-Ready Startup Sequence
	•	MongoDB connects before server starts
	•	Redis connects before server starts
	•	Server fails fast if any critical dependency is unavailable

Graceful Shutdown Handling

Handled SIGINT and SIGTERM signals:
	•	Redis connections close cleanly
	•	HTTP server stops accepting new requests
	•	Process exits only after safe cleanup

⸻

🧩 API & Routing Structure

Routing
	•	All authentication routes are namespaced under:

/api/v1/auth


	•	Fixed Express routing issues caused by:
	•	Missing controllers
	•	Undefined handlers
	•	Ensured all routes are wired to valid controller functions

Code Organization
	•	Clear separation of concerns:

routes/
controllers/
services/
utils/
config/



⸻

🔐 Authentication & OTP System

OTP Flow (Secure by Design)
	•	Secure OTP generation using a dedicated utility
	•	OTPs are:
	•	Hashed before storage
	•	Stored in Redis with a strict TTL
	•	OTP delivery layer abstracted (Email/SMS placeholder)
	•	No OTP is ever exposed in API responses

Supported Use Cases
	•	OTP-based login
	•	Password recovery
	•	Future 2FA support

⸻

👤 User Profile Service

User Information
	•	Name
	•	Experience level:
	•	Beginner
	•	Intermediate
	•	Advanced
	•	Country & Market:
	•	India (initial focus)

Investor Preferences
	•	Investment style:
	•	Long-term
	•	Swing
	•	Intraday
	•	Risk appetite:
	•	Low
	•	Medium
	•	High
	•	Goals:
	•	Learning
	•	Wealth creation
	•	Trading

This service provides personalization context for analytics and AI layers.

⸻

📡 Market Data Ingestor Service

A dedicated service responsible for data ingestion and normalization.

Responsibilities
	•	Fetch data from external market providers
	•	Normalize data into internal schemas
	•	Store clean, reproducible data in the database

Data Types Supported

1️⃣ Price Data (Mandatory)
	•	Open
	•	High
	•	Low
	•	Close
	•	Volume
	•	Timestamp
Timeframe: Daily candles (MVP)

2️⃣ Company Metadata
	•	Symbol
	•	Company name
	•	Sector
	•	Industry
	•	Exchange (NSE / BSE)

3️⃣ Fundamentals (Basic)
	•	Market capitalization
	•	P/E ratio
	•	EPS
	•	Revenue
	•	Debt

4️⃣ Corporate Actions (Planned)
	•	Dividends
	•	Stock splits
	•	Bonuses

AI and analytics will never call external APIs directly — only this service does.

⸻

📊 Analysis Engine (Deterministic Intelligence Layer)

A pure mathematical engine — no AI, no predictions.

Technical Indicators
	•	SMA (Simple Moving Average)
	•	EMA (Exponential Moving Average)
	•	RSI (Relative Strength Index)
	•	MACD

Risk & Trend Analysis
	•	Volatility assessment
	•	Trend direction:
	•	Uptrend
	•	Downtrend
	•	Sideways
	•	Basic support & resistance detection

Design Principles
	•	Deterministic outputs (same input → same result)
	•	No randomness
	•	No LLM usage
	•	Clean separation from ingestion and AI layers

This engine produces ground-truth signals that AI will later explain.

⸻

✅ Best Practices Followed
	•	Infrastructure-first design
	•	Fail-fast startup validation
	•	Graceful shutdown handling
	•	Secure secret management
	•	Clear service boundaries
	•	Redis for ephemeral data only
	•	MongoDB for persistent domain data
	•	AI-ready architecture (but AI-free for now)

⸻

🗺️ High-Level Architecture

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
(AI / Alerts / APIs – upcoming)


⸻

🚧 What’s Next
	•	Redis caching for hot market & analysis data
	•	Kafka-based ingestion & event streaming
	•	AI explanation layer (LangChain + LangGraph)
	•	Alerts & watchlist system
	•	Role-based access & monetization

⸻

🧠 Philosophy

Math first. Data second. AI last.
Trust is built on correctness — not predictions.

⸻