import React from 'react';

export const TableSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-12 bg-gray-200 rounded"></div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-16 bg-gray-100 rounded"></div>
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-lg"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-100 rounded"></div>
          <div className="h-3 bg-gray-100 rounded w-5/6"></div>
        </div>
      </div>
    ))}
  </div>
);

export const FormSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-gray-200 rounded w-1/4"></div>
    <div className="h-40 bg-gray-100 rounded"></div>
    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
    <div className="h-40 bg-gray-100 rounded"></div>
    <div className="h-12 bg-gray-300 rounded w-32"></div>
  </div>
);

export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg"></div>
      </div>
    ))}
  </div>
);

export default { TableSkeleton, CardSkeleton, FormSkeleton, StatsSkeleton };
