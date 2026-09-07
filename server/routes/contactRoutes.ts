import { Router, Request, Response } from 'express';
import { contactRateLimiter } from '../middleware/rateLimiter';

const router = Router();

/**
 * POST /api/contact
 * Submit contact inquiry with rate limiting and validation
 */
router.post('/', contactRateLimiter, (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ success: false, error: 'Name is required.' });
    return;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    res.status(400).json({ success: false, error: 'A valid email is required.' });
    return;
  }

  if (!subject || !subject.trim()) {
    res.status(400).json({ success: false, error: 'Subject is required.' });
    return;
  }

  if (!message || message.trim().length < 15) {
    res.status(400).json({
      success: false,
      error: 'Message must be at least 15 characters long.',
    });
    return;
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string) ||
    req.socket.remoteAddress ||
    'unknown';

  const userAgent = req.headers['user-agent'] || 'unknown';

  const newSubmission = {
    id: `msg-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    isRead: false,
    createdAt: new Date(),
    ipAddress: clientIp,
    userAgent,
  };

  // In production, await ContactMessageModel.create(newSubmission)
  console.log('📩 New Inbound Contact Submission:', newSubmission.email, newSubmission.subject);

  res.status(201).json({
    success: true,
    message: 'Thank you. Your message has been received securely.',
    submissionId: newSubmission.id,
  });
});

export default router;
