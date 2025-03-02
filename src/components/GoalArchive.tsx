
import React, { useState, useEffect } from 'react';
import { Scroll, X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ArchivedGoal = {
  text: string;
  date: string;
};

type GoalArchiveProps = {
  className?: string;
  showLabel?: boolean;
};

const GoalArchive = ({ className, showLabel = false }: GoalArchiveProps) => {
  const [archivedGoals, setArchivedGoals] = useState<ArchivedGoal[]>([]);
  
  useEffect(() => {
    // Load archived goals from local storage
    const storedGoals = localStorage.getItem('archivedGoals');
    if (storedGoals) {
      setArchivedGoals(JSON.parse(storedGoals));
    }
  }, []);

  const clearArchive = () => {
    if (confirm('Are you sure you want to clear your goal history?')) {
      localStorage.removeItem('archivedGoals');
      setArchivedGoals([]);
    }
  };

  // If this component is being used inside GoalArchiveDialog (showLabel=false),
  // we should only render the content, not the dialog itself
  if (!showLabel) {
    return (
      <div className={className || ''}>
        {archivedGoals.length > 0 ? (
          <div className="space-y-1">
            {archivedGoals.map((goal, index) => (
              <div 
                key={index} 
                className="p-1.5 bg-white/10 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-xs text-white/60">{goal.date}</p>
                  <p className="text-sm leading-tight">{goal.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/60 py-4">No archived goals yet</p>
        )}
        
        {archivedGoals.length > 0 && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={clearArchive}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-black"
            >
              <X size={16} />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Original dialog implementation for standalone usage
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors group ${className || ''}`}
          aria-label="Goal Archive"
        >
          <Scroll size={20} />
          {showLabel ? (
            <span className="ml-2 flex items-center">
              <Scroll size={14} className="mr-1" />
              Archive
            </span>
          ) : (
            <span className="sr-only opacity-0 group-hover:opacity-100 transition-opacity text-xs absolute mt-1 ml-1 text-black">Archive</span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black/70 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-4 flex items-center">
            <Scroll size={18} className="mr-2" />
            Goal History
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-y-auto">
          {archivedGoals.length > 0 ? (
            <div className="space-y-1">
              {archivedGoals.map((goal, index) => (
                <div 
                  key={index} 
                  className="p-1.5 bg-white/10 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs text-white/60">{goal.date}</p>
                    <p className="text-sm leading-tight">{goal.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/60 py-4">No archived goals yet</p>
          )}
        </div>
        {archivedGoals.length > 0 && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={clearArchive}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-black"
            >
              <X size={16} />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GoalArchive;
