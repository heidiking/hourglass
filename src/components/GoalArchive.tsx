
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
                className="p-1.5 bg-gray-100 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-xs text-gray-500">{goal.date}</p>
                  <p className="text-sm leading-tight text-black">{goal.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No archived goals yet</p>
        )}
        
        {archivedGoals.length > 0 && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={clearArchive}
              className="flex items-center gap-1 bg-white text-red-500 hover:bg-white/90 border border-gray-300"
            >
              <X size={16} className="text-red-500" />
              <span className="text-red-500">Clear History</span>
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
          className={`p-3 bg-white rounded-full text-black hover:bg-white/90 transition-colors group border border-gray-300 ${className || ''}`}
          aria-label="Goal Archive"
        >
          <Scroll size={20} className="text-black" />
          {showLabel ? (
            <span className="ml-2 flex items-center text-black">
              <Scroll size={14} className="mr-1 text-black" />
              Archive
            </span>
          ) : (
            <span className="sr-only text-black">Archive</span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-black border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-4 flex items-center text-black">
            <Scroll size={18} className="mr-2 text-black" />
            Goal History
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-y-auto">
          {archivedGoals.length > 0 ? (
            <div className="space-y-1">
              {archivedGoals.map((goal, index) => (
                <div 
                  key={index} 
                  className="p-1.5 bg-gray-100 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs text-gray-500">{goal.date}</p>
                    <p className="text-sm leading-tight text-black">{goal.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No archived goals yet</p>
          )}
        </div>
        {archivedGoals.length > 0 && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={clearArchive}
              className="flex items-center gap-1 bg-white hover:bg-white/90 text-red-500 transition-colors border border-gray-300"
            >
              <X size={16} className="text-red-500" />
              <span className="text-red-500">Clear History</span>
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GoalArchive;
