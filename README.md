🚀 Backend Progress (Current Milestone)
Infrastructure & Core Setup

Configured Redis using Docker with persistent volumes and verified connectivity via ioredis.

Configured MongoDB using Docker and validated successful connections using Mongoose.

Properly set up environment variables using dotenv and resolved path/loading issues.

Established a production-ready server startup sequence:

MongoDB connects before the server starts.

Redis connects before the server starts.

Server fails fast if any critical dependency is unavailable.

Server Stability & Reliability

Implemented graceful shutdown handling using SIGINT and SIGTERM:

Redis connections are closed cleanly.

HTTP server stops accepting new requests before exit.

Ensured Redis client auto-connection is handled correctly (no duplicate connection attempts).

API & Routing

Structured authentication routes under /api/v1/auth.

Fixed Express routing issues caused by missing or undefined route handlers.

Ensured all routes are wired with valid controller functions to prevent runtime crashes.

Authentication & OTP

Implemented OTP request flow:

Secure OTP generation using a dedicated utility.

OTP hashing and storage in Redis with a strict TTL.

Abstracted OTP delivery layer (email/SMS placeholder).

No OTPs are exposed in API responses.

Laid the foundation for OTP-based login, password recovery, and 2FA.

Best Practices Followed

Clear separation of concerns (routes, controllers, services, utils).

Infrastructure-first startup validation.

Secure handling of secrets and credentials.

Redis used for ephemeral data (OTP, rate-limiting ready).

MongoDB reserved for persistent user and auth data.