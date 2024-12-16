import { config } from '../config';
import type { LoginFormData, SignupFormData } from '../../types/auth';

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  
  // Handle empty responses
  if (!contentType || !contentType.includes('application/json')) {
    if (!response.ok) {
      throw new Error('Server error');
    }
    return {};
  }

  try {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }
    return data;
  } catch (error) {
    if (!response.ok) {
      throw new Error('Server error');
    }
    throw error;
  }
};

export async function loginApi(data: LoginFormData) {
  try {
    const response = await fetch(`${config.apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Login failed');
  }
}

export async function createAdminApi(data: SignupFormData) {
  try {
    const response = await fetch(`${config.apiUrl}/auth/admin/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to create admin:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create admin account');
  }
}

export async function checkAdminExistsApi() {
  try {
    const response = await fetch(`${config.apiUrl}/auth/admin/exists`);
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to check admin existence:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to check admin existence');
  }
}