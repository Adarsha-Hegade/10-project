import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

export function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {preview ? (
              <div className="relative w-full h-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain w-full h-full"
                />
                <button
                  onClick={() => setPreview(null)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or WEBP (MAX. 800x400px)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
}