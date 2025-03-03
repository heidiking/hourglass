
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextQuote, Bell, Save } from "lucide-react";
import Documentation from '../Documentation';

interface SettingsDialogProps {
  // No props required
}

const SettingsDialog: React.FC<SettingsDialogProps> = () => {
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
    // Show saved confirmation
  };
  
  if (showDocumentation) {
    return <Documentation />;
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <DialogHeader className="flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <DialogTitle className="text-lg text-black">Settings</DialogTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-black bg-white hover:bg-white/90"
          onClick={() => setShowDocumentation(true)}
        >
          <Info className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">View Documentation</span>
        </Button>
      </DialogHeader>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="settings" className="space-y-8">
          {/* Custom Mantra Section */}
          <div className="space-y-3 border-b pb-6">
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
          <div className="space-y-3 border-b pb-6">
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
          <div className="space-y-3 border-b pb-6">
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

          {/* Notifications Section */}
          <div className="space-y-3 border-b pb-6">
            <h3 className="text-md font-medium text-black">Notifications</h3>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="focus-notifications" 
                checked={settings.focusNotifications !== false}
                onCheckedChange={(checked) => handleSettingChange('focusNotifications', checked)}
              />
              <Label htmlFor="focus-notifications" className="text-black">Focus session reminders</Label>
            </div>
            
            <div className="bg-gray-50 p-3 rounded text-sm text-black/70">
              <div className="flex items-start gap-2">
                <Bell size={16} className="mt-0.5 flex-shrink-0 text-black" />
                <p>Focus reminders will notify you when you've been focused for significant periods and suggest short breaks.</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <Button 
              onClick={saveSettings}
              className="w-full bg-white border border-gray-200 text-black hover:bg-white/90"
            >
              <Save size={18} className="mr-2 text-black" />
              <span className="text-black">Save Settings</span>
            </Button>
          </div>

          {/* Tab buttons for Appearance, Behavior, Data */}
          <TabsList className="grid grid-cols-3 mb-4 mt-6">
            <TabsTrigger value="appearance" className="text-black">Appearance</TabsTrigger>
            <TabsTrigger value="behavior" className="text-black">Behavior</TabsTrigger>
            <TabsTrigger value="data" className="text-black">Data</TabsTrigger>
          </TabsList>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          {/* Appearance settings content would go here */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Background Settings</h3>
            <p className="text-gray-700">Configure your background preferences</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Theme Settings</h3>
            <p className="text-gray-700">Choose between light and dark themes</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Clock Format</h3>
            <p className="text-gray-700">Configure how time is displayed</p>
          </div>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-4">
          {/* Behavior settings content would go here */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Time Tracker Settings</h3>
            <p className="text-gray-700">Configure how time tracking works</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Focus Mode Settings</h3>
            <p className="text-gray-700">Configure focus session behavior</p>
          </div>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          {/* Data settings content would go here */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Data Export/Import</h3>
            <p className="text-gray-700">Backup and restore your data</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Clear Data</h3>
            <p className="text-gray-700">Reset specific data categories</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Storage Management</h3>
            <p className="text-gray-700">Manage local storage usage</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsDialog;
