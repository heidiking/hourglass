
import React from 'react';
import { 
  ArrowLeft,
  Save,
  Clock,
  Bell
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SettingsContentProps } from './types';

const SettingsContent: React.FC<SettingsContentProps> = ({
  settings,
  handleSettingChange,
  saveSettings,
  closeSettings
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button 
          onClick={closeSettings}
          className="text-white hover:text-white/80 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Focus Mode</span>
        </button>
      </div>
      
      <h2 className="text-xl font-light mt-4">Focus Settings</h2>
      
      <div className="space-y-6 mt-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white/80">Time Tracking</h3>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="track-dormant" 
              checked={settings.trackDormantActivity}
              onCheckedChange={(checked) => handleSettingChange('trackDormantActivity', checked)}
            />
            <Label htmlFor="track-dormant" className="text-white">Track inactive periods</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="auto-track" 
              checked={settings.autoTrackEnabled}
              onCheckedChange={(checked) => handleSettingChange('autoTrackEnabled', checked)}
            />
            <Label htmlFor="auto-track" className="text-white">Auto-track time within working hours</Label>
          </div>
          
          {settings.autoTrackEnabled && (
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
                  onChange={(e) => handleSettingChange('startTime', e.target.value)}
                  className="bg-black/30 border-gray-700 text-white"
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
                  onChange={(e) => handleSettingChange('endTime', e.target.value)}
                  className="bg-black/30 border-gray-700 text-white"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white/80">Notifications</h3>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="focus-notifications" 
              checked={true}
              onCheckedChange={() => {}}
            />
            <Label htmlFor="focus-notifications" className="text-white">Focus session reminders</Label>
          </div>
          
          <div className="bg-black/20 p-3 rounded text-sm text-white/70">
            <div className="flex items-start gap-2">
              <Bell size={16} className="mt-0.5 flex-shrink-0" />
              <p>Focus reminders will notify you when you've been focused for significant periods and suggest short breaks.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 mt-6 border-t border-gray-800">
        <Button 
          onClick={saveSettings}
          className="w-full bg-white text-black hover:bg-white/90"
        >
          <Save size={18} className="mr-2 text-black" />
          <span className="text-black">Save Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default SettingsContent;
