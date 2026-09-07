import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';
import { getDbStatus } from '../config/db';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'admin';
  name?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

interface JwtPayload {
  id: string;
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // 1. Check HTTP-only cookie
    if (req.cookies && (req.cookies.token || req.cookies.jwt)) {
      token = req.cookies.token || req.cookies.jwt;
    }

    // 2. Check Authorization Bearer header
    const authHeader = req.headers.authorization;
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Authentication required. No session token provided.',
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'default_dev_jwt_secret_change_in_production';

    // 3. Verify JWT signature & expiration
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (err: unknown) {
      const errorMsg = err instanceof jwt.TokenExpiredError
        ? 'Session expired. Please sign in again.'
        : 'Invalid authentication token.';
      res.status(401).json({
        success: false,
        error: errorMsg,
      });
      return;
    }

    // 4. Verify admin exists in database if DB is connected
    const dbStatus = getDbStatus();
    if (dbStatus.isConnected) {
      const adminUser = await Admin.findById(decoded.id).select('-passwordHash');
      if (!adminUser) {
        res.status(401).json({
          success: false,
          error: 'Administrator account associated with this token no longer exists.',
        });
        return;
      }
      req.user = {
        id: adminUser._id.toString(),
        email: adminUser.email,
        role: adminUser.role,
        name: adminUser.name,
      };
    } else {
      // If DB is offline but valid token signed with JWT_SECRET:
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    }

    next();
  } catch (error) {
    console.error('Auth middleware verification error:', error);
    res.status(401).json({
      success: false,
      error: 'Authentication failed. Please sign in again.',
    });
  }
};
