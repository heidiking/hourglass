
import React from 'react';
import { TaskToggleProvider } from './TaskToggleContext';
import TaskToggleContainer from './TaskToggleContainer';
import { TimeTrackerProvider } from '../TimeTracker/TimeTrackerContext';

// Main wrapper component that now wraps everything with the TimeTrackerProvider
const TaskToggle = () => {
  return (
    <TimeTrackerProvider>
      <TaskToggleProvider>
        <TaskToggleWrapper />
      </TaskToggleProvider>
    </TimeTrackerProvider>
  );
};

// Inner component that can use the context
const TaskToggleWrapper = () => {
  return (
    <>
      <TaskToggleContainer />
    </>
  );
};

export default TaskToggle;
