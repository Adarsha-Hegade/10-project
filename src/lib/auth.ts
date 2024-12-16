import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuditLog } from '../models/AuditLog';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string, username: string, role: string): string {
  return jwt.sign(
    { userId, username, role },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
}

export async function createAdmin(username: string, password: string) {
  const hashedPassword = await hashPassword(password);
  
  try {
    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'admin'
    });
    
    await AuditLog.create({
      userId: user._id,
      action: 'ADMIN_CREATED',
      details: { username }
    });

    return {
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
      token: generateToken(user._id.toString(), user.username, user.role)
    };
  } catch (error) {
    console.error('Failed to create admin:', error);
    throw new Error('Failed to create admin account');
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return {
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
      token: generateToken(user._id.toString(), user.username, user.role)
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Invalid credentials');
  }
}