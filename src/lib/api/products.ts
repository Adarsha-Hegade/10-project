import { config } from '../config';
import type { Product } from '../../types';

interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  manufacturer?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Failed to fetch products');
  }
  return response.json();
};

export async function getProducts(params: ProductQueryParams = {}): Promise<ProductResponse> {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.manufacturer) queryParams.append('manufacturer', params.manufacturer);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

  const response = await fetch(`${config.apiUrl}/products?${queryParams}`);
  return handleResponse(response);
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${config.apiUrl}/products/${id}`);
  return handleResponse(response);
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  const response = await fetch(`${config.apiUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  const response = await fetch(`${config.apiUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${config.apiUrl}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Failed to delete product');
  }
}