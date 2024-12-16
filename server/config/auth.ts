import bcrypt from 'bcryptjs';

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  // Re-hashed password for '20140457764'
  passwordHash: '$2a$10$YourNewHashHere', // We'll generate this in init
  role: 'admin' as const,
  permissions: ['all'] as const
};

// In-memory user store
const users = new Map<string, User>();

export interface User {
  username: string;
  passwordHash: string;
  role: 'admin' | 'user';
  permissions: string[];
}

export const auth = {
  async init() {
    // Only create admin if it doesn't exist
    if (!users.has('admin')) {
      const passwordHash = await bcrypt.hash('20140457764', 10);
      users.set('admin', {
        username: 'admin',
        passwordHash,
        role: 'admin',
        permissions: ['all']
      });
      console.log('✅ Admin user initialized');
    }
  },

  async validateCredentials(username: string, password: string): Promise<User | null> {
    const user = users.get(username);
    if (!user) {
      console.log(`❌ User not found: ${username}`);
      return null;
    }

    try {
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        console.log(`❌ Invalid password for user: ${username}`);
        return null;
      }
      console.log(`✅ Valid credentials for user: ${username}`);
      return user;
    } catch (error) {
      console.error('Password validation error:', error);
      return null;
    }
  },

  getUser(username: string): User | null {
    return users.get(username) || null;
  }
};