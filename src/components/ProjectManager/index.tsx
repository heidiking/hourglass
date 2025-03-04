
import React, { useState, useEffect, useCallback } from 'react';
import { Folder } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectManagement } from './useProjectManagement';
import ProjectManagerHeader from './ProjectManagerHeader';
import ErrorState from './ErrorState';
import ProjectsTabContent from './ProjectsTabContent';
import ActivityTimeline from './ActivityTimeline';

const ProjectManager = ({ open, onOpenChange }: { open?: boolean, onOpenChange?: (open: boolean) => void }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("projects");
  
  const {
    projects,
    setProjects,
    editingProject,
    setEditingProject,
    activities,
    isLoading,
    error,
    newProjectName,
    setNewProjectName,
    openProjectForEditing,
    addActivityToProject,
    handleCreateNewProject,
    handleStartNewProject
  } = useProjectManagement();

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
  
  // Modified openProjectForEditing to handle tab state
  const handleOpenProjectForEditing = useCallback((project: React.SetStateAction<import("./types").Project | null>) => {
    if (!project) return;
    
    openProjectForEditing(project as import("./types").Project, currentTab);
    
    if (currentTab !== "projects") {
      setCurrentTab("projects");
    }
  }, [currentTab, openProjectForEditing]);

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          id="project-manager-trigger"
          className="p-3 bg-white rounded-full hover:bg-white/90 transition-colors flex items-center justify-center w-12 h-12 border border-gray-300"
          aria-label="Projects"
        >
          <Folder size={24} className="text-black" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-black border-gray-200">
        <ProjectManagerHeader />

        {error ? (
          <ErrorState error={error} />
        ) : (
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="projects" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black border border-gray-300">
                <span className="text-black">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black border border-gray-300">
                <span className="text-black">Timeline</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <ProjectsTabContent 
                editingProject={editingProject}
                setEditingProject={setEditingProject}
                projects={projects}
                setProjects={setProjects}
                activities={activities}
                openProjectForEditing={handleOpenProjectForEditing}
                handleStartNewProject={handleStartNewProject}
                isLoading={isLoading}
                newProjectName={newProjectName}
                setNewProjectName={setNewProjectName}
                handleCreateNewProject={handleCreateNewProject}
              />
            </TabsContent>
            
            <TabsContent value="timeline">
              <ActivityTimeline 
                activities={activities}
                projects={projects}
                addActivityToProject={addActivityToProject}
              />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManager;
