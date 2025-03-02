import { ActivitySession } from './types';
import { detectCurrentApp } from './mockData';
import { TimeTrackerSettings, defaultSettings } from '@/components/FocusMode/types';

let currentActivity: ActivitySession | null = null;
let activityHistory: ActivitySession[] = [];
let autoTrackingInterval: number | null = null;

// Load settings from localStorage, with fallback to defaults
export const getTrackerSettings = (): TimeTrackerSettings => {
  try {
    const settingsJson = localStorage.getItem('timeTrackerSettings');
    return settingsJson ? JSON.parse(settingsJson) : defaultSettings;
  } catch (error) {
    console.error('Error loading tracker settings:', error);
    return defaultSettings;
  }
};

// Save current state to localStorage
export const saveState = (): void => {
  try {
    localStorage.setItem('activityHistory', JSON.stringify(activityHistory));
    localStorage.setItem('currentActivity', currentActivity ? JSON.stringify(currentActivity) : '');
  } catch (error) {
    console.error('Error saving time tracking state:', error);
  }
};

// Clear activity history
export const clearActivityHistory = (): void => {
  activityHistory = [];
  saveState();
};

// Convert stored date strings back to Date objects
const parseDates = (activity: any): ActivitySession => ({
  ...activity,
  startTime: new Date(activity.startTime),
  endTime: activity.endTime ? new Date(activity.endTime) : null
});

// Initialize with stored data from localStorage if available
export const initializeTimeTracking = (): void => {
  try {
    const storedHistory = localStorage.getItem('activityHistory');
    if (storedHistory) {
      activityHistory = JSON.parse(storedHistory).map(parseDates);
    }

    const storedCurrent = localStorage.getItem('currentActivity');
    if (storedCurrent && storedCurrent !== '') {
      currentActivity = parseDates(JSON.parse(storedCurrent));
    }

    // Setup automatic tracking based on stored settings
    setupAutoTracking();
  } catch (error) {
    console.error('Error initializing time tracking:', error);
  }
};

// Check if current time is within the tracking window
const isWithinTrackingWindow = (settings: TimeTrackerSettings): boolean => {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeMinutes = currentHours * 60 + currentMinutes;

  const [startHours, startMinutes] = settings.startTime.split(':').map(Number);
  const [endHours, endMinutes] = settings.endTime.split(':').map(Number);
  
  const startTimeMinutes = startHours * 60 + startMinutes;
  const endTimeMinutes = endHours * 60 + endMinutes;

  return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
};

// Check and update tracking based on time window
const checkAndStartTracking = (): void => {
  const settings = getTrackerSettings();
  
  if (!settings.autoTrackEnabled) return;
  
  if (isWithinTrackingWindow(settings)) {
    if (!currentActivity) {
      const currentApp = detectCurrentApp();
      startActivity(currentApp);
    }
  } else if (currentActivity) {
    endActivity();
  }
};

// Setup automatic tracking based on user settings
export const setupAutoTracking = (): void => {
  try {
    const settings = getTrackerSettings();
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

    // Run immediately and then every minute
    checkAndStartTracking();
    autoTrackingInterval = window.setInterval(checkAndStartTracking, 60000);
  } catch (error) {
    console.error('Error setting up auto tracking:', error);
  }
};

// Extract document name from app title
const extractDocumentName = (appName: string): string => {
  const documentPatterns = [
    { regex: /^(.*?)(?:\s*\.docx?)?\s*-\s*(?:Microsoft\s*)?Word/i, group: 1 },
    { regex: /^(.*?)(?:\s*\.xlsx?)?\s*-\s*(?:Microsoft\s*)?Excel/i, group: 1 },
    { regex: /^(.*?)(?:\s*\.pptx?)?\s*-\s*(?:Microsoft\s*)?PowerPoint/i, group: 1 },
    { regex: /^(.*?)(?:\s*\.pdf)?\s*-\s*(?:Adobe|PDF)/i, group: 1 },
    { regex: /^(.*?)\s*-\s*Google\s*Docs/i, group: 1 },
    { regex: /^(.*?)\s*-\s*.*/, group: 1 }
  ];
  
  for (const pattern of documentPatterns) {
    const match = appName.match(pattern.regex);
    if (match && match[pattern.group]) {
      return match[pattern.group].trim();
    }
  }
  
  return appName;
};

// Start tracking a new activity
export const startActivity = (appName: string): ActivitySession => {
  if (currentActivity) {
    endActivity();
  }

  const processedAppName = extractDocumentName(appName);

  const now = new Date();
  const newActivity: ActivitySession = {
    id: Date.now().toString(),
    appName: processedAppName,
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
  
  activityHistory.push({ ...currentActivity });
  const ended = { ...currentActivity };
  currentActivity = null;
  saveState();

  return ended;
};

// Get the current activity
export const getCurrentActivity = (): ActivitySession | null => {
  if (currentActivity && !currentActivity.endTime) {
    const now = new Date();
    currentActivity.duration = now.getTime() - currentActivity.startTime.getTime();
  }
  return currentActivity ? { ...currentActivity } : null;
};

// Get all activity history
export const getActivityHistory = (): ActivitySession[] => {
  return [...activityHistory];
};

// Export detectCurrentApp from this file as well
export { detectCurrentApp };
