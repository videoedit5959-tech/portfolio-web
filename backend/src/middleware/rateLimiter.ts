import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for sensitive administrator login endpoint
 * Limits brute force attempts: 10 attempts per 15-minute window
 */
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  },
});

/**
 * Rate limiter for public contact form submissions
 * Prevents inbox spam: 5 submissions per 15-minute window
 */
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many contact submissions from this IP. Please wait 15 minutes before sending another message.',
  },
});

/**
 * General API rate limiter for all public endpoints
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate limit exceeded. Please throttle requests.',
  },
});
