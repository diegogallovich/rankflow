import React from 'react';

export function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {children}
    </label>
  );
}
