
import React from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Save } from "lucide-react";

interface SettingsHeaderProps {
  onShowDocumentation: () => void;
  onSaveSettings: () => void;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ 
  onShowDocumentation, 
  onSaveSettings 
}) => {
  return (
    <DialogHeader className="flex flex-col space-y-3 pb-4 border-b">
      <DialogTitle className="text-lg text-black">Settings</DialogTitle>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-black bg-white hover:bg-white/90"
          onClick={onShowDocumentation}
        >
          <Info className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">View Documentation</span>
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={onSaveSettings}
          className="bg-white border border-gray-200 text-black hover:bg-white/90"
        >
          <Save size={18} className="mr-2 text-black" />
          <span className="text-black">Save Settings</span>
        </Button>
      </div>
    </DialogHeader>
  );
};

export default SettingsHeader;
