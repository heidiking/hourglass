
import React from 'react';
import { useTaskToggle } from './TaskToggleContext';
import ProjectManager from '../ProjectManager';
import ToolButtons from './ToolButtons';
import EarningsTrackerManager from './EarningsTrackerManager';

const TaskToggleContainer = () => {
  const { 
    settingsOpen, 
    tasksOpen, 
    goalArchiveOpen,
    focusModeOpen
  } = useTaskToggle();

  // Get active state for a button
  const isButtonActive = (buttonId: string) => {
    return (buttonId === 'settings' && settingsOpen) || 
      (buttonId === 'tasks' && tasksOpen) ||
      (buttonId === 'archive' && goalArchiveOpen) ||
      (buttonId === 'focus' && focusModeOpen);
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <ToolButtons isButtonActive={isButtonActive} />
      <EarningsTrackerManager />
      <ProjectManager />
    </div>
  );
};

export default TaskToggleContainer;
