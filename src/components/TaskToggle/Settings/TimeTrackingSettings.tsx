
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TimeSettingsType {
  trackDormantActivity: boolean;
  autoTrackEnabled: boolean;
  startTime: string;
  endTime: string;
  [key: string]: any;
}

interface TimeTrackingSettingsProps {
  settings: TimeSettingsType;
  onSettingChange: (key: string, value: any) => void;
  hasValidTimes: boolean;
}

const TimeTrackingSettings: React.FC<TimeTrackingSettingsProps> = ({ 
  settings, 
  onSettingChange,
  hasValidTimes
}) => {
  return (
    <div className="space-y-3 border-b pb-4">
      <h3 className="text-md font-medium text-black">Time Tracking</h3>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="track-dormant" 
          checked={settings.trackDormantActivity}
          onCheckedChange={(checked) => onSettingChange('trackDormantActivity', checked)}
        />
        <Label htmlFor="track-dormant" className="text-black">Track inactive periods</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="auto-track" 
          checked={settings.autoTrackEnabled}
          onCheckedChange={(checked) => onSettingChange('autoTrackEnabled', checked)}
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
              onChange={(e) => onSettingChange('startTime', e.target.value)}
              className="bg-white border-gray-300 text-black"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-time" className="text-black">End Time</Label>
            <Input
              id="end-time"
              type="time"
              value={settings.endTime}
              onChange={(e) => onSettingChange('endTime', e.target.value)}
              className="bg-white border-gray-300 text-black"
            />
          </div>
          {!hasValidTimes && (
            <p className="text-red-500 text-sm col-span-2">Start time must be before end time</p>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(TimeTrackingSettings);
