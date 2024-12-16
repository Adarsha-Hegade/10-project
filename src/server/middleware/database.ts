import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export async function ensureDatabaseConnection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: 'Database connection not available',
      message: 'The server is temporarily unable to handle the request',
    });
  }
  next();
}