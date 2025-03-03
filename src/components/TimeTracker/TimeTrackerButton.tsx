
import React, { memo } from 'react';
import { Clock } from 'lucide-react';
import { useTimeTracker } from './TimeTrackerContext';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface TimeTrackerButtonProps {
  className?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "floating";
}

const TimeTrackerButton: React.FC<TimeTrackerButtonProps> = memo(({ 
  className = "",
  position = "floating" 
}) => {
  const { isTracking, setDialogOpen, dialogOpen } = useTimeTracker();

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
            ${isTracking ? 'ring-2 ring-green-500 shadow-lg shadow-green-100' : ''}
            rounded-full hover:bg-white/90 transition-colors ${positionStyles[position]} 
            ${className} flex items-center justify-center shadow-md`}
          aria-label={`Time Tracker ${isTracking ? '(Active)' : ''}`}
          data-testid="time-tracker-trigger"
        >
          <Clock size={20} className="text-black" />
          <span className="text-black sr-only md:not-sr-only md:ml-2">Tracker</span>
        </button>
      </DialogTrigger>
    </Dialog>
  );
});

TimeTrackerButton.displayName = 'TimeTrackerButton';

export default TimeTrackerButton;
