
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextQuote, Save } from "lucide-react";
import Documentation from '../Documentation';

interface SettingsDialogProps {
  onClose?: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showDocumentation, setShowDocumentation] = useState(false);
  
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
          customQuote: ""
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
      customQuote: ""
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
    localStorage.setItem('timeTrackerSettings', JSON.stringify(settings));
    // Close the dialog after saving
    if (onClose) {
      onClose();
    }
  };
  
  if (showDocumentation) {
    return (
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-0 right-0 z-10 m-4 text-black bg-white hover:bg-white/90"
          onClick={() => setShowDocumentation(false)}
        >
          <span className="text-black">Back to Settings</span>
        </Button>
        <Documentation />
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <DialogHeader className="flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sticky top-0 z-10 bg-white pb-4">
        <DialogTitle className="text-lg text-black">Settings</DialogTitle>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-black bg-white hover:bg-white/90 mr-2"
            onClick={() => setShowDocumentation(true)}
          >
            <Info className="mr-2 h-4 w-4 text-black" />
            <span className="text-black">View Documentation</span>
          </Button>
          {/* Removed the duplicate DialogClose here */}
        </div>
      </DialogHeader>
      
      <div className="max-h-[70vh] overflow-y-auto pr-2 pb-4">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="settings" className="space-y-6">
            {/* Custom Mantra Section */}
            <div className="space-y-3 border-b pb-4">
              <h3 className="text-md font-medium text-black">Custom Mantra</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TextQuote size={16} className="text-black/70" />
                  <Label htmlFor="custom-mantra" className="text-black/80">Your Personal Mantra</Label>
                </div>
                <Input 
                  id="custom-mantra" 
                  type="text" 
                  value={settings.customMantra || ''}
                  onChange={(e) => handleSettingChange('customMantra', e.target.value)}
                  placeholder="Enter your own inspiring mantra"
                  className="bg-white border-gray-300 text-black"
                />
                <p className="text-xs text-black/60">
                  Your personal mantra will occasionally appear in the daily rotation. Make it meaningful and inspiring!
                </p>
              </div>
            </div>

            {/* Custom Quote Section */}
            <div className="space-y-3 border-b pb-4">
              <h3 className="text-md font-medium text-black">Custom Quote</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TextQuote size={16} className="text-black/70" />
                  <Label htmlFor="custom-quote" className="text-black/80">Your Favorite Quote</Label>
                </div>
                <Input 
                  id="custom-quote" 
                  type="text" 
                  value={settings.customQuote || ''}
                  onChange={(e) => handleSettingChange('customQuote', e.target.value)}
                  placeholder="Enter your favorite quote"
                  className="bg-white border-gray-300 text-black"
                />
                <Input 
                  id="custom-quote-author" 
                  type="text" 
                  value={settings.customQuoteAuthor || ''}
                  onChange={(e) => handleSettingChange('customQuoteAuthor', e.target.value)}
                  placeholder="Quote author (optional)"
                  className="bg-white border-gray-300 text-black mt-2"
                />
                <p className="text-xs text-black/60">
                  Your custom quote will be added to the rotation of quotes displayed on the screen.
                </p>
              </div>
            </div>

            {/* Time Tracking Section */}
            <div className="space-y-3 border-b pb-4">
              <h3 className="text-md font-medium text-black">Time Tracking</h3>
              
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Save Button - Fixed position at the bottom */}
      <div className="pt-2 sticky bottom-0 bg-white z-10 pb-4">
        <Button 
          onClick={saveSettings}
          className="w-full bg-white border border-gray-200 text-black hover:bg-white/90"
        >
          <Save size={18} className="mr-2 text-black" />
          <span className="text-black">Save Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default SettingsDialog;
