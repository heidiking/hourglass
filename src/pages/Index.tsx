
import React, { useEffect } from 'react';
import Clock from '@/components/Clock';
import { NavIcons } from '@/components/NavIcons';
import QuoteDisplay from '@/components/QuoteDisplay';
import FocusInput from '@/components/FocusInput';
import TaskToggle from '@/components/TaskToggle';
import BackgroundManager from '@/components/BackgroundManager';
import { initializeTimeTracking } from '@/utils/timeTracking';
import { Toaster } from '@/components/ui/toaster';
import { TaskToggleProvider } from '@/components/TaskToggle/TaskToggleContext';

const Index = () => {
  useEffect(() => {
    // Initialize time tracking on page load
    initializeTimeTracking();
  }, []);

  return (
    <TaskToggleProvider>
      <div className="h-screen w-full relative flex flex-col items-center justify-center text-white p-4 overflow-hidden">
        <BackgroundManager />
        <NavIcons />
        
        <div className="flex-1 flex flex-col items-center justify-center z-10 max-w-5xl w-full">
          <Clock />
          <FocusInput />
          <QuoteDisplay />
        </div>
        
        <TaskToggle />
        <Toaster />
      </div>
    </TaskToggleProvider>
  );
}

export default Index;
