import React, { useEffect, useState, useCallback } from 'react';
import { Clock, FileText, Link, Plus } from 'lucide-react';
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  getCurrentActivity, 
  getActivityHistory,
  ActivitySession 
} from '@/utils/timeTracking';

const isDocumentActivity = (appName: string): boolean => {
  const name = appName.toLowerCase();
  return name.includes("word") || 
         name.includes("doc") || 
         name.includes("excel") || 
         name.includes("sheet") || 
         name.includes("powerpoint") || 
         name.includes("presentation") || 
         name.includes("pdf") || 
         name.includes(".doc") || 
         name.includes(".xls") || 
         name.includes(".ppt") || 
         name.includes(".pdf") ||
         name.includes("pages") ||
         name.includes("numbers") ||
         name.includes("keynote");
};

const getAppIcon = (appName: string) => {
  return <FileText size={16} className="mr-2 flex-shrink-0" />;
};

const formatTimeDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

interface TimeTrackerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "floating";
}

interface Project {
  id: string;
  name: string;
  activities: string[];
}

const TimeTracker = ({ 
  open, 
  onOpenChange, 
  className = "",
  position = "floating" 
}: TimeTrackerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<ActivitySession | null>(null);
  const [activityHistory, setActivityHistory] = useState<ActivitySession[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    if (open !== undefined) {
      setDialogOpen(open);
    }
  }, [open]);

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setDialogOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  }, [onOpenChange]);
  
  useEffect(() => {
    const updateActivityData = () => {
      const current = getCurrentActivity();
      const history = getActivityHistory();
      
      setCurrentActivity(current);
      setActivityHistory(history);
      setIsTracking(Boolean(current));
    };
    
    updateActivityData();
    
    const interval = setInterval(updateActivityData, 1000);
    return () => clearInterval(interval);
  }, []);

  const addActivityToProject = (projectId: string, activityId: string) => {
    const projectToUpdate = projects.find(p => p.id === projectId);
    
    if (!projectToUpdate) return;
    
    if (projectToUpdate.activities.includes(activityId)) {
      toast.info("This activity is already added to the project");
      return;
    }
    
    const updatedProject = {
      ...projectToUpdate,
      activities: [...projectToUpdate.activities, activityId],
    };
    
    const updatedProjects = projects.map(project => 
      project.id === projectId ? updatedProject : project
    );
    
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    toast.success("Activity added to project");
  };

  const getProjectsForActivity = (activityId: string): Project[] => {
    return projects.filter(project => project.activities.includes(activityId));
  };

  const documentActivities = activityHistory.filter(activity => 
    isDocumentActivity(activity.appName)
  );

  const positionStyles = {
    topLeft: "fixed top-4 left-4",
    topRight: "fixed top-4 right-4",
    bottomLeft: "fixed bottom-4 left-4",
    bottomRight: "fixed bottom-4 right-4",
    floating: ""
  };

  const renderCurrentActivity = () => (
    <div className="mb-4">
      <h3 className="text-lg font-medium flex items-center">
        <Clock size={16} className="mr-2" />
        Current Activity
      </h3>
      {currentActivity ? (
        <div className="flex items-center p-3 bg-black/10 rounded-md mt-2">
          {getAppIcon(currentActivity.appName)}
          <span className="truncate font-medium">{currentActivity.appName}</span>
          <span className="ml-auto text-sm whitespace-nowrap">
            {new Date(currentActivity.startTime).toLocaleTimeString()} • {formatTimeDuration(currentActivity.duration)}
          </span>
        </div>
      ) : (
        <div className="p-3 bg-black/10 rounded-md mt-2 text-gray-500">
          No active document tracking
        </div>
      )}
    </div>
  );

  const renderActivityItem = (activity: ActivitySession, index: number) => {
    const assignedProjects = getProjectsForActivity(activity.id);
    
    return (
      <div key={index} className="p-3 bg-black/10 rounded-md mb-2">
        <div className="flex items-center">
          {getAppIcon(activity.appName)}
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

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className={`p-3 ${dialogOpen ? 'bg-black/60' : 'bg-black/30'} rounded-full hover:bg-black/50 transition-colors ${positionStyles[position]} ${className} flex items-center justify-center w-12 h-12`}
          aria-label="Time Tracker"
          data-testid="time-tracker-trigger"
        >
          <Clock size={20} className="text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg font-medium">
            <Clock size={18} className="mr-2" />
            Document Time Tracker
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Track your time spent on documents and applications
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto px-1">
          {renderCurrentActivity()}
          
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <FileText size={16} className="mr-2" />
              Recent Documents
            </h3>
            {documentActivities.length > 0 ? (
              <div className="space-y-2">
                {documentActivities.map((activity, index) => 
                  renderActivityItem(activity, index)
                )}
              </div>
            ) : (
              <div className="p-3 bg-black/10 rounded-md text-gray-500">
                No document activity recorded yet
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeTracker;
