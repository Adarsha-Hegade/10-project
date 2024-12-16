import { create } from 'zustand';
import type { AuthState } from '../types/auth';
import { persist } from 'zustand/middleware';
import { loginApi } from '../lib/api/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: true, // Always true since we don't need to check admin existence
      adminExists: true, // Always true since admin is created on server start
      token: null,
      error: null,

      checkAdminExists: async () => {
        // No-op since admin always exists
        set({ adminExists: true, isInitialized: true, error: null });
      },

      createAdmin: async () => {
        // No-op since admin creation is handled on the server
        throw new Error('Admin creation is disabled');
      },

      login: async (username: string, password: string) => {
        try {
          const { user, token } = await loginApi({ username, password });
          set({
            user: {
              id: user.id,
              username: user.username,
              role: user.role,
              permissions: []
            },
            isAuthenticated: true,
            token,
            error: null
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Invalid credentials' });
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          token: null,
          error: null 
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);