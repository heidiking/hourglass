
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SettingsContent from './SettingsContent';
import { TimeTrackerSettings, defaultSettings, FocusSettingsProps } from './types';

const FocusSettings: React.FC<FocusSettingsProps> = ({ 
  closeSettings, 
  open, 
  onOpenChange,
  settings: externalSettings,
  setSettings: setExternalSettings
}) => {
  const [internalSettings, setInternalSettings] = useState<TimeTrackerSettings>(defaultSettings);
  
  const currentSettings = externalSettings || internalSettings;
  const setCurrentSettings = setExternalSettings || setInternalSettings;
  
  useEffect(() => {
    if (!externalSettings) {
      const storedSettings = localStorage.getItem('timeTrackerSettings');
      if (storedSettings) {
        try {
          setInternalSettings(JSON.parse(storedSettings));
        } catch (e) {
          console.error("Error parsing settings:", e);
          setInternalSettings(defaultSettings);
        }
      }
    }
  }, [externalSettings]);
  
  const handleSettingChange = (key: keyof TimeTrackerSettings, value: any) => {
    setCurrentSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // When time settings change, validate them
    if (key === 'startTime' || key === 'endTime') {
      validateTimeSettings(key === 'startTime' ? value : currentSettings.startTime, 
                          key === 'endTime' ? value : currentSettings.endTime,
                          setCurrentSettings);
    }
  };
  
  const validateTimeSettings = (startTime: string, endTime: string, setSettings: React.Dispatch<React.SetStateAction<TimeTrackerSettings>>) => {
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
    // Prevent saving if times are invalid
    if (currentSettings.startTime && currentSettings.endTime) {
      const [startHours, startMinutes] = currentSettings.startTime.split(':').map(Number);
      const [endHours, endMinutes] = currentSettings.endTime.split(':').map(Number);
      
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      
      if (startTotalMinutes >= endTotalMinutes) {
        toast.error("Start time must be before end time");
        return;
      }
    }
    
    localStorage.setItem('timeTrackerSettings', JSON.stringify(currentSettings));
    toast.success("Settings saved successfully");
    
    if (onOpenChange) {
      onOpenChange(false);
    } else if (closeSettings) {
      closeSettings();
    }
  };
  
  if (open !== undefined && onOpenChange) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-black/95 border-gray-800 text-white">
          <SettingsContent 
            settings={currentSettings} 
            handleSettingChange={handleSettingChange} 
            saveSettings={saveSettings} 
            closeSettings={() => onOpenChange(false)} 
          />
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <SettingsContent 
      settings={currentSettings} 
      handleSettingChange={handleSettingChange} 
      saveSettings={saveSettings} 
      closeSettings={closeSettings || (() => {})} 
    />
  );
};

export default FocusSettings;
