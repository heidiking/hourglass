
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
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      try {
        setProjects(JSON.parse(storedProjects));
      } catch (e) {
        console.error('Error parsing projects:', e);
        // Handle corrupted data
        setProjects([]);
      }
    }

    const loadedActivities = getActivityHistory();
    setActivities(loadedActivities);
  }, []);

  // Save projects when they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  const openProjectForEditing = useCallback((project: Project) => {
    setEditingProject(project);
    setSelectedActivities(project.activities);
    setCurrentTab("edit");
  }, []);

  const addActivityToProject = useCallback((projectId: string, activityId: string) => {
    setProjects(currentProjects => {
      const projectToUpdate = currentProjects.find(p => p.id === projectId);
      
      if (!projectToUpdate) return currentProjects;
      
      if (projectToUpdate.activities.includes(activityId)) {
        toast.info("This activity is already added to the project");
        return currentProjects;
      }
      
      const updatedProject = {
        ...projectToUpdate,
        activities: [...projectToUpdate.activities, activityId],
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
  }), [projects, activities, editingProject, openProjectForEditing, handleStartNewProject, addActivityToProject]);

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
            <TabsTrigger value="projects" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black border border-gray-300">Projects</TabsTrigger>
            <TabsTrigger value="timeline" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black border border-gray-300">Timeline</TabsTrigger>
            <TabsTrigger value="edit" disabled={!editingProject} className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black border border-gray-300">
              {editingProject ? `Edit: ${editingProject.name}` : 'Edit Project'}
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
