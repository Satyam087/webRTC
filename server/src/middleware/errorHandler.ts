import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err.message);

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};
