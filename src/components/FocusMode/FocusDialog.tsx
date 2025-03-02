
import React from 'react';
import { Shield, Settings } from 'lucide-react';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ActiveFocusSession from './ActiveFocusSession';
import BlockedSitesList from './BlockedSitesList';
import { BlockedSite } from './types';

interface FocusDialogProps {
  isActive: boolean;
  elapsedTime: number;
  blockedSites: BlockedSite[];
  setBlockedSites: React.Dispatch<React.SetStateAction<BlockedSite[]>>;
  startFocusMode: () => void;
  endFocusMode: () => void;
  openSettings: () => void;
}

const FocusDialog = ({
  isActive,
  elapsedTime,
  blockedSites,
  setBlockedSites,
  startFocusMode,
  endFocusMode,
  openSettings
}: FocusDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md bg-black/70 text-white border-gray-800">
      <DialogHeader>
        <DialogTitle className="text-xl font-light mb-2">Focus Mode</DialogTitle>
        <DialogDescription className="text-white/60">
          {isActive 
            ? "You're currently in focus mode. Stay concentrated!" 
            : "Block distracting websites and focus on your work."}
        </DialogDescription>
      </DialogHeader>
      
      {isActive ? (
        <ActiveFocusSession elapsedTime={elapsedTime} endFocusMode={endFocusMode} />
      ) : (
        <>
          <BlockedSitesList blockedSites={blockedSites} setBlockedSites={setBlockedSites} />
          
          <DialogFooter className="mt-4 flex justify-between">
            <Button 
              onClick={openSettings}
              variant="outline" 
              className="border-gray-700 text-white"
            >
              <Settings size={18} />
              Settings
            </Button>
            <Button onClick={startFocusMode}>
              <Shield className="mr-2" size={18} />
              Start Focus Mode
            </Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
};

export default FocusDialog;
