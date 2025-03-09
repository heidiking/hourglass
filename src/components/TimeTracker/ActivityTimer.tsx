
import React, { useState, useEffect, memo } from 'react';
import { Clock } from 'lucide-react';
import { useTimeTracker } from './TimeTrackerContext';
import { formatTimeDuration } from './utils';

const ActivityTimer: React.FC = memo(() => {
  const { isTracking, currentActivity } = useTimeTracker();
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    // Only set up the timer if we're tracking something
    if (!isTracking) {
      setDuration(0);
      return;
    }

    // Initialize with current duration
    if (currentActivity) {
      setDuration(currentActivity.duration);
    }

    // Update timer every second
    const intervalId = setInterval(() => {
      if (currentActivity) {
        // Calculate current duration since tracking started
        const now = new Date();
        const startTime = new Date(currentActivity.startTime);
        const elapsedMs = now.getTime() - startTime.getTime();
        setDuration(elapsedMs);
      }
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [isTracking, currentActivity]);

  if (!isTracking) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-10 flex items-center gap-2 bg-white/90 text-black px-3 py-1.5 rounded-full shadow-md border border-green-500">
      <div className="relative">
        <Clock size={16} className="text-black" />
        <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
      </div>
      <span className="text-black font-medium text-sm">
        {currentActivity?.appName && (
          <span className="mr-2 max-w-[150px] truncate inline-block">{currentActivity.appName}: </span>
        )}
        {formatTimeDuration(duration)}
      </span>
    </div>
  );
});

ActivityTimer.displayName = 'ActivityTimer';

export default ActivityTimer;
