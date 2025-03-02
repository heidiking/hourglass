
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
      setBlockedSites(JSON.parse(storedSites));
    }

    // Load time tracker settings
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      // Initialize with default settings if not found
      localStorage.setItem('timeTrackerSettings', JSON.stringify(defaultSettings));
    }

    // Check if focus mode was active
    const focusStatus = localStorage.getItem('focusActive');
    const startTimeStr = localStorage.getItem('focusStartTime');
    
    if (focusStatus === 'true' && startTimeStr) {
      const startTime = new Date(startTimeStr);
      setFocusStartTime(startTime);
      setIsActive(true);
      startActivity('Focus Mode');
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
    const now = new Date();
    setFocusStartTime(now);
    setIsActive(true);
    localStorage.setItem('focusActive', 'true');
    localStorage.setItem('focusStartTime', now.toString());
    startActivity('Focus Mode');
    toast.success("Focus mode activated!");
    setFocusModeOpen(false);
  }, [setFocusModeOpen]);

  const endFocusMode = useCallback(() => {
    setIsActive(false);
    setFocusStartTime(null);
    setElapsedTime(0);
    localStorage.removeItem('focusActive');
    localStorage.removeItem('focusStartTime');
    endActivity();
    toast.success("Focus session ended!");
  }, []);

  const openSettings = useCallback(() => {
    // This would open settings dialog if needed
    console.log("Opening focus mode settings");
  }, []);

  return focusModeOpen ? (
    <FocusDialog 
      isActive={isActive}
      elapsedTime={elapsedTime}
      blockedSites={blockedSites}
      setBlockedSites={setBlockedSites}
      startFocusMode={startFocusMode}
      endFocusMode={endFocusMode}
      openSettings={openSettings}
    />
  ) : null;
};

export default FocusModeManager;
