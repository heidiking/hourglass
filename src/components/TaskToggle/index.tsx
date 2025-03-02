
import React from 'react';
import { TaskToggleProvider } from './TaskToggleContext';
import TaskToggleContainer from './TaskToggleContainer';
import TimeTracker from '../TimeTracker';
import { useTaskToggle } from './TaskToggleContext';

// Main wrapper component
const TaskToggle = () => {
  return (
    <TaskToggleProvider>
      <TaskToggleWrapper />
    </TaskToggleProvider>
  );
};

// Inner component that can use the context
const TaskToggleWrapper = () => {
  const { 
    timeTrackerOpen, 
    setTimeTrackerOpen,
  } = useTaskToggle();
  
  return (
    <>
      <TaskToggleContainer />
      {timeTrackerOpen && <TimeTracker open={timeTrackerOpen} onOpenChange={setTimeTrackerOpen} />}
    </>
  );
};

export default TaskToggle;
