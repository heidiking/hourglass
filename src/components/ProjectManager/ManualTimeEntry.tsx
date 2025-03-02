
import React from 'react';
import { Plus, DollarSign, Save, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Project, ManualActivity } from './types';

interface ManualTimeEntryProps {
  editingProject: Project;
  onUpdateProject: (updatedProject: Project) => void;
  editingActivity: ManualActivity | null;
  setEditingActivity: (activity: ManualActivity | null) => void;
}

const ManualTimeEntry: React.FC<ManualTimeEntryProps> = ({ 
  editingProject, 
  onUpdateProject,
  editingActivity,
  setEditingActivity
}) => {
  const [newActivityName, setNewActivityName] = React.useState("");
  const [newActivityTime, setNewActivityTime] = React.useState("1");
  const [newActivityTimeUnit, setNewActivityTimeUnit] = React.useState("minute");
  const [activityDate, setActivityDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [newActivityEarnings, setNewActivityEarnings] = React.useState("");

  // Set form values when editingActivity changes
  React.useEffect(() => {
    if (editingActivity) {
      setNewActivityName(editingActivity.name);
      
      // Convert the duration back to the appropriate unit
      let duration = editingActivity.duration;
      let unit = "minute";
      let value = Math.round(duration / (60 * 1000));
      
      if (duration >= 60 * 60 * 1000) {
        value = Math.round(duration / (60 * 60 * 1000));
        unit = "hour";
      } else if (duration >= 24 * 60 * 60 * 1000) {
        value = Math.round(duration / (24 * 60 * 60 * 1000));
        unit = "day";
      }
      
      setNewActivityTime(value.toString());
      setNewActivityTimeUnit(unit);
      setActivityDate(editingActivity.date);
      setNewActivityEarnings(editingActivity.earnings ? editingActivity.earnings.toString() : "");
    } else {
      // Reset form for new entry
      setNewActivityName("");
      setNewActivityTime("1");
      setNewActivityTimeUnit("minute");
      setActivityDate(new Date().toISOString().split('T')[0]);
      setNewActivityEarnings("");
    }
  }, [editingActivity]);

  const addManualActivity = () => {
    if (!editingProject || !newActivityName.trim()) return;
    
    let durationMs = parseInt(newActivityTime) * 60 * 1000;
    if (newActivityTimeUnit === "hour") {
      durationMs = durationMs * 60;
    } else if (newActivityTimeUnit === "day") {
      durationMs = durationMs * 60 * 24;
    }
    
    const earnings = newActivityEarnings.trim() ? parseFloat(newActivityEarnings) : undefined;
    
    if (editingActivity) {
      // Update existing activity
      const updatedActivities = editingProject.manualActivities.map(activity => {
        if (activity.id === editingActivity.id) {
          return {
            ...activity,
            name: newActivityName,
            duration: durationMs,
            date: activityDate,
            earnings: earnings,
          };
        }
        return activity;
      });
      
      // Recalculate total earnings
      const totalEarnings = updatedActivities.reduce((total, activity) => 
        total + (activity.earnings || 0), 0);
      
      const updatedProject = {
        ...editingProject,
        manualActivities: updatedActivities,
        earnings: totalEarnings,
      };
      
      onUpdateProject(updatedProject);
      setEditingActivity(null);
      toast.success("Time entry updated");
    } else {
      // Add new activity
      const newActivity: ManualActivity = {
        id: Date.now().toString(),
        name: newActivityName,
        duration: durationMs,
        date: activityDate,
        tags: [],
        earnings: earnings,
      };
      
      // Update project total earnings if this activity has earnings
      const updatedManualActivities = [...(editingProject.manualActivities || []), newActivity];
      const updatedEarnings = updatedManualActivities.reduce((total, activity) => 
        total + (activity.earnings || 0), 0);
      
      const updatedProject = {
        ...editingProject,
        manualActivities: updatedManualActivities,
        earnings: updatedEarnings,
      };
      
      onUpdateProject(updatedProject);
      setNewActivityName("");
      setNewActivityTime("1");
      setNewActivityEarnings("");
      
      toast.success("Manual activity added");
    }
  };

  const cancelEditing = () => {
    setEditingActivity(null);
    setNewActivityName("");
    setNewActivityTime("1");
    setNewActivityTimeUnit("minute");
    setActivityDate(new Date().toISOString().split('T')[0]);
    setNewActivityEarnings("");
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {editingActivity ? "Edit Time Entry" : "Add Manual Time Entry"}
      </h3>
      <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <Input
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
          placeholder="Activity name"
          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 mb-3"
        />
        
        <div className="grid grid-cols-3 gap-3 mb-3">
          <Input
            type="date"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
          />
          
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={newActivityTime}
              onChange={(e) => setNewActivityTime(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 w-20"
              min="0"
            />
            
            <select 
              value={newActivityTimeUnit}
              onChange={(e) => setNewActivityTimeUnit(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded px-2 py-2 flex-1"
            >
              <option value="minute">M</option>
              <option value="hour">H</option>
              <option value="day">D</option>
            </select>
          </div>
          
          <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-2">
            <DollarSign size={16} className="text-green-500" />
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
        
        {editingActivity ? (
          <div className="flex gap-2">
            <Button 
              onClick={addManualActivity}
              variant="outline" 
              className="border-gray-300 flex-1 bg-white text-black hover:bg-white/90 hover:text-black"
            >
              <Save size={14} className="mr-1" />
              Save Changes
            </Button>
            <Button 
              onClick={cancelEditing}
              variant="outline" 
              className="border-gray-300 bg-white text-black hover:bg-white/90 hover:text-black"
            >
              <X size={14} className="mr-1" />
              Cancel
            </Button>
          </div>
        ) : (
          <Button 
            onClick={addManualActivity} 
            variant="outline" 
            className="border-gray-300 w-full bg-white text-black hover:bg-white/90 hover:text-black"
          >
            <Plus size={14} className="mr-1" />
            Add Time Entry
          </Button>
        )}
      </div>
    </div>
  );
};

export default ManualTimeEntry;
