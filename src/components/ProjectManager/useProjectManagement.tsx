
import { useState, useEffect, useCallback } from 'react';
import { toast } from "sonner";
import { Project } from './types';
import { ActivitySession, getActivityHistory } from '@/utils/timeTracking';

export const useProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activities, setActivities] = useState<ActivitySession[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState('');

  // Load projects and activities
  useEffect(() => {
    const loadData = () => {
      try {
        setIsLoading(true);
        
        // Load projects with validation
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
          try {
            const parsedProjects = JSON.parse(storedProjects);
            // Validate that it's an array
            if (Array.isArray(parsedProjects)) {
              setProjects(parsedProjects);
            } else {
              console.error('Stored projects is not an array, resetting to empty array');
              setProjects([]);
            }
          } catch (e) {
            console.error('Error parsing projects:', e);
            // Handle corrupted data
            setProjects([]);
          }
        } else {
          // Initialize with empty array if no data exists
          setProjects([]);
        }

        // Load activities
        const loadedActivities = getActivityHistory();
        setActivities(loadedActivities || []);
        setError(null);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load project data');
        toast.error('Error loading project data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save projects when they change
  useEffect(() => {
    try {
      // Always save projects state, even when empty
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
      toast.error('Error saving project data');
    }
  }, [projects]);

  const openProjectForEditing = useCallback((project: Project, currentTab: string) => {
    if (!project) return;
    
    setEditingProject({
      ...project,
      // Ensure project has all required properties
      activities: project.activities || [],
      tags: project.tags || [],
      manualActivities: project.manualActivities || [],
    });
    setSelectedActivities(project.activities || []);
    
    return currentTab;
  }, []);

  const addActivityToProject = useCallback((projectId: string, activityId: string) => {
    if (!projectId || !activityId) return;
    
    setProjects(currentProjects => {
      const projectToUpdate = currentProjects.find(p => p.id === projectId);
      
      if (!projectToUpdate) return currentProjects;
      
      if (projectToUpdate.activities && projectToUpdate.activities.includes(activityId)) {
        toast.info("This activity is already added to the project");
        return currentProjects;
      }
      
      const updatedProject = {
        ...projectToUpdate,
        activities: [...(projectToUpdate.activities || []), activityId],
      };
      
      const updatedProjects = currentProjects.map(project => 
        project.id === projectId ? updatedProject : project
      );
      
      toast.success("Activity added to project");
      return updatedProjects;
    });
  }, []);

  const handleCreateNewProject = useCallback(() => {
    if (!newProjectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      tags: [],
      activities: [],
      manualActivities: [],
      earnings: 0,
    };
    
    setProjects(prev => [...prev, newProject]);
    setNewProjectName('');
    toast.success(`Project "${newProjectName}" created`);
  }, [newProjectName]);

  const handleStartNewProject = useCallback(() => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "New Project",
      tags: [],
      activities: [],
      manualActivities: [],
      earnings: 0,
    };
    
    setEditingProject(newProject);
  }, []);

  return {
    projects,
    setProjects,
    editingProject,
    setEditingProject,
    activities,
    selectedActivities,
    setSelectedActivities,
    isLoading,
    error,
    newProjectName,
    setNewProjectName,
    openProjectForEditing,
    addActivityToProject,
    handleCreateNewProject,
    handleStartNewProject
  };
};
