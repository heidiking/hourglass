
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { getCurrentActivity, getActivityHistory, clearActivityHistory } from '@/utils/timeTracking';
import { ActivitySession } from '@/utils/timeTracking/types';
import { toast } from "sonner";
import { isDocumentActivity } from './TimeTracker';

interface TimeTrackerContextType {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  currentActivity: ActivitySession | null;
  activityHistory: ActivitySession[];
  documentActivities: ActivitySession[];
  isTracking: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleOpenChange: (open: boolean) => void;
  handleClearHistory: () => void;
}

const TimeTrackerContext = createContext<TimeTrackerContextType | undefined>(undefined);

export const TimeTrackerProvider: React.FC<{
  children: React.ReactNode;
  initialOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = ({ children, initialOpen = false, onOpenChange }) => {
  const [dialogOpen, setDialogOpen] = useState(initialOpen);
  const [currentActivity, setCurrentActivity] = useState<ActivitySession | null>(null);
  const [activityHistory, setActivityHistory] = useState<ActivitySession[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [activeTab, setActiveTab] = useState("documents");
  
  useEffect(() => {
    if (initialOpen !== undefined) {
      setDialogOpen(initialOpen);
    }
  }, [initialOpen]);

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

  const documentActivities = activityHistory.filter(activity => 
    isDocumentActivity(activity.appName)
  );

  return (
    <TimeTrackerContext.Provider value={{
      dialogOpen,
      setDialogOpen,
      currentActivity,
      activityHistory,
      documentActivities,
      isTracking,
      activeTab,
      setActiveTab,
      handleOpenChange,
      handleClearHistory
    }}>
      {children}
    </TimeTrackerContext.Provider>
  );
};

export const useTimeTracker = (): TimeTrackerContextType => {
  const context = useContext(TimeTrackerContext);
  if (context === undefined) {
    throw new Error('useTimeTracker must be used within a TimeTrackerProvider');
  }
  return context;
};
