
import React from 'react';
import { Project } from './types';
import { ActivitySession } from '@/utils/timeTracking';
import ProjectList from './ProjectList';
import EditProject from './EditProject';
import NewProjectForm from './NewProjectForm';

interface ProjectsTabContentProps {
  editingProject: Project | null;
  setEditingProject: React.Dispatch<React.SetStateAction<Project | null>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  activities: ActivitySession[];
  openProjectForEditing: (project: Project) => void;
  handleStartNewProject: () => void;
  isLoading: boolean;
  newProjectName: string;
  setNewProjectName: (name: string) => void;
  handleCreateNewProject: () => void;
}

const ProjectsTabContent: React.FC<ProjectsTabContentProps> = ({
  editingProject,
  setEditingProject,
  projects,
  setProjects,
  activities,
  openProjectForEditing,
  handleStartNewProject,
  isLoading,
  newProjectName,
  setNewProjectName,
  handleCreateNewProject
}) => {
  return (
    <>
      <NewProjectForm 
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
        handleCreateNewProject={handleCreateNewProject}
      />
      
      {editingProject ? (
        <EditProject 
          editingProject={editingProject}
          setEditingProject={setEditingProject}
          activities={activities}
          projects={projects}
          setProjects={setProjects}
          onBackToProjects={() => {
            setEditingProject(null);
          }}
        />
      ) : (
        <ProjectList 
          projects={projects}
          setProjects={setProjects}
          activities={activities}
          openProjectForEditing={openProjectForEditing}
          onStartNewProject={handleStartNewProject}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ProjectsTabContent;
