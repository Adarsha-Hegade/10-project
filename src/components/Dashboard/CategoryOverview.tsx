import React from 'react';
import { PieChart } from 'lucide-react';

const categories = [
  { name: 'Electronics', stock: 450, color: 'bg-blue-500' },
  { name: 'Furniture', stock: 320, color: 'bg-green-500' },
  { name: 'Clothing', stock: 280, color: 'bg-yellow-500' },
  { name: 'Books', stock: 180, color: 'bg-purple-500' },
  { name: 'Sports', stock: 150, color: 'bg-red-500' },
];

export function CategoryOverview() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Stock by Category
        </h2>
      </div>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {category.stock} items
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className={`h-full rounded-full ${category.color}`}
                style={{ width: `${(category.stock / 450) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}