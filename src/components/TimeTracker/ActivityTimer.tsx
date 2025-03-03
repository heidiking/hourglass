
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useTimeTracker } from './TimeTrackerContext';
import { formatTimeDuration } from './utils';

const ActivityTimer: React.FC = () => {
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
    <div className="fixed top-4 right-4 z-10 flex items-center gap-2 bg-white/90 text-black px-3 py-1.5 rounded-full shadow-md">
      <Clock size={16} className="text-black" />
      <span className="text-black font-medium text-sm">
        {formatTimeDuration(duration)}
      </span>
    </div>
  );
};

export default ActivityTimer;
