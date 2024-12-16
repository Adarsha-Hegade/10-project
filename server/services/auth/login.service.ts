import { User } from '../../models/User';
import { generateToken } from '../../lib/jwt';
import { verifyPassword } from './password.service';
import { getConnectionStatus } from '../../lib/database/connection';

export async function loginUser(username: string, password: string) {
  if (!getConnectionStatus()) {
    throw new Error('Database connection not established');
  }

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
      token: generateToken(user)
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Invalid credentials');
  }
}