
import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { type ToolButton } from './types';
import { Settings, CheckSquare, Scroll, Shield, Clock } from 'lucide-react';

interface TaskToggleContextType {
  toolButtons: ToolButton[];
  setToolButtons: React.Dispatch<React.SetStateAction<ToolButton[]>>;
  settingsOpen: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tasksOpen: boolean;
  setTasksOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goalArchiveOpen: boolean;
  setGoalArchiveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  timeTrackerOpen: boolean;
  setTimeTrackerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  earningsTrackerOpen: boolean;
  setEarningsTrackerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  focusModeOpen: boolean;
  setFocusModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  draggedItem: string | null;
  setDraggedItem: React.Dispatch<React.SetStateAction<string | null>>;
  handleDragStart: (id: string) => void;
  handleDragOver: (e: React.DragEvent, id: string) => void;
  handleDragEnd: () => void;
}

const TaskToggleContext = createContext<TaskToggleContextType | undefined>(undefined);

export const TaskToggleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [goalArchiveOpen, setGoalArchiveOpen] = useState(false);
  const [timeTrackerOpen, setTimeTrackerOpen] = useState(false);
  const [earningsTrackerOpen, setEarningsTrackerOpen] = useState(false);
  const [focusModeOpen, setFocusModeOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [toolButtons, setToolButtons] = useState<ToolButton[]>([]);

  const initialButtonsCreator = useCallback(() => [
    {
      id: 'settings',
      icon: <Settings size={24} className="text-black" />,
      label: 'Settings',
      onClick: () => setSettingsOpen(true),
    },
    {
      id: 'tasks',
      icon: <CheckSquare size={24} className="text-black" />,
      label: 'Tasks',
      onClick: () => setTasksOpen(true),
    },
    {
      id: 'archive',
      icon: <Scroll size={24} className="text-black" />,
      label: 'Archive',
      onClick: () => setGoalArchiveOpen(true),
    },
    {
      id: 'tracker',
      icon: <Clock size={24} className="text-black" />,
      label: 'Tracker',
      onClick: () => setTimeTrackerOpen(true),
    },
    {
      id: 'focus',
      icon: <Shield size={24} className="text-black" />,
      label: 'Focus',
      onClick: () => setFocusModeOpen(true),
    }
  ], [setSettingsOpen, setTasksOpen, setGoalArchiveOpen, setTimeTrackerOpen, setFocusModeOpen]);

  useEffect(() => {
    const initialButtons = initialButtonsCreator();
    
    const storedOrder = localStorage.getItem('taskToggleOrder');
    if (storedOrder) {
      try {
        const orderIds = JSON.parse(storedOrder);
        const filteredOrderIds = orderIds.filter(id => id !== 'earnings');
        const orderedButtons = filteredOrderIds
          .map(id => initialButtons.find(button => button.id === id))
          .filter(Boolean);
        
        initialButtons.forEach(button => {
          if (!orderedButtons.some(b => b.id === button.id)) {
            orderedButtons.push(button);
          }
        });
        
        setToolButtons(orderedButtons);
      } catch (e) {
        console.error('Error parsing stored order', e);
        setToolButtons(initialButtons);
      }
    } else {
      setToolButtons(initialButtons);
    }
  }, [initialButtonsCreator]);

  useEffect(() => {
    const orderIds = toolButtons.map(button => button.id);
    localStorage.setItem('taskToggleOrder', JSON.stringify(orderIds));
  }, [toolButtons]);

  const handleDragStart = useCallback((id: string) => {
    setDraggedItem(id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== id) {
      const draggedIndex = toolButtons.findIndex(button => button.id === draggedItem);
      const hoverIndex = toolButtons.findIndex(button => button.id === id);
      
      if (draggedIndex !== -1 && hoverIndex !== -1) {
        const newButtons = [...toolButtons];
        const draggedButton = newButtons[draggedIndex];
        newButtons.splice(draggedIndex, 1);
        newButtons.splice(hoverIndex, 0, draggedButton);
        setToolButtons(newButtons);
      }
    }
  }, [draggedItem, toolButtons]);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    toolButtons,
    setToolButtons,
    settingsOpen,
    setSettingsOpen,
    tasksOpen,
    setTasksOpen,
    goalArchiveOpen,
    setGoalArchiveOpen,
    timeTrackerOpen,
    setTimeTrackerOpen,
    earningsTrackerOpen,
    setEarningsTrackerOpen,
    focusModeOpen,
    setFocusModeOpen,
    draggedItem,
    setDraggedItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  }), [
    toolButtons,
    settingsOpen,
    tasksOpen,
    goalArchiveOpen,
    timeTrackerOpen,
    earningsTrackerOpen,
    focusModeOpen,
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  ]);

  return (
    <TaskToggleContext.Provider value={contextValue}>
      {children}
    </TaskToggleContext.Provider>
  );
};

export const useTaskToggle = () => {
  const context = useContext(TaskToggleContext);
  if (context === undefined) {
    throw new Error('useTaskToggle must be used within a TaskToggleProvider');
  }
  return context;
};
