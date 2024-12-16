import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ArrowUpDown, 
  Filter,
  Eye
} from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    category: 'Electronics',
    manufacturer: 'Apple',
    stock: 45,
    booked: 5,
  },
  // Add more sample products...
];

type SortField = 'name' | 'category' | 'manufacturer' | 'stock';

export function ProductList() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Products
        </h1>
        <Link
          to="/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Product
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          {/* Add more categories */}
        </select>

        <select
          value={selectedManufacturer}
          onChange={(e) => setSelectedManufacturer(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <option value="">All Manufacturers</option>
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
          {/* Add more manufacturers */}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2"
                >
                  Product
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-2"
                >
                  Category
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('manufacturer')}
                  className="flex items-center gap-2"
                >
                  Manufacturer
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('stock')}
                  className="flex items-center gap-2"
                >
                  Stock
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.manufacturer}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.stock} ({product.booked} booked)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}