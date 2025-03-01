
import React, { useState, useEffect } from 'react';
import { Folder, Plus, Minus, X, Tag, Edit2 } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { 
  getActivityHistory, 
  ActivitySession 
} from '@/utils/timeTracking';

type ProjectTag = {
  id: string;
  name: string;
  color: string;
};

type Project = {
  id: string;
  name: string;
  tags: ProjectTag[];
  activities: string[]; // IDs of associated activities
};

const TAG_COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
];

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTagName, setNewTagName] = useState<string>('');
  const [activities, setActivities] = useState<ActivitySession[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  useEffect(() => {
    // Load projects from local storage
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }

    // Load activities from the time tracking utility
    setActivities(getActivityHistory());
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      tags: [],
      activities: [],
    };
    
    setProjects([...projects, newProject]);
    setNewProjectName('');
    toast.success(`Project "${newProjectName}" created`);
  };

  const updateProjectName = () => {
    if (!editingProject || !editingProject.name.trim()) return;
    
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? editingProject : project
    );
    
    setProjects(updatedProjects);
    toast.success(`Project renamed to "${editingProject.name}"`);
  };

  const deleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
      if (editingProject?.id === id) {
        setEditingProject(null);
      }
      toast.success('Project deleted');
    }
  };

  const addTag = () => {
    if (!editingProject || !newTagName.trim()) return;
    
    const randomColorIndex = Math.floor(Math.random() * TAG_COLORS.length);
    
    const newTag: ProjectTag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      color: TAG_COLORS[randomColorIndex],
    };
    
    const updatedProject = {
      ...editingProject,
      tags: [...editingProject.tags, newTag],
    };
    
    setEditingProject(updatedProject);
    
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? updatedProject : project
    );
    
    setProjects(updatedProjects);
    setNewTagName('');
  };

  const removeTag = (projectId: string, tagId: string) => {
    const projectToUpdate = projects.find(p => p.id === projectId);
    
    if (!projectToUpdate) return;
    
    const updatedProject = {
      ...projectToUpdate,
      tags: projectToUpdate.tags.filter(tag => tag.id !== tagId),
    };
    
    if (editingProject?.id === projectId) {
      setEditingProject(updatedProject);
    }
    
    const updatedProjects = projects.map(project => 
      project.id === projectId ? updatedProject : project
    );
    
    setProjects(updatedProjects);
  };

  const toggleActivitySelection = (activityId: string) => {
    if (!editingProject) return;
    
    const isSelected = selectedActivities.includes(activityId);
    let updatedSelection;
    
    if (isSelected) {
      updatedSelection = selectedActivities.filter(id => id !== activityId);
    } else {
      updatedSelection = [...selectedActivities, activityId];
    }
    
    setSelectedActivities(updatedSelection);
  };

  const saveActivityAssociations = () => {
    if (!editingProject) return;
    
    const updatedProject = {
      ...editingProject,
      activities: selectedActivities,
    };
    
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? updatedProject : project
    );
    
    setProjects(updatedProjects);
    setEditingProject(updatedProject);
    toast.success('Activities assigned to project');
  };

  const openProjectForEditing = (project: Project) => {
    setEditingProject(project);
    setSelectedActivities(project.activities);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-3 bg-black/30 rounded-full text-white hover:bg-black/50 hover:text-white/80 transition-colors"
          aria-label="Projects"
        >
          <Folder size={24} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-black/70 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-4">Projects</DialogTitle>
        </DialogHeader>

        {!editingProject ? (
          <>
            <div className="flex items-end gap-2 mb-4">
              <div className="flex-1">
                <Input
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addProject()}
                  placeholder="New project name"
                  className="bg-black/30 border-gray-700 text-white"
                />
              </div>
              <Button onClick={addProject} variant="outline" className="border-gray-700 text-white">
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {projects.length > 0 ? (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="p-3 bg-white/10 rounded-lg flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Folder size={18} className="mr-2" />
                          <h3 className="text-lg">{project.name}</h3>
                        </div>
                        {project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.tags.map(tag => (
                              <Badge 
                                key={tag.id}
                                className={`${tag.color} text-white`}
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 border-gray-700"
                          onClick={() => openProjectForEditing(project)}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 border-gray-700 text-red-400 hover:text-red-300"
                          onClick={() => deleteProject(project.id)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-white/60 py-6">No projects yet. Create one to get started!</p>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-700"
                onClick={() => setEditingProject(null)}
              >
                Back
              </Button>
              <h3 className="text-lg font-medium">Editing: {editingProject.name}</h3>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm text-white/70">Project Name</label>
              <div className="flex items-center gap-2">
                <Input
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                  className="bg-black/30 border-gray-700 text-white"
                />
                <Button onClick={updateProjectName} variant="outline" className="border-gray-700 whitespace-nowrap">
                  Save Name
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Tags</label>
              <div className="flex items-center gap-2">
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  placeholder="New tag"
                  className="bg-black/30 border-gray-700 text-white"
                />
                <Button onClick={addTag} variant="outline" className="border-gray-700 whitespace-nowrap">
                  <Tag size={14} className="mr-1" />
                  Add Tag
                </Button>
              </div>
              
              {editingProject.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {editingProject.tags.map(tag => (
                    <Badge 
                      key={tag.id}
                      className={`${tag.color} text-white flex items-center gap-1 px-2 py-1`}
                    >
                      {tag.name}
                      <X 
                        size={12} 
                        className="ml-1 cursor-pointer" 
                        onClick={() => removeTag(editingProject.id, tag.id)}
                      />
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/60">No tags yet</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-white/70">Associate Activities</label>
                <Button 
                  onClick={saveActivityAssociations} 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-700"
                >
                  Save Associations
                </Button>
              </div>
              
              <div className="max-h-[20vh] overflow-y-auto bg-black/20 rounded-md p-2">
                {activities.length > 0 ? (
                  <div className="space-y-2">
                    {activities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className={`
                          p-2 rounded-md flex items-center
                          ${selectedActivities.includes(activity.id) 
                            ? 'bg-blue-900/40 border border-blue-500/30' 
                            : 'bg-white/10'}
                          cursor-pointer
                        `}
                        onClick={() => toggleActivitySelection(activity.id)}
                      >
                        <input 
                          type="checkbox" 
                          checked={selectedActivities.includes(activity.id)}
                          onChange={() => toggleActivitySelection(activity.id)}
                          className="mr-2"
                        />
                        <div>
                          <div className="font-medium">{activity.appName}</div>
                          <div className="text-xs text-white/60">
                            {new Date(activity.startTime).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-white/60 py-3">No activities tracked yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManager;
