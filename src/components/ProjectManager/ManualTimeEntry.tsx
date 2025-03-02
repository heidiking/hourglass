
import React from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Project, ManualActivity } from './types';

interface ManualTimeEntryProps {
  editingProject: Project;
  onUpdateProject: (updatedProject: Project) => void;
}

const ManualTimeEntry: React.FC<ManualTimeEntryProps> = ({ 
  editingProject, 
  onUpdateProject 
}) => {
  const [newActivityName, setNewActivityName] = React.useState("");
  const [newActivityTime, setNewActivityTime] = React.useState("1");
  const [newActivityTimeUnit, setNewActivityTimeUnit] = React.useState("minute");
  const [activityDate, setActivityDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [newActivityEarnings, setNewActivityEarnings] = React.useState("");

  const addManualActivity = () => {
    if (!editingProject || !newActivityName.trim()) return;
    
    let durationMs = parseInt(newActivityTime) * 60 * 1000;
    if (newActivityTimeUnit === "hour") {
      durationMs = durationMs * 60;
    } else if (newActivityTimeUnit === "day") {
      durationMs = durationMs * 60 * 24;
    }
    
    const earnings = newActivityEarnings.trim() ? parseFloat(newActivityEarnings) : undefined;
    
    const newActivity: ManualActivity = {
      id: Date.now().toString(),
      name: newActivityName,
      duration: durationMs,
      date: activityDate,
      tags: [],
      earnings: earnings,
    };
    
    // Update project total earnings if this activity has earnings
    const updatedEarnings = editingProject.earnings + (earnings || 0);
    
    const updatedProject = {
      ...editingProject,
      manualActivities: [...(editingProject.manualActivities || []), newActivity],
      earnings: updatedEarnings,
    };
    
    // If we have a total project value, recalculate the hourly rate
    if (updatedProject.totalEarnings) {
      // We need to calculate the total time now that we've added the new activity
      const totalDuration = updatedProject.manualActivities.reduce((total, activity) => 
        total + activity.duration, 0);
        
      if (totalDuration > 0) {
        updatedProject.hourlyRate = (updatedProject.totalEarnings / (totalDuration / (1000 * 60 * 60)));
      }
    }
    
    onUpdateProject(updatedProject);
    setNewActivityName("");
    setNewActivityTime("1");
    setNewActivityEarnings("");
    
    toast.success("Manual activity added");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-white/70">Add Manual Time Entry</label>
      <div className="space-y-2 bg-black/20 p-2 rounded">
        <Input
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
          placeholder="Activity name"
          className="bg-black/30 border-gray-700 text-white mb-2"
        />
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <Input
            type="date"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            className="bg-black/30 border-gray-700 text-white"
          />
          
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={newActivityTime}
              onChange={(e) => setNewActivityTime(e.target.value)}
              className="bg-black/30 border-gray-700 text-white w-20"
              min="0"
            />
            
            <select 
              value={newActivityTimeUnit}
              onChange={(e) => setNewActivityTimeUnit(e.target.value)}
              className="bg-black/30 border-gray-700 text-white rounded px-2 py-1 flex-1"
            >
              <option value="minute">M</option>
              <option value="hour">H</option>
              <option value="day">D</option>
            </select>
          </div>
          
          <div className="flex items-center bg-black/30 border border-gray-700 rounded px-2">
            <DollarSign size={16} className="text-green-300" />
            <Input
              type="number"
              step="0.01"
              min="0"
              value={newActivityEarnings}
              onChange={(e) => setNewActivityEarnings(e.target.value)}
              className="border-0 bg-transparent h-10 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Earnings"
            />
          </div>
        </div>
        
        <Button 
          onClick={addManualActivity} 
          variant="outline" 
          className="border-gray-700 text-black w-full bg-white hover:bg-white/90 hover:text-black"
        >
          <Plus size={14} className="mr-1 text-black" />
          Add Time Entry
        </Button>
      </div>
    </div>
  );
};

export default ManualTimeEntry;
