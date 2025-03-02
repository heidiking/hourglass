
import { Project, ManualActivity } from './types';
import { ActivitySession } from '@/utils/timeTracking';

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const getProjectTotalTime = (project: Project, activities: ActivitySession[]): number => {
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

export const getProjectHourlyEarnings = (project: Project, activities: ActivitySession[]): string => {
  const totalTimeHours = getProjectTotalTime(project, activities) / (1000 * 60 * 60);
  
  if (totalTimeHours <= 0 || project.earnings <= 0) {
    return "N/A";
  }
  
  const hourlyEarnings = project.earnings / totalTimeHours;
  return formatCurrency(hourlyEarnings) + "/hr";
};

export const getProjectWordRate = (project: Project): string => {
  if (!project.totalEarnings || !project.wordCount || project.wordCount <= 0) {
    return "N/A";
  }
  
  const perWordRate = project.totalEarnings / project.wordCount;
  return `$${perWordRate.toFixed(4)}/word`;
};

export const getAppIcon = (appName: string) => {
  if (appName.toLowerCase().includes("word") || 
      appName.toLowerCase().includes("doc") || 
      appName.toLowerCase().includes(".doc")) {
    return "text-blue-500";
  } else if (appName.toLowerCase().includes("excel") || 
             appName.toLowerCase().includes("sheet") || 
             appName.toLowerCase().includes(".xls")) {
    return "text-green-500";
  } else if (appName.toLowerCase().includes("powerpoint") || 
             appName.toLowerCase().includes("presentation") || 
             appName.toLowerCase().includes(".ppt")) {
    return "text-orange-500";
  } else if (appName.toLowerCase().includes("pdf") || 
             appName.toLowerCase().includes(".pdf")) {
    return "text-red-500";
  }
  return "";
};
