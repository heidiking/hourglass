
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TimeTrackerProvider } from './TimeTrackerContext';
import TimeTrackerButton from './TimeTrackerButton';
import TimeTrackerDialog from './TimeTrackerDialog';

interface TimeTrackerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "floating";
  showLabel?: boolean;
}

const TimeTracker = ({ 
  open, 
  onOpenChange, 
  className = "",
  position = "floating",
  showLabel = true
}: TimeTrackerProps) => {
  return (
    <TimeTrackerProvider initialOpen={open} onOpenChange={onOpenChange}>
      <Dialog>
        <TimeTrackerButton className={className} position={position} showLabel={showLabel} />
        <DialogContent className="sm:max-w-[700px] md:max-w-[800px] max-h-[85vh] overflow-auto bg-white text-black">
          <TimeTrackerDialog />
        </DialogContent>
      </Dialog>
    </TimeTrackerProvider>
  );
};

export default TimeTracker;
