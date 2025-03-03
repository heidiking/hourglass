
import React, { memo } from 'react';
import { Clock } from 'lucide-react';
import { useTimeTracker } from './TimeTrackerContext';

interface TimeTrackerButtonProps {
  className?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "floating";
}

const TimeTrackerButton: React.FC<TimeTrackerButtonProps> = ({ 
  className = "",
  position = "floating" 
}) => {
  const { dialogOpen, handleOpenChange, isTracking } = useTimeTracker();

  const positionStyles = {
    topLeft: "fixed top-4 left-4",
    topRight: "fixed top-4 right-4",
    bottomLeft: "fixed bottom-4 left-4",
    bottomRight: "fixed bottom-4 right-4",
    floating: ""
  };

  const handleClick = () => {
    handleOpenChange(!dialogOpen);
  };

  return (
    <button
      className={`p-3 bg-white 
                ${isTracking ? 'ring-2 ring-green-500' : ''}
                rounded-full hover:bg-white/90 transition-colors ${positionStyles[position]} 
                ${className} flex items-center justify-center w-12 h-12 shadow-md`}
      aria-label="Time Tracker"
      data-testid="time-tracker-trigger"
      onClick={handleClick}
    >
      <Clock size={20} className="text-black" />
      <span className="sr-only">Time Tracker</span>
    </button>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(TimeTrackerButton);
