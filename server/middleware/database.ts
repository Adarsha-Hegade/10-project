import { Request, Response, NextFunction } from 'express';
import { getConnectionStatus, waitForConnection } from '../lib/database/connection';

export async function ensureDatabaseConnection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!getConnectionStatus()) {
      // Wait for up to 5 seconds for the connection to be established
      const connected = await waitForConnection(5000);
      if (!connected) {
        return res.status(503).json({
          error: 'Database connection not available'
        });
      }
    }
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(503).json({
      error: 'Database connection error'
    });
  }
}