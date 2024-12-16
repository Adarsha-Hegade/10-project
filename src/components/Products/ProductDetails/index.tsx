import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfo } from './ProductInfo';
import { StockHistory } from './StockHistory';

const sampleProduct = {
  name: 'iPhone 13 Pro',
  code: 'IP13PRO-128',
  category: 'Electronics',
  manufacturer: 'Apple',
  size: '128GB',
  stock: 45,
  booked: 5,
  createdAt: '2024-03-01',
  updatedAt: '2024-03-15',
  description: 'The latest iPhone with pro camera system and A15 Bionic chip.',
};

export function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {sampleProduct.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductInfo product={sampleProduct} />
        </div>
        <div>
          <StockHistory />
        </div>
      </div>
    </div>
  );
}