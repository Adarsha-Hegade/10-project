import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../../common/FormField';
import { ImageUpload } from './ImageUpload';
import { useProductStore } from '../../../store/productStore';
import { Alert } from '../../common/Alert';

const productSchema = z.object({
  name: z.string().optional(),
  code: z.string().min(1, 'Product code is required'),
  category: z.string().min(1, 'Category is required'),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  size: z.string().min(1, 'Size is required'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  badStock: z.number().min(0, 'Bad stock cannot be negative'),
  bookings: z.number().min(0, 'Bookings cannot be negative'),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const navigate = useNavigate();
  const { createProduct, error, clearError } = useProductStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      stock: 0,
      badStock: 0,
      bookings: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      clearError();
      const formData = new FormData();
      
      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      await createProduct(formData);
      reset(); // Reset form after successful submission
      navigate('/products'); // Redirect to products list
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={clearError}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ImageUpload />

          <FormField
            label="Product Name"
            error={errors.name?.message}
          >
            <input
              type="text"
              {...register('name')}
              className="form-input"
              placeholder="Enter product name (optional)"
            />
          </FormField>

          <FormField
            label="Product Code"
            error={errors.code?.message}
            required
          >
            <input
              type="text"
              {...register('code')}
              className="form-input"
              placeholder="Enter product code"
            />
          </FormField>

          <FormField
            label="Category"
            error={errors.category?.message}
            required
          >
            <select {...register('category')} className="form-select">
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </FormField>
        </div>

        <div className="space-y-6">
          <FormField
            label="Manufacturer"
            error={errors.manufacturer?.message}
            required
          >
            <input
              type="text"
              {...register('manufacturer')}
              className="form-input"
              placeholder="Enter manufacturer"
            />
          </FormField>

          <FormField
            label="Size"
            error={errors.size?.message}
            required
          >
            <input
              type="text"
              {...register('size')}
              className="form-input"
              placeholder="Enter size"
            />
          </FormField>

          <FormField
            label="Stock"
            error={errors.stock?.message}
            required
          >
            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              className="form-input"
              min="0"
            />
          </FormField>

          <FormField
            label="Bad Stock"
            error={errors.badStock?.message}
            required
          >
            <input
              type="number"
              {...register('badStock', { valueAsNumber: true })}
              className="form-input"
              min="0"
            />
          </FormField>

          <FormField
            label="Bookings"
            error={errors.bookings?.message}
            required
          >
            <input
              type="number"
              {...register('bookings', { valueAsNumber: true })}
              className="form-input"
              min="0"
            />
          </FormField>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}