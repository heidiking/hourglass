
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
  
  // Sync with external open state
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
  
  // Update activity data using a safer approach that avoids cyclic references
  useEffect(() => {
    let isMounted = true;
    
    // Update activity data
    const updateActivityData = () => {
      try {
        const current = getCurrentActivity();
        const history = getActivityHistory();
        
        if (!isMounted) return;
        
        // Use a deep comparison approach rather than JSON.stringify which can fail with cyclic objects
        if (current !== currentActivity) {
          setCurrentActivity(current);
          setIsTracking(Boolean(current));
        }
        
        // Safe update of activity history
        if (history?.length !== activityHistory?.length) {
          setActivityHistory(history || []);
        }
      } catch (error) {
        console.error('Error updating activity data:', error);
      }
    };
    
    // Initial fetch
    updateActivityData();
    
    // Use a reasonable interval for updates
    const interval = setInterval(updateActivityData, 3000);
    
    // Cleanup on unmount
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleClearHistory = useCallback(() => {
    clearActivityHistory();
    setActivityHistory([]);
    toast.success("Document history has been cleared");
  }, []);

  // Safely compute filtered document activities
  const documentActivities = useMemo(() => {
    if (!activityHistory || !Array.isArray(activityHistory)) {
      return [];
    }
    
    return activityHistory.filter(activity => 
      activity && activity.appName && isDocumentActivity(activity.appName)
    );
  }, [activityHistory]);

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
