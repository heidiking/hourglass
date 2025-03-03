
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
  };
  
  const saveSettings = () => {
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
