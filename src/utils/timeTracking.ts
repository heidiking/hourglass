
export type ActivitySession = {
  id: string;
  appName: string;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in milliseconds
};

// Mock data for app tracking since we can't actually track apps without browser extensions
const mockApps = [
  'Google Docs',
  'Gmail',
  'VS Code',
  'Slack',
  'Figma',
  'Chrome',
  'Zoom',
  'Notion',
  'Spotify',
  'Calendar'
];

let currentActivity: ActivitySession | null = null;
let activityHistory: ActivitySession[] = [];

// Initialize with stored data from localStorage if available
export const initializeTimeTracking = (): void => {
  try {
    const storedHistory = localStorage.getItem('activityHistory');
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      activityHistory = parsedHistory.map((activity: any) => ({
        ...activity,
        startTime: new Date(activity.startTime),
        endTime: activity.endTime ? new Date(activity.endTime) : null
      }));
    }

    const storedCurrent = localStorage.getItem('currentActivity');
    if (storedCurrent) {
      const parsedCurrent = JSON.parse(storedCurrent);
      currentActivity = {
        ...parsedCurrent,
        startTime: new Date(parsedCurrent.startTime),
        endTime: parsedCurrent.endTime ? new Date(parsedCurrent.endTime) : null
      };
    }
  } catch (error) {
    console.error('Error initializing time tracking:', error);
  }
};

// Start tracking a new activity
export const startActivity = (appName: string): ActivitySession => {
  // End current activity if there is one
  if (currentActivity) {
    endActivity();
  }

  const now = new Date();
  const newActivity: ActivitySession = {
    id: Date.now().toString(),
    appName,
    startTime: now,
    endTime: null,
    duration: 0
  };

  currentActivity = newActivity;
  saveState();

  return newActivity;
};

// End the current activity
export const endActivity = (): ActivitySession | null => {
  if (!currentActivity) return null;

  const now = new Date();
  currentActivity.endTime = now;
  currentActivity.duration = now.getTime() - currentActivity.startTime.getTime();
  
  activityHistory.push(currentActivity);
  const ended = { ...currentActivity };
  currentActivity = null;
  saveState();

  return ended;
};

// Get the current activity
export const getCurrentActivity = (): ActivitySession | null => {
  return currentActivity;
};

// Get all activity history
export const getActivityHistory = (): ActivitySession[] => {
  return activityHistory;
};

// Get total time spent on a specific app
export const getTimeSpentOnApp = (appName: string): number => {
  const appActivities = activityHistory.filter(activity => activity.appName === appName);
  return appActivities.reduce((total, activity) => total + activity.duration, 0);
};

// Get total focus time for today
export const getTodayFocusTime = (): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayActivities = activityHistory.filter(activity => {
    return activity.startTime >= today;
  });

  return todayActivities.reduce((total, activity) => total + activity.duration, 0);
};

// Mock function to simulate detecting active app/tab
export const detectCurrentApp = (): string => {
  // In a real app, this would use browser extension APIs to detect the actual app/tab
  // For now, we just pick a random app from our mock list
  const randomIndex = Math.floor(Math.random() * mockApps.length);
  return mockApps[randomIndex];
};

// Save current state to localStorage
const saveState = (): void => {
  try {
    localStorage.setItem('activityHistory', JSON.stringify(activityHistory));
    localStorage.setItem('currentActivity', currentActivity ? JSON.stringify(currentActivity) : '');
  } catch (error) {
    console.error('Error saving time tracking state:', error);
  }
};

// Format focus time nicely (e.g., "2h 15m")
export const formatFocusTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};
