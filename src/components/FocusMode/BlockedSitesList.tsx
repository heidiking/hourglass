
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BlockedSite } from './types';

interface BlockedSitesListProps {
  blockedSites: BlockedSite[];
  setBlockedSites: React.Dispatch<React.SetStateAction<BlockedSite[]>>;
}

const BlockedSitesList = ({ blockedSites, setBlockedSites }: BlockedSitesListProps) => {
  const [newSite, setNewSite] = useState<string>('');

  const addBlockedSite = () => {
    if (!newSite.trim()) return;
    
    // Simple URL validation
    let url = newSite.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const newBlockedSite: BlockedSite = {
      id: Date.now().toString(),
      url,
    };
    
    const updatedSites = [...blockedSites, newBlockedSite];
    setBlockedSites(updatedSites);
    localStorage.setItem('blockedSites', JSON.stringify(updatedSites));
    setNewSite('');
  };

  const removeBlockedSite = (id: string) => {
    const updatedSites = blockedSites.filter(site => site.id !== id);
    setBlockedSites(updatedSites);
    localStorage.setItem('blockedSites', JSON.stringify(updatedSites));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addBlockedSite()}
            placeholder="Enter website to block (e.g., facebook.com)"
            className="bg-black/30 border-gray-700 text-white"
          />
        </div>
        <Button onClick={addBlockedSite} variant="outline" className="border-gray-700 text-white">
          Add
        </Button>
      </div>
      
      <div className="max-h-[30vh] overflow-y-auto">
        {blockedSites.length > 0 ? (
          <div className="space-y-2">
            {blockedSites.map((site) => (
              <div 
                key={site.id} 
                className="p-2 bg-white/10 rounded-md flex justify-between items-center"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <ExternalLink size={16} className="flex-shrink-0" />
                  <span className="truncate">{site.url}</span>
                </div>
                <button
                  onClick={() => removeBlockedSite(site.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/60 py-3">No blocked sites yet</p>
        )}
      </div>
    </div>
  );
};

export default BlockedSitesList;
