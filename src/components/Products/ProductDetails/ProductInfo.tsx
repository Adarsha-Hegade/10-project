import React from 'react';
import { Package, Calendar, User } from 'lucide-react';

interface ProductInfoProps {
  product: {
    name: string;
    code: string;
    category: string;
    manufacturer: string;
    size: string;
    stock: number;
    booked: number;
    createdAt: string;
    updatedAt: string;
    description?: string;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Product Information
        </h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Basic Details
            </h3>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Code</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.code}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Category</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.category}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Manufacturer</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.manufacturer}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Size</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.size}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Stock Information
            </h3>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Current Stock</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.stock} units
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Booked</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.booked} units
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Available</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.stock - product.booked} units
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {product.description && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Description
            </h3>
            <p className="mt-2 text-sm text-gray-900 dark:text-white">
              {product.description}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Created: {new Date(product.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Updated: {new Date(product.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}