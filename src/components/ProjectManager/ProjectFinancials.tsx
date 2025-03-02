import React from 'react';
import { DollarSign, Type } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatFocusTime } from '@/utils/timeTracking';
import { Project } from './types';
import { formatCurrency, getProjectHourlyEarnings, getProjectWordRate, getProjectTotalTime } from './utils';
import { ActivitySession } from '@/utils/timeTracking';

interface ProjectFinancialsProps {
  editingProject: Project;
  activities: ActivitySession[];
  onUpdateProject: (updatedProject: Project) => void;
}

const ProjectFinancials: React.FC<ProjectFinancialsProps> = ({ 
  editingProject, 
  activities,
  onUpdateProject 
}) => {
  const [currentEarnings, setCurrentEarnings] = React.useState(editingProject.earnings.toString());
  const [projectHourlyRate, setProjectHourlyRate] = React.useState(editingProject.hourlyRate?.toString() || "");
  const [projectTotalEarnings, setProjectTotalEarnings] = React.useState(editingProject.totalEarnings?.toString() || "");
  const [projectWordCount, setProjectWordCount] = React.useState(editingProject.wordCount?.toString() || "0");

  React.useEffect(() => {
    setCurrentEarnings(editingProject.earnings.toString());
    setProjectHourlyRate(editingProject.hourlyRate?.toString() || "");
    setProjectTotalEarnings(editingProject.totalEarnings?.toString() || "");
    setProjectWordCount(editingProject.wordCount?.toString() || "0");
  }, [editingProject]);

  const updateProjectFinancials = () => {
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
    
    onUpdateProject(updatedProject);
    toast.success("Project financials updated");
  };

  return (
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
          className="border-gray-700 bg-white text-black hover:bg-white/90 hover:text-black w-full"
        >
          Update Financials
        </Button>
      </div>
      <div className="bg-black/20 rounded p-2 mt-1">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <label className="text-xs text-white/70">Total Time</label>
            <div className="font-medium">{formatFocusTime(getProjectTotalTime(editingProject, activities))}</div>
          </div>
          <div>
            <label className="text-xs text-white/70">Actual Hourly Rate</label>
            <div className="font-medium">{getProjectHourlyEarnings(editingProject, activities)}</div>
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
  );
};

export default ProjectFinancials;
