
import React, { memo } from 'react';
import { useTaskToggle } from './TaskToggleContext';
import ToolButtons from './ToolButtons';
import EarningsTrackerManager from './EarningsTrackerManager';

const TaskToggleContainer = () => {
  const { 
    settingsOpen, 
    tasksOpen, 
    goalArchiveOpen,
    focusModeOpen,
    timeTrackerOpen,
    projectsOpen
  } = useTaskToggle();

  // Get active state for a button
  const isButtonActive = (buttonId: string) => {
    return (buttonId === 'settings' && settingsOpen) || 
      (buttonId === 'tasks' && tasksOpen) ||
      (buttonId === 'archive' && goalArchiveOpen) ||
      (buttonId === 'focus' && focusModeOpen) ||
      (buttonId === 'tracker' && timeTrackerOpen) ||
      (buttonId === 'projects' && projectsOpen);
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <ToolButtons isButtonActive={isButtonActive} />
      <EarningsTrackerManager />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(TaskToggleContainer);
