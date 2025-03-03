
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";

interface FocusTimeSettingsProps {
  settings: {
    trackDormantActivity: boolean;
    autoTrackEnabled: boolean;
    startTime: string;
    endTime: string;
    focusNotifications?: boolean;
    hasValidTimes: boolean;
  };
  handleSettingChange: (key: string, value: any) => void;
}

const FocusTimeSettings: React.FC<FocusTimeSettingsProps> = ({ 
  settings, 
  handleSettingChange 
}) => {
  return (
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

      {/* Focus Notifications Section */}
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
    </div>
  );
};

export default FocusTimeSettings;
