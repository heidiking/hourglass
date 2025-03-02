
import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  startActivity, 
  endActivity, 
  setupAutoTracking 
} from "@/utils/timeTracking";
import { BlockedSite, TimeTrackerSettings, defaultSettings } from './types';
import FocusDialog from './FocusDialog';
import FocusSettings from './FocusSettings';
import FocusIndicator from './FocusIndicator';

const FocusBlocker = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);
  const [focusStartTime, setFocusStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
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

    // Clean up on unmount
    return () => {
      if (isActive) {
        endActivity();
      }
    };
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

  // Memoize handlers to prevent unnecessary re-renders
  const startFocusMode = useCallback(() => {
    const now = new Date();
    setFocusStartTime(now);
    setIsActive(true);
    localStorage.setItem('focusActive', 'true');
    localStorage.setItem('focusStartTime', now.toString());
    startActivity('Focus Mode');
    toast.success("Focus mode activated! Stay productive!");
    setOpen(false);
  }, []);

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
    setSettingsOpen(true);
  }, []);

  return (
    <>
      {/* Hidden trigger for the Focus dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button 
            id="focus-dialog-trigger" 
            className="hidden"
            aria-label="Focus Mode"
          />
        </DialogTrigger>
        
        <FocusDialog 
          isActive={isActive}
          elapsedTime={elapsedTime}
          blockedSites={blockedSites}
          setBlockedSites={setBlockedSites}
          startFocusMode={startFocusMode}
          endFocusMode={endFocusMode}
          openSettings={openSettings}
        />
      </Dialog>

      {/* Settings Dialog */}
      <FocusSettings 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        setSettings={setSettings}
      />

      {/* Floating indicator when focus mode is active */}
      <FocusIndicator isActive={isActive} elapsedTime={elapsedTime} />
    </>
  );
};

export default FocusBlocker;
