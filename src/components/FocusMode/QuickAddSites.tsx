
import React, { useState, useEffect } from 'react';
import { Shield, CheckSquare, Square } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BlockedSite } from './types';

// Popular social media sites to block
export const popularSites: BlockedSite[] = [
  { id: 'facebook', url: 'https://facebook.com' },
  { id: 'twitter', url: 'https://twitter.com' },
  { id: 'tiktok', url: 'https://tiktok.com' },
  { id: 'instagram', url: 'https://instagram.com' },
  { id: 'reddit', url: 'https://reddit.com' },
  { id: 'youtube', url: 'https://youtube.com' },
  { id: 'linkedin', url: 'https://linkedin.com' },
];

interface QuickAddSitesProps {
  blockedSites: BlockedSite[];
  setBlockedSites: React.Dispatch<React.SetStateAction<BlockedSite[]>>;
}

const QuickAddSites: React.FC<QuickAddSitesProps> = ({ 
  blockedSites, 
  setBlockedSites 
}) => {
  const [quickAddExpanded, setQuickAddExpanded] = useState(false);
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

  return (
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
                  className="h-7 px-2 bg-white text-black hover:text-black hover:bg-white/90"
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
            Add Selected Sites
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuickAddSites;
