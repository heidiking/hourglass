
import React from 'react';
import { TaskToggleProvider } from './TaskToggleContext';
import TaskToggleContainer from './TaskToggleContainer';
import TimeTracker from '../TimeTracker';
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
    timeTrackerOpen, 
    setTimeTrackerOpen, 
    earningsTrackerOpen, 
    setEarningsTrackerOpen 
  } = useTaskToggle();
  
  return (
    <>
      <TaskToggleContainer />
      {timeTrackerOpen && <TimeTracker open={timeTrackerOpen} onOpenChange={setTimeTrackerOpen} />}
      {earningsTrackerOpen && (
        <div className="hidden">
          {/* The actual earnings tracking functionality is integrated directly into the ProjectManager component */}
          {/* This is just to close the dialog when clicking outside */}
          <button onClick={() => setEarningsTrackerOpen(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default TaskToggle;
