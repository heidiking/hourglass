
import React, { useState } from 'react';
import { Clock, Trash2, DollarSign, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { formatFocusTime } from '@/utils/timeTracking';
import { ActivitySession } from '@/utils/timeTracking';
import { Project, ManualActivity } from './types';
import { formatCurrency } from './utils';

interface ActivityListProps {
  editingProject: Project;
  activities: ActivitySession[];
  onUpdateProject: (updatedProject: Project) => void;
  selectedActivities: string[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>;
  saveActivityAssociations: () => void;
  setEditingActivity: (activity: ManualActivity | null) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  editingProject,
  activities,
  onUpdateProject,
  selectedActivities,
  setSelectedActivities,
  saveActivityAssociations,
  setEditingActivity
}) => {
  const toggleActivitySelection = (activityId: string) => {
    if (!editingProject) return;
    
    const isSelected = selectedActivities.includes(activityId);
    let updatedSelection;
    
    if (isSelected) {
      updatedSelection = selectedActivities.filter(id => id !== activityId);
    } else {
      updatedSelection = [...selectedActivities, activityId];
    }
    
    setSelectedActivities(updatedSelection);
  };

  const removeManualActivity = (activityId: string) => {
    if (!editingProject || !editingProject.manualActivities) return;
    
    const activityToRemove = editingProject.manualActivities.find(a => a.id === activityId);
    const updatedEarnings = editingProject.earnings - (activityToRemove?.earnings || 0);
    
    const updatedProject = {
      ...editingProject,
      manualActivities: editingProject.manualActivities.filter(a => a.id !== activityId),
      earnings: updatedEarnings >= 0 ? updatedEarnings : 0,
    };
    
    onUpdateProject(updatedProject);
  };

  const editManualActivity = (activity: ManualActivity) => {
    setEditingActivity(activity);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm text-black">Associated Activities</label>
          <Button 
            onClick={saveActivityAssociations} 
            size="sm" 
            variant="outline" 
            className="border-gray-700 bg-white hover:bg-white/90"
          >
            <span className="text-black">Save Associations</span>
          </Button>
        </div>
        
        <div className="max-h-[20vh] overflow-y-auto bg-gray-100 rounded-md p-2">
          {activities.length > 0 ? (
            <div className="space-y-2">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`
                    p-2 rounded-md flex items-center
                    ${selectedActivities.includes(activity.id) 
                      ? 'bg-blue-100 border border-blue-300' 
                      : 'bg-white'}
                    cursor-pointer
                  `}
                  onClick={() => toggleActivitySelection(activity.id)}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedActivities.includes(activity.id)}
                    onChange={() => toggleActivitySelection(activity.id)}
                    className="mr-2"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-black">{activity.appName}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(activity.startTime).toLocaleString()} • {formatFocusTime(activity.duration)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-3">No activities tracked yet</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-black">Manual Time Entries</label>
        
        <div className="max-h-[30vh] overflow-y-auto bg-gray-100 rounded-md p-2">
          {editingProject.manualActivities && editingProject.manualActivities.length > 0 ? (
            <div className="space-y-2">
              {editingProject.manualActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="p-2 bg-white rounded-md flex items-center justify-between"
                >
                  <div className="flex items-center flex-1">
                    <Clock size={16} className="mr-2 text-purple-600" />
                    <div>
                      <div className="font-medium text-black">{activity.name}</div>
                      <div className="text-xs text-gray-600 flex items-center">
                        <span>{new Date(activity.date).toLocaleDateString()} • </span>
                        <span>{formatFocusTime(activity.duration)}</span>
                        {activity.earnings && (
                          <span className="ml-2 text-green-600">
                            <DollarSign size={12} className="inline text-green-600" />
                            {formatCurrency(activity.earnings)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:text-blue-700 mr-1"
                      onClick={() => editManualActivity(activity)}
                    >
                      <Edit size={14} className="text-blue-600" />
                      <span className="sr-only">Edit activity</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={() => removeManualActivity(activity.id)}
                    >
                      <Trash2 size={14} className="text-red-600" />
                      <span className="sr-only">Delete activity</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-3">No manual time entries yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
