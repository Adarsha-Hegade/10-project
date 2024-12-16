import jwt from 'jsonwebtoken';
import { config } from '../config';
import type { IUser } from '../models/User';

interface JWTPayload {
  userId: string;
  username: string;
  role: string;
}

export function generateToken(user: IUser & { _id: string }): string {
  const payload: JWTPayload = {
    userId: user._id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, config.jwt.secret) as JWTPayload;
}