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

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Products"
        value="1,234"
        icon={Package}
        color="bg-blue-500"
      />
      <StatCard
        title="Available Stock"
        value="3,456"
        icon={Package}
        color="bg-green-500"
      />
      <StatCard
        title="Booked Stock"
        value="789"
        icon={ShoppingCart}
        color="bg-yellow-500"
      />
      <StatCard
        title="Low Stock Items"
        value="12"
        icon={AlertTriangle}
        color="bg-red-500"
      />
    </div>
  );
}