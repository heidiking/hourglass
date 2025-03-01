
import React, { useState, useEffect } from 'react';
import { Shield, Lock, ExternalLink } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { startActivity, endActivity, formatFocusTime } from "@/utils/timeTracking";

type BlockedSite = {
  id: string;
  url: string;
};

const FocusBlocker = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);
  const [newSite, setNewSite] = useState<string>('');
  const [focusStartTime, setFocusStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Load blocked sites from local storage
    const storedSites = localStorage.getItem('blockedSites');
    if (storedSites) {
      setBlockedSites(JSON.parse(storedSites));
    }

    // Check if focus mode was active
    const focusStatus = localStorage.getItem('focusActive');
    const startTimeStr = localStorage.getItem('focusStartTime');
    
    if (focusStatus === 'true' && startTimeStr) {
      const startTime = new Date(startTimeStr);
      setFocusStartTime(startTime);
      setIsActive(true);
      startActivity('Focus Mode');
    }

    return () => {
      if (isActive) {
        endActivity();
      }
    };
  }, []);

  // Update elapsed time when focus mode is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && focusStartTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - focusStartTime.getTime();
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, focusStartTime]);

  const startFocusMode = () => {
    const now = new Date();
    setFocusStartTime(now);
    setIsActive(true);
    localStorage.setItem('focusActive', 'true');
    localStorage.setItem('focusStartTime', now.toString());
    startActivity('Focus Mode');
    toast.success("Focus mode activated! Stay productive!");
    setOpen(false);
  };

  const endFocusMode = () => {
    setIsActive(false);
    setFocusStartTime(null);
    setElapsedTime(0);
    localStorage.removeItem('focusActive');
    localStorage.removeItem('focusStartTime');
    endActivity();
    toast.success("Focus session ended!");
  };

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
    <>
      {/* Hidden trigger for the Focus dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button 
            id="focus-dialog-trigger" 
            className="hidden"
            aria-label="Focus Mode"
          />
        </DialogTrigger>
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
            <div className="py-4 flex flex-col items-center">
              <div className="text-3xl font-light mb-4">
                {formatFocusTime(elapsedTime)}
              </div>
              <Button 
                variant="destructive" 
                onClick={endFocusMode}
                className="w-full"
              >
                End Focus Session
              </Button>
            </div>
          ) : (
            <>
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
              
              <DialogFooter className="mt-4">
                <Button onClick={startFocusMode} className="w-full">
                  <Shield className="mr-2" size={18} />
                  Start Focus Mode
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating indicator when focus mode is active */}
      {isActive && (
        <div className="fixed top-20 right-4 bg-black/70 text-white py-2 px-4 rounded-full flex items-center gap-2 animate-pulse-soft">
          <Lock size={16} />
          <span>Focus Mode: {formatFocusTime(elapsedTime)}</span>
        </div>
      )}
    </>
  );
};

export default FocusBlocker;
