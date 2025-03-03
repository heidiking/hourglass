
import React, { memo } from 'react';
import { TaskToggleProvider } from './TaskToggleContext';
import TaskToggleContainer from './TaskToggleContainer';
import { TimeTrackerProvider } from '../TimeTracker/TimeTrackerContext';

// Main wrapper component that wraps everything with the TimeTrackerProvider
const TaskToggle = () => {
  return (
    <TimeTrackerProvider>
      <TaskToggleProvider>
        <TaskToggleWrapper />
      </TaskToggleProvider>
    </TimeTrackerProvider>
  );
};

// Inner component that can use the context - memoized for performance
const TaskToggleWrapper = memo(() => {
  return (
    <TaskToggleContainer />
  );
});

TaskToggleWrapper.displayName = 'TaskToggleWrapper';

export default TaskToggle;
