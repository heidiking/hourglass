
import React from 'react';
import { Dialog } from "@/components/ui/dialog";
import { TimeTrackerProvider } from './TimeTrackerContext';
import TimeTrackerButton from './TimeTrackerButton';
import TimeTrackerDialog from './TimeTrackerDialog';

interface TimeTrackerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "floating";
}

const TimeTracker = ({ 
  open, 
  onOpenChange, 
  className = "",
  position = "floating" 
}: TimeTrackerProps) => {
  return (
    <TimeTrackerProvider initialOpen={open} onOpenChange={onOpenChange}>
      <Dialog>
        <TimeTrackerButton className={className} position={position} />
        <TimeTrackerDialog />
      </Dialog>
    </TimeTrackerProvider>
  );
};

export default TimeTracker;
