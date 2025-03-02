
import React from 'react';
import { toast } from "sonner";
import { Project, ManualActivity } from '../types';
import ActivityForm from './ActivityForm';
import ActionButtons from './ActionButtons';
import { convertToMilliseconds, parseTimeFromMilliseconds } from './timeUtils';

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
      
      const { value, unit } = parseTimeFromMilliseconds(editingActivity.duration);
      
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
    
    const durationMs = convertToMilliseconds(newActivityTime, newActivityTimeUnit);
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
        <ActivityForm 
          newActivityName={newActivityName}
          setNewActivityName={setNewActivityName}
          newActivityTime={newActivityTime}
          setNewActivityTime={setNewActivityTime}
          newActivityTimeUnit={newActivityTimeUnit}
          setNewActivityTimeUnit={setNewActivityTimeUnit}
          activityDate={activityDate}
          setActivityDate={setActivityDate}
          newActivityEarnings={newActivityEarnings}
          setNewActivityEarnings={setNewActivityEarnings}
        />
        
        <ActionButtons 
          editingActivity={editingActivity}
          addManualActivity={addManualActivity}
          cancelEditing={cancelEditing}
        />
      </div>
    </div>
  );
};

export default ManualTimeEntry;
