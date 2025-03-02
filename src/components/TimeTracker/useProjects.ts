
import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  name: string;
  activities: string[];
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);
  
  const addActivityToProject = (projectId: string, activityId: string) => {
    const projectToUpdate = projects.find(p => p.id === projectId);
    
    if (!projectToUpdate) return;
    
    if (projectToUpdate.activities.includes(activityId)) {
      toast("This activity is already added to the project", {
        description: "No changes made",
      });
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
    toast("Activity added to project", {
      description: `Added to ${projectToUpdate.name}`,
    });
  };

  const getProjectsForActivity = (activityId: string): Project[] => {
    return projects.filter(project => project.activities.includes(activityId));
  };
  
  return {
    projects,
    setProjects,
    addActivityToProject,
    getProjectsForActivity
  };
};

// Add toast import
import { toast } from "sonner";
