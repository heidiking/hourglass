
import React from 'react';
import { Settings } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { TimeTrackerSettings } from './types';
import { setupAutoTracking } from '@/utils/timeTracking';

interface FocusSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: TimeTrackerSettings;
  setSettings: React.Dispatch<React.SetStateAction<TimeTrackerSettings>>;
}

const FocusSettings = ({ open, onOpenChange, settings, setSettings }: FocusSettingsProps) => {
  const updateSettings = (newSettings: Partial<TimeTrackerSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('timeTrackerSettings', JSON.stringify(updatedSettings));
    setupAutoTracking(); // Apply the new settings
    toast.success("Settings updated!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/70 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-2">Time Tracker Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="track-dormant" className="text-sm">
              Track dormant activity
              <p className="text-xs text-white/60">
                When enabled, continues tracking even when you're not actively using the document
              </p>
            </Label>
            <Switch 
              id="track-dormant"
              checked={settings.trackDormantActivity}
              onCheckedChange={(checked) => updateSettings({ trackDormantActivity: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-track" className="text-sm">
              Auto-track activity
              <p className="text-xs text-white/60">
                Automatically track document activity during set hours
              </p>
            </Label>
            <Switch 
              id="auto-track"
              checked={settings.autoTrackEnabled}
              onCheckedChange={(checked) => updateSettings({ autoTrackEnabled: checked })}
            />
          </div>
          
          {settings.autoTrackEnabled && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <Label htmlFor="start-time" className="text-sm mb-1 block">
                  Start time
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={settings.startTime}
                  onChange={(e) => updateSettings({ startTime: e.target.value })}
                  className="bg-black/30 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="end-time" className="text-sm mb-1 block">
                  End time
                </Label>
                <Input
                  id="end-time"
                  type="time"
                  value={settings.endTime}
                  onChange={(e) => updateSettings({ endTime: e.target.value })}
                  className="bg-black/30 border-gray-700 text-white"
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FocusSettings;
