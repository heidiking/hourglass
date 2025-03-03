
import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
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
  const [timeError, setTimeError] = useState<string | null>(null);
  
  // Validate times whenever they change
  useEffect(() => {
    validateTimes(settings.startTime, settings.endTime);
  }, [settings.startTime, settings.endTime]);
  
  const validateTimes = (startTime: string, endTime: string) => {
    // Convert times to minutes since midnight for comparison
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    if (startTotalMinutes >= endTotalMinutes) {
      setTimeError('Start time must be before end time');
    } else {
      setTimeError(null);
    }
  };
  
  const handleTimeChange = (key: 'startTime' | 'endTime', value: string) => {
    handleSettingChange(key, value);
  };
  
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
          onChange={(e) => handleTimeChange('startTime', e.target.value)}
          className={`bg-black/30 border-gray-700 text-white ${timeError ? 'border-red-500' : ''}`}
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
          onChange={(e) => handleTimeChange('endTime', e.target.value)}
          className={`bg-black/30 border-gray-700 text-white ${timeError ? 'border-red-500' : ''}`}
        />
      </div>
      
      {timeError && (
        <div className="col-span-2 flex items-center gap-2 text-red-400 text-sm mt-1">
          <AlertCircle size={16} className="text-red-400" />
          <span>{timeError}</span>
        </div>
      )}
    </div>
  );
};

export default WorkingHoursSettings;
