
import React, { useState, useEffect } from 'react';
import { CheckSquare, Settings, Clock, Briefcase } from 'lucide-react';
import { toast } from "sonner";
import ProjectManager from './ProjectManager';
import FocusBlocker from './FocusBlocker';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const TaskToggle = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [autoTrackEnabled, setAutoTrackEnabled] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setAutoTrackEnabled(settings.autoTrackEnabled || false);
      setStartTime(settings.startTime || '09:00');
      setEndTime(settings.endTime || '17:00');
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      autoTrackEnabled,
      startTime,
      endTime
    };
    localStorage.setItem('timeTrackerSettings', JSON.stringify(settings));
  }, [autoTrackEnabled, startTime, endTime]);

  const handleToggle = () => {
    toast("Task checklist coming soon!");
  };

  const handleTimeSettingSave = () => {
    toast("Time tracking settings saved!");
    setSettingsOpen(false);
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors"
            aria-label="Settings"
          >
            <Settings size={24} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Time Tracking</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-track" 
                  checked={autoTrackEnabled}
                  onCheckedChange={setAutoTrackEnabled}
                />
                <Label htmlFor="auto-track">Auto-track documents daily</Label>
              </div>
              
              {autoTrackEnabled && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input 
                      id="start-time" 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input 
                      id="end-time" 
                      type="time" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleTimeSettingSave} 
              className="bg-black/20 hover:bg-black/30 text-white rounded-md py-2 mt-2"
            >
              Save Settings
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      <button
        id="project-manager-trigger"
        onClick={() => {
          const projectButton = document.getElementById('project-manager-trigger');
          if (projectButton) {
            projectButton.click();
          }
          toast("Manage your projects");
        }}
        className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors"
        aria-label="Projects"
      >
        <Briefcase size={24} />
      </button>
      
      <ProjectManager />
      
      <button
        onClick={handleToggle}
        className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors"
        aria-label="Daily Tasks"
      >
        <CheckSquare size={24} />
      </button>
    </div>
  );
};

export default TaskToggle;
