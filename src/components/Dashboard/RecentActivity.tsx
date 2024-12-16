import React from 'react';
import { Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    action: 'Stock Updated',
    product: 'iPhone 13 Pro',
    details: 'Stock level changed from 23 to 45',
    time: '2h ago',
  },
  {
    id: 2,
    action: 'New Product',
    product: 'Samsung TV',
    details: 'Added to inventory with initial stock of 15',
    time: '3h ago',
  },
  {
    id: 3,
    action: 'Low Stock Alert',
    product: 'Wireless Mouse',
    details: 'Stock level below minimum (5 items remaining)',
    time: '5h ago',
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.action}: {activity.product}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {activity.details}
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}