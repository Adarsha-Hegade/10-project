import React from 'react';
import { Package, AlertTriangle, ShoppingCart, BarChart3 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value="1,234"
          icon={Package}
          color="bg-blue-500"
        />
        <StatCard
          title="Low Stock Items"
          value="12"
          icon={AlertTriangle}
          color="bg-yellow-500"
        />
        <StatCard
          title="Pending Orders"
          value="45"
          icon={ShoppingCart}
          color="bg-green-500"
        />
        <StatCard
          title="Monthly Sales"
          value="$12,345"
          icon={BarChart3}
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="mt-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Product {i} Updated
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Stock level changed from 23 to 45
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {i}h ago
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}