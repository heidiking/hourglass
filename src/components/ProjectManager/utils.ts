
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
