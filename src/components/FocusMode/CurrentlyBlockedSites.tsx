
import React from 'react';
import { ExternalLink, Trash2, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BlockedSite } from './types';

interface CurrentlyBlockedSitesProps {
  blockedSites: BlockedSite[];
  setBlockedSites: React.Dispatch<React.SetStateAction<BlockedSite[]>>;
  showEmptyMessage?: boolean;
  quickAddExpanded?: boolean;
}

const CurrentlyBlockedSites: React.FC<CurrentlyBlockedSitesProps> = ({ 
  blockedSites, 
  setBlockedSites,
  showEmptyMessage = true,
  quickAddExpanded = false
}) => {
  const removeSite = (siteId: string) => {
    const updatedSites = blockedSites.filter(site => site.id !== siteId);
    setBlockedSites(updatedSites);
    localStorage.setItem('blockedSites', JSON.stringify(updatedSites));
    toast.success("Site removed from block list");
  };

  if (blockedSites.length === 0 && showEmptyMessage && !quickAddExpanded) {
    return (
      <div className="flex items-center gap-2 text-amber-300 text-sm mb-4">
        <AlertCircle size={16} />
        <span>Add at least one site to block before starting focus mode</span>
      </div>
    );
  }

  if (blockedSites.length === 0) {
    return null;
  }

  return (
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
  );
};

export default CurrentlyBlockedSites;
