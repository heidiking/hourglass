
import React, { useState } from 'react';
import { Shield, Settings, AlertCircle } from 'lucide-react';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ActiveFocusSession from './ActiveFocusSession';
import BlockedSitesList from './BlockedSitesList';
import { BlockedSite } from './types';

// Popular social media sites to block
const popularSites: BlockedSite[] = [
  { id: 'facebook', url: 'https://facebook.com' },
  { id: 'twitter', url: 'https://twitter.com' },
  { id: 'instagram', url: 'https://instagram.com' },
  { id: 'tiktok', url: 'https://tiktok.com' },
  { id: 'reddit', url: 'https://reddit.com' },
  { id: 'youtube', url: 'https://youtube.com' },
  { id: 'linkedin', url: 'https://linkedin.com' },
];

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
  
  const addPopularSite = (site: BlockedSite) => {
    // Check if the site is already in the blocked list
    if (blockedSites.some(s => s.url === site.url)) {
      toast.info(`${site.url} is already blocked`);
      return;
    }
    
    const updatedSites = [...blockedSites, site];
    setBlockedSites(updatedSites);
    localStorage.setItem('blockedSites', JSON.stringify(updatedSites));
    toast.success(`Added ${site.url} to blocked sites`);
  };
  
  return (
    <DialogContent className="sm:max-w-md bg-black/70 text-white border-gray-800 max-h-[90vh] overflow-y-auto">
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
          
          {/* Quick add popular sites section */}
          <div className="mt-4 border-t border-gray-800 pt-4">
            <button 
              onClick={() => setQuickAddExpanded(!quickAddExpanded)}
              className="flex items-center gap-2 text-sm text-white/80 hover:text-white mb-2 transition-colors"
              aria-expanded={quickAddExpanded}
              aria-controls="popular-sites-list"
            >
              <Shield size={16} />
              <span>{quickAddExpanded ? 'Hide' : 'Show'} popular sites to block</span>
            </button>
            
            {quickAddExpanded && (
              <div 
                id="popular-sites-list"
                className="grid grid-cols-2 gap-2 mt-2 max-h-[200px] overflow-y-auto"
              >
                {popularSites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => addPopularSite(site)}
                    className="text-sm bg-white/10 hover:bg-white/20 rounded p-2 text-left truncate transition-colors"
                    aria-label={`Block ${site.url}`}
                  >
                    {site.url.replace('https://', '')}
                  </button>
                ))}
              </div>
            )}
            
            {blockedSites.length === 0 && !quickAddExpanded && (
              <div className="flex items-center gap-2 text-amber-300 text-sm mb-4">
                <AlertCircle size={16} />
                <span>Add at least one site to block before starting focus mode</span>
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
            <Button 
              onClick={openSettings}
              variant="outline" 
              className="border-gray-700 text-white order-2 sm:order-1 w-full sm:w-auto"
              aria-label="Open focus settings"
            >
              <Settings size={18} className="mr-2" />
              Settings
            </Button>
            <Button 
              onClick={startFocusMode} 
              className="order-1 sm:order-2 w-full sm:w-auto"
              disabled={blockedSites.length === 0}
              aria-label="Start focus mode"
            >
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
