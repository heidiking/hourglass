
import React, { useEffect, useState } from 'react';
import { NavIcons, Weather } from '@/components/NavIcons';
import BackgroundManager from '@/components/BackgroundManager';
import Clock from '@/components/Clock';
import FocusInput from '@/components/FocusInput';
import QuoteDisplay from '@/components/QuoteDisplay';
import TaskToggle from '@/components/TaskToggle';
import { initializeTimeTracking, detectCurrentApp, startActivity, formatFocusTime, getTodayFocusTime } from '@/utils/timeTracking';
import { Toaster } from "sonner";

const Index = () => {
  const [focusTime, setFocusTime] = useState<string>('0m');
  const [currentApp, setCurrentApp] = useState<string | null>(null);

  useEffect(() => {
    // Initialize time tracking
    initializeTimeTracking();

    // Set up app detection (mock)
    const detectApp = () => {
      const newApp = detectCurrentApp();
      if (newApp !== currentApp) {
        setCurrentApp(newApp);
        startActivity(newApp);
      }
    };

    // Detect initial app
    detectApp();

    // Set up periodic app detection (in a real extension, this would use events)
    const detectionInterval = setInterval(detectApp, 30000); // Every 30 seconds

    // Set up focus time updates
    const updateFocusTime = () => {
      const todayMs = getTodayFocusTime();
      setFocusTime(formatFocusTime(todayMs));
    };

    // Update initial focus time
    updateFocusTime();

    // Update focus time every minute
    const focusInterval = setInterval(updateFocusTime, 60000);

    return () => {
      clearInterval(detectionInterval);
      clearInterval(focusInterval);
    };
  }, [currentApp]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <BackgroundManager />

      {/* Navigation */}
      <NavIcons />
      <Weather />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full z-10 relative">
        <Clock />
        <FocusInput />
      </div>

      {/* Quote */}
      <div className="relative z-10">
        <QuoteDisplay />
      </div>

      {/* Task Toggle */}
      <TaskToggle />

      {/* Toast notifications */}
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
