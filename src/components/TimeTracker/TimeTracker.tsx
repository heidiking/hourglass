
import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getCurrentActivity, getActivityHistory, clearActivityHistory } from '@/utils/timeTracking';
import { toast } from "sonner";
import CurrentActivitySection from './CurrentActivitySection';
import RecentDocumentsSection from './RecentDocumentsSection';
import { ActivitySession } from '@/utils/timeTracking/types';

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<ActivitySession | null>(null);
  const [activityHistory, setActivityHistory] = useState<ActivitySession[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  
  useEffect(() => {
    if (open !== undefined) {
      setDialogOpen(open);
    }
  }, [open]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setDialogOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  }, [onOpenChange]);
  
  useEffect(() => {
    const updateActivityData = () => {
      const current = getCurrentActivity();
      const history = getActivityHistory();
      
      setCurrentActivity(current);
      setActivityHistory(history);
      setIsTracking(Boolean(current));
    };
    
    updateActivityData();
    
    const interval = setInterval(updateActivityData, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClearHistory = () => {
    clearActivityHistory();
    setActivityHistory([]);
    toast.success("Document history has been cleared");
  };

  const positionStyles = {
    topLeft: "fixed top-4 left-4",
    topRight: "fixed top-4 right-4",
    bottomLeft: "fixed bottom-4 left-4",
    bottomRight: "fixed bottom-4 right-4",
    floating: ""
  };

  const documentActivities = activityHistory.filter(activity => 
    isDocumentActivity(activity.appName)
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className={`p-3 ${dialogOpen ? 'bg-black/60' : 'bg-black/30'} rounded-full hover:bg-black/50 transition-colors ${positionStyles[position]} ${className} flex items-center justify-center w-12 h-12`}
          aria-label="Time Tracker"
          data-testid="time-tracker-trigger"
        >
          <Clock size={20} className="text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white text-black border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg font-medium text-black">
            <Clock size={18} className="mr-2" />
            Document Time Tracker
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Track your time spent on documents and applications
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto px-1">
          <CurrentActivitySection currentActivity={currentActivity} />
          
          <RecentDocumentsSection documentActivities={documentActivities} />
        </div>
        <DialogFooter className="mt-4">
          <Button 
            onClick={handleClearHistory} 
            variant="outline"
            className="bg-white hover:bg-white/90 border-gray-300"
            aria-label="Clear history"
          >
            <Trash2 className="mr-2 text-black" size={16} />
            <span className="text-black">Clear Document History</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
         name.includes("keynote");
};

export default TimeTracker;
