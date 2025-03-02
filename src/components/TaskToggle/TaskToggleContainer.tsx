
import React, { useEffect } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProjectManager from '../ProjectManager';
import SettingsDialog from './SettingsDialog';
import TasksDialog from './TasksDialog';
import GoalArchiveDialog from './GoalArchiveDialog';
import { useTaskToggle } from './TaskToggleContext';
import { toast } from 'sonner';

const TaskToggleContainer = () => {
  const { 
    toolButtons, 
    settingsOpen, 
    tasksOpen, 
    goalArchiveOpen,
    earningsTrackerOpen,
    setSettingsOpen, 
    setTasksOpen, 
    setGoalArchiveOpen,
    setEarningsTrackerOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useTaskToggle();

  // For earnings tracker, we'll use ProjectManager instead of a separate component
  useEffect(() => {
    if (earningsTrackerOpen) {
      // Find the project manager trigger button and click it
      const projectManagerTrigger = document.getElementById('project-manager-trigger');
      if (projectManagerTrigger) {
        projectManagerTrigger.click();
        
        // Show a toast suggesting to use the Projects tab for earnings
        toast.info(
          "Use the Projects tab to track earnings per project and see hourly rates!",
          {
            duration: 4000,
          }
        );
      }
      // Reset the state
      setEarningsTrackerOpen(false);
    }
  }, [earningsTrackerOpen, setEarningsTrackerOpen]);

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <div className="flex flex-col gap-2">
        {toolButtons.map((button) => (
          <div 
            key={button.id}
            draggable 
            onDragStart={() => handleDragStart(button.id)}
            onDragOver={(e) => handleDragOver(e, button.id)}
            onDragEnd={handleDragEnd}
            className="cursor-move"
          >
            <Dialog open={
              (button.id === 'settings' && settingsOpen) || 
              (button.id === 'tasks' && tasksOpen) ||
              (button.id === 'archive' && goalArchiveOpen)
            } 
            onOpenChange={(open) => {
              if (button.id === 'settings') setSettingsOpen(open);
              if (button.id === 'tasks') setTasksOpen(open);
              if (button.id === 'archive') setGoalArchiveOpen(open);
            }}>
              <DialogTrigger asChild>
                <button
                  onClick={button.onClick}
                  className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors group"
                  aria-label={button.label}
                >
                  {button.icon}
                  <span className="sr-only opacity-0 group-hover:opacity-100 transition-opacity text-xs absolute mt-1 ml-1">
                    {button.label}
                  </span>
                </button>
              </DialogTrigger>
            </Dialog>
          </div>
        ))}
      </div>
      
      {/* Render all dialogs */}
      <SettingsDialog />
      <TasksDialog />
      <GoalArchiveDialog />
      
      <ProjectManager />
    </div>
  );
};

export default TaskToggleContainer;
