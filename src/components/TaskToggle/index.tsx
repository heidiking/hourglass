
import React from 'react';
import { TaskToggleProvider } from './TaskToggleContext';
import TaskToggleContainer from './TaskToggleContainer';
import TimeTracker from '../TimeTracker';
import { useTaskToggle } from './TaskToggleContext';
import ProjectManager from '../ProjectManager';

// Main wrapper component that passes the TimeTracker component to the container
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
    earningsTrackerOpen, 
    setEarningsTrackerOpen
  } = useTaskToggle();
  
  return (
    <>
      <TaskToggleContainer />
      {timeTrackerOpen && <TimeTracker open={timeTrackerOpen} onOpenChange={setTimeTrackerOpen} />}
      {earningsTrackerOpen && <ProjectManager open={earningsTrackerOpen} onOpenChange={setEarningsTrackerOpen} />}
    </>
  );
};

export default TaskToggle;
