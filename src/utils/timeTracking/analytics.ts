
import { ActivitySession } from './types';
import { getActivityHistory } from './trackingCore';

// Get activities filtered by date range
export const getActivitiesByDateRange = (startDate: Date, endDate: Date): ActivitySession[] => {
  return getActivityHistory().filter(activity => {
    const activityDate = new Date(activity.startTime);
    return activityDate >= startDate && activityDate <= endDate;
  });
};

// Get activities by app name (for filtering)
export const getActivitiesByAppName = (appName: string): ActivitySession[] => {
  return getActivityHistory().filter(activity => 
    activity.appName.toLowerCase().includes(appName.toLowerCase())
  );
};

// Get total time spent on a specific app
export const getTimeSpentOnApp = (appName: string): number => {
  const appActivities = getActivityHistory().filter(activity => activity.appName === appName);
  return appActivities.reduce((total, activity) => total + activity.duration, 0);
};

// Get total focus time for today
export const getTodayFocusTime = (): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayActivities = getActivityHistory().filter(activity => {
    return new Date(activity.startTime) >= today;
  });

  return todayActivities.reduce((total, activity) => total + activity.duration, 0);
};

// Get total focus time within a date range
export const getFocusTimeByDateRange = (startDate: Date, endDate: Date): number => {
  const filteredActivities = getActivitiesByDateRange(startDate, endDate);
  return filteredActivities.reduce((total, activity) => total + activity.duration, 0);
};
