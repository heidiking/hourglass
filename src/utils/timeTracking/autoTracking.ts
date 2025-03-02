
import { TimeTrackerSettings } from '@/components/FocusMode/types';
import { detectCurrentApp } from './mockData';
import { getTrackerSettings } from './activityStorage';
import { startActivity, endActivity } from './activityManager';

let autoTrackingInterval: number | null = null;

// Check if current time is within the tracking window
export const isWithinTrackingWindow = (settings: TimeTrackerSettings): boolean => {
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
export const checkAndStartTracking = (): void => {
  const settings = getTrackerSettings();
  
  if (!settings.autoTrackEnabled) return;
  
  if (isWithinTrackingWindow(settings)) {
    const currentActivity = getCurrentActivity();
    if (!currentActivity) {
      const currentApp = detectCurrentApp();
      startActivity(currentApp);
    }
  } else if (getCurrentActivity()) {
    endActivity();
  }
};

// Gets the current activity from the activity manager
// This is needed to avoid circular dependencies
let getCurrentActivityFunc: () => any | null = () => null;
export const setGetCurrentActivityFunction = (func: () => any | null): void => {
  getCurrentActivityFunc = func;
};
const getCurrentActivity = (): any | null => getCurrentActivityFunc();

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

export const clearAutoTracking = (): void => {
  if (autoTrackingInterval) {
    clearInterval(autoTrackingInterval);
    autoTrackingInterval = null;
  }
};
