
import React from 'react';
import { Folder, Plus, X, Edit2, Clock, FileText, DollarSign, Calculator, Type } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatFocusTime } from '@/utils/timeTracking';
import { Project } from './types';
import { formatCurrency, getProjectHourlyEarnings, getProjectWordRate, getProjectTotalTime, getAppIcon } from './utils';
import { ActivitySession } from '@/utils/timeTracking';

interface ProjectListProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  openProjectForEditing: (project: Project) => void;
  activities: ActivitySession[];
}

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  setProjects, 
  openProjectForEditing,
  activities
}) => {
  const [newProjectName, setNewProjectName] = React.useState<string>('');

  const addProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      tags: [],
      activities: [],
      manualActivities: [],
      earnings: 0,
      wordCount: 0,
    };
    
    setProjects([...projects, newProject]);
    setNewProjectName('');
    toast.success(`Project "${newProjectName}" created`);
  };

  const deleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
      toast.success('Project deleted');
    }
  };

  const getIconComponent = (iconClass: string) => {
    return <FileText size={16} className={`mr-2 ${iconClass}`} />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 mb-4">
        <div className="flex-1">
          <Input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addProject()}
            placeholder="New project name"
            className="bg-black/30 border-gray-700 text-white"
          />
        </div>
        <Button onClick={addProject} variant="outline" className="border-gray-700 bg-white text-black hover:bg-white/90 hover:text-black">
          <Plus size={16} className="text-black" />
          Add Project
        </Button>
      </div>

      <div className="max-h-[50vh] overflow-y-auto">
        {projects.length > 0 ? (
          <div className="space-y-3">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="p-3 bg-white/10 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Folder size={18} className="mr-2" />
                      <h3 className="text-lg">{project.name}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/60 mt-1">
                      <div>
                        <Clock size={14} className="inline mr-1" />
                        {formatFocusTime(getProjectTotalTime(project, activities))}
                      </div>
                      {project.earnings > 0 && (
                        <div>
                          <DollarSign size={14} className="inline mr-1" />
                          {formatCurrency(project.earnings)}
                        </div>
                      )}
                      {project.totalEarnings && (
                        <div title="Total project value">
                          <DollarSign size={14} className="inline mr-1" />
                          Total: {formatCurrency(project.totalEarnings)}
                        </div>
                      )}
                      {project.hourlyRate && (
                        <div title="Target hourly rate">
                          <Clock size={14} className="inline mr-1" />
                          <DollarSign size={14} className="inline -ml-3" />
                          {formatCurrency(project.hourlyRate)}/hr
                        </div>
                      )}
                      {project.earnings > 0 && (
                        <div title="Actual earnings per hour">
                          <Calculator size={14} className="inline mr-1" />
                          {getProjectHourlyEarnings(project, activities)}
                        </div>
                      )}
                      {project.wordCount > 0 && (
                        <div title="Word count">
                          <Type size={14} className="inline mr-1" />
                          {project.wordCount.toLocaleString()} words
                        </div>
                      )}
                      {project.totalEarnings && project.wordCount > 0 && (
                        <div title="Per-word rate">
                          <DollarSign size={14} className="inline mr-1" />
                          {getProjectWordRate(project)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 border-gray-700 bg-white"
                      onClick={() => openProjectForEditing(project)}
                    >
                      <Edit2 size={14} className="text-black" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 border-gray-700 text-red-400 hover:text-red-300"
                      onClick={() => deleteProject(project.id)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
                
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map(tag => (
                      <Badge 
                        key={tag.id}
                        className={`${tag.color} text-white`}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {(project.activities.length > 0 || (project.manualActivities && project.manualActivities.length > 0)) && (
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-white/70">Recent activities:</div>
                    {project.activities.slice(0, 2).map(activityId => {
                      const activity = activities.find(a => a.id === activityId);
                      if (!activity) return null;
                      return (
                        <div key={activityId} className="text-sm flex items-center bg-black/20 rounded px-2 py-1">
                          <FileText size={16} className={`mr-2 ${getAppIcon(activity.appName)}`} />
                          <span className="truncate flex-1">{activity.appName}</span>
                          <span className="text-xs text-white/60 ml-2">
                            {formatFocusTime(activity.duration)}
                          </span>
                        </div>
                      );
                    })}
                    
                    {project.manualActivities && project.manualActivities.slice(0, 2).map(activity => (
                      <div key={activity.id} className="text-sm flex items-center bg-black/20 rounded px-2 py-1">
                        <Clock size={16} className="mr-2 text-purple-400" />
                        <span className="truncate flex-1">{activity.name}</span>
                        <div className="flex items-center ml-2 text-xs text-white/60">
                          <span>{formatFocusTime(activity.duration)}</span>
                          {activity.earnings && (
                            <span className="ml-2 text-green-300">
                              <DollarSign size={12} className="inline" />
                              {formatCurrency(activity.earnings)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {(project.activities.length > 2 || 
                      (project.manualActivities && project.manualActivities.length > 2)) && (
                      <div className="text-xs text-center text-white/60">
                        + {project.activities.length + (project.manualActivities?.length || 0) - 4} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/60 py-6">No projects yet. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
