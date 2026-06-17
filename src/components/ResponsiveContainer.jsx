import React from 'react';

/**
 * ResponsiveContainer
 * A simple wrapper that enforces max-width and horizontal padding
 * based on common breakpoints. Use this to wrap page content
 * so that it behaves consistently across devices.
 */
export default function ResponsiveContainer({ children }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
