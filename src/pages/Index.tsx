
import React, { useEffect, useState } from 'react';
import Clock from '@/components/Clock';
import { NavIcons } from '@/components/NavIcons';
import QuoteDisplay from '@/components/QuoteDisplay';
import FocusInput from '@/components/FocusInput';
import TaskToggle from '@/components/TaskToggle';
import BackgroundManager from '@/components/BackgroundManager';
import TimeTracker from '@/components/TimeTracker';
import { initializeTimeTracking } from '@/utils/timeTracking';
import { Toaster } from '@/components/ui/toaster';
import { TaskToggleProvider } from '@/components/TaskToggle/TaskToggleContext';
import { toast } from "sonner";

const Index = () => {
  const [trackerOpen, setTrackerOpen] = useState(false);

  useEffect(() => {
    // Initialize time tracking on page load
    try {
      initializeTimeTracking();
      console.log("Time tracking initialized successfully");
    } catch (error) {
      console.error("Error initializing time tracking:", error);
      toast.error("Could not initialize time tracking");
    }
  }, []);

  return (
    <TaskToggleProvider>
      <div className="h-screen w-full relative flex flex-col items-center justify-center text-white p-4 overflow-hidden">
        <BackgroundManager />
        <NavIcons />
        
        {/* Time tracker positioned in top left corner */}
        <TimeTracker position="topLeft" className="z-20" open={trackerOpen} onOpenChange={setTrackerOpen} />
        
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
