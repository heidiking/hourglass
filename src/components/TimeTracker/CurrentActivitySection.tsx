
import React, { memo } from 'react';
import { Clock } from 'lucide-react';
import { ActivitySession } from '@/utils/timeTracking/types';
import ActivityIcon from './ActivityIcon';
import { formatTimeDuration } from './utils';

interface CurrentActivitySectionProps {
  currentActivity: ActivitySession | null;
}

const CurrentActivitySection: React.FC<CurrentActivitySectionProps> = ({ currentActivity }) => {
  // Format current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium flex items-center text-black">
        <Clock size={16} className="mr-2 text-black" />
        Activity for {formattedDate}
      </h3>
      {currentActivity ? (
        <div className="flex items-center p-3 bg-black/10 rounded-md mt-2">
          <ActivityIcon appName={currentActivity.appName} />
          <span className="truncate font-medium text-black ml-2">{currentActivity.appName}</span>
          <span className="ml-auto text-sm whitespace-nowrap text-black">
            {new Date(currentActivity.startTime).toLocaleTimeString()} • {formatTimeDuration(currentActivity.duration)}
          </span>
        </div>
      ) : (
        <div className="p-3 bg-black/10 rounded-md mt-2 text-gray-500">
          No active document tracking
        </div>
      )}
    </div>
  );
};

export default memo(CurrentActivitySection);
