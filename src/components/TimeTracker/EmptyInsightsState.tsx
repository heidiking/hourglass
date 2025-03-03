
import React from 'react';
import { BarChart3 } from 'lucide-react';

const EmptyInsightsState: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-black/10 rounded-md text-center">
      <BarChart3 className="mx-auto mb-2 text-black" size={24} />
      <p className="text-black">No document activity data available yet.</p>
      <p className="text-sm mt-1 text-black">Start tracking documents to see insights here.</p>
    </div>
  );
};

export default EmptyInsightsState;
