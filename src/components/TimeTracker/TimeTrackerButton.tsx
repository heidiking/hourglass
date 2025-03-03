
import React from 'react';
import { Clock } from 'lucide-react';
import { DialogTrigger } from "@/components/ui/dialog";
import { useTimeTracker } from './TimeTrackerContext';
import { endActivity, startActivity, detectCurrentApp } from '@/utils/timeTracking';
import { toast } from "sonner";

interface TimeTrackerButtonProps {
  className?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "floating";
}

const TimeTrackerButton: React.FC<TimeTrackerButtonProps> = ({ 
  className = "",
  position = "floating" 
}: TimeTrackerButtonProps) => {
  const { dialogOpen, handleOpenChange, isTracking, currentActivity } = useTimeTracker();

  const positionStyles = {
    topLeft: "fixed top-4 left-4",
    topRight: "fixed top-4 right-4",
    bottomLeft: "fixed bottom-4 left-4",
    bottomRight: "fixed bottom-4 right-4",
    floating: ""
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle tracking on/off
    if (isTracking) {
      endActivity();
      toast.info("Activity tracking stopped");
    } else {
      const currentApp = detectCurrentApp();
      startActivity(currentApp);
      toast.success("Activity tracking started");
    }
  };

  return (
    <DialogTrigger asChild>
      <button
        className={`p-3 bg-white rounded-full hover:bg-white/90 transition-colors ${positionStyles[position]} ${className} flex items-center justify-center w-12 h-12 shadow-md relative`}
        aria-label="Time Tracker"
        data-testid="time-tracker-trigger"
        onClick={handleClick}
      >
        <Clock size={20} className="text-black" />
        {isTracking && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
        )}
      </button>
    </DialogTrigger>
  );
};

export default TimeTrackerButton;
