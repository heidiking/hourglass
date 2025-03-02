
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
    <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Financials</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Current Earnings</label>
          <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded h-10 px-3">
            <DollarSign size={16} className="mr-1 text-green-500" />
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
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Project Value</label>
          <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded h-10 px-3 flex-1">
            <DollarSign size={16} className="text-green-500" />
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
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Hourly Rate Target</label>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded h-10 px-3 flex-1">
              <DollarSign size={16} className="text-green-500" />
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
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Word Count</label>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded h-10 px-3 flex-1">
              <Type size={16} className="text-blue-500 mr-2" />
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
      <div className="mt-3">
        <Button 
          onClick={updateProjectFinancials}
          variant="outline" 
          className="border-gray-300 bg-white text-black hover:bg-white/90 hover:text-black w-full"
        >
          Update Financials
        </Button>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mt-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Time</label>
            <div className="font-medium text-gray-800 dark:text-gray-200">{formatFocusTime(getProjectTotalTime(editingProject, activities))}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Actual Hourly Rate</label>
            <div className="font-medium text-green-600 dark:text-green-400">{getProjectHourlyEarnings(editingProject, activities)}</div>
          </div>
          {editingProject.wordCount > 0 && (
            <>
              <div>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Word Count</label>
                <div className="font-medium text-gray-800 dark:text-gray-200">{editingProject.wordCount?.toLocaleString() || 0}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Per-Word Rate</label>
                <div className="font-medium text-green-600 dark:text-green-400">{getProjectWordRate(editingProject)}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFinancials;
