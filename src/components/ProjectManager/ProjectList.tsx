
import React, { useState } from 'react';
import { formatCurrency, getProjectTotalTime, getAppIcon } from './utils';
import { Button } from "@/components/ui/button";
import { CalendarIcon, Copy, Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import { ActivitySession } from '@/utils/timeTracking';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Project } from './types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";

interface ProjectListProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  activities: ActivitySession[];
  setEditingProject?: React.Dispatch<React.SetStateAction<Project | null>>;
  onStartNewProject?: () => void;
  openProjectForEditing?: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  setProjects, 
  activities,
  setEditingProject,
  onStartNewProject,
  openProjectForEditing,
}) => {
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(null);

  const handleEditProject = (project: Project) => {
    if (openProjectForEditing) {
      openProjectForEditing(project);
    } else if (setEditingProject) {
      setEditingProject(project);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    setProjectIdToDelete(projectId);
  };

  const confirmDeleteProject = () => {
    if (!projectIdToDelete) return;

    const updatedProjects = projects.filter(project => project.id !== projectIdToDelete);
    setProjects(updatedProjects);
    setProjectIdToDelete(null);
    toast.success("Project deleted");
  };

  const cancelDeleteProject = () => {
    setProjectIdToDelete(null);
  };

  const handleDuplicateProject = (projectToDuplicate: Project) => {
    const newProject = {
      ...projectToDuplicate,
      id: Date.now().toString(),
      name: `${projectToDuplicate.name} (Copy)`,
    };
    setProjects([...projects, newProject]);
    toast.success("Project duplicated");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Projects</h2>
        <Button variant="outline" onClick={onStartNewProject} className="bg-white text-black hover:bg-white/90 hover:text-black">
          <Plus size={14} className="mr-2" />
          <span className="text-black">New Project</span>
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No projects yet. Click "New Project" to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleEditProject(project)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">{project.name}</h3>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Time: { (getProjectTotalTime(project, activities) / (60 * 60 * 1000)).toFixed(1) } hours
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Earnings: {formatCurrency(project.earnings || 0)}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.tags && project.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-1 text-xs">{tag.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={projectIdToDelete !== null} onOpenChange={(open) => { if (!open) cancelDeleteProject(); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project and remove all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteProject} className="bg-white text-black hover:bg-white/90 hover:text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProject} className="bg-white text-black hover:bg-white/90 hover:text-black">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectList;
