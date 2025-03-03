
import React, { createContext, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { getCurrentActivity, getActivityHistory, clearActivityHistory } from '@/utils/timeTracking';
import { ActivitySession } from '@/utils/timeTracking/types';
import { toast } from "sonner";
import { isDocumentActivity } from './DocumentActivityDetector';

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
    // Optimize activity data updates to reduce unnecessary re-renders
    const updateActivityData = () => {
      const current = getCurrentActivity();
      const history = getActivityHistory();
      
      // Only update state if data has actually changed
      if (JSON.stringify(current) !== JSON.stringify(currentActivity)) {
        setCurrentActivity(current);
        setIsTracking(Boolean(current));
      }
      
      if (JSON.stringify(history) !== JSON.stringify(activityHistory)) {
        setActivityHistory(history);
      }
    };
    
    updateActivityData();
    
    const interval = setInterval(updateActivityData, 1000);
    return () => clearInterval(interval);
  }, [currentActivity, activityHistory]);

  const handleClearHistory = useCallback(() => {
    clearActivityHistory();
    setActivityHistory([]);
    toast.success("Document history has been cleared");
  }, []);

  // Memoize filtered document activities
  const documentActivities = useMemo(() => 
    activityHistory.filter(activity => isDocumentActivity(activity.appName)),
    [activityHistory]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
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
  }), [
    dialogOpen, 
    currentActivity, 
    activityHistory, 
    documentActivities,
    isTracking, 
    activeTab, 
    handleOpenChange, 
    handleClearHistory
  ]);

  return (
    <TimeTrackerContext.Provider value={contextValue}>
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
