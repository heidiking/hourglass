
import React, { useState, useEffect } from 'react';
import { Plus, Link } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ActivitySession } from '@/utils/timeTracking/types';
import ActivityIcon from './ActivityIcon';
import { formatTimeDuration } from './utils';
import { useProjects } from './useProjects';

interface ActivityItemProps {
  activity: ActivitySession;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { projects, addActivityToProject, getProjectsForActivity } = useProjects();
  const assignedProjects = getProjectsForActivity(activity.id);
  
  return (
    <div className="p-3 bg-black/10 rounded-md mb-2">
      <div className="flex items-center">
        <ActivityIcon appName={activity.appName} />
        <div className="flex-1 min-w-0">
          <div className="truncate font-medium">{activity.appName}</div>
          <div className="text-xs text-gray-600">
            {new Date(activity.startTime).toLocaleString()} • {formatTimeDuration(activity.duration)}
          </div>
        </div>
      </div>
      
      {assignedProjects.length > 0 && (
        <div className="ml-6 mt-2">
          <div className="text-xs text-gray-600 flex items-center">
            <Link size={12} className="mr-1" /> 
            Assigned to project{assignedProjects.length > 1 ? 's' : ''}:
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {assignedProjects.map(project => (
              <div key={project.id} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {project.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-2 flex items-center">
        <span className="text-xs mr-2">Add to project:</span>
        <select 
          className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded px-2 py-1 flex-1"
          onChange={(e) => {
            if (e.target.value) {
              addActivityToProject(e.target.value, activity.id);
              e.target.value = ""; // Reset after selection
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Select...</option>
          {projects.map(project => (
            <option 
              key={project.id} 
              value={project.id}
              disabled={project.activities.includes(activity.id)}
            >
              {project.name}
              {project.activities.includes(activity.id) ? ' (already added)' : ''}
            </option>
          ))}
        </select>
        <Button 
          variant="outline" 
          size="sm"
          className="ml-2 border-gray-300 whitespace-nowrap"
          onClick={() => {
            if (projects.length > 0 && !projects[0].activities.includes(activity.id)) {
              addActivityToProject(projects[0].id, activity.id);
            } else if (projects.length === 0) {
              toast.error("Create a project first");
            } else {
              toast.info("Activity already added to this project");
            }
          }}
        >
          <Plus size={14} /> ADD
        </Button>
      </div>
    </div>
  );
};

export default ActivityItem;
