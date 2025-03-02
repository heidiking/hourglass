
import React, { useState, useEffect } from 'react';
import { Shield, Settings, AlertCircle, ExternalLink, Trash2, CheckSquare, Square } from 'lucide-react';
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
import FocusSettings from './FocusSettings';

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
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSites, setSelectedSites] = useState<{[key: string]: boolean}>({});
  
  // Initialize selected sites based on blockedSites
  useEffect(() => {
    const initialSelected: {[key: string]: boolean} = {};
    blockedSites.forEach(site => {
      initialSelected[site.id] = true;
    });
    setSelectedSites(initialSelected);
  }, [blockedSites]);
  
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

  const toggleSiteSelection = (siteId: string) => {
    setSelectedSites(prev => ({
      ...prev,
      [siteId]: !prev[siteId]
    }));
  };

  const addSelectedSites = () => {
    const sitesToAdd = popularSites.filter(site => selectedSites[site.id] && !blockedSites.some(s => s.id === site.id));
    
    if (sitesToAdd.length === 0) {
      toast.info("No new sites selected to block");
      return;
    }
    
    const updatedSites = [...blockedSites, ...sitesToAdd];
    setBlockedSites(updatedSites);
    localStorage.setItem('blockedSites', JSON.stringify(updatedSites));
    toast.success(`Added ${sitesToAdd.length} sites to blocked list`);
  };

  const removeSite = (siteId: string) => {
    const updatedSites = blockedSites.filter(site => site.id !== siteId);
    setBlockedSites(updatedSites);
    localStorage.setItem('blockedSites', JSON.stringify(updatedSites));
    toast.success("Site removed from block list");
  };
  
  return (
    <DialogContent className="sm:max-w-md bg-black/70 text-white border-gray-800 max-h-[90vh] overflow-y-auto">
      {showSettings ? (
        <FocusSettings closeSettings={() => setShowSettings(false)} />
      ) : (
        <>
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
                  className="flex items-center gap-2 text-sm text-white font-medium hover:text-white/80 mb-2 transition-colors"
                  aria-expanded={quickAddExpanded}
                  aria-controls="popular-sites-list"
                >
                  <Shield size={16} />
                  <span>{quickAddExpanded ? 'Hide' : 'Show'} popular sites to block</span>
                </button>
                
                {quickAddExpanded && (
                  <div className="space-y-4">
                    <div 
                      id="popular-sites-list"
                      className="grid grid-cols-1 gap-2 mt-2 max-h-[200px] overflow-y-auto"
                    >
                      {popularSites.map((site) => (
                        <div key={site.id} className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSiteSelection(site.id)}
                            className="flex items-center text-white hover:text-white/80 transition-colors"
                            aria-label={`Select ${site.url}`}
                          >
                            {selectedSites[site.id] ? (
                              <CheckSquare size={20} className="text-green-400" />
                            ) : (
                              <Square size={20} className="text-white/70" />
                            )}
                          </button>
                          <span className="text-sm text-white truncate flex-1">{site.url.replace('https://', '')}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addPopularSite(site)}
                            className="h-7 px-2 text-white hover:text-white hover:bg-black/40"
                            aria-label={`Add ${site.url}`}
                          >
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={addSelectedSites}
                      className="w-full bg-white text-black hover:bg-white/90"
                    >
                      <span className="text-black">Add Selected Sites</span>
                    </Button>
                  </div>
                )}
                
                {/* Currently blocked sites */}
                {blockedSites.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-medium text-white">Currently Blocked</h3>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {blockedSites.map(site => (
                        <div key={site.id} className="flex items-center justify-between bg-black/30 p-2 rounded">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <ExternalLink size={16} className="text-white/70" />
                            <span className="truncate text-sm">{site.url.replace('https://', '')}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSite(site.id)}
                            className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-black/40"
                            aria-label={`Remove ${site.url}`}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
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
                  onClick={() => setShowSettings(true)}
                  variant="outline" 
                  className="border-gray-700 bg-white hover:bg-white/90 order-2 sm:order-1 w-full sm:w-auto"
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
