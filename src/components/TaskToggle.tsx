
import React from 'react';
import { CheckSquare, Settings } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const TaskToggle = () => {
  const handleToggle = () => {
    toast("Task panel coming soon!");
  };

  const handleSettings = () => {
    toast("Settings panel coming soon!");
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4">
      <button
        onClick={handleSettings}
        className="p-2 text-white hover:text-white/80 transition-colors"
        aria-label="Settings"
      >
        <Settings size={24} />
      </button>
      <button
        onClick={handleToggle}
        className="p-2 text-white hover:text-white/80 transition-colors"
        aria-label="Tasks"
      >
        <CheckSquare size={24} />
      </button>
    </div>
  );
};

export default TaskToggle;
