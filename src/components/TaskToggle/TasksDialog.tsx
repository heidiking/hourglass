
import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTaskToggle } from './TaskToggleContext';
import { Task } from './types';

const TasksDialog = () => {
  const { tasksOpen, setTasksOpen } = useTaskToggle();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('dailyTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

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

export default TasksDialog;
