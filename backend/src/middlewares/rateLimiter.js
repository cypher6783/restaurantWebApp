const rateLimit = require('express-rate-limit');

/**
 * Helper to create a rate limiter with sane defaults and a clear error response.
 */
function createLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,   // Return rate-limit info in RateLimit-* headers
    legacyHeaders: false,     // Disable deprecated X-RateLimit-* headers
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message,
        data: null,
      });
    },
  });
}

// ── Tier 1: Auth endpoints (login / register) ─────────────────────────────────
// 10 attempts per 15 minutes per IP — blocks brute-force attacks
const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many login attempts. Please try again in 15 minutes.',
});

// ── Tier 2: Write / mutation endpoints (orders, reservations, payments) ────────
// 30 requests per 10 minutes per IP
const mutationLimiter = createLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  message: 'Too many requests. Please slow down and try again shortly.',
});

// ── Tier 3: General API (read endpoints) ──────────────────────────────────────
// 200 requests per 10 minutes per IP — generous for normal browsing
const apiLimiter = createLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200,
  message: 'Rate limit exceeded. Please try again in a few minutes.',
});

module.exports = { authLimiter, mutationLimiter, apiLimiter };
