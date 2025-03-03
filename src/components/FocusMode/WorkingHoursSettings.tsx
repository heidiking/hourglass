
import React from 'react';
import { Clock } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TimeTrackerSettings } from './types';

interface WorkingHoursSettingsProps {
  settings: TimeTrackerSettings;
  handleSettingChange: (key: keyof TimeTrackerSettings, value: any) => void;
}

const WorkingHoursSettings: React.FC<WorkingHoursSettingsProps> = ({
  settings,
  handleSettingChange
}) => {
  if (!settings.autoTrackEnabled) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-2 gap-4 mt-2 bg-black/20 p-3 rounded">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-white/70" />
          <Label htmlFor="start-time" className="text-white/80">Start Time</Label>
        </div>
        <Input 
          id="start-time" 
          type="time" 
          value={settings.startTime}
          onChange={(e) => handleSettingChange('startTime', e.target.value)}
          className="bg-black/30 border-gray-700 text-white"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-white/70" />
          <Label htmlFor="end-time" className="text-white/80">End Time</Label>
        </div>
        <Input 
          id="end-time" 
          type="time" 
          value={settings.endTime}
          onChange={(e) => handleSettingChange('endTime', e.target.value)}
          className="bg-black/30 border-gray-700 text-white"
        />
      </div>
    </div>
  );
};

export default WorkingHoursSettings;
