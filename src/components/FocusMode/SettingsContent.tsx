
import React from 'react';
import { 
  ArrowLeft,
  Save,
  Bell,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SettingsContentProps } from './types';
import WorkingHoursSettings from './WorkingHoursSettings';

// This component is now integrated directly in the FocusDialog and SettingsDialog components
// This file is kept for backwards compatibility but functionality has been moved
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
          
          {/* Settings have been moved to the main dialog component */}
          <p className="text-white/60">Settings have been moved to the main Focus Settings screen.</p>
        </div>
      </div>
      
      <div className="pt-4 mt-6 border-t border-gray-800">
        <Button 
          onClick={closeSettings}
          className="w-full bg-white text-black hover:bg-white/90"
        >
          <ArrowLeft size={18} className="mr-2 text-black" />
          <span className="text-black">Back</span>
        </Button>
      </div>
    </div>
  );
};

export default SettingsContent;
