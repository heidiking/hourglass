
import React from 'react';
import { TaskToggleProvider } from './TaskToggleContext';
import TaskToggleContainer from './TaskToggleContainer';
import ProjectManager from '../ProjectManager';
import { useTaskToggle } from './TaskToggleContext';

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
    earningsTrackerOpen, 
    setEarningsTrackerOpen
  } = useTaskToggle();
  
  return (
    <>
      <TaskToggleContainer />
      {earningsTrackerOpen && <ProjectManager open={earningsTrackerOpen} onOpenChange={setEarningsTrackerOpen} />}
    </>
  );
};

export default TaskToggle;
