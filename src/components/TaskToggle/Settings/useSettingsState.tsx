
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { addCustomBackground } from '../../../utils/backgrounds';

export interface SettingsState {
  customMantra: string;
  customQuote: string;
  customQuoteAuthor: string;
  customImageUrl: string;
  customImageAuthor: string;
  customImageLocation: string;
}

export const useSettingsState = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showMantraArchive, setShowMantraArchive] = useState(false);
  const [showQuoteArchive, setShowQuoteArchive] = useState(false);
  const [showImageArchive, setShowImageArchive] = useState(false);
  
  // Load settings from localStorage
  const [settings, setSettings] = useState<SettingsState>(() => {
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      try {
        return JSON.parse(storedSettings);
      } catch (e) {
        console.error("Error parsing settings:", e);
        return {
          customMantra: "",
          customQuote: "",
          customQuoteAuthor: "",
          customImageUrl: "",
          customImageAuthor: "",
          customImageLocation: ""
        };
      }
    }
    return {
      customMantra: "",
      customQuote: "",
      customQuoteAuthor: "",
      customImageUrl: "",
      customImageAuthor: "",
      customImageLocation: ""
    };
  });

  const handleSettingChange = (key: keyof SettingsState, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const saveSettings = (onClose?: () => void) => {
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

      // Archive current image if it exists and is not empty
      if (settings.customImageUrl && settings.customImageUrl.trim() !== '') {
        const images = JSON.parse(localStorage.getItem('archivedImages') || '[]');
        
        // Check if image doesn't already exist
        if (!images.some((i: {url: string}) => i.url === settings.customImageUrl)) {
          const newImageId = Date.now();
          
          // Add to background utility
          addCustomBackground(
            settings.customImageUrl,
            settings.customImageAuthor,
            settings.customImageLocation,
            undefined,
            undefined,
            'landscape'
          );
          
          // Add to archive
          images.push({
            id: newImageId,
            url: settings.customImageUrl,
            author: settings.customImageAuthor || '',
            location: settings.customImageLocation || '',
            date: new Date().toLocaleDateString()
          });
          localStorage.setItem('archivedImages', JSON.stringify(images));
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

  return {
    activeTab,
    setActiveTab,
    showDocumentation,
    setShowDocumentation,
    showMantraArchive,
    setShowMantraArchive,
    showQuoteArchive,
    setShowQuoteArchive,
    showImageArchive,
    setShowImageArchive,
    settings,
    handleSettingChange,
    saveSettings
  };
};
