import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage';
import { getDbStatus } from '../config/db';

const sanitize = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // strip potential HTML tags
    .trim();
};

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ success: false, error: 'Name is required.' });
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      res.status(400).json({ success: false, error: 'A valid email address is required.' });
      return;
    }

    if (!subject || !subject.trim()) {
      res.status(400).json({ success: false, error: 'Subject is required.' });
      return;
    }

    if (!message || message.trim().length < 10) {
      res.status(400).json({
        success: false,
        error: 'Message must be at least 10 characters long.',
      });
      return;
    }

    if (message.trim().length > 3000) {
      res.status(400).json({
        success: false,
        error: 'Message length cannot exceed 3000 characters.',
      });
      return;
    }

    const clientIp =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      '';

    const userAgent = (req.headers['user-agent'] as string) || '';

    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({
        success: false,
        error: 'Message service temporarily unavailable. Database is offline.',
      });
      return;
    }

    // Persist real contact inquiry in MongoDB
    const newMessage = await ContactMessage.create({
      name: sanitize(name),
      email: email.trim().toLowerCase(),
      subject: sanitize(subject),
      message: sanitize(message),
      isRead: false,
      ipAddress: clientIp,
      userAgent: userAgent.substring(0, 200),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received and saved securely.',
      data: {
        id: newMessage._id,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    console.error('submitContact error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while processing your message.',
    });
  }
};

export const getMessages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    const unreadCount = await ContactMessage.countDocuments({ isRead: false });

    res.json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages,
    });
  } catch (error) {
    console.error('getMessages error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve messages.' });
  }
};

export const toggleMessageRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead: isRead !== undefined ? Boolean(isRead) : true },
      { new: true }
    );

    if (!message) {
      res.status(404).json({ success: false, error: 'Message not found.' });
      return;
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('toggleMessageRead error:', error);
    res.status(400).json({ success: false, error: 'Failed to update message status.' });
  }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Message not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Message permanently removed from MongoDB.',
    });
  } catch (error) {
    console.error('deleteMessage error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete message.' });
  }
};
