import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err.message === 'Invalid credentials') {
    return res.status(401).json({ 
      error: 'Invalid credentials',
      message: 'The username or password is incorrect'
    });
  }

  // Database connection errors
  if (err.name === 'MongooseError' || err.name === 'MongoError') {
    return res.status(503).json({ 
      error: 'Database error',
      message: 'A database error occurred. Please try again later.'
    });
  }

  res.status(500).json({ 
    error: 'Internal server error',
    message: 'An unexpected error occurred. Please try again later.'
  });
};