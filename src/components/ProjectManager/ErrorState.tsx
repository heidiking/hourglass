
import React from 'react';

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="p-4 bg-red-50 text-red-800 rounded-md">
      <p className="text-black">{error}</p>
      <p className="text-sm mt-1 text-gray-700">Try refreshing the page or clearing browser data.</p>
    </div>
  );
};

export default ErrorState;
