
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

const GoalArchive = () => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors"
          aria-label="Goal Archive"
        >
          <Scroll size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black/70 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-4">Goal History</DialogTitle>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-y-auto">
          {archivedGoals.length > 0 ? (
            <div className="space-y-3">
              {archivedGoals.map((goal, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-white/10 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-white/60">{goal.date}</p>
                    <p className="text-lg">{goal.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/60 py-6">No archived goals yet</p>
          )}
        </div>
        {archivedGoals.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearArchive}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
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
