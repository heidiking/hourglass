
export type ActivitySession = {
  id: string;
  appName: string;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in milliseconds
};

// Mock data for app tracking since we can't actually track apps without browser extensions
const mockApps = [
  'Google Docs - Project Proposal',
  'Microsoft Word - Novel Draft Chapter 3',
  'Adobe PDF - Contract Review',
  'Google Sheets - Budget Calculations',
  'Microsoft Word - Client Brief',
  'Google Docs - Meeting Notes',
  'Microsoft Excel - Invoice Tracker',
  'Adobe PDF - Research Paper',
  'Google Docs - Article Draft',
  'Microsoft PowerPoint - Client Presentation'
];

// Mock document names for more variety
const mockDocNames = [
  'Project Proposal.doc',
  'Novel Draft Chapter 3.docx',
  'Contract Review.pdf',
  'Budget Calculations.xlsx',
  'Client Brief.doc',
  'Meeting Notes.gdoc',
  'Invoice Tracker.xls',
  'Research Paper.pdf',
  'Article Draft.gdoc',
  'Client Presentation.pptx'
];

let currentActivity: ActivitySession | null = null;
let activityHistory: ActivitySession[] = [];
let autoTrackingInterval: number | null = null;

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

    // Setup automatic tracking based on stored settings
    setupAutoTracking();
  } catch (error) {
    console.error('Error initializing time tracking:', error);
  }
};

// Setup automatic tracking based on user settings
export const setupAutoTracking = (): void => {
  try {
    const settingsJson = localStorage.getItem('timeTrackerSettings');
    if (!settingsJson) return;

    const settings = JSON.parse(settingsJson);
    if (!settings.autoTrackEnabled) {
      if (autoTrackingInterval) {
        clearInterval(autoTrackingInterval);
        autoTrackingInterval = null;
      }
      return;
    }

    if (autoTrackingInterval) {
      clearInterval(autoTrackingInterval);
    }

    // Check if current time is within the tracking window
    const checkAndStartTracking = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeMinutes = currentHours * 60 + currentMinutes;

      const [startHours, startMinutes] = settings.startTime.split(':').map(Number);
      const [endHours, endMinutes] = settings.endTime.split(':').map(Number);
      
      const startTimeMinutes = startHours * 60 + startMinutes;
      const endTimeMinutes = endHours * 60 + endMinutes;

      // If within tracking window and not already tracking, start tracking
      if (currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes) {
        if (!currentActivity) {
          const currentApp = detectCurrentApp();
          startActivity(currentApp);
        }
      } else {
        // Outside tracking window, end tracking if active
        if (currentActivity) {
          endActivity();
        }
      }
    };

    // Run immediately and then every minute
    checkAndStartTracking();
    autoTrackingInterval = window.setInterval(checkAndStartTracking, 60000);
  } catch (error) {
    console.error('Error setting up auto tracking:', error);
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
  // Update duration if there's a current activity
  if (currentActivity && !currentActivity.endTime) {
    const now = new Date();
    currentActivity.duration = now.getTime() - currentActivity.startTime.getTime();
  }
  return currentActivity;
};

// Get all activity history
export const getActivityHistory = (): ActivitySession[] => {
  return activityHistory;
};

// Get activities filtered by date range
export const getActivitiesByDateRange = (startDate: Date, endDate: Date): ActivitySession[] => {
  return activityHistory.filter(activity => {
    const activityDate = new Date(activity.startTime);
    return activityDate >= startDate && activityDate <= endDate;
  });
};

// Get activities by app name (for filtering)
export const getActivitiesByAppName = (appName: string): ActivitySession[] => {
  return activityHistory.filter(activity => 
    activity.appName.toLowerCase().includes(appName.toLowerCase())
  );
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
    return new Date(activity.startTime) >= today;
  });

  return todayActivities.reduce((total, activity) => total + activity.duration, 0);
};

// Get total focus time within a date range
export const getFocusTimeByDateRange = (startDate: Date, endDate: Date): number => {
  const filteredActivities = getActivitiesByDateRange(startDate, endDate);
  return filteredActivities.reduce((total, activity) => total + activity.duration, 0);
};

// Mock function to simulate detecting active app/tab
export const detectCurrentApp = (): string => {
  // In a real app, this would use browser extension APIs to detect the actual app/tab
  // For now, we randomly pick a document from our mock lists
  const randomIndex = Math.floor(Math.random() * mockApps.length);
  
  // Sometimes return the app name, sometimes the document name for variety
  return Math.random() > 0.5 ? mockApps[randomIndex] : mockDocNames[randomIndex];
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

// Initialize automatically
initializeTimeTracking();
