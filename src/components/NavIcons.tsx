
import React from 'react';
import TimeTracker from './TimeTracker/TimeTracker';
import ActivityTimer from './TimeTracker/ActivityTimer';
import { TimeTrackerProvider } from './TimeTracker/TimeTrackerContext';

const NavIcons = () => {
  return (
    <>
      <div className="fixed top-0 left-0 p-4 flex gap-6 z-10">
        <TimeTracker position="topLeft" showLabel={false} />
      </div>
      <TimeTrackerProvider>
        <ActivityTimer />
      </TimeTrackerProvider>
    </>
  );
};

export { NavIcons };
