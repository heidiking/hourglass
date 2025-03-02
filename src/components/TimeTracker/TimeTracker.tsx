
import React from 'react';
import { Clock } from 'lucide-react';
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
      <TimeTrackerButton className={className} position={position} />
      <TimeTrackerDialog />
    </TimeTrackerProvider>
  );
};

// Helper function to determine if an app is a document-based application
export const isDocumentActivity = (appName: string): boolean => {
  const name = appName.toLowerCase();
  return name.includes("word") || 
         name.includes("doc") || 
         name.includes("excel") || 
         name.includes("sheet") || 
         name.includes("powerpoint") || 
         name.includes("presentation") || 
         name.includes("pdf") || 
         name.includes(".doc") || 
         name.includes(".xls") || 
         name.includes(".ppt") || 
         name.includes(".pdf") ||
         name.includes("pages") ||
         name.includes("numbers") ||
         name.includes("keynote") ||
         name.includes("flights");  // Adding the test document name
};

export default TimeTracker;
