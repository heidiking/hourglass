
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Settings, ListTodo, Archive, Coins, Shield } from 'lucide-react';

interface TaskToggleContextType {
  toolButtons: {
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }[];
  settingsOpen: boolean;
  tasksOpen: boolean;
  goalArchiveOpen: boolean;
  earningsTrackerOpen: boolean;
  focusOpen: boolean;
  timeTrackerOpen: boolean; // Added missing property
  setSettingsOpen: (open: boolean) => void;
  setTasksOpen: (open: boolean) => void;
  setGoalArchiveOpen: (open: boolean) => void;
  setEarningsTrackerOpen: (open: boolean) => void;
  setFocusOpen: (open: boolean) => void;
  setTimeTrackerOpen: (open: boolean) => void; // Added missing property
  handleDragStart: (id: string) => void;
  handleDragOver: (e: React.DragEvent, id: string) => void;
  handleDragEnd: () => void;
}

const TaskToggleContext = createContext<TaskToggleContextType | undefined>(undefined);

export const useTaskToggle = () => {
  const context = useContext(TaskToggleContext);
  if (!context) {
    throw new Error('useTaskToggle must be used within a TaskToggleProvider');
  }
  return context;
};

interface TaskToggleProviderProps {
  children: ReactNode;
}

export const TaskToggleProvider: React.FC<TaskToggleProviderProps> = ({ children }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [goalArchiveOpen, setGoalArchiveOpen] = useState(false);
  const [earningsTrackerOpen, setEarningsTrackerOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);
  const [timeTrackerOpen, setTimeTrackerOpen] = useState(false); // Added missing state

  const [draggedButton, setDraggedButton] = useState<string | null>(null);

  const defaultOrder = ['settings', 'tasks', 'archive', 'earnings', 'focus'];
  const [buttonOrder, setButtonOrder] = useState<string[]>(() => {
    const savedOrder = localStorage.getItem('taskToggleButtonOrder');
    return savedOrder ? JSON.parse(savedOrder) : defaultOrder;
  });

  const handleButtonClick = (id: string) => {
    switch (id) {
      case 'settings':
        setSettingsOpen(true);
        break;
      case 'tasks':
        setTasksOpen(true);
        break;
      case 'archive':
        setGoalArchiveOpen(true);
        break;
      case 'earnings':
        setEarningsTrackerOpen(true);
        break;
      case 'focus':
        setFocusOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDragStart = (id: string) => {
    setDraggedButton(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedButton && draggedButton !== id) {
      const draggedIndex = buttonOrder.indexOf(draggedButton);
      const hoverIndex = buttonOrder.indexOf(id);
      
      if (draggedIndex !== -1 && hoverIndex !== -1) {
        const newOrder = [...buttonOrder];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(hoverIndex, 0, draggedButton);
        setButtonOrder(newOrder);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedButton(null);
  };

  const getButtonsInOrder = () => {
    return buttonOrder.map(id => {
      switch (id) {
        case 'settings':
          return {
            id,
            icon: <Settings size={18} />,
            label: 'Settings',
            onClick: () => handleButtonClick(id),
          };
        case 'tasks':
          return {
            id,
            icon: <ListTodo size={18} />,
            label: 'Tasks',
            onClick: () => handleButtonClick(id),
          };
        case 'archive':
          return {
            id,
            icon: <Archive size={18} />,
            label: 'Goals',
            onClick: () => handleButtonClick(id),
          };
        case 'earnings':
          return {
            id,
            icon: <Coins size={18} />,
            label: 'Earnings',
            onClick: () => handleButtonClick(id),
          };
        case 'focus':
          return {
            id,
            icon: <Shield size={18} />,
            label: 'Focus',
            onClick: () => handleButtonClick(id),
          };
        default:
          return {
            id: 'unknown',
            icon: <Settings size={18} />,
            label: 'Unknown',
            onClick: () => {},
          };
      }
    });
  };

  const toolButtons = getButtonsInOrder();

  useEffect(() => {
    localStorage.setItem('taskToggleButtonOrder', JSON.stringify(buttonOrder));
  }, [buttonOrder]);

  const value = {
    toolButtons,
    settingsOpen,
    tasksOpen,
    goalArchiveOpen,
    earningsTrackerOpen,
    focusOpen,
    timeTrackerOpen, // Added missing property
    setSettingsOpen,
    setTasksOpen,
    setGoalArchiveOpen,
    setEarningsTrackerOpen,
    setFocusOpen,
    setTimeTrackerOpen, // Added missing property
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };

  return (
    <TaskToggleContext.Provider value={value}>
      {children}
    </TaskToggleContext.Provider>
  );
};
