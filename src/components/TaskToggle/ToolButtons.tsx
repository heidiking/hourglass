
import React, { memo } from 'react';
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useTaskToggle } from './TaskToggleContext';
import SettingsDialog from './SettingsDialog';
import TasksDialog from './TasksDialog';
import GoalArchiveDialog from './GoalArchiveDialog';
import FocusModeManager from './FocusModeManager';
import { useTimeTracker } from '../TimeTracker';

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
    timeTrackerOpen,
    setSettingsOpen, 
    setTasksOpen, 
    setGoalArchiveOpen,
    setFocusModeOpen,
    setTimeTrackerOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useTaskToggle();

  // Get the current tracking state from the TimeTracker context
  let isTracking = false;
  try {
    const { currentActivity } = useTimeTracker();
    isTracking = !!currentActivity;
  } catch (error) {
    // If TimeTrackerContext isn't available, fallback to false
    console.log("TimeTracker context not available");
  }

  const handleDialogChange = (open: boolean, buttonId: string) => {
    switch (buttonId) {
      case 'settings': setSettingsOpen(open); break;
      case 'tasks': setTasksOpen(open); break;
      case 'archive': setGoalArchiveOpen(open); break;
      case 'focus': setFocusModeOpen(open); break;
      case 'tracker': setTimeTrackerOpen(open); break;
    }
  };

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
            onOpenChange={(open) => handleDialogChange(open, button.id)}>
            <DialogTrigger asChild>
              <button
                onClick={button.onClick}
                className={`p-3 bg-white text-black
                  ${button.id === 'tracker' && isTracking ? 'ring-2 ring-green-500' : ''}
                  rounded-full border border-gray-300 hover:bg-white/90 transition-colors flex items-center justify-center w-12 h-12`}
                aria-label={button.label}
              >
                <div className="text-black">
                  {button.icon}
                </div>
                <span className="text-black">{button.label}</span>
              </button>
            </DialogTrigger>
            
            {/* Render appropriate dialog content based on the button */}
            {button.id === 'settings' && settingsOpen && (
              <DialogContent className="dialog-content bg-white text-black">
                <SettingsDialog />
              </DialogContent>
            )}
            {button.id === 'tasks' && tasksOpen && (
              <DialogContent className="dialog-content bg-white text-black">
                <TasksDialog />
              </DialogContent>
            )}
            {button.id === 'archive' && goalArchiveOpen && (
              <DialogContent className="dialog-content bg-white text-black">
                <GoalArchiveDialog />
              </DialogContent>
            )}
            {button.id === 'focus' && focusModeOpen && (
              <DialogContent className="dialog-content bg-white text-black">
                <FocusModeManager 
                  focusModeOpen={focusModeOpen}
                  setFocusModeOpen={setFocusModeOpen}
                />
              </DialogContent>
            )}
          </Dialog>
        </div>
      ))}
    </div>
  );
};

// Memoize to prevent unnecessary rerenders
export default memo(ToolButtons);
