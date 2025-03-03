
import React, { useState } from 'react';
import Clock from '@/components/Clock';
import { NavIcons } from '@/components/NavIcons';
import QuoteDisplay from '@/components/QuoteDisplay';
import FocusInput from '@/components/FocusInput';
import TaskToggle from '@/components/TaskToggle';
import BackgroundManager from '@/components/BackgroundManager';
import { Toaster } from '@/components/ui/toaster';
import { Plus, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTaskToggle } from '@/components/TaskToggle/TaskToggleContext';

const Index = () => {
  const { setProjectsOpen } = useTaskToggle();

  const handleOpenProjectManager = () => {
    setProjectsOpen(true);
  };

  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      <BackgroundManager />
      <NavIcons />
      
      <div className="flex-1 flex flex-col items-center justify-center z-10 max-w-5xl w-full">
        <Clock />
        <FocusInput />
        <QuoteDisplay />
        
        {/* Quick Add Project Button - Updated with clearer styling */}
        <Button
          onClick={handleOpenProjectManager}
          className="absolute bottom-24 right-24 bg-white hover:bg-white/90 rounded-full shadow-lg p-3 z-20"
        >
          <Folder size={18} className="mr-2 text-black" />
          <span className="text-black font-medium">New Project</span>
        </Button>
      </div>
      
      <TaskToggle />
      <Toaster />
    </div>
  );
}

export default Index;
