
import React, { useState, useEffect } from 'react';
import { formatFocusTime, getCurrentActivity } from '@/utils/timeTracking';
import { useTaskToggle } from '@/components/TaskToggle/TaskToggleContext';

const Clock = () => {
  const [time, setTime] = useState<string>('');
  const [amPm, setAmPm] = useState<string>('');
  const [focusedTime, setFocusedTime] = useState<string>('0m');
  const { setFocusModeOpen } = useTaskToggle();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const isPm = hours >= 12;
      
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      
      const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      setTime(formattedTime);
      setAmPm(isPm ? 'PM' : 'AM');
    };

    // Initial update
    updateTime();

    // Update every second
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Update with actual focus time tracking
  useEffect(() => {
    const updateFocusTime = () => {
      const currentActivity = getCurrentActivity();
      if (currentActivity) {
        setFocusedTime(formatFocusTime(currentActivity.duration));
      } else {
        setFocusedTime('0m');
      }
    };

    updateFocusTime();
    const trackingInterval = setInterval(updateFocusTime, 1000);
    
    return () => clearInterval(trackingInterval);
  }, []);

  const handleFocusTimeClick = () => {
    setFocusModeOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-end">
        <h1 className="text-[180px] font-extralight text-white text-shadow leading-none animate-fade-in">
          {time}
        </h1>
        <div className="text-white text-2xl mb-8 ml-2 opacity-80 font-light">
          {amPm}
        </div>
        <button 
          onClick={handleFocusTimeClick}
          className="text-white text-2xl mb-5 ml-4 opacity-80 font-light hover:opacity-100 cursor-pointer"
          aria-label="Open focus mode"
        >
          {focusedTime}
        </button>
      </div>
    </div>
  );
};

export default Clock;
