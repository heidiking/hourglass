
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { ActivitySession } from '@/utils/timeTracking';
import { Project, ManualActivity } from '../types';
import ProjectFinancials from '../ProjectFinancials';
import TagManager from '../TagManager';
import ManualTimeEntry from '../ManualTimeEntry';
import ActivityList from '../ActivityList';
import ProjectActions from './ProjectActions';
import ProjectNameEditor from './ProjectNameEditor';
import DeleteProjectDialog from './DeleteProjectDialog';

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const handleNameChange = (name: string) => {
    setEditingProject({...editingProject, name});
  };

  const saveActivityAssociations = () => {
    const updatedProject = {
      ...editingProject,
      activities: selectedActivities,
    };
    
    updateProject(updatedProject);
    toast.success('Activities assigned to project');
  };

  const handleDuplicateProject = () => {
    const newProject = {
      ...editingProject,
      id: Date.now().toString(),
      name: `${editingProject.name} (Copy)`,
    };
    
    setProjects([...projects, newProject]);
    setEditingProject(newProject);
    toast.success("Project duplicated");
  };

  const handleDeleteProject = () => {
    setShowDeleteDialog(true);
  };

  const confirmDeleteProject = () => {
    const updatedProjects = projects.filter(project => project.id !== editingProject.id);
    setProjects(updatedProjects);
    setShowDeleteDialog(false);
    onBackToProjects();
    toast.success("Project deleted");
  };

  return (
    <div className="space-y-4 bg-gray-50 p-5 rounded-lg shadow-sm">
      <ProjectActions 
        onBack={onBackToProjects}
        onDuplicate={handleDuplicateProject}
        onDelete={handleDeleteProject}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProjectNameEditor 
            editingProject={editingProject}
            onNameChange={handleNameChange}
            onSaveName={updateProjectName}
          />
          
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

      <DeleteProjectDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={confirmDeleteProject}
      />
    </div>
  );
};

export default EditProject;
