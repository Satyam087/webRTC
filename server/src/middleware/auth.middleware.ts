import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

/**
 * Simple authentication middleware.
 * In a real production app, this would verify a JWT or session.
 * For now, it checks for a secret API key or a placeholder header
 * to demonstrate protected route logic as discussed in the security plan.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  // For initial securing, we check against a secret from env.
  // This allows the HR dashboard to communicate with the server.
  if (token !== env.ADMIN_API_KEY) {
    return res.status(403).json({ error: 'Invalid or unauthorized token' });
  }

  next();
};
