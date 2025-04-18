
import React, { memo, useCallback } from 'react';
import { Clock } from 'lucide-react';
import { useTimeTracker } from './TimeTrackerContext';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface TimeTrackerButtonProps {
  className?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "floating";
  showLabel?: boolean;
}

const TimeTrackerButton: React.FC<TimeTrackerButtonProps> = memo(({ 
  className = "",
  position = "floating",
  showLabel = true
}) => {
  const { isTracking, setDialogOpen, dialogOpen } = useTimeTracker();
  
  const handleClick = useCallback(() => {
    // This creates a memoized click handler to avoid recreating functions
    // on each render, improving performance
    setDialogOpen(!dialogOpen);
  }, [dialogOpen, setDialogOpen]);

  const positionStyles = {
    topLeft: "fixed top-4 left-4",
    topRight: "fixed top-4 right-4",
    bottomLeft: "fixed bottom-4 left-4",
    bottomRight: "fixed bottom-4 right-4",
    floating: ""
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button
          className={`p-2 bg-white 
            ${isTracking ? 'time-tracker-active' : ''}
            rounded-full hover:bg-white/90 transition-colors ${positionStyles[position]} 
            ${className} flex items-center justify-center gap-1 shadow-md relative`}
          aria-label={`Time Tracker ${isTracking ? '(Active)' : ''}`}
          data-testid="time-tracker-trigger"
        >
          <Clock size={20} className="text-black" />
          {showLabel && <span className="text-black font-medium">Tracker</span>}
          {isTracking && (
            <>
              <span 
                className="absolute w-4 h-4 bg-green-500 rounded-full -top-1 -right-1 animate-pulse" 
                aria-hidden="true" 
                title="Currently tracking activity">
              </span>
              <span className="sr-only">Currently tracking activity</span>
              <span 
                className="absolute inset-0 rounded-full border-3 border-green-500 animate-ping opacity-75" 
                aria-hidden="true">
              </span>
            </>
          )}
        </button>
      </DialogTrigger>
    </Dialog>
  );
});

TimeTrackerButton.displayName = 'TimeTrackerButton';

export default TimeTrackerButton;
