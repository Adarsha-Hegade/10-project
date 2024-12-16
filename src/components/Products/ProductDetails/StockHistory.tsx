import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const stockHistory = [
  {
    id: 1,
    type: 'increase',
    amount: 50,
    date: '2024-03-15',
    reason: 'New stock arrival',
    user: 'John Doe',
  },
  {
    id: 2,
    type: 'decrease',
    amount: 10,
    date: '2024-03-14',
    reason: 'Stock adjustment',
    user: 'Jane Smith',
  },
  // Add more history items...
];

export function StockHistory() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Stock History
        </h2>
      </div>
      
      <div className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {stockHistory.map((item, itemIdx) => (
              <li key={item.id}>
                <div className="relative pb-8">
                  {itemIdx !== stockHistory.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800
                        ${item.type === 'increase' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {item.type === 'increase' ? (
                          <ArrowUp className="w-5 h-5 text-white" />
                        ) : (
                          <ArrowDown className="w-5 h-5 text-white" />
                        )}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {item.reason}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {item.type === 'increase' ? '+' : '-'}{item.amount} units
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                        <div>{new Date(item.date).toLocaleDateString()}</div>
                        <div>{item.user}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}