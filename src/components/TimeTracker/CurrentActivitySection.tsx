
import React from 'react';
import { Clock } from 'lucide-react';
import { ActivitySession } from '@/utils/timeTracking/types';
import ActivityIcon from './ActivityIcon';
import { formatTimeDuration } from './utils';

interface CurrentActivitySectionProps {
  currentActivity: ActivitySession | null;
}

const CurrentActivitySection: React.FC<CurrentActivitySectionProps> = ({ currentActivity }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium flex items-center">
        <Clock size={16} className="mr-2" />
        Current Activity
      </h3>
      {currentActivity ? (
        <div className="flex items-center p-3 bg-black/10 rounded-md mt-2">
          <ActivityIcon appName={currentActivity.appName} />
          <span className="truncate font-medium">{currentActivity.appName}</span>
          <span className="ml-auto text-sm whitespace-nowrap">
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

export default CurrentActivitySection;
