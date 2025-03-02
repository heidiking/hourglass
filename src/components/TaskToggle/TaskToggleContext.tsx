
import React, { createContext, useState, useEffect, useContext } from 'react';
import { type ToolButton } from './types';
import { Settings, CheckSquare, Scroll } from 'lucide-react';

interface TaskToggleContextType {
  toolButtons: ToolButton[];
  setToolButtons: React.Dispatch<React.SetStateAction<ToolButton[]>>;
  settingsOpen: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tasksOpen: boolean;
  setTasksOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goalArchiveOpen: boolean;
  setGoalArchiveOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [toolButtons, setToolButtons] = useState<ToolButton[]>([]);

  useEffect(() => {
    // Initialize tool buttons
    const initialButtons: ToolButton[] = [
      {
        id: 'settings',
        icon: <Settings size={24} />,
        label: 'Settings',
        onClick: () => setSettingsOpen(true),
      },
      {
        id: 'tasks',
        icon: <CheckSquare size={24} />,
        label: 'Tasks',
        onClick: () => setTasksOpen(true),
      },
      {
        id: 'archive',
        icon: <Scroll size={24} />,
        label: 'Archive',
        onClick: () => setGoalArchiveOpen(true),
      }
    ];
    
    // Load custom order from localStorage if it exists
    const storedOrder = localStorage.getItem('taskToggleOrder');
    if (storedOrder) {
      try {
        const orderIds = JSON.parse(storedOrder);
        // Reorder based on stored order
        const orderedButtons = orderIds
          .map(id => initialButtons.find(button => button.id === id))
          .filter(Boolean);
        
        // Add any new buttons that might not be in the stored order
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
  }, []);

  useEffect(() => {
    // Save the current order of buttons when it changes
    const orderIds = toolButtons.map(button => button.id);
    localStorage.setItem('taskToggleOrder', JSON.stringify(orderIds));
  }, [toolButtons]);

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
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
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <TaskToggleContext.Provider
      value={{
        toolButtons,
        setToolButtons,
        settingsOpen,
        setSettingsOpen,
        tasksOpen,
        setTasksOpen,
        goalArchiveOpen,
        setGoalArchiveOpen,
        draggedItem,
        setDraggedItem,
        handleDragStart,
        handleDragOver,
        handleDragEnd
      }}
    >
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
