
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import FocusDialog from '../FocusMode/FocusDialog';
import { BlockedSite, TimeTrackerSettings, defaultSettings } from '../FocusMode/types';
import { startActivity, endActivity } from "@/utils/timeTracking";

interface FocusModeManagerProps {
  focusModeOpen: boolean;
  setFocusModeOpen: (open: boolean) => void;
}

const FocusModeManager: React.FC<FocusModeManagerProps> = ({ 
  focusModeOpen, 
  setFocusModeOpen 
}) => {
  // State for focus mode functionality
  const [isActive, setIsActive] = useState<boolean>(false);
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);
  const [focusStartTime, setFocusStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [settings, setSettings] = useState<TimeTrackerSettings>(defaultSettings);

  // Load saved state on component mount
  useEffect(() => {
    // Load blocked sites from local storage
    const storedSites = localStorage.getItem('blockedSites');
    if (storedSites) {
      try {
        setBlockedSites(JSON.parse(storedSites));
      } catch (error) {
        console.error('Error parsing blocked sites:', error);
        setBlockedSites([]);
      }
    }

    // Load time tracker settings
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (error) {
        console.error('Error parsing time tracker settings:', error);
        setSettings(defaultSettings);
      }
    } else {
      // Initialize with default settings if not found
      localStorage.setItem('timeTrackerSettings', JSON.stringify(defaultSettings));
    }

    // Check if focus mode was active
    const focusStatus = localStorage.getItem('focusActive');
    const startTimeStr = localStorage.getItem('focusStartTime');
    
    if (focusStatus === 'true' && startTimeStr) {
      try {
        const startTime = new Date(startTimeStr);
        setFocusStartTime(startTime);
        setIsActive(true);
        
        // Get current document or app name
        const documentTitle = document.title || 'Focus Mode';
        startActivity(documentTitle);
        console.log('Resumed focus session from localStorage');
      } catch (error) {
        console.error('Error resuming focus session:', error);
        // Clear invalid focus state
        localStorage.removeItem('focusActive');
        localStorage.removeItem('focusStartTime');
      }
    }
  }, []);

  // Update elapsed time when focus mode is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && focusStartTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - focusStartTime.getTime();
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, focusStartTime]);

  // Focus mode functions
  const startFocusMode = useCallback(() => {
    try {
      const now = new Date();
      setFocusStartTime(now);
      setIsActive(true);
      localStorage.setItem('focusActive', 'true');
      localStorage.setItem('focusStartTime', now.toString());
      
      // Get current document or app name
      const documentTitle = document.title || 'Focus Mode';
      startActivity(documentTitle);
      console.log('Focus mode activated with activity:', documentTitle);
      
      toast.success("Focus mode activated!");
      setFocusModeOpen(false);
    } catch (error) {
      console.error('Error starting focus mode:', error);
      toast.error("Failed to start focus mode");
    }
  }, [setFocusModeOpen]);

  const endFocusMode = useCallback(() => {
    try {
      setIsActive(false);
      setFocusStartTime(null);
      setElapsedTime(0);
      localStorage.removeItem('focusActive');
      localStorage.removeItem('focusStartTime');
      endActivity();
      console.log('Focus session ended');
      toast.success("Focus session ended!");
    } catch (error) {
      console.error('Error ending focus mode:', error);
      toast.error("Failed to end focus session");
    }
  }, []);

  const openSettings = useCallback(() => {
    // Now integrated directly in the focus dialog
  }, []);

  return (
    <>
      {focusModeOpen && (
        <FocusDialog 
          isActive={isActive}
          elapsedTime={elapsedTime}
          blockedSites={blockedSites}
          setBlockedSites={setBlockedSites}
          startFocusMode={startFocusMode}
          endFocusMode={endFocusMode}
          openSettings={openSettings}
        />
      )}
    </>
  );
};

export default FocusModeManager;
