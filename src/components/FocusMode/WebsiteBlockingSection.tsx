
import React, { useState } from 'react';
import { BlockedSite } from './types';
import BlockedSitesList from './BlockedSitesList';
import QuickAddSites from './QuickAddSites';
import CurrentlyBlockedSites from './CurrentlyBlockedSites';
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface WebsiteBlockingSectionProps {
  blockedSites: BlockedSite[];
  setBlockedSites: React.Dispatch<React.SetStateAction<BlockedSite[]>>;
  startFocusMode: () => void;
}

const WebsiteBlockingSection: React.FC<WebsiteBlockingSectionProps> = ({
  blockedSites,
  setBlockedSites,
  startFocusMode
}) => {
  const [quickAddExpanded, setQuickAddExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-black">Block Distracting Websites</h3>
      <BlockedSitesList blockedSites={blockedSites} setBlockedSites={setBlockedSites} />
      <QuickAddSites blockedSites={blockedSites} setBlockedSites={setBlockedSites} />
      <CurrentlyBlockedSites 
        blockedSites={blockedSites} 
        setBlockedSites={setBlockedSites} 
        quickAddExpanded={quickAddExpanded}
      />
      
      <DialogFooter className="mt-4 pt-2 border-t">
        <Button 
          onClick={startFocusMode} 
          className="bg-white hover:bg-white/90 w-full"
          disabled={blockedSites.length === 0}
          aria-label="Start focus mode"
        >
          <Shield className="mr-2 text-black" size={18} />
          <span className="text-black">Start Focus Mode</span>
        </Button>
      </DialogFooter>
    </div>
  );
};

export default WebsiteBlockingSection;
