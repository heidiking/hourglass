
import React, { useState, useEffect } from 'react';
import { CheckSquare, Settings, Clock, Check, Plus, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import ProjectManager from './ProjectManager';
import FocusBlocker from './FocusBlocker';
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

const TaskToggle = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [autoTrackEnabled, setAutoTrackEnabled] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [customQuote, setCustomQuote] = useState('');

  useEffect(() => {
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

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogTrigger asChild>
          <button
            className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors flex items-center"
            aria-label="Settings"
          >
            <Settings size={24} className="mr-2" />
            <span>Settings</span>
          </button>
        </DialogTrigger>
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
              className="bg-black/20 hover:bg-black/30 text-white rounded-md py-2 mt-2"
            >
              Save Settings
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={tasksOpen} onOpenChange={setTasksOpen}>
        <DialogTrigger asChild>
          <button
            onClick={handleToggle}
            className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors flex items-center"
            aria-label="Daily Tasks"
          >
            <CheckSquare size={24} className="mr-2" />
            <span>Tasks</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Daily Tasks</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add a new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <Button onClick={handleAddTask} size="sm">
                <Plus size={16} />
              </Button>
            </div>
            
            <div className="space-y-2 max-h-[40vh] overflow-y-auto">
              {tasks.length === 0 ? (
                <p className="text-center text-gray-500 italic">No tasks for today. Add one above!</p>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-2 p-2 bg-black/10 rounded">
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
                      className="text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <ProjectManager />
    </div>
  );
};

export default TaskToggle;
