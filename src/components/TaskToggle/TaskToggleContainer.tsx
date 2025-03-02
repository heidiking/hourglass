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

  const [isActive, setIsActive] = useState<boolean>(false);
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);
  const [focusStartTime, setFocusStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [settings, setSettings] = useState<TimeTrackerSettings>(defaultSettings);

  useEffect(() => {
    const storedSites = localStorage.getItem('blockedSites');
    if (storedSites) {
      setBlockedSites(JSON.parse(storedSites));
    }

    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      localStorage.setItem('timeTrackerSettings', JSON.stringify(defaultSettings));
    }

    const focusStatus = localStorage.getItem('focusActive');
    const startTimeStr = localStorage.getItem('focusStartTime');
    
    if (focusStatus === 'true' && startTimeStr) {
      const startTime = new Date(startTimeStr);
      setFocusStartTime(startTime);
      setIsActive(true);
      startActivity('Focus Mode');
    }
  }, []);

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
    console.log("Opening focus mode settings");
  }, []);

  useEffect(() => {
    if (earningsTrackerOpen) {
      const projectManagerTrigger = document.getElementById('project-manager-trigger');
      if (projectManagerTrigger) {
        projectManagerTrigger.click();
        
        setTimeout(() => {
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
      setEarningsTrackerOpen(false);
    }
  }, [earningsTrackerOpen, setEarningsTrackerOpen]);

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
                  className={`p-3 ${isButtonActive(button.id) ? 'bg-white text-black' : button.id === 'projects' ? 'bg-white text-black' : 'bg-black/30 text-white'} rounded-full hover:bg-black/50 hover:text-white transition-colors flex items-center justify-center w-12 h-12`}
                  aria-label={button.label || button.id}
                  id={button.id === 'projects' ? 'project-manager-trigger' : undefined}
                >
                  {button.icon}
                </button>
              </DialogTrigger>
              
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
