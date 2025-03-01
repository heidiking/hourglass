
import React from 'react';
import { CheckSquare, Settings } from 'lucide-react';
import { toast } from "sonner";
import ProjectManager from './ProjectManager';
import FocusBlocker from './FocusBlocker';

const TaskToggle = () => {
  const handleToggle = () => {
    toast("Task panel coming soon!");
  };

  const handleSettings = () => {
    toast("Settings panel coming soon!");
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <button
        onClick={handleSettings}
        className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors"
        aria-label="Settings"
      >
        <Settings size={24} />
      </button>
      <ProjectManager />
      <button
        onClick={handleToggle}
        className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors"
        aria-label="Tasks"
      >
        <CheckSquare size={24} />
      </button>
    </div>
  );
};

export default TaskToggle;
