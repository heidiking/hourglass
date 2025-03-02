
import React from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProjectManager from '../ProjectManager';
import SettingsDialog from './SettingsDialog';
import TasksDialog from './TasksDialog';
import GoalArchiveDialog from './GoalArchiveDialog';
import { useTaskToggle } from './TaskToggleContext';

const TaskToggleContainer = () => {
  const { 
    toolButtons, 
    settingsOpen, 
    tasksOpen, 
    goalArchiveOpen, 
    setSettingsOpen, 
    setTasksOpen, 
    setGoalArchiveOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useTaskToggle();

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
