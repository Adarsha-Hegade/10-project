import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  BarChart2,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/products/new', icon: PlusCircle, label: 'Add Product' },
  { path: '/analytics', icon: BarChart2, label: 'Analytics' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-20 
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}