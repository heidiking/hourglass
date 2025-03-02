
import React, { useEffect, useState } from 'react';
import { Clock, FileText } from 'lucide-react';
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { detectCurrentApp, getCurrentActivity, formatFocusTime, getActivityHistory } from '@/utils/timeTracking';

interface TimeTrackerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TimeTracker = ({ open, onOpenChange }: TimeTrackerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  
  // Sync the local state with the prop
  useEffect(() => {
    if (open !== undefined) {
      setDialogOpen(open);
    }
  }, [open]);

  // Notify parent of changes if callback provided
  const handleOpenChange = (newOpen: boolean) => {
    setDialogOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };
  
  useEffect(() => {
    // Update the UI every second to show current activity
    const interval = setInterval(() => {
      const current = getCurrentActivity();
      setCurrentActivity(current);
      setActivityHistory(getActivityHistory());
      setIsTracking(Boolean(current));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getAppIcon = (appName: string) => {
    // Return appropriate icon based on app name
    if (appName.includes("Word") || appName.includes("Doc") || appName.includes(".doc")) {
      return <FileText size={16} className="mr-2 text-blue-500" />;
    } else if (appName.includes("Excel") || appName.includes("Sheet") || appName.includes(".xls")) {
      return <FileText size={16} className="mr-2 text-green-500" />;
    } else if (appName.includes("PowerPoint") || appName.includes("Presentation") || appName.includes(".ppt")) {
      return <FileText size={16} className="mr-2 text-orange-500" />;
    } else if (appName.includes("PDF") || appName.includes(".pdf")) {
      return <FileText size={16} className="mr-2 text-red-500" />;
    }
    return <FileText size={16} className="mr-2" />;
  };
  
  // Filter only document-related activities
  const documentActivities = activityHistory.filter(activity => {
    const name = activity.appName.toLowerCase();
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
           name.includes(".pdf");
  });

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button
            className="hidden" // Hidden as we're controlling it from TaskToggle
            aria-label="Time Tracker"
          >
            <Clock size={20} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg font-medium">
              <Clock size={18} className="mr-2" />
              Document Time Tracker
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Track your time spent on documents and applications
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <Clock size={16} className="mr-2" />
                Current Activity
              </h3>
              {currentActivity ? (
                <div className="flex items-center p-2 bg-black/10 rounded mt-2">
                  {getAppIcon(currentActivity.appName)}
                  <span>{currentActivity.appName}</span>
                  <span className="ml-auto text-sm">
                    {new Date(currentActivity.startTime).toLocaleTimeString()}
                  </span>
                </div>
              ) : (
                <div className="p-2 bg-black/10 rounded mt-2 text-gray-500">
                  No active document tracking
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FileText size={16} className="mr-2" />
                Recent Documents
              </h3>
              {documentActivities.length > 0 ? (
                <div className="space-y-2">
                  {documentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center p-2 bg-black/10 rounded">
                      {getAppIcon(activity.appName)}
                      <div className="flex-1">
                        <div>{activity.appName}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(activity.startTime).toLocaleString()} • {formatFocusTime(activity.duration)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2 bg-black/10 rounded text-gray-500">
                  No document activity recorded yet
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimeTracker;
