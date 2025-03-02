
import React, { useState } from 'react';
import { Settings, Shield } from 'lucide-react';
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
import FocusSettings from './FocusSettings';
import QuickAddSites from './QuickAddSites';
import CurrentlyBlockedSites from './CurrentlyBlockedSites';

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
  const [quickAddExpanded, setQuickAddExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <DialogContent className="sm:max-w-md bg-white text-black border-gray-200 max-h-[90vh] overflow-y-auto">
      {showSettings ? (
        <FocusSettings closeSettings={() => setShowSettings(false)} />
      ) : (
        <>
          <DialogHeader>
            <DialogTitle className="text-xl font-light mb-2 text-black">Focus Mode</DialogTitle>
            <DialogDescription className="text-black/70">
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
              
              <QuickAddSites blockedSites={blockedSites} setBlockedSites={setBlockedSites} />
              
              <CurrentlyBlockedSites 
                blockedSites={blockedSites} 
                setBlockedSites={setBlockedSites} 
                quickAddExpanded={quickAddExpanded}
              />
              
              <DialogFooter className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                <Button 
                  onClick={() => setShowSettings(true)}
                  variant="outline" 
                  className="border-gray-300 bg-white hover:bg-white/90 order-2 sm:order-1 w-full sm:w-auto"
                  aria-label="Open focus settings"
                >
                  <Settings size={18} className="mr-2 text-black" />
                  <span className="text-black">Settings</span>
                </Button>
                <Button 
                  onClick={startFocusMode} 
                  className="bg-white hover:bg-white/90 order-1 sm:order-2 w-full sm:w-auto"
                  disabled={blockedSites.length === 0}
                  aria-label="Start focus mode"
                >
                  <Shield className="mr-2 text-black" size={18} />
                  <span className="text-black">Start Focus Mode</span>
                </Button>
              </DialogFooter>
            </>
          )}
        </>
      )}
    </DialogContent>
  );
};

export default FocusDialog;
