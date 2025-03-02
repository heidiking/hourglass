
import React from 'react';
import { Clock } from 'lucide-react';
import { DialogTrigger } from "@/components/ui/dialog";
import { useTimeTracker } from './TimeTrackerContext';

interface TimeTrackerButtonProps {
  className?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "floating";
}

const TimeTrackerButton: React.FC<TimeTrackerButtonProps> = ({ 
  className = "",
  position = "floating" 
}) => {
  const { dialogOpen } = useTimeTracker();

  const positionStyles = {
    topLeft: "fixed top-4 left-4",
    topRight: "fixed top-4 right-4",
    bottomLeft: "fixed bottom-4 left-4",
    bottomRight: "fixed bottom-4 right-4",
    floating: ""
  };

  return (
    <DialogTrigger asChild>
      <button
        className={`p-3 ${dialogOpen ? 'bg-black/60' : 'bg-black/30'} rounded-full hover:bg-black/50 transition-colors ${positionStyles[position]} ${className} flex items-center justify-center w-12 h-12`}
        aria-label="Time Tracker"
        data-testid="time-tracker-trigger"
      >
        <Clock size={20} className="text-white" />
      </button>
    </DialogTrigger>
  );
};

export default TimeTrackerButton;
