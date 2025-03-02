
import React, { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProjectManager from '../ProjectManager';
import SettingsDialog from './SettingsDialog';
import TasksDialog from './TasksDialog';
import GoalArchiveDialog from './GoalArchiveDialog';
import { useTaskToggle } from './TaskToggleContext';
import { toast } from 'sonner';
import FocusDialog from '../FocusMode/FocusDialog';
import { BlockedSite, TimeTrackerSettings, defaultSettings } from '../FocusMode/types';
import { startActivity, endActivity } from "@/utils/timeTracking";

const TaskToggleContainer = () => {
  const { 
    toolButtons, 
    settingsOpen, 
    tasksOpen, 
    goalArchiveOpen,
    earningsTrackerOpen,
    focusModeOpen,
    projectManagerOpen,
    setSettingsOpen, 
    setTasksOpen, 
    setGoalArchiveOpen,
    setEarningsTrackerOpen,
    setFocusModeOpen,
    setProjectManagerOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useTaskToggle();

  // State for focus mode functionality
  const [isActive, setIsActive] = useState<boolean>(false);
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);
  const [focusStartTime, setFocusStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [settings, setSettings] = useState<TimeTrackerSettings>(defaultSettings);

  // Load saved state on component mount
  useEffect(() => {
    // Load blocked sites from local storage
    const storedSites = localStorage.getItem('blockedSites');
    if (storedSites) {
      setBlockedSites(JSON.parse(storedSites));
    }

    // Load time tracker settings
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      // Initialize with default settings if not found
      localStorage.setItem('timeTrackerSettings', JSON.stringify(defaultSettings));
    }

    // Check if focus mode was active
    const focusStatus = localStorage.getItem('focusActive');
    const startTimeStr = localStorage.getItem('focusStartTime');
    
    if (focusStatus === 'true' && startTimeStr) {
      const startTime = new Date(startTimeStr);
      setFocusStartTime(startTime);
      setIsActive(true);
      startActivity('Focus Mode');
    }
  }, []);

  // Update elapsed time when focus mode is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && focusStartTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - focusStartTime.getTime();
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, focusStartTime]);

  // Focus mode functions
  const startFocusMode = useCallback(() => {
    const now = new Date();
    setFocusStartTime(now);
    setIsActive(true);
    localStorage.setItem('focusActive', 'true');
    localStorage.setItem('focusStartTime', now.toString());
    startActivity('Focus Mode');
    toast.success("Focus mode activated!");
    setFocusModeOpen(false);
  }, [setFocusModeOpen]);

  const endFocusMode = useCallback(() => {
    setIsActive(false);
    setFocusStartTime(null);
    setElapsedTime(0);
    localStorage.removeItem('focusActive');
    localStorage.removeItem('focusStartTime');
    endActivity();
    toast.success("Focus session ended!");
  }, []);

  const openSettings = useCallback(() => {
    // This would open settings dialog if needed
    console.log("Opening focus mode settings");
  }, []);

  // For earnings tracker, we'll open ProjectManager to the earnings tab directly
  useEffect(() => {
    if (earningsTrackerOpen) {
      // Find the project manager trigger button and click it
      const projectManagerTrigger = document.getElementById('project-manager-trigger');
      if (projectManagerTrigger) {
        projectManagerTrigger.click();
        
        // Set a short timeout to allow the dialog to open before we click the projects tab
        setTimeout(() => {
          // Find and click the Projects tab to ensure we're on the right tab
          const projectsTab = document.querySelector('[data-value="projects"]');
          if (projectsTab) {
            (projectsTab as HTMLElement).click();
            
            toast.info(
              "Add earnings for each project and view your hourly rates!",
              {
                duration: 4000,
              }
            );
          }
        }, 100);
      }
      // Reset the state
      setEarningsTrackerOpen(false);
    }
  }, [earningsTrackerOpen, setEarningsTrackerOpen]);

  // Get active state for a button
  const isButtonActive = (buttonId: string) => {
    return (buttonId === 'settings' && settingsOpen) || 
      (buttonId === 'tasks' && tasksOpen) ||
      (buttonId === 'archive' && goalArchiveOpen) ||
      (buttonId === 'focus' && focusModeOpen) ||
      (buttonId === 'projects' && projectManagerOpen);
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <div className="flex flex-col gap-4">
        {toolButtons.map((button) => (
          <div 
            key={button.id}
            draggable 
            onDragStart={() => handleDragStart(button.id)}
            onDragOver={(e) => handleDragOver(e, button.id)}
            onDragEnd={handleDragEnd}
            className="cursor-move flex items-center justify-center"
          >
            <Dialog open={isButtonActive(button.id)} 
            onOpenChange={(open) => {
              if (button.id === 'settings') setSettingsOpen(open);
              if (button.id === 'tasks') setTasksOpen(open);
              if (button.id === 'archive') setGoalArchiveOpen(open);
              if (button.id === 'focus') setFocusModeOpen(open);
              if (button.id === 'projects') setProjectManagerOpen(open);
            }}>
              <DialogTrigger asChild>
                <button
                  onClick={button.onClick}
                  className={`p-3 ${isButtonActive(button.id) ? 'bg-white' : 'bg-black/30'} rounded-full ${button.id === 'focus' ? 'hover:bg-white' : 'hover:bg-black/50'} transition-colors flex items-center justify-center w-12 h-12`}
                  aria-label={button.label}
                  id={button.id === 'projects' ? 'project-manager-trigger' : undefined}
                >
                  <div className={`${button.id === 'focus' ? 'text-black' : 'text-white'} ${isButtonActive(button.id) && 'text-black'}`}>
                    {button.icon}
                  </div>
                </button>
              </DialogTrigger>
              
              {/* Render appropriate dialog content based on the button */}
              {button.id === 'settings' && settingsOpen && <SettingsDialog />}
              {button.id === 'tasks' && tasksOpen && <TasksDialog />}
              {button.id === 'archive' && goalArchiveOpen && <GoalArchiveDialog />}
              {button.id === 'projects' && projectManagerOpen && <ProjectManager />}
              {button.id === 'focus' && focusModeOpen && (
                <FocusDialog 
                  isActive={isActive}
                  elapsedTime={elapsedTime}
                  blockedSites={blockedSites}
                  setBlockedSites={setBlockedSites}
                  startFocusMode={startFocusMode}
                  endFocusMode={endFocusMode}
                  openSettings={openSettings}
                />
              )}
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskToggleContainer;
