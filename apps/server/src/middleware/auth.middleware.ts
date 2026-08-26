import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../utils/jwtSecret';

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  const secret = getJwtSecret();
  if (!secret) {
    console.error('JWT_SECRET is not configured — refusing to verify any token.');
    return res.status(500).json({ message: 'Server misconfigured' });
  }

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

/**
 * Like `authenticateToken`, but never rejects the request — decodes and
 * attaches `req.user` when a valid token is present, otherwise just calls
 * `next()`. For routes that are public by default but behave differently
 * for an authenticated admin (e.g. including unpublished drafts).
 */
export const attachUserIfPresent = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const secret = getJwtSecret();

  if (!token || !secret) {
    return next();
  }

  jwt.verify(token, secret, (err: any, user: any) => {
    if (!err) {
      req.user = user;
    }
    next();
  });
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};
