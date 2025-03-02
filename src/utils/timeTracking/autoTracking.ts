
/**
 * autoTracking.ts
 * 
 * Handles automatic activity tracking based on user settings.
 * Manages background tracking intervals and time-based tracking rules.
 */

import { TimeTrackerSettings } from '@/components/FocusMode/types';
import { detectCurrentApp } from './mockData';
import { getTrackerSettings } from './activityStorage';
import { startActivity, endActivity } from './activityManager';

// Tracking interval reference for cleanup
let autoTrackingInterval: number | null = null;

/**
 * Determines if the current time is within the user's configured tracking window
 * @param {TimeTrackerSettings} settings - User's time tracking settings
 * @returns {boolean} True if current time is within tracking hours
 */
export const isWithinTrackingWindow = (settings: TimeTrackerSettings): boolean => {
  try {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeMinutes = currentHours * 60 + currentMinutes;

    // Parse time strings into minutes-since-midnight
    const [startHours, startMinutes] = settings.startTime.split(':').map(Number);
    const [endHours, endMinutes] = settings.endTime.split(':').map(Number);
    
    // Validate parsed times
    if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
      console.error('Invalid time format in settings:', settings.startTime, settings.endTime);
      return false;
    }
    
    const startTimeMinutes = startHours * 60 + startMinutes;
    const endTimeMinutes = endHours * 60 + endMinutes;

    return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
  } catch (error) {
    console.error('Error checking tracking window:', error);
    return false; // Default to not tracking on error
  }
};

/**
 * Checks if tracking should be active and starts/stops tracking accordingly
 */
export const checkAndStartTracking = (): void => {
  try {
    const settings = getTrackerSettings();
    
    // Exit early if auto-tracking is disabled
    if (!settings.autoTrackEnabled) return;
    
    if (isWithinTrackingWindow(settings)) {
      // Should be tracking - start if not already tracking
      const currentActivity = getCurrentActivity();
      if (!currentActivity) {
        const currentApp = detectCurrentApp();
        startActivity(currentApp);
      }
    } else if (getCurrentActivity()) {
      // Outside tracking window but activity running - end it
      endActivity();
    }
  } catch (error) {
    console.error('Error in auto-tracking check:', error);
  }
};

// Circular dependency workaround - function reference set by activityManager
let getCurrentActivityFunc: () => any | null = () => null;

/**
 * Sets the function used to get current activity
 * This prevents circular imports between modules
 * @param {Function} func - Function to get current activity
 */
export const setGetCurrentActivityFunction = (func: () => any | null): void => {
  getCurrentActivityFunc = func;
};

/**
 * Wrapper to call the dynamically set getCurrentActivity function
 * @returns {any | null} The current activity or null
 */
const getCurrentActivity = (): any | null => {
  try {
    return getCurrentActivityFunc();
  } catch (error) {
    console.error('Error getting current activity in auto tracking:', error);
    return null;
  }
};

/**
 * Sets up automatic tracking based on user settings
 * Establishes interval to regularly check tracking status
 */
export const setupAutoTracking = (): void => {
  try {
    const settings = getTrackerSettings();
    
    // Clear existing interval if disabled
    if (!settings.autoTrackEnabled) {
      if (autoTrackingInterval) {
        clearInterval(autoTrackingInterval);
        autoTrackingInterval = null;
        console.info('Auto-tracking disabled by user settings');
      }
      return;
    }

    // Clear any existing interval before setting a new one
    if (autoTrackingInterval) {
      clearInterval(autoTrackingInterval);
    }

    // Run immediately and then every minute
    console.info('Setting up auto-tracking with interval');
    checkAndStartTracking();
    autoTrackingInterval = window.setInterval(checkAndStartTracking, 60000);
  } catch (error) {
    console.error('Error setting up auto tracking:', error);
    // Clean up any existing interval on error
    if (autoTrackingInterval) {
      clearInterval(autoTrackingInterval);
      autoTrackingInterval = null;
    }
  }
};

/**
 * Cleans up auto-tracking interval
 * Should be called when app is unloaded or tracking is disabled
 */
export const clearAutoTracking = (): void => {
  if (autoTrackingInterval) {
    clearInterval(autoTrackingInterval);
    autoTrackingInterval = null;
    console.info('Auto-tracking interval cleared');
  }
};
