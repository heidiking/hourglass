
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ActiveFocusSession from './ActiveFocusSession';
import { BlockedSite } from './types';
import { toast } from "sonner";
import FocusTimeSettings from './FocusTimeSettings';
import WebsiteBlockingSection from './WebsiteBlockingSection';

interface FocusDialogProps {
  isActive: boolean;
  elapsedTime: number;
  blockedSites: BlockedSite[];
  setBlockedSites: React.Dispatch<React.SetStateAction<BlockedSite[]>>;
  startFocusMode: () => void;
  endFocusMode: () => void;
  openSettings: () => void;
}

const FocusDialog = ({
  isActive,
  elapsedTime,
  blockedSites,
  setBlockedSites,
  startFocusMode,
  endFocusMode,
  openSettings
}: FocusDialogProps) => {
  // Load focus settings from localStorage
  const [settings, setSettings] = useState(() => {
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      try {
        return JSON.parse(storedSettings);
      } catch (e) {
        console.error("Error parsing settings:", e);
        return {
          trackDormantActivity: false,
          autoTrackEnabled: false,
          startTime: "09:00",
          endTime: "17:00",
          hasValidTimes: true,
          focusNotifications: true
        };
      }
    }
    return {
      trackDormantActivity: false,
      autoTrackEnabled: false,
      startTime: "09:00",
      endTime: "17:00",
      hasValidTimes: true,
      focusNotifications: true
    };
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // When time settings change, validate them
    if (key === 'startTime' || key === 'endTime') {
      validateTimeSettings(key === 'startTime' ? value : settings.startTime, 
                        key === 'endTime' ? value : settings.endTime);
    }
  };
  
  const validateTimeSettings = (startTime: string, endTime: string) => {
    // Convert times to minutes since midnight for comparison
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    setSettings(prev => ({
      ...prev,
      hasValidTimes: startTotalMinutes < endTotalMinutes
    }));
  };
  
  const saveSettings = () => {
    try {
      localStorage.setItem('timeTrackerSettings', JSON.stringify(settings));
      toast.success("Focus settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    }
  };
  
  return (
    <DialogContent className="sm:max-w-md bg-white text-black border-gray-200 max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-light mb-2 text-black">Focus Settings</DialogTitle>
        <DialogDescription className="text-black/70">
          {isActive 
            ? "You're currently in focus mode. Stay concentrated!" 
            : "Configure tracking and block distracting websites."}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        {isActive ? (
          <ActiveFocusSession elapsedTime={elapsedTime} endFocusMode={endFocusMode} />
        ) : (
          <>
            {/* Time Tracking Settings */}
            <FocusTimeSettings 
              settings={settings}
              handleSettingChange={handleSettingChange}
            />

            <Button 
              onClick={saveSettings}
              className="mt-2 bg-white border border-gray-200 text-black hover:bg-white/90"
            >
              <Save size={18} className="mr-2 text-black" />
              <span className="text-black">Save Settings</span>
            </Button>

            {/* Website Blocking Section */}
            <WebsiteBlockingSection
              blockedSites={blockedSites}
              setBlockedSites={setBlockedSites}
              startFocusMode={startFocusMode}
            />
          </>
        )}
      </div>
    </DialogContent>
  );
};

export default FocusDialog;
