
import React, { useState } from 'react';
import { Settings, Shield, Clock, Save, Bell } from 'lucide-react';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ActiveFocusSession from './ActiveFocusSession';
import BlockedSitesList from './BlockedSitesList';
import { BlockedSite } from './types';
import QuickAddSites from './QuickAddSites';
import CurrentlyBlockedSites from './CurrentlyBlockedSites';

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
  const [quickAddExpanded, setQuickAddExpanded] = useState(false);
  
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
    localStorage.setItem('timeTrackerSettings', JSON.stringify(settings));
    // Show saved confirmation
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
            <div className="space-y-3 border-b pb-4">
              <h3 className="text-md font-medium text-black">Focus Time Tracking</h3>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="track-dormant" 
                  checked={settings.trackDormantActivity}
                  onCheckedChange={(checked) => handleSettingChange('trackDormantActivity', checked)}
                />
                <Label htmlFor="track-dormant" className="text-black">Track inactive periods</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-track" 
                  checked={settings.autoTrackEnabled}
                  onCheckedChange={(checked) => handleSettingChange('autoTrackEnabled', checked)}
                />
                <Label htmlFor="auto-track" className="text-black">Auto-track time within working hours</Label>
              </div>
              
              {settings.autoTrackEnabled && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-black">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={settings.startTime}
                      onChange={(e) => handleSettingChange('startTime', e.target.value)}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-black">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={settings.endTime}
                      onChange={(e) => handleSettingChange('endTime', e.target.value)}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>
                  {!settings.hasValidTimes && (
                    <p className="text-red-500 text-sm col-span-2">Start time must be before end time</p>
                  )}
                </div>
              )}

              {/* Moved Focus Notifications Section here */}
              <div className="flex items-center space-x-2 mt-4">
                <Switch 
                  id="focus-notifications" 
                  checked={settings.focusNotifications !== false}
                  onCheckedChange={(checked) => handleSettingChange('focusNotifications', checked)}
                />
                <Label htmlFor="focus-notifications" className="text-black">Focus session reminders</Label>
              </div>
              
              <div className="bg-gray-50 p-3 rounded text-sm text-black/70 mt-2">
                <div className="flex items-start gap-2">
                  <Bell size={16} className="mt-0.5 flex-shrink-0 text-black" />
                  <p>Focus reminders will notify you when you've been focused for significant periods and suggest short breaks.</p>
                </div>
              </div>

              <Button 
                onClick={saveSettings}
                className="mt-2 bg-white border border-gray-200 text-black hover:bg-white/90"
              >
                <Save size={18} className="mr-2 text-black" />
                <span className="text-black">Save Settings</span>
              </Button>
            </div>

            {/* Website Blocking Section */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-black">Block Distracting Websites</h3>
              <BlockedSitesList blockedSites={blockedSites} setBlockedSites={setBlockedSites} />
              <QuickAddSites blockedSites={blockedSites} setBlockedSites={setBlockedSites} />
              <CurrentlyBlockedSites 
                blockedSites={blockedSites} 
                setBlockedSites={setBlockedSites} 
                quickAddExpanded={quickAddExpanded}
              />
            </div>
            
            <DialogFooter className="mt-4 pt-2 border-t">
              <Button 
                onClick={startFocusMode} 
                className="bg-white hover:bg-white/90 w-full"
                disabled={blockedSites.length === 0}
                aria-label="Start focus mode"
              >
                <Shield className="mr-2 text-black" size={18} />
                <span className="text-black">Start Focus Mode</span>
              </Button>
            </DialogFooter>
          </>
        )}
      </div>
    </DialogContent>
  );
};

export default FocusDialog;
