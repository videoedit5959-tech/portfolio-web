import { Request, Response, NextFunction } from 'express';

// In-memory token bucket for IP contact submission rate limiting
const ipSubmissionTracker = new Map<string, number>();

/**
 * Anti-spam Contact Rate Limiter
 * Limits contact submissions to 1 every 20 seconds per client IP
 */
export const contactRateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientIp =
    (req.headers['x-forwarded-for'] as string) ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const lastSubmission = ipSubmissionTracker.get(clientIp);
  const now = Date.now();
  const cooldownMs = 20 * 1000; // 20 seconds

  if (lastSubmission && now - lastSubmission < cooldownMs) {
    const remainingSeconds = Math.ceil((cooldownMs - (now - lastSubmission)) / 1000);
    res.status(429).json({
      success: false,
      error: `Please wait ${remainingSeconds}s before sending another message.`,
    });
    return;
  }

  ipSubmissionTracker.set(clientIp, now);
  next();
};
