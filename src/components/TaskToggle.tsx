
import React, { useState, useEffect } from 'react';
import { CheckSquare, Settings, Clock, Check, Plus, Trash2, Scroll } from 'lucide-react';
import { toast } from "sonner";
import ProjectManager from './ProjectManager';
import FocusBlocker from './FocusBlocker';
import GoalArchive from './GoalArchive';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type ToolButton = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  component: React.ReactNode;
};

const TaskToggle = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [autoTrackEnabled, setAutoTrackEnabled] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [customQuote, setCustomQuote] = useState('');
  const [goalArchiveOpen, setGoalArchiveOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  // Initialize the tool buttons with default order
  const [toolButtons, setToolButtons] = useState<ToolButton[]>([]);

  useEffect(() => {
    // Initialize tool buttons
    const initialButtons: ToolButton[] = [
      {
        id: 'settings',
        icon: <Settings size={24} />,
        label: 'Settings',
        onClick: () => setSettingsOpen(true),
        component: renderSettingsDialog()
      },
      {
        id: 'tasks',
        icon: <CheckSquare size={24} />,
        label: 'Tasks',
        onClick: () => setTasksOpen(true),
        component: renderTasksDialog()
      },
      {
        id: 'archive',
        icon: <Scroll size={24} />,
        label: 'Archive',
        onClick: () => setGoalArchiveOpen(true),
        component: <GoalArchive showLabel={true} className="hidden" />
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

    // Load settings and tasks from localStorage
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setAutoTrackEnabled(settings.autoTrackEnabled || false);
      setStartTime(settings.startTime || '09:00');
      setEndTime(settings.endTime || '17:00');
      setCustomQuote(settings.customQuote || '');
    }
    
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('dailyTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    const settings = {
      autoTrackEnabled,
      startTime,
      endTime,
      customQuote
    };
    localStorage.setItem('timeTrackerSettings', JSON.stringify(settings));
  }, [autoTrackEnabled, startTime, endTime, customQuote]);

  useEffect(() => {
    localStorage.setItem('dailyTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // Save the current order of buttons when it changes
    const orderIds = toolButtons.map(button => button.id);
    localStorage.setItem('taskToggleOrder', JSON.stringify(orderIds));
  }, [toolButtons]);

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggle = () => {
    setTasksOpen(true);
  };

  const handleTimeSettingSave = () => {
    toast("Settings saved!");
    setSettingsOpen(false);
  };

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

  // Render functions for each component
  const renderSettingsDialog = () => {
    return (
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Time Tracking</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-track" 
                  checked={autoTrackEnabled}
                  onCheckedChange={setAutoTrackEnabled}
                />
                <Label htmlFor="auto-track">Auto-track documents daily</Label>
              </div>
              
              {autoTrackEnabled && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input 
                      id="start-time" 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input 
                      id="end-time" 
                      type="time" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Custom Quote</h3>
              <div className="space-y-2">
                <Label htmlFor="custom-quote">Your Inspirational Quote</Label>
                <Input
                  id="custom-quote"
                  placeholder="Enter your own inspirational quote"
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                />
                <p className="text-xs text-gray-500">This quote will be included in the daily rotation</p>
              </div>
            </div>
            
            <button 
              onClick={handleTimeSettingSave} 
              className="bg-black/20 hover:bg-black/30 text-white rounded-md py-2 mt-2 flex items-center justify-center"
            >
              <Check size={18} className="mr-2" />
              Save Settings
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderTasksDialog = () => {
    return (
      <Dialog open={tasksOpen} onOpenChange={setTasksOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Daily Tasks</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-3">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add a new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <Button onClick={handleAddTask} size="sm" className="flex items-center">
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </div>
            
            <div className="space-y-1 max-h-[40vh] overflow-y-auto mt-1">
              {tasks.length === 0 ? (
                <p className="text-center text-gray-500 italic">No tasks for today. Add one above!</p>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-2 p-1.5 bg-black/10 rounded">
                    <Checkbox 
                      id={`task-${task.id}`} 
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)}
                    />
                    <Label 
                      htmlFor={`task-${task.id}`}
                      className={`flex-1 ${task.completed ? 'line-through opacity-50' : ''}`}
                    >
                      {task.text}
                    </Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-destructive flex items-center h-7 px-2"
                    >
                      <Trash2 size={16} />
                      <span className="ml-1 text-xs">Remove</span>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <div className="flex flex-col gap-2">
        {toolButtons.map((button) => (
          <div 
            key={button.id}
            draggable 
            onDragStart={() => handleDragStart(button.id)}
            onDragOver={(e) => handleDragOver(e, button.id)}
            onDragEnd={handleDragEnd}
            className="cursor-move"
          >
            <Dialog open={
              (button.id === 'settings' && settingsOpen) || 
              (button.id === 'tasks' && tasksOpen) ||
              (button.id === 'archive' && goalArchiveOpen)
            } 
            onOpenChange={(open) => {
              if (button.id === 'settings') setSettingsOpen(open);
              if (button.id === 'tasks') setTasksOpen(open);
              if (button.id === 'archive') setGoalArchiveOpen(open);
            }}>
              <DialogTrigger asChild>
                <button
                  onClick={button.onClick}
                  className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors group"
                  aria-label={button.label}
                >
                  {button.icon}
                  <span className="sr-only opacity-0 group-hover:opacity-100 transition-opacity text-xs absolute mt-1 ml-1">
                    {button.label}
                  </span>
                </button>
              </DialogTrigger>
              {/* The dialog content is handled by respective components */}
            </Dialog>
          </div>
        ))}
      </div>
      
      {/* Render goal archive dialog */}
      <Dialog open={goalArchiveOpen} onOpenChange={setGoalArchiveOpen}>
        <DialogContent className="sm:max-w-md bg-black/70 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-light mb-4">Goal History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[50vh] overflow-y-auto">
            {/* Goal archive content */}
            {/* This content is rendered from the GoalArchive component */}
            <GoalArchive showLabel={true} className="hidden" />
          </div>
        </DialogContent>
      </Dialog>
      
      <ProjectManager />
    </div>
  );
};

export default TaskToggle;
