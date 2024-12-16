import React from 'react';
import { ProductForm } from './ProductForm';

export function AddProduct() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Add  Product
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ProductForm />
      </div>
    </div>
  );
}