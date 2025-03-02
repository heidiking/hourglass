
import React, { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }

    const loadedActivities = getActivityHistory();
    setActivities(loadedActivities);
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const openProjectForEditing = (project: Project) => {
    setEditingProject(project);
    setSelectedActivities(project.activities);
    setCurrentTab("edit");
  };

  const addActivityToProject = (projectId: string, activityId: string) => {
    const projectToUpdate = projects.find(p => p.id === projectId);
    
    if (!projectToUpdate) return;
    
    if (projectToUpdate.activities.includes(activityId)) {
      toast.info("This activity is already added to the project");
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
    toast.success("Activity added to project");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          id="project-manager-trigger"
          className="p-3 bg-black/30 rounded-full hover:bg-black/50 transition-colors flex items-center justify-center w-12 h-12"
          aria-label="Projects"
        >
          <Folder size={24} className="text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-black/70 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-4">Projects & Time Tracking</DialogTitle>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="edit" disabled={!editingProject}>
              {editingProject ? `Edit: ${editingProject.name}` : 'Edit Project'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-4">
            <ProjectList 
              projects={projects}
              setProjects={setProjects}
              openProjectForEditing={openProjectForEditing}
              activities={activities}
            />
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <ActivityTimeline 
              activities={activities}
              projects={projects}
              addActivityToProject={addActivityToProject}
            />
          </TabsContent>
          
          <TabsContent value="edit" className="space-y-4">
            {editingProject && (
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
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManager;
