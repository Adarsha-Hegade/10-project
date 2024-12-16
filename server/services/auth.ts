import { User } from '../models/User';
import { AuditLog } from '../models/AuditLog';
import { generateToken } from '../lib/jwt';
import bcrypt from 'bcryptjs';

export async function createAdmin(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
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
      token: generateToken(user)
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

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return {
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
      token: generateToken(user)
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Invalid credentials');
  }
}

export async function checkAdminExists() {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    return adminCount > 0;
  } catch (error) {
    console.error('Failed to check admin existence:', error);
    throw new Error('Failed to check admin existence');
  }
}