
import React from 'react';
import { TaskToggleProvider } from './TaskToggleContext';
import TaskToggleContainer from './TaskToggleContainer';

const TaskToggle = () => {
  return (
    <TaskToggleProvider>
      <TaskToggleContainer />
    </TaskToggleProvider>
  );
};

export default TaskToggle;
