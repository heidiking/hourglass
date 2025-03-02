
import React from 'react';
import { Plus, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatFocusTime } from '@/utils/timeTracking';
import { ActivitySession } from '@/utils/timeTracking';
import { Project } from './types';
import { getAppIcon } from './utils';

interface ActivityTimelineProps {
  activities: ActivitySession[];
  projects: Project[];
  addActivityToProject: (projectId: string, activityId: string) => void;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ 
  activities, 
  projects, 
  addActivityToProject 
}) => {
  const timelineActivities = React.useMemo(() => {
    return activities.reduce((acc, activity) => {
      const date = new Date(activity.startTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {} as {[key: string]: ActivitySession[]});
  }, [activities]);

  const getIconComponent = (appName: string) => {
    return <FileText size={16} className={`mr-2 ${getAppIcon(appName)}`} />;
  };

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <h3 className="text-lg font-medium mb-2">Activity Timeline</h3>
      
      {Object.keys(timelineActivities).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(timelineActivities)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([date, dateActivities]) => (
              <div key={date} className="space-y-2">
                <h4 className="text-md font-medium bg-black/30 p-2 rounded">{date}</h4>
                <div className="space-y-2 pl-2">
                  {dateActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="p-2 bg-white/10 rounded flex items-center justify-between"
                    >
                      <div className="flex items-center flex-1">
                        {getIconComponent(activity.appName)}
                        <div className="flex-1">
                          <div className="font-medium">{activity.appName}</div>
                          <div className="text-xs text-white/60">
                            {new Date(activity.startTime).toLocaleTimeString()} • 
                            {formatFocusTime(activity.duration)}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center">
                          <span className="text-xs mr-2">Add to project:</span>
                          <select 
                            className="bg-black/30 border-gray-700 text-white text-sm rounded px-2 py-1"
                            onChange={(e) => {
                              if (e.target.value) {
                                addActivityToProject(e.target.value, activity.id);
                              }
                            }}
                            defaultValue=""
                          >
                            <option value="" disabled>Select...</option>
                            {projects.map(project => (
                              <option key={project.id} value={project.id}>
                                {project.name}
                              </option>
                            ))}
                          </select>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="ml-2 border-gray-700 bg-white text-black hover:bg-white/90 hover:text-black"
                            onClick={() => {
                              if (projects.length > 0) {
                                addActivityToProject(projects[0].id, activity.id);
                              } else {
                                toast.error("Create a project first");
                              }
                            }}
                          >
                            <Plus size={14} className="text-black" /> ADD
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-white/60 py-6">No activities tracked yet</p>
      )}
    </div>
  );
};

export default ActivityTimeline;
