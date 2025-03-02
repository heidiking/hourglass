import React, { useState, useEffect, useCallback } from 'react';
import { Folder, Plus, Minus, X, Tag, Edit2, Clock, FileText, Trash2, DollarSign, Calculator, Type } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getActivityHistory, 
  ActivitySession,
  formatFocusTime
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
  manualActivities: ManualActivity[]; // Manually added activities
  earnings: number; // Total earnings for the project
  totalEarnings?: number; // Total project value (new field)
  hourlyRate?: number; // Optional hourly rate for the project
  wordCount?: number; // New field for tracking word count
};

type ManualActivity = {
  id: string;
  name: string;
  duration: number; // in milliseconds
  date: string; // ISO string
  tags: string[]; // tag IDs
  earnings?: number; // Optional earnings for this specific activity
};

const COLOR_PALETTE = [
  { name: "Red", value: "bg-red-500" },
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Yellow", value: "bg-yellow-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Teal", value: "bg-teal-500" },
  { name: "Cyan", value: "bg-cyan-500" },
  { name: "Lime", value: "bg-lime-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Violet", value: "bg-violet-500" },
  { name: "Fuchsia", value: "bg-fuchsia-500" },
  { name: "Rose", value: "bg-rose-500" },
  { name: "Amber", value: "bg-amber-500" },
];

const PASTEL_COLORS = [
  { name: "Soft Red", value: "bg-red-200" },
  { name: "Soft Blue", value: "bg-blue-200" },
  { name: "Soft Green", value: "bg-green-200" },
  { name: "Soft Yellow", value: "bg-yellow-200" },
  { name: "Soft Purple", value: "bg-purple-200" },
  { name: "Soft Pink", value: "bg-pink-200" },
  { name: "Soft Indigo", value: "bg-indigo-200" },
  { name: "Soft Orange", value: "bg-orange-200" },
];

const ProjectManager = ({ open, onOpenChange }: { open?: boolean, onOpenChange?: (open: boolean) => void }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTagName, setNewTagName] = useState<string>('');
  const [activities, setActivities] = useState<ActivitySession[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0].value);
  const [currentTab, setCurrentTab] = useState("projects");
  const [customColorInput, setCustomColorInput] = useState("");
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityTime, setNewActivityTime] = useState("1");
  const [newActivityTimeUnit, setNewActivityTimeUnit] = useState("hour");
  const [activityDate, setActivityDate] = useState(new Date().toISOString().split('T')[0]);
  const [newActivityEarnings, setNewActivityEarnings] = useState("");
  const [projectHourlyRate, setProjectHourlyRate] = useState("");
  const [projectTotalEarnings, setProjectTotalEarnings] = useState("");
  const [projectWordCount, setProjectWordCount] = useState("");
  const [currentEarnings, setCurrentEarnings] = useState("");

  const [timelineActivities, setTimelineActivities] = useState<{[key: string]: ActivitySession[]}>({});

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

    const groupedActivities = loadedActivities.reduce((acc, activity) => {
      const date = new Date(activity.startTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {} as {[key: string]: ActivitySession[]});

    setTimelineActivities(groupedActivities);
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (editingProject) {
      setCurrentEarnings(editingProject.earnings.toString());
    }
  }, [editingProject]);

  const addProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      tags: [],
      activities: [],
      manualActivities: [],
      earnings: 0,
      wordCount: 0,
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
    
    const newTag: ProjectTag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      color: selectedColor,
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
    setColorPickerVisible(false);
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
    setProjectHourlyRate(project.hourlyRate?.toString() || "");
    setProjectTotalEarnings(project.totalEarnings?.toString() || "");
    setProjectWordCount(project.wordCount?.toString() || "0");
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

  const handleCustomColorChange = (value: string) => {
    setCustomColorInput(value);
    
    if (value.toLowerCase().startsWith("pms")) {
      const pantoneNumber = value.replace(/[^0-9]/g, '');
      if (pantoneNumber) {
        const hue = (parseInt(pantoneNumber) * 137) % 360;
        setSelectedColor(`bg-[hsl(${hue},70%,50%)]`);
      }
      return;
    }
    
    if (value.startsWith('#')) {
      setSelectedColor(`bg-[${value}]`);
      return;
    }
    
    try {
      setSelectedColor(`bg-${value}-500`);
    } catch (e) {
    }
  };

  const addManualActivity = () => {
    if (!editingProject || !newActivityName.trim()) return;
    
    let durationMs = parseInt(newActivityTime) * 60 * 1000;
    if (newActivityTimeUnit === "hour") {
      durationMs = durationMs * 60;
    } else if (newActivityTimeUnit === "day") {
      durationMs = durationMs * 60 * 24;
    }
    
    const earnings = newActivityEarnings.trim() ? parseFloat(newActivityEarnings) : undefined;
    
    const newActivity: ManualActivity = {
      id: Date.now().toString(),
      name: newActivityName,
      duration: durationMs,
      date: activityDate,
      tags: [],
      earnings: earnings,
    };
    
    // Update project total earnings if this activity has earnings
    const updatedEarnings = editingProject.earnings + (earnings || 0);
    
    const updatedProject = {
      ...editingProject,
      manualActivities: [...(editingProject.manualActivities || []), newActivity],
      earnings: updatedEarnings,
    };
    
    // If we have a total project value, recalculate the hourly rate
    if (updatedProject.totalEarnings) {
      const totalTime = getProjectTotalTime(updatedProject);
      if (totalTime > 0) {
        updatedProject.hourlyRate = (updatedProject.totalEarnings / (totalTime / (1000 * 60 * 60)));
      }
    }
    
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? updatedProject : project
    );
    
    setProjects(updatedProjects);
    setEditingProject(updatedProject);
    setNewActivityName("");
    setNewActivityTime("1");
    setNewActivityEarnings("");
    
    toast.success("Manual activity added");
  };

  const removeManualActivity = (projectId: string, activityId: string) => {
    const projectToUpdate = projects.find(p => p.id === projectId);
    
    if (!projectToUpdate || !projectToUpdate.manualActivities) return;
    
    const activityToRemove = projectToUpdate.manualActivities.find(a => a.id === activityId);
    const updatedEarnings = projectToUpdate.earnings - (activityToRemove?.earnings || 0);
    
    const updatedProject = {
      ...projectToUpdate,
      manualActivities: projectToUpdate.manualActivities.filter(a => a.id !== activityId),
      earnings: updatedEarnings >= 0 ? updatedEarnings : 0,
    };
    
    // If we have a total project value, recalculate the hourly rate
    if (updatedProject.totalEarnings) {
      const totalTime = getProjectTotalTime(updatedProject);
      if (totalTime > 0) {
        updatedProject.hourlyRate = (updatedProject.totalEarnings / (totalTime / (1000 * 60 * 60)));
      }
    }
    
    if (editingProject?.id === projectId) {
      setEditingProject(updatedProject);
    }
    
    const updatedProjects = projects.map(project => 
      project.id === projectId ? updatedProject : project
    );
    
    setProjects(updatedProjects);
    toast.success("Activity removed");
  };

  const updateProjectFinancials = () => {
    if (!editingProject) return;
    
    const hourlyRate = projectHourlyRate.trim() 
      ? parseFloat(projectHourlyRate) 
      : undefined;
      
    const totalEarnings = projectTotalEarnings.trim()
      ? parseFloat(projectTotalEarnings)
      : undefined;

    const wordCount = projectWordCount.trim()
      ? parseInt(projectWordCount)
      : 0;
    
    const earnings = currentEarnings.trim()
      ? parseFloat(currentEarnings)
      : 0;
    
    const updatedProject = {
      ...editingProject,
      hourlyRate,
      totalEarnings,
      wordCount,
      earnings
    };
    
    // Auto-calculate hourly rate if we have total earnings and time
    if (totalEarnings) {
      const totalTime = getProjectTotalTime(updatedProject);
      if (totalTime > 0) {
        updatedProject.hourlyRate = (totalEarnings / (totalTime / (1000 * 60 * 60)));
      }
    }
    
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? updatedProject : project
    );
    
    setProjects(updatedProjects);
    setEditingProject(updatedProject);
    
    toast.success("Project financials updated");
  };

  const getProjectTotalTime = (project: Project): number => {
    let total = 0;
    
    project.activities.forEach(activityId => {
      const activity = activities.find(a => a.id === activityId);
      if (activity) {
        total += activity.duration;
      }
    });
    
    if (project.manualActivities) {
      project.manualActivities.forEach(activity => {
        total += activity.duration;
      });
    }
    
    return total;
  };

  const getProjectHourlyEarnings = (project: Project): string => {
    const totalTimeHours = getProjectTotalTime(project) / (1000 * 60 * 60);
    
    if (totalTimeHours <= 0 || project.earnings <= 0) {
      return "N/A";
    }
    
    const hourlyEarnings = project.earnings / totalTimeHours;
    return `$${hourlyEarnings.toFixed(2)}/hr`;
  };

  const getProjectWordRate = (project: Project): string => {
    if (!project.totalEarnings || !project.wordCount || project.wordCount <= 0) {
      return "N/A";
    }
    
    const perWordRate = project.totalEarnings / project.wordCount;
    return `$${perWordRate.toFixed(4)}/word`;
  };

  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  const getAppIcon = (appName: string) => {
    if (appName.toLowerCase().includes("word") || 
        appName.toLowerCase().includes("doc") || 
        appName.toLowerCase().includes(".doc")) {
      return <FileText size={16} className="mr-2 text-blue-500" />;
    } else if (appName.toLowerCase().includes("excel") || 
               appName.toLowerCase().includes("sheet") || 
               appName.toLowerCase().includes(".xls")) {
      return <FileText size={16} className="mr-2 text-green-500" />;
    } else if (appName.toLowerCase().includes("powerpoint") || 
               appName.toLowerCase().includes("presentation") || 
               appName.toLowerCase().includes(".ppt")) {
      return <FileText size={16} className="mr-2 text-orange-500" />;
    } else if (appName.toLowerCase().includes("pdf") || 
               appName.toLowerCase().includes(".pdf")) {
      return <FileText size={16} className="mr-2 text-red-500" />;
    }
    return <FileText size={16} className="mr-2" />;
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
              <Button onClick={addProject} variant="outline" className="border-gray-700 bg-white text-black hover:bg-white/90 hover:text-black">
                <Plus size={16} className="text-black" />
                Add Project
              </Button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {projects.length > 0 ? (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="p-3 bg-white/10 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Folder size={18} className="mr-2" />
                            <h3 className="text-lg">{project.name}</h3>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs text-white/60 mt-1">
                            <div>
                              <Clock size={14} className="inline mr-1" />
                              {formatFocusTime(getProjectTotalTime(project))}
                            </div>
                            {project.earnings > 0 && (
                              <div>
                                <DollarSign size={14} className="inline mr-1" />
                                {formatCurrency(project.earnings)}
                              </div>
                            )}
                            {project.totalEarnings && (
                              <div title="Total project value">
                                <DollarSign size={14} className="inline mr-1" />
                                Total: {formatCurrency(project.totalEarnings)}
                              </div>
                            )}
                            {project.hourlyRate && (
                              <div title="Target hourly rate">
                                <Clock size={14} className="inline mr-1" />
                                <DollarSign size={14} className="inline -ml-3" />
                                {formatCurrency(project.hourlyRate)}/hr
                              </div>
                            )}
                            {project.earnings > 0 && (
                              <div title="Actual earnings per hour">
                                <Calculator size={14} className="inline mr-1" />
                                {getProjectHourlyEarnings(project)}
                              </div>
                            )}
                            {project.wordCount > 0 && (
                              <div title="Word count">
                                <Type size={14} className="inline mr-1" />
                                {project.wordCount.toLocaleString()} words
                              </div>
                            )}
                            {project.totalEarnings && project.wordCount > 0 && (
                              <div title="Per-word rate">
                                <DollarSign size={14} className="inline mr-1" />
                                {getProjectWordRate(project)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 border-gray-700 bg-white"
                            onClick={() => openProjectForEditing(project)}
                          >
                            <Edit2 size={14} className="text-black" />
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

                      {(project.activities.length > 0 || (project.manualActivities && project.manualActivities.length > 0)) && (
                        <div className="mt-2 space-y-1">
                          <div className="text-xs text-white/70">Recent activities:</div>
                          {project.activities.slice(0, 2).map(activityId => {
                            const activity = activities.find(a => a.id === activityId);
                            if (!activity) return null;
                            return (
                              <div key={activityId} className="text-sm flex items-center bg-black/20 rounded px-2 py-1">
                                {getAppIcon(activity.appName)}
                                <span className="truncate flex-1">{activity.appName}</span>
                                <span className="text-xs text-white/60 ml-2">
                                  {formatFocusTime(activity.duration)}
                                </span>
                              </div>
                            );
                          })}
                          
                          {project.manualActivities && project.manualActivities.slice(0, 2).map(activity => (
                            <div key={activity.id} className="text-sm flex items-center bg-black/20 rounded px-2 py-1">
                              <Clock size={16} className="mr-2 text-purple-400" />
                              <span className="truncate flex-1">{activity.name}</span>
                              <div className="flex items-center ml-2 text-xs text-white/60">
                                <span>{formatFocusTime(activity.duration)}</span>
                                {activity.earnings && (
                                  <span className="ml-2 text-green-300">
                                    <DollarSign size={12} className="inline" />
                                    {formatCurrency(activity.earnings)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {(project.activities.length > 2 || 
                            (project.manualActivities && project.manualActivities.length > 2)) && (
                            <div className="text-xs text-center text-white/60">
                              + {project.activities.length + (project.manualActivities?.length || 0) - 4} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-white/60 py-6">No projects yet. Create one to get started!</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <div className="max-h-[60vh] overflow-y-auto">
              <h3 className="text-lg font-medium mb-2">Activity Timeline</h3>
              
              {Object.keys(timelineActivities).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(timelineActivities)
                    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                    .map(([date, dateActivities]) => (
                      <div key={date} className="space-y-2">
                        <h4 className="text-md font-medium bg-black/30 p-2 rounded">{date}</h4>
                        <div className="space-y-2 pl-2">
                          {dateActivities.map((activity) => (
                            <div 
                              key={activity.id} 
                              className="p-2 bg-white/10 rounded flex items-center justify-between"
                            >
                              <div className="flex items-center flex-1">
                                {getAppIcon(activity.appName)}
                                <div className="flex-1">
                                  <div className="font-medium">{activity.appName}</div>
                                  <div className="text-xs text-white/60">
                                    {new Date(activity.startTime).toLocaleTimeString()} • 
                                    {formatFocusTime(activity.duration)}
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex items-center">
                                  <span className="text-xs mr-2">Add to project:</span>
                                  <select 
                                    className="bg-black/30 border-gray-700 text-white text-sm rounded px-2 py-1"
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        addActivityToProject(e.target.value, activity.id);
                                      }
                                    }}
                                    defaultValue=""
                                  >
                                    <option value="" disabled>Select...</option>
                                    {projects.map(project => (
                                      <option key={project.id} value={project.id}>
                                        {project.name}
                                      </option>
                                    ))}
                                  </select>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="ml-2 border-gray-700"
                                    onClick={() => {
                                      if (projects.length > 0) {
                                        addActivityToProject(projects[0].id, activity.id);
                                      } else {
                                        toast.error("Create a project first");
                                      }
                                    }}
                                  >
                                    <Plus size={14} /> ADD
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-white/60 py-6">No activities tracked yet</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="edit" className="space-y-4">
            {editingProject && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-700"
                    onClick={() => {
                      setEditingProject(null);
                      setCurrentTab("projects");
                    }}
                  >
                    Back
                  </Button>
                  <h3 className="text-lg font-medium">Editing: {editingProject.name}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm text-white/70">Project Name</label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={editingProject.name}
                          onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                          className="bg-black/30 border-gray-700 text-white"
                        />
                        <Button onClick={updateProjectName} variant="outline" className="border-gray-700 whitespace-nowrap bg-white">
                          Save Name
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm text-white/70">Project Financials</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-white/60">Current Earnings</label>
                          <div className="flex items-center bg-black/30 border border-gray-700 rounded h-10 px-3">
                            <DollarSign size={16} className="mr-1 text-green-300" />
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={currentEarnings}
                              onChange={(e) => setCurrentEarnings(e.target.value)}
                              className="border-0 bg-transparent h-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-white/60">Total Project Value</label>
                          <div className="flex items-center bg-black/30 border border-gray-700 rounded h-10 px-3 flex-1">
                            <DollarSign size={16} className="text-green-300" />
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={projectTotalEarnings}
                              onChange={(e) => setProjectTotalEarnings(e.target.value)}
                              className="border-0 bg-transparent h-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <label className="text-xs text-white/60">Hourly Rate Target</label>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center bg-black/30 border border-gray-700 rounded h-10 px-3 flex-1">
                              <DollarSign size={16} className="text-green-300" />
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                value={projectHourlyRate}
                                onChange={(e) => setProjectHourlyRate(e.target.value)}
                                className="border-0 bg-transparent h-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-white/60">Word Count</label>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center bg-black/30 border border-gray-700 rounded h-10 px-3 flex-1">
                              <Type size={16} className="text-blue-300 mr-2" />
                              <Input
                                type="number"
                                min="0"
                                value={projectWordCount}
                                onChange={(e) => setProjectWordCount(e.target.value)}
                                className="border-0 bg-transparent h-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button 
                          onClick={updateProjectFinancials}
                          variant="outline" 
                          className="border-gray-700 bg-white w-full"
                        >
                          <span className="text-black">Update Financials</span>
                        </Button>
                      </div>
                      <div className="bg-black/20 rounded p-2 mt-1">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <label className="text-xs text-white/70">Total Time</label>
                            <div className="font-medium">{formatFocusTime(getProjectTotalTime(editingProject))}</div>
                          </div>
                          <div>
                            <label className="text-xs text-white/70">Actual Hourly Rate</label>
                            <div className="font-medium">{getProjectHourlyEarnings(editingProject)}</div>
                          </div>
                          {editingProject.wordCount > 0 && (
                            <>
                              <div>
                                <label className="text-xs text-white/70">Word Count</label>
                                <div className="font-medium">{editingProject.wordCount?.toLocaleString() || 0}</div>
                              </div>
                              <div>
                                <label className="text-xs text-white/70">Per-Word Rate</label>
                                <div className="font-medium">{getProjectWordRate(editingProject)}</div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Tags</label>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2">
                          <Input
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            placeholder="New tag"
                            className="bg-black/30 border-gray-700 text-white flex-1"
                          />
                          <Button 
                            variant="outline" 
                            className={`h-10 w-10 ${selectedColor} border-gray-700`}
                            onClick={() => setColorPickerVisible(!colorPickerVisible)}
                          />
                          <Button onClick={addTag} variant="outline" className="border-gray-700 whitespace-nowrap bg-white">
                            <Tag size={14} className="mr-1 text-black" />
                            <span className="text-black">Add Tag</span>
                          </Button>
                        </div>
                        
                        {colorPickerVisible && (
                          <div className="p-2 bg-black/40 rounded border border-gray-700">
                            <div className="mb-2">
                              <label className="text-sm text-white/70 mb-1 block">Standard Colors</label>
                              <div className="flex flex-wrap gap-1">
                                {COLOR_PALETTE.map((color) => (
                                  <button
                                    key={color.value}
                                    className={`w-6 h-6 rounded ${color.value} border border-white/20`}
                                    onClick={() => {
                                      setSelectedColor(color.value);
                                      setColorPickerVisible(false);
                                    }}
                                    title={color.name}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div className="mb-2">
                              <label className="text-sm text-white/70 mb-1 block">Pastel Colors</label>
                              <div className="flex flex-wrap gap-1">
                                {PASTEL_COLORS.map((color) => (
                                  <button
                                    key={color.value}
                                    className={`w-6 h-6 rounded ${color.value} border border-white/20`}
                                    onClick={() => {
                                      setSelectedColor(color.value);
                                      setColorPickerVisible(false);
                                    }}
                                    title={color.name}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm text-white/70 mb-1 block">Custom Color</label>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={customColorInput}
                                  onChange={(e) => setCustomColorInput(e.target.value)}
                                  placeholder="HEX or Pantone (e.g. #FF5733 or PMS 123)"
                                  className="bg-black/30 border-gray-700 text-white text-sm"
                                />
                                <Button 
                                  variant="outline" 
                                  className="border-gray-700 text-sm bg-white"
                                >
                                  <span className="text-black">Apply</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
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
                  </div>
                  
                  <div className="space-y-4">
                    {/* Repositioned Manual Time Entry Section to the top */}
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Add Manual Time Entry</label>
                      <div className="space-y-2 bg-black/20 p-2 rounded">
                        <Input
                          value={newActivityName}
                          onChange={(e) => setNewActivityName(e.target.value)}
                          placeholder="Activity name"
                          className="bg-black/30 border-gray-700 text-white mb-2"
                        />
                        
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <Input
                            type="date"
                            value={activityDate}
                            onChange={(e) => setActivityDate(e.target.value)}
                            className="bg-black/30 border-gray-700 text-white"
                          />
                          
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={newActivityTime}
                              onChange={(e) => setNewActivityTime(e.target.value)}
                              className="bg-black/30 border-gray-700 text-white w-20"
                              min="0"
                            />
                            
                            <select 
                              value={newActivityTimeUnit}
                              onChange={(e) => setNewActivityTimeUnit(e.target.value)}
                              className="bg-black/30 border-gray-700 text-white rounded px-2 py-1 flex-1"
                            >
                              <option value="minute">minutes</option>
                              <option value="hour">hours</option>
                              <option value="day">days</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center bg-black/30 border border-gray-700 rounded px-2">
                            <DollarSign size={16} className="text-green-300" />
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={newActivityEarnings}
                              onChange={(e) => setNewActivityEarnings(e.target.value)}
                              className="border-0 bg-transparent h-10 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="Earnings (optional)"
                            />
                          </div>
                        </div>
                        
                        <Button 
                          onClick={addManualActivity} 
                          variant="outline" 
                          className="border-gray-700 text-white w-full bg-white"
                        >
                          <Plus size={14} className="mr-1 text-black" />
                          <span className="text-black">Add Time Entry</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm text-white/70">Associated Activities</label>
                        <Button 
                          onClick={saveActivityAssociations} 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-700 bg-white"
                        >
                          <span className="text-black">Save Associations</span>
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
                                <div className="flex-1">
                                  <div className="font-medium">{activity.appName}</div>
                                  <div className="text-xs text-white/60">
                                    {new Date(activity.startTime).toLocaleString()} • {formatFocusTime(activity.duration)}
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
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Manual Time Entries</label>
                      
                      <div className="max-h-[30vh] overflow-y-auto bg-black/20 rounded-md p-2">
                        {editingProject.manualActivities && editingProject.manualActivities.length > 0 ? (
                          <div className="space-y-2">
                            {editingProject.manualActivities.map((activity) => (
                              <div 
                                key={activity.id} 
                                className="p-2 bg-white/10 rounded-md flex items-center justify-between"
                              >
                                <div className="flex items-center flex-1">
                                  <Clock size={16} className="mr-2 text-purple-400" />
                                  <div>
                                    <div className="font-medium">{activity.name}</div>
                                    <div className="text-xs text-white/60 flex items-center">
                                      <span>{new Date(activity.date).toLocaleDateString()} • </span>
                                      <span>{formatFocusTime(activity.duration)}</span>
                                      {activity.earnings && (
                                        <span className="ml-2 text-green-300">
                                          <DollarSign size={12} className="inline" />
                                          {formatCurrency(activity.earnings)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 text-red-400 hover:text-red-300"
                                  onClick={() => removeManualActivity(editingProject.id, activity.id)}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-white/60 py-3">No manual time entries yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManager;
