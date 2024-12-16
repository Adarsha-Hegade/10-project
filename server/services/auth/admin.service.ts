import { User } from '../../models/User';
import { AuditLog } from '../../models/AuditLog';
import { generateToken } from '../../lib/jwt';
import { hashPassword } from './password.service';
import { getConnectionStatus } from '../../lib/database/connection';

export async function createAdmin(username: string, password: string) {
  if (!getConnectionStatus()) {
    throw new Error('Database connection not established');
  }

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
      token: generateToken(user)
    };
  } catch (error) {
    console.error('Failed to create admin:', error);
    throw new Error('Failed to create admin account');
  }
}

export async function checkAdminExists() {
  if (!getConnectionStatus()) {
    throw new Error('Database connection not established');
  }

  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    return adminCount > 0;
  } catch (error) {
    console.error('Failed to check admin existence:', error);
    throw new Error('Failed to check admin existence');
  }
}