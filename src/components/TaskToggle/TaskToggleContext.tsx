
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings, ListTodo, Archive, Shield, Clock, Folder } from 'lucide-react';
import { ToolButton } from './types';

interface TaskToggleContextType {
  toolButtons: ToolButton[];
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
  settingsOpen: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tasksOpen: boolean;
  setTasksOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goalArchiveOpen: boolean;
  setGoalArchiveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  focusModeOpen: boolean;
  setFocusModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  timeTrackerOpen: boolean;
  setTimeTrackerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectsOpen: boolean;
  setProjectsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  earningsTrackerOpen: boolean;
  setEarningsTrackerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleButtonsOrder: (buttons: ToolButton[]) => void;
  handleDragStart: (id: string) => void;
  handleDragOver: (e: React.DragEvent, targetId: string) => void;
  handleDragEnd: () => void;
}

export const TaskToggleContext = createContext<TaskToggleContextType | null>(null);

export const useTaskToggle = () => {
  const context = useContext(TaskToggleContext);
  if (!context) {
    throw new Error('useTaskToggle must be used within a TaskToggleProvider');
  }
  return context;
};

export const TaskToggleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toggled, setToggled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [goalArchiveOpen, setGoalArchiveOpen] = useState(false);
  const [focusModeOpen, setFocusModeOpen] = useState(false);
  const [timeTrackerOpen, setTimeTrackerOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [earningsTrackerOpen, setEarningsTrackerOpen] = useState(false);
  
  // For drag and drop reordering
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  
  // Default tool buttons - Projects is now first in the order
  const defaultButtons: ToolButton[] = [
    {
      id: 'projects',
      icon: <Folder size={20} />,
      label: 'Projects',
      onClick: () => setProjectsOpen(true)
    },
    {
      id: 'tracker',
      icon: <Clock size={20} />,
      label: 'Time Tracker',
      onClick: () => setTimeTrackerOpen(true)
    },
    {
      id: 'focus',
      icon: <Shield size={20} />,
      label: 'Focus Mode',
      onClick: () => setFocusModeOpen(true)
    },
    {
      id: 'archive',
      icon: <Archive size={20} />,
      label: 'Goal Archive',
      onClick: () => setGoalArchiveOpen(true)
    },
    {
      id: 'tasks',
      icon: <ListTodo size={20} />,
      label: 'Tasks',
      onClick: () => setTasksOpen(true)
    },
    {
      id: 'settings',
      icon: <Settings size={20} />,
      label: 'Settings',
      onClick: () => setSettingsOpen(true)
    }
  ];
  
  // State for tool buttons that can be reordered
  const [toolButtons, setToolButtons] = useState<ToolButton[]>(() => {
    const saved = localStorage.getItem('toolButtonsOrder');
    return saved ? JSON.parse(saved) : defaultButtons;
  });
  
  // Save button order to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('toolButtonsOrder', JSON.stringify(toolButtons));
  }, [toolButtons]);
  
  const handleButtonsOrder = (buttons: ToolButton[]) => {
    setToolButtons(buttons);
  };
  
  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };
  
  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItemId || draggedItemId === targetId) return;
    
    const draggedItemIndex = toolButtons.findIndex(button => button.id === draggedItemId);
    const targetItemIndex = toolButtons.findIndex(button => button.id === targetId);
    
    if (draggedItemIndex !== -1 && targetItemIndex !== -1) {
      const newButtons = [...toolButtons];
      const [draggedItem] = newButtons.splice(draggedItemIndex, 1);
      newButtons.splice(targetItemIndex, 0, draggedItem);
      setToolButtons(newButtons);
    }
  };
  
  const handleDragEnd = () => {
    setDraggedItemId(null);
  };
  
  return (
    <TaskToggleContext.Provider value={{
      toolButtons,
      toggled,
      setToggled,
      settingsOpen,
      setSettingsOpen,
      tasksOpen,
      setTasksOpen,
      goalArchiveOpen,
      setGoalArchiveOpen,
      focusModeOpen,
      setFocusModeOpen,
      timeTrackerOpen,
      setTimeTrackerOpen,
      projectsOpen,
      setProjectsOpen,
      earningsTrackerOpen,
      setEarningsTrackerOpen,
      handleButtonsOrder,
      handleDragStart,
      handleDragOver,
      handleDragEnd
    }}>
      {children}
    </TaskToggleContext.Provider>
  );
};
