import { create } from 'zustand';
import type { Product } from '../types';
import * as productApi from '../lib/api/products';

interface ProductState {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  
  fetchProducts: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    manufacturer?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => Promise<void>;
  
  getProduct: (id: string) => Promise<void>;
  createProduct: (formData: FormData) => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  total: 0,
  page: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  selectedProduct: null,

  fetchProducts: async (params) => {
    try {
      set({ isLoading: true, error: null });
      const data = await productApi.getProducts(params);
      set({
        products: data.products,
        total: data.total,
        page: data.page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch products' });
    } finally {
      set({ isLoading: false });
    }
  },

  getProduct: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const product = await productApi.getProduct(id);
      set({ selectedProduct: product });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch product' });
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (formData) => {
    try {
      set({ isLoading: true, error: null });
      await productApi.createProduct(formData);
      await get().fetchProducts(); // Refresh the list
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create product' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (id, formData) => {
    try {
      set({ isLoading: true, error: null });
      const updated = await productApi.updateProduct(id, formData);
      set(state => ({
        products: state.products.map(p => p.id === id ? updated : p),
        selectedProduct: updated,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update product' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await productApi.deleteProduct(id);
      set(state => ({
        products: state.products.filter(p => p.id !== id),
        selectedProduct: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete product' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));