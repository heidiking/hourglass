
import { ActivitySession } from './types';
import { saveActivityState, loadActivityState } from './activityStorage'; 
import { extractDocumentName } from './documentUtils';
import { setGetCurrentActivityFunction } from './autoTracking';

let currentActivity: ActivitySession | null = null;
let activityHistory: ActivitySession[] = [];

// Initialize with data from localStorage
export const initializeTimeTracking = (): void => {
  try {
    const { currentActivity: loadedActivity, activityHistory: loadedHistory } = loadActivityState();
    currentActivity = loadedActivity;
    activityHistory = loadedHistory;
    
    // Set the getCurrentActivity function for auto tracking
    setGetCurrentActivityFunction(getCurrentActivity);
    
    // Setup automatic tracking based on stored settings
    const { setupAutoTracking } = require('./autoTracking');
    setupAutoTracking();
  } catch (error) {
    console.error('Error initializing time tracking:', error);
  }
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
  saveActivityState(currentActivity, activityHistory);

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
  saveActivityState(currentActivity, activityHistory);

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

// Clear activity history
export const clearActivityHistory = (): void => {
  activityHistory = [];
  saveActivityState(currentActivity, activityHistory);
};
