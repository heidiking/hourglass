
import { ActivitySession } from './types';
import { getActivityHistory } from './trackingCore';

// Helper function to check if a date is within range
const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date >= startDate && date <= endDate;
};

// Get activities filtered by date range
export const getActivitiesByDateRange = (startDate: Date, endDate: Date): ActivitySession[] => {
  return getActivityHistory().filter(activity => {
    const activityDate = new Date(activity.startTime);
    return isDateInRange(activityDate, startDate, endDate);
  });
};

// Get activities by app name (for filtering)
export const getActivitiesByAppName = (appName: string): ActivitySession[] => {
  if (!appName.trim()) return [];
  
  const searchTerm = appName.toLowerCase();
  return getActivityHistory().filter(activity => 
    activity.appName.toLowerCase().includes(searchTerm)
  );
};

// Calculate total duration from an array of activities
const calculateTotalDuration = (activities: ActivitySession[]): number => {
  return activities.reduce((total, activity) => total + activity.duration, 0);
};

// Get total time spent on a specific app
export const getTimeSpentOnApp = (appName: string): number => {
  if (!appName.trim()) return 0;
  
  const appActivities = getActivitiesByAppName(appName);
  return calculateTotalDuration(appActivities);
};

// Get total focus time for today
export const getTodayFocusTime = (): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayActivities = getActivitiesByDateRange(today, tomorrow);
  return calculateTotalDuration(todayActivities);
};

// Get total focus time within a date range
export const getFocusTimeByDateRange = (startDate: Date, endDate: Date): number => {
  if (!startDate || !endDate) return 0;
  
  const filteredActivities = getActivitiesByDateRange(startDate, endDate);
  return calculateTotalDuration(filteredActivities);
};
