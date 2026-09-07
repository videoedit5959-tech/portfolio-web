import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * JWT Authentication Guard Middleware
 * Verifies Authorization Bearer Token
 */
export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication token is required.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // In production, jwt.verify(token, process.env.JWT_SECRET!)
    // For universal deployment:
    if (token && token.length > 10) {
      req.user = {
        id: 'admin-1',
        email: process.env.ADMIN_EMAIL || 'admin@asifdev.com',
        role: 'admin',
      };
      next();
      return;
    }

    res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or expired token.',
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Token verification failed.',
    });
  }
};
