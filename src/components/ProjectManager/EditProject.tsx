
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ActivitySession } from '@/utils/timeTracking';
import { Project, ManualActivity } from './types';
import ProjectFinancials from './ProjectFinancials';
import TagManager from './TagManager';
import ManualTimeEntry from './ManualTimeEntry';
import ActivityList from './ActivityList';

interface EditProjectProps {
  editingProject: Project;
  setEditingProject: React.Dispatch<React.SetStateAction<Project | null>>;
  activities: ActivitySession[];
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onBackToProjects: () => void;
}

const EditProject: React.FC<EditProjectProps> = ({
  editingProject,
  setEditingProject,
  activities,
  projects,
  setProjects,
  onBackToProjects
}) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>(editingProject.activities);
  const [editingActivity, setEditingActivity] = useState<ManualActivity | null>(null);

  React.useEffect(() => {
    setSelectedActivities(editingProject.activities);
  }, [editingProject]);

  const updateProject = (updatedProject: Project) => {
    setEditingProject(updatedProject);
    
    const updatedProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    
    setProjects(updatedProjects);
  };

  const updateProjectName = () => {
    if (!editingProject || !editingProject.name.trim()) return;
    
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? editingProject : project
    );
    
    setProjects(updatedProjects);
    toast.success(`Project renamed to "${editingProject.name}"`);
  };

  const saveActivityAssociations = () => {
    const updatedProject = {
      ...editingProject,
      activities: selectedActivities,
    };
    
    updateProject(updatedProject);
    toast.success('Activities assigned to project');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gray-700"
          onClick={onBackToProjects}
        >
          Back
        </Button>
        <h3 className="text-lg font-medium">Editing: {editingProject.name}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-white/70">Project Name</label>
            <div className="flex items-center gap-2">
              <Input
                value={editingProject.name}
                onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                className="bg-black/30 border-gray-700 text-white"
              />
              <Button 
                onClick={updateProjectName} 
                variant="outline" 
                className="border-gray-700 whitespace-nowrap bg-white text-black hover:bg-white/90 hover:text-black"
              >
                Save Name
              </Button>
            </div>
          </div>
          
          <ProjectFinancials 
            editingProject={editingProject}
            activities={activities}
            onUpdateProject={updateProject}
          />
          
          <TagManager 
            editingProject={editingProject}
            onUpdateProject={updateProject}
          />
        </div>
        
        <div className="space-y-4">
          <ManualTimeEntry 
            editingProject={editingProject}
            onUpdateProject={updateProject}
            editingActivity={editingActivity}
            setEditingActivity={setEditingActivity}
          />
          
          <ActivityList
            editingProject={editingProject}
            activities={activities}
            onUpdateProject={updateProject}
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
            saveActivityAssociations={saveActivityAssociations}
            setEditingActivity={setEditingActivity}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProject;
