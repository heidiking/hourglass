
/**
 * activityStorage.ts
 * 
 * Responsible for all localStorage operations related to time tracking.
 * Handles saving and loading activity data and user settings.
 * Includes error handling and data validation.
 */

import { ActivitySession } from './types';
import { TimeTrackerSettings, defaultSettings } from '@/components/FocusMode/types';

// Store pending writes to batch them
let pendingWrites: {
  type: 'activity' | 'settings';
  data: any;
}[] = [];

// Batch writes timer
let writeTimer: NodeJS.Timeout | null = null;
const BATCH_DELAY = 1000; // Batch writes every 1 second

/**
 * Processes all pending localStorage writes in a batch
 */
const processBatchedWrites = () => {
  if (pendingWrites.length === 0) return;
  
  try {
    // Group writes by type
    const activityWrites = pendingWrites.filter(write => write.type === 'activity');
    const settingsWrites = pendingWrites.filter(write => write.type === 'settings');
    
    // Process activity writes (take the most recent)
    if (activityWrites.length > 0) {
      const mostRecentActivityWrite = activityWrites[activityWrites.length - 1].data;
      const { currentActivity, activityHistory } = mostRecentActivityWrite;
      
      localStorage.setItem('activityHistory', JSON.stringify(activityHistory));
      localStorage.setItem('currentActivity', currentActivity ? JSON.stringify(currentActivity) : '');
    }
    
    // Process settings writes (take the most recent)
    if (settingsWrites.length > 0) {
      const mostRecentSettingsWrite = settingsWrites[settingsWrites.length - 1].data;
      localStorage.setItem('timeTrackerSettings', JSON.stringify(mostRecentSettingsWrite));
    }
    
    // Clear pending writes after processing
    pendingWrites = [];
  } catch (error) {
    console.error('Error processing batched writes:', error);
  }
};

/**
 * Schedules localStorage writes to be processed in batches
 */
const scheduleBatchedWrite = () => {
  if (writeTimer) {
    clearTimeout(writeTimer);
  }
  
  writeTimer = setTimeout(() => {
    processBatchedWrites();
    writeTimer = null;
  }, BATCH_DELAY);
};

/**
 * Retrieves user time tracker settings from localStorage
 * @returns {TimeTrackerSettings} User settings or default values if none found
 */
export const getTrackerSettings = (): TimeTrackerSettings => {
  try {
    const settingsJson = localStorage.getItem('timeTrackerSettings');
    if (!settingsJson) {
      console.info('No time tracker settings found, using defaults');
      return defaultSettings;
    }
    
    const parsedSettings = JSON.parse(settingsJson);
    // Validate critical settings are present, fall back to defaults if not
    if (!parsedSettings.startTime || !parsedSettings.endTime) {
      console.warn('Incomplete time tracker settings found, using defaults');
      return defaultSettings;
    }
    
    return parsedSettings;
  } catch (error) {
    console.error('Error loading tracker settings:', error);
    // Log detailed error but return defaults to keep app functioning
    return defaultSettings;
  }
};

/**
 * Saves current activity state and history to localStorage using batched writes
 * @param {ActivitySession | null} currentActivity - The currently active session or null
 * @param {ActivitySession[]} activityHistory - Array of completed activity sessions
 */
export const saveActivityState = (
  currentActivity: ActivitySession | null,
  activityHistory: ActivitySession[]
): void => {
  try {
    // Validate input before saving
    if (activityHistory && !Array.isArray(activityHistory)) {
      throw new Error('Activity history must be an array');
    }
    
    // Queue the write operation
    pendingWrites.push({
      type: 'activity',
      data: { currentActivity, activityHistory }
    });
    
    // Schedule batch processing
    scheduleBatchedWrite();
  } catch (error) {
    console.error('Error saving time tracking state:', error);
  }
};

/**
 * Converts stored date strings back to Date objects when loading from localStorage
 * @param {any} activity - Raw activity data from localStorage
 * @returns {ActivitySession} Properly typed activity with Date objects
 */
export const parseDates = (activity: any): ActivitySession => {
  try {
    if (!activity || typeof activity !== 'object') {
      throw new Error('Invalid activity data format');
    }
    
    // Ensure required fields exist
    if (!activity.id || !activity.appName || !activity.startTime) {
      throw new Error('Activity missing required fields');
    }
    
    return {
      ...activity,
      startTime: new Date(activity.startTime),
      endTime: activity.endTime ? new Date(activity.endTime) : null
    };
  } catch (error) {
    console.error('Error parsing activity dates:', error);
    // Return a minimal valid activity to prevent app crashes
    return {
      id: activity.id || 'error-' + Date.now(),
      appName: activity.appName || 'Error Loading Activity',
      startTime: new Date(activity.startTime || Date.now()),
      endTime: activity.endTime ? new Date(activity.endTime) : null,
      duration: activity.duration || 0
    };
  }
};

/**
 * Loads activity data from localStorage with comprehensive error handling
 * @returns {Object} Object containing current activity and history
 */
export const loadActivityState = (): {
  currentActivity: ActivitySession | null;
  activityHistory: ActivitySession[];
} => {
  let currentActivity = null;
  let activityHistory: ActivitySession[] = [];
  
  try {
    // Load and parse activity history
    const storedHistory = localStorage.getItem('activityHistory');
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      if (Array.isArray(parsedHistory)) {
        activityHistory = parsedHistory.map(item => {
          try {
            return parseDates(item);
          } catch (parseError) {
            console.warn('Skipping invalid activity history item:', parseError);
            return null;
          }
        }).filter(Boolean) as ActivitySession[];
      } else {
        console.error('Activity history is not an array, resetting');
      }
    }

    // Load and parse current activity
    const storedCurrent = localStorage.getItem('currentActivity');
    if (storedCurrent && storedCurrent !== '') {
      try {
        currentActivity = parseDates(JSON.parse(storedCurrent));
      } catch (parseError) {
        console.error('Error parsing current activity, resetting:', parseError);
      }
    }
  } catch (error) {
    console.error('Critical error loading activity state:', error);
    // Reset to empty state rather than crashing
  }
  
  return { currentActivity, activityHistory };
};

/**
 * Forces immediate writing of any pending localStorage operations
 * Useful when the app is about to unload
 */
export const flushPendingWrites = (): void => {
  if (pendingWrites.length > 0) {
    processBatchedWrites();
  }
};

// Set up event listener to flush writes before page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', flushPendingWrites);
}
