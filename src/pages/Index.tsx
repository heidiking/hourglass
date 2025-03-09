
import React, { lazy, Suspense } from 'react';
import Clock from '@/components/Clock';
import { NavIcons } from '@/components/NavIcons';
import QuoteDisplay from '@/components/QuoteDisplay';
import FocusInput from '@/components/FocusInput';
import BackgroundManager from '@/components/BackgroundManager';
import { Toaster } from '@/components/ui/toaster';
import { useTaskToggle } from '@/components/TaskToggle/TaskToggleContext';

// Lazy-load TaskToggle component
const TaskToggle = lazy(() => 
  import('@/components/TaskToggle').then(module => ({
    default: module.default
  }))
);

const Index = () => {
  const { setProjectsOpen } = useTaskToggle();

  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      <BackgroundManager />
      <NavIcons />
      
      <div className="flex-1 flex flex-col items-center justify-center z-10 max-w-5xl w-full">
        <Clock />
        <FocusInput />
        <QuoteDisplay />
      </div>
      
      <Suspense fallback={<div className="w-full h-16" />}>
        <TaskToggle />
      </Suspense>
      <Toaster />
    </div>
  );
}

export default Index;
