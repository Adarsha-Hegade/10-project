import { auth } from '../config/auth';
import { generateToken } from '../utils/jwt';

export async function loginUser(username: string, password: string) {
  try {
    const user = await auth.validateCredentials(username, password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      user: {
        username: user.username,
        role: user.role,
        permissions: user.permissions
      },
      token: generateToken({
        username: user.username,
        role: user.role
      })
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Invalid credentials');
  }
}