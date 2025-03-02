
import React from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useTaskToggle } from './TaskToggleContext';
import SettingsDialog from './SettingsDialog';
import TasksDialog from './TasksDialog';
import GoalArchiveDialog from './GoalArchiveDialog';
import FocusModeManager from './FocusModeManager';

interface ToolButtonsProps {
  isButtonActive: (buttonId: string) => boolean;
}

const ToolButtons: React.FC<ToolButtonsProps> = ({ isButtonActive }) => {
  const { 
    toolButtons, 
    settingsOpen, 
    tasksOpen, 
    goalArchiveOpen,
    focusModeOpen,
    setSettingsOpen, 
    setTasksOpen, 
    setGoalArchiveOpen,
    setFocusModeOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useTaskToggle();

  return (
    <div className="flex flex-col gap-4">
      {toolButtons.map((button) => (
        <div 
          key={button.id}
          draggable 
          onDragStart={() => handleDragStart(button.id)}
          onDragOver={(e) => handleDragOver(e, button.id)}
          onDragEnd={handleDragEnd}
          className="cursor-move flex items-center justify-center"
        >
          <Dialog open={isButtonActive(button.id)} 
          onOpenChange={(open) => {
            if (button.id === 'settings') setSettingsOpen(open);
            if (button.id === 'tasks') setTasksOpen(open);
            if (button.id === 'archive') setGoalArchiveOpen(open);
            if (button.id === 'focus') setFocusModeOpen(open);
          }}>
            <DialogTrigger asChild>
              <button
                onClick={button.onClick}
                className={`p-3 ${isButtonActive(button.id) ? 'bg-white' : 'bg-black/30'} rounded-full ${button.id === 'focus' ? 'hover:bg-white' : 'hover:bg-black/50'} transition-colors flex items-center justify-center w-12 h-12`}
                aria-label={button.label}
              >
                <div className={`${isButtonActive(button.id) ? 'text-black' : 'text-white'}`} style={{ color: isButtonActive(button.id) ? 'black' : 'white' }}>
                  {button.icon}
                </div>
              </button>
            </DialogTrigger>
            
            {/* Render appropriate dialog content based on the button */}
            {button.id === 'settings' && settingsOpen && <SettingsDialog />}
            {button.id === 'tasks' && tasksOpen && <TasksDialog />}
            {button.id === 'archive' && goalArchiveOpen && <GoalArchiveDialog />}
            {button.id === 'focus' && focusModeOpen && (
              <FocusModeManager 
                focusModeOpen={focusModeOpen}
                setFocusModeOpen={setFocusModeOpen}
              />
            )}
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default ToolButtons;
