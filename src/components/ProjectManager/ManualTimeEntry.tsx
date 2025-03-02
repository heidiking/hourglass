import React from 'react';
import { Plus, DollarSign, Save, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Project, ManualActivity } from './types';
import { Label } from "@/components/ui/label";

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

  React.useEffect(() => {
    if (editingActivity) {
      setNewActivityName(editingActivity.name);
      
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
      
      const totalEarnings = updatedActivities.reduce((total, activity) => 
        total + (activity.earnings || 0), 0
      );
      
      const updatedProject = {
        ...editingProject,
        manualActivities: updatedActivities,
        earnings: totalEarnings > 0 ? totalEarnings : editingProject.earnings,
      };
      
      onUpdateProject(updatedProject);
      setEditingActivity(null);
      toast.success("Time entry updated");
    } else {
      const newActivity: ManualActivity = {
        id: Date.now().toString(),
        name: newActivityName,
        duration: durationMs,
        date: activityDate,
        tags: [],
        earnings: earnings,
      };
      
      const updatedManualActivities = [...(editingProject.manualActivities || []), newActivity];
      const updatedEarnings = updatedManualActivities.reduce((total, activity) => 
        total + (activity.earnings || 0), 0
      );
      
      const updatedProject = {
        ...editingProject,
        manualActivities: updatedManualActivities,
        earnings: updatedEarnings > 0 ? updatedEarnings : editingProject.earnings,
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
      <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <Label htmlFor="activity-name" className="text-sm text-gray-700 dark:text-gray-300">Activity Name</Label>
          <Input
            id="activity-name"
            value={newActivityName}
            onChange={(e) => setNewActivityName(e.target.value)}
            placeholder="Activity name"
            className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label htmlFor="activity-date" className="text-sm text-gray-700 dark:text-gray-300">Date</Label>
            <Input
              id="activity-date"
              type="date"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity-duration" className="text-sm text-gray-700 dark:text-gray-300">Duration</Label>
            <div className="flex items-center gap-1">
              <Input
                id="activity-duration"
                type="number"
                value={newActivityTime}
                onChange={(e) => setNewActivityTime(e.target.value)}
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black w-20"
                min="0"
              />
              
              <select 
                id="activity-unit"
                value={newActivityTimeUnit}
                onChange={(e) => setNewActivityTimeUnit(e.target.value)}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black rounded px-2 py-2 flex-1"
              >
                <option value="minute">M</option>
                <option value="hour">H</option>
                <option value="day">D</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity-earnings" className="text-sm text-gray-700 dark:text-gray-300">Earnings</Label>
            <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-2">
              <DollarSign size={16} className="text-green-500" />
              <Input
                id="activity-earnings"
                type="number"
                step="0.01"
                min="0"
                value={newActivityEarnings}
                onChange={(e) => setNewActivityEarnings(e.target.value)}
                className="border-0 bg-transparent h-10 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black w-full"
                placeholder="Amount"
              />
            </div>
          </div>
        </div>
        
        {editingActivity ? (
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={addManualActivity}
              variant="outline" 
              className="border-gray-300 flex-1 bg-white text-black hover:bg-white/90 hover:text-black"
            >
              <Save size={14} className="mr-1" />
              <span className="text-black">Save Changes</span>
            </Button>
            <Button 
              onClick={cancelEditing}
              variant="outline" 
              className="border-gray-300 bg-white text-black hover:bg-white/90 hover:text-black"
            >
              <X size={14} className="mr-1" />
              <span className="text-black">Cancel</span>
            </Button>
          </div>
        ) : (
          <Button 
            onClick={addManualActivity} 
            variant="outline" 
            className="border-gray-300 w-full bg-white text-black hover:bg-white/90 hover:text-black mt-2"
          >
            <Plus size={14} className="mr-1" />
            <span className="text-black">Add Time Entry</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ManualTimeEntry;
