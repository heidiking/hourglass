
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTaskToggle } from './TaskToggleContext';

const SettingsDialog = () => {
  const { settingsOpen, setSettingsOpen } = useTaskToggle();
  const [autoTrackEnabled, setAutoTrackEnabled] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [customQuote, setCustomQuote] = useState('');

  useEffect(() => {
    // Load settings from localStorage
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setAutoTrackEnabled(settings.autoTrackEnabled || false);
      setStartTime(settings.startTime || '09:00');
      setEndTime(settings.endTime || '17:00');
      setCustomQuote(settings.customQuote || '');
    }
  }, []);

  useEffect(() => {
    const settings = {
      autoTrackEnabled,
      startTime,
      endTime,
      customQuote
    };
    localStorage.setItem('timeTrackerSettings', JSON.stringify(settings));
  }, [autoTrackEnabled, startTime, endTime, customQuote]);

  const handleTimeSettingSave = () => {
    toast("Settings saved!");
    setSettingsOpen(false);
  };

  return (
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium text-black">Time Tracking</h3>
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-track" 
                checked={autoTrackEnabled}
                onCheckedChange={setAutoTrackEnabled}
              />
              <Label htmlFor="auto-track" className="text-black">Auto-track documents daily</Label>
            </div>
            
            {autoTrackEnabled && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="start-time" className="text-black">Start Time</Label>
                  <Input 
                    id="start-time" 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time" className="text-black">End Time</Label>
                  <Input 
                    id="end-time" 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="text-black"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-black">Custom Quote</h3>
            <div className="space-y-2">
              <Label htmlFor="custom-quote" className="text-black">Your Inspirational Quote</Label>
              <Input
                id="custom-quote"
                placeholder="Enter your own inspirational quote"
                value={customQuote}
                onChange={(e) => setCustomQuote(e.target.value)}
                className="text-black"
              />
              <p className="text-xs text-gray-500">This quote will be included in the daily rotation</p>
            </div>
          </div>
          
          <button 
            onClick={handleTimeSettingSave} 
            className="bg-white hover:bg-white/90 text-black rounded-md py-2 mt-2 flex items-center justify-center"
          >
            <Check size={18} className="mr-2 text-black" />
            <span className="text-black">Save Settings</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
