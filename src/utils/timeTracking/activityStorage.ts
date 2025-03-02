
import { ActivitySession } from './types';
import { TimeTrackerSettings, defaultSettings } from '@/components/FocusMode/types';

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

// Save activity data to localStorage
export const saveActivityState = (
  currentActivity: ActivitySession | null,
  activityHistory: ActivitySession[]
): void => {
  try {
    localStorage.setItem('activityHistory', JSON.stringify(activityHistory));
    localStorage.setItem('currentActivity', currentActivity ? JSON.stringify(currentActivity) : '');
  } catch (error) {
    console.error('Error saving time tracking state:', error);
  }
};

// Convert stored date strings back to Date objects
export const parseDates = (activity: any): ActivitySession => ({
  ...activity,
  startTime: new Date(activity.startTime),
  endTime: activity.endTime ? new Date(activity.endTime) : null
});

// Load activity data from localStorage
export const loadActivityState = (): {
  currentActivity: ActivitySession | null;
  activityHistory: ActivitySession[];
} => {
  let currentActivity = null;
  let activityHistory: ActivitySession[] = [];
  
  try {
    const storedHistory = localStorage.getItem('activityHistory');
    if (storedHistory) {
      activityHistory = JSON.parse(storedHistory).map(parseDates);
    }

    const storedCurrent = localStorage.getItem('currentActivity');
    if (storedCurrent && storedCurrent !== '') {
      currentActivity = parseDates(JSON.parse(storedCurrent));
    }
  } catch (error) {
    console.error('Error loading activity state:', error);
  }
  
  return { currentActivity, activityHistory };
};
