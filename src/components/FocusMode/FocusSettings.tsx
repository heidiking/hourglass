
import React from 'react';
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TimeTrackerSettings, defaultSettings, FocusSettingsProps } from './types';

// This component is now integrated directly in the FocusDialog
// This file is kept for backwards compatibility but functionality has been moved
const FocusSettings: React.FC<FocusSettingsProps> = ({ 
  closeSettings, 
  open, 
  onOpenChange,
  settings: externalSettings,
  setSettings: setExternalSettings
}) => {
  // Redirect to FocusDialog which now contains settings
  return (
    <>
      {open !== undefined && onOpenChange && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="bg-white border-gray-200 text-black">
            <div className="p-4 text-center">
              <p className="text-black">Settings have moved to the main Focus Settings screen.</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default FocusSettings;
