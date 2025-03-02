
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setSelectedActivities(editingProject.activities);
  }, [editingProject]);

  const updateProject = (updatedProject: Project) => {
    // Update project while preserving current earnings unless explicitly changed
    const finalUpdatedProject = {
      ...updatedProject,
    };
    
    setEditingProject(finalUpdatedProject);
    
    const updatedProjects = projects.map(project => 
      project.id === finalUpdatedProject.id ? finalUpdatedProject : project
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
    <div className="space-y-4 bg-gray-50 p-5 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gray-300 bg-white text-black"
          onClick={onBackToProjects}
        >
          Back
        </Button>
        <h3 className="text-lg font-medium text-gray-800">Editing: {editingProject.name}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Project Name</label>
            <div className="flex items-center gap-2">
              <Input
                value={editingProject.name}
                onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                className="bg-white border-gray-300 text-black"
              />
              <Button 
                onClick={updateProjectName} 
                variant="outline" 
                className="border-gray-300 whitespace-nowrap bg-white text-black hover:bg-white/90 hover:text-black"
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
        
        <div className="space-y-6">
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
