
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Documentation from '../Documentation';
import { toast } from "sonner";
import MantraArchive from './Settings/MantraArchive';
import QuoteArchive from './Settings/QuoteArchive';
import SettingsHeader from './Settings/SettingsHeader';
import SettingsContent from './Settings/SettingsContent';

interface SettingsDialogProps {
  onClose?: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showMantraArchive, setShowMantraArchive] = useState(false);
  const [showQuoteArchive, setShowQuoteArchive] = useState(false);
  
  // Load settings from localStorage
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
          customMantra: "",
          customQuote: "",
          customQuoteAuthor: ""
        };
      }
    }
    return {
      trackDormantActivity: false,
      autoTrackEnabled: false,
      startTime: "09:00",
      endTime: "17:00",
      hasValidTimes: true,
      customMantra: "",
      customQuote: "",
      customQuoteAuthor: ""
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
      // Archive current mantra if it exists and is not empty
      if (settings.customMantra && settings.customMantra.trim() !== '') {
        const mantras = JSON.parse(localStorage.getItem('archivedMantras') || '[]');
        // Check if mantra doesn't already exist
        if (!mantras.some((m: {text: string}) => m.text === settings.customMantra)) {
          mantras.push({
            text: settings.customMantra,
            date: new Date().toLocaleDateString()
          });
          localStorage.setItem('archivedMantras', JSON.stringify(mantras));
        }
      }

      // Archive current quote if it exists and is not empty
      if (settings.customQuote && settings.customQuote.trim() !== '') {
        const quotes = JSON.parse(localStorage.getItem('archivedQuotes') || '[]');
        // Check if quote doesn't already exist
        if (!quotes.some((q: {text: string}) => q.text === settings.customQuote)) {
          quotes.push({
            text: settings.customQuote,
            author: settings.customQuoteAuthor || '',
            date: new Date().toLocaleDateString()
          });
          localStorage.setItem('archivedQuotes', JSON.stringify(quotes));
        }
      }

      // Save settings
      localStorage.setItem('timeTrackerSettings', JSON.stringify(settings));
      toast.success("Settings saved successfully");
      
      // Close the dialog after saving if onClose is provided
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    }
  };

  if (showMantraArchive) {
    return (
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-0 right-0 z-20 m-4 text-black bg-white hover:bg-white/90"
          onClick={() => setShowMantraArchive(false)}
        >
          <X className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">Back to Settings</span>
        </Button>
        <MantraArchive />
      </div>
    );
  }

  if (showQuoteArchive) {
    return (
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-0 right-0 z-20 m-4 text-black bg-white hover:bg-white/90"
          onClick={() => setShowQuoteArchive(false)}
        >
          <X className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">Back to Settings</span>
        </Button>
        <QuoteArchive />
      </div>
    );
  }
  
  if (showDocumentation) {
    return (
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-0 right-0 z-20 m-4 text-black bg-white hover:bg-white/90"
          onClick={() => setShowDocumentation(false)}
        >
          <X className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">Back to Settings</span>
        </Button>
        <Documentation />
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <SettingsHeader 
        onShowDocumentation={() => setShowDocumentation(true)}
        onSaveSettings={saveSettings}
      />
      
      <SettingsContent 
        activeTab={activeTab}
        settings={settings}
        handleSettingChange={handleSettingChange}
        onViewMantraArchive={() => setShowMantraArchive(true)}
        onViewQuoteArchive={() => setShowQuoteArchive(true)}
      />
    </div>
  );
};

export default SettingsDialog;
