
import React from 'react';
import TimeTracker from './TimeTracker';
import Weather from './Weather';

const NavIcons = () => {
  return (
    <div className="fixed top-0 left-0 p-4 flex gap-6 z-10">
      <TimeTracker />
    </div>
  );
};

export { NavIcons, Weather };
