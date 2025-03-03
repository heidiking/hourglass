
import React from 'react';
import { 
  ArrowLeft,
  Save,
  Bell,
  TextQuote
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SettingsContentProps } from './types';
import WorkingHoursSettings from './WorkingHoursSettings';

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
            <WorkingHoursSettings 
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white/80">Custom Mantra</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TextQuote size={16} className="text-white/70" />
              <Label htmlFor="custom-mantra" className="text-white/80">Your Personal Mantra</Label>
            </div>
            <Input 
              id="custom-mantra" 
              type="text" 
              value={settings.customMantra || ''}
              onChange={(e) => handleSettingChange('customMantra', e.target.value)}
              placeholder="Enter your own inspiring mantra"
              className="bg-black/30 border-gray-700 text-white"
            />
            <p className="text-xs text-white/60">
              Your personal mantra will occasionally appear in the daily rotation. Make it meaningful and inspiring!
            </p>
          </div>
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
