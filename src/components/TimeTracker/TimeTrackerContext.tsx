
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
    setIsLoading(true);
    
    // Update activity data
    const updateActivityData = () => {
      try {
        if (!isMounted) return;
        
        // Get current activity safely
        let current = null;
        try {
          current = getCurrentActivity();
        } catch (error) {
          console.error('Error getting current activity:', error);
        }
        
        // Get history safely
        let history: ActivitySession[] = [];
        try {
          history = getActivityHistory() || [];
        } catch (error) {
          console.error('Error getting activity history:', error);
          // Continue with empty history rather than failing
        }
        
        if (!isMounted) return;
        
        // Safe updates that avoid reference comparison issues
        setCurrentActivity(prevActivity => {
          // Only update if different to avoid unnecessary re-renders
          if (!prevActivity && !current) return prevActivity;
          if (!prevActivity || !current) return current;
          if (prevActivity.id !== current.id) return current;
          if (prevActivity.duration !== current.duration) return current;
          return prevActivity;
        });
        
        setIsTracking(Boolean(current));
        
        // Safe update of activity history - only update if length changed
        // or if first/last items differ to avoid unnecessary re-renders
        setActivityHistory(prevHistory => {
          if (!prevHistory || !prevHistory.length) return history;
          if (prevHistory.length !== history.length) return history;
          if (prevHistory[0]?.id !== history[0]?.id) return history;
          if (prevHistory[prevHistory.length-1]?.id !== history[history.length-1]?.id) return history;
          return prevHistory;
        });
        
        if (isMounted) {
          setIsLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error('Error updating activity data:', error);
        if (isMounted) {
          setError('Failed to update activity data');
          setIsLoading(false);
        }
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
    try {
      clearActivityHistory();
      setActivityHistory([]);
      toast.success("Document history has been cleared");
    } catch (error) {
      console.error('Error clearing activity history:', error);
      toast.error("Failed to clear document history");
    }
  }, []);

  // Safely compute filtered document activities
  const documentActivities = useMemo(() => {
    if (!activityHistory || !Array.isArray(activityHistory)) {
      return [];
    }
    
    try {
      return activityHistory.filter(activity => 
        activity && activity.appName && isDocumentActivity(activity.appName)
      );
    } catch (error) {
      console.error('Error filtering document activities:', error);
      return [];
    }
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

  // Add error handling in the rendered content
  if (error) {
    console.error('TimeTracker error:', error);
  }

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
