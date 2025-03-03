
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Folder } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getActivityHistory, ActivitySession } from '@/utils/timeTracking';
import { Project } from './types';
import ProjectList from './ProjectList';
import ActivityTimeline from './ActivityTimeline';
import EditProject from './EditProject';

const ProjectManager = ({ open, onOpenChange }: { open?: boolean, onOpenChange?: (open: boolean) => void }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activities, setActivities] = useState<ActivitySession[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("projects");
  const [isLoading, setIsLoading] = useState(true);

  // Sync with external open state
  useEffect(() => {
    if (open !== undefined) {
      setDialogOpen(open);
    }
  }, [open]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setDialogOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  }, [onOpenChange]);

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
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Error loading project data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save projects when they change - ALWAYS save, not just when length > 0
  useEffect(() => {
    try {
      // Always save projects state, even when empty
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
      toast.error('Error saving project data');
    }
  }, [projects]);

  const openProjectForEditing = useCallback((project: Project) => {
    if (!project) return;
    
    setEditingProject({
      ...project,
      // Ensure project has all required properties
      activities: project.activities || [],
      tags: project.tags || [],
      manualActivities: project.manualActivities || [],
    });
    setSelectedActivities(project.activities || []);
    setCurrentTab("edit");
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
    setCurrentTab("edit");
  }, []);

  // Memoize tabsContent for better performance
  const tabsContent = useMemo(() => ({
    projects: (
      <ProjectList 
        projects={projects}
        setProjects={setProjects}
        activities={activities}
        openProjectForEditing={openProjectForEditing}
        onStartNewProject={handleStartNewProject}
        isLoading={isLoading}
      />
    ),
    timeline: (
      <ActivityTimeline 
        activities={activities}
        projects={projects}
        addActivityToProject={addActivityToProject}
      />
    ),
    edit: editingProject ? (
      <EditProject 
        editingProject={editingProject}
        setEditingProject={setEditingProject}
        activities={activities}
        projects={projects}
        setProjects={setProjects}
        onBackToProjects={() => {
          setEditingProject(null);
          setCurrentTab("projects");
        }}
      />
    ) : null
  }), [projects, activities, editingProject, openProjectForEditing, handleStartNewProject, addActivityToProject, isLoading]);

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          id="project-manager-trigger"
          className="p-3 bg-white rounded-full text-black hover:bg-white/90 transition-colors flex items-center justify-center w-12 h-12 border border-gray-300"
          aria-label="Projects"
        >
          <Folder size={24} className="text-black" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-black border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-4 text-black">Projects & Time Tracking</DialogTitle>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="projects" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black border border-gray-300">
              <span className="text-black">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black border border-gray-300">
              <span className="text-black">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="edit" disabled={!editingProject} className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black border border-gray-300">
              <span className="text-black">{editingProject ? `Edit: ${editingProject.name}` : 'Edit Project'}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            {tabsContent.projects}
          </TabsContent>
          
          <TabsContent value="timeline">
            {tabsContent.timeline}
          </TabsContent>
          
          <TabsContent value="edit">
            {tabsContent.edit}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManager;
