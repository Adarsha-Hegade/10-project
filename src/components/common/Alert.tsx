import React from 'react';
import { X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

const alertStyles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export function Alert({ type, message, onClose }: AlertProps) {
  return (
    <div className={`p-4 rounded-lg border ${alertStyles[type]} relative`}>
      <div className="flex items-start">
        <div className="flex-1">{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}