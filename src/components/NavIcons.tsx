
import React from 'react';
import TimeTracker from './TimeTracker';

const NavIcons = () => {
  return (
    <div className="fixed top-0 left-0 p-4 flex gap-6 z-10">
      <TimeTracker />
    </div>
  );
};

const Weather = () => {
  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4 text-white z-10">
      <div className="flex items-center">
        <span className="text-3xl font-light">75°</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm">Jacksonville Beach</span>
      </div>
    </div>
  );
};

export { NavIcons, Weather };
