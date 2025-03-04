
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Documentation from '../Documentation';
import { toast } from "sonner";
import MantraArchive from './Settings/MantraArchive';
import QuoteArchive from './Settings/QuoteArchive';
import ImageArchive from './Settings/ImageArchive';
import SettingsHeader from './Settings/SettingsHeader';
import SettingsContent from './Settings/SettingsContent';
import { addCustomBackground } from '../../utils/backgrounds';

interface SettingsDialogProps {
  onClose?: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showMantraArchive, setShowMantraArchive] = useState(false);
  const [showQuoteArchive, setShowQuoteArchive] = useState(false);
  const [showImageArchive, setShowImageArchive] = useState(false);
  
  // Load settings from localStorage
  const [settings, setSettings] = useState(() => {
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

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
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
  
  if (showImageArchive) {
    return (
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-0 right-0 z-20 m-4 text-black bg-white hover:bg-white/90"
          onClick={() => setShowImageArchive(false)}
        >
          <X className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">Back to Settings</span>
        </Button>
        <ImageArchive />
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
        onViewImageArchive={() => setShowImageArchive(true)}
      />
    </div>
  );
};

export default SettingsDialog;
