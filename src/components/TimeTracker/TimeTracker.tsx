
import React from 'react';
import { TimeTrackerProvider } from './TimeTrackerContext';
import TimeTrackerButton from './TimeTrackerButton';
import TimeTrackerDialog from './TimeTrackerDialog';
import { DocumentActivityDetector } from './DocumentActivityDetector';

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
      <TimeTrackerButton className={className} position={position} />
      <TimeTrackerDialog />
    </TimeTrackerProvider>
  );
};

export default TimeTracker;
