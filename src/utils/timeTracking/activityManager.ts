
/**
 * activityManager.ts
 * 
 * Core module for managing activity tracking sessions.
 * Handles starting, ending, and retrieving activity data.
 * Provides the main public API for the time tracking system.
 */

import { ActivitySession } from './types';
import { saveActivityState, loadActivityState } from './activityStorage'; 
import { extractDocumentName } from './documentUtils';
import { setGetCurrentActivityFunction } from './autoTracking';

// In-memory state
let currentActivity: ActivitySession | null = null;
let activityHistory: ActivitySession[] = [];

/**
 * Initializes the time tracking system by loading saved state
 * and setting up necessary integrations
 */
export const initializeTimeTracking = (): void => {
  try {
    // Load previously saved activity data
    const { currentActivity: loadedActivity, activityHistory: loadedHistory } = loadActivityState();
    currentActivity = loadedActivity;
    activityHistory = loadedHistory;
    
    // Set up circular dependency workaround for auto tracking
    setGetCurrentActivityFunction(getCurrentActivity);
    
    // Initialize automatic tracking based on user settings
    const { setupAutoTracking } = require('./autoTracking');
    setupAutoTracking();
    
    console.info('Time tracking successfully initialized');
  } catch (error) {
    console.error('Failed to initialize time tracking:', error);
    // Initialize with empty state to prevent cascading errors
    currentActivity = null;
    activityHistory = [];
  }
};

/**
 * Starts tracking a new activity
 * @param {string} appName - Name of the application or document
 * @returns {ActivitySession} The newly created activity
 */
export const startActivity = (appName: string): ActivitySession => {
  try {
    // End any currently active session
    if (currentActivity) {
      endActivity();
    }

    // Input validation
    if (!appName || typeof appName !== 'string') {
      console.warn('Invalid app name provided to startActivity');
      appName = 'Unknown App';
    }

    // Process the app name to extract document name
    // Ensuring activity is titled by document or app name
    const processedAppName = extractDocumentName(appName);
    console.info('Started tracking activity:', processedAppName);

    // Create new activity session
    const now = new Date();
    const newActivity: ActivitySession = {
      id: Date.now().toString(),
      appName: processedAppName,
      startTime: now,
      endTime: null,
      duration: 0
    };

    // Update in-memory state and persist
    currentActivity = newActivity;
    saveActivityState(currentActivity, activityHistory);

    return newActivity;
  } catch (error) {
    console.error('Error starting activity:', error);
    // Create a fallback activity to maintain functionality
    const fallbackActivity: ActivitySession = {
      id: Date.now().toString(),
      appName: 'Error Starting Activity',
      startTime: new Date(),
      endTime: null,
      duration: 0
    };
    currentActivity = fallbackActivity;
    return fallbackActivity;
  }
};

/**
 * Ends the current activity tracking session
 * @returns {ActivitySession | null} The completed activity or null if none active
 */
export const endActivity = (): ActivitySession | null => {
  try {
    if (!currentActivity) return null;

    // Calculate final duration and set end time
    const now = new Date();
    currentActivity.endTime = now;
    currentActivity.duration = now.getTime() - currentActivity.startTime.getTime();
    
    // Add to history and clear current activity
    activityHistory.push({ ...currentActivity });
    const ended = { ...currentActivity };
    currentActivity = null;
    
    // Persist changes
    saveActivityState(currentActivity, activityHistory);

    return ended;
  } catch (error) {
    console.error('Error ending activity:', error);
    // Force reset current activity on error
    currentActivity = null;
    saveActivityState(currentActivity, activityHistory);
    return null;
  }
};

/**
 * Gets the currently active tracking session with updated duration
 * @returns {ActivitySession | null} Current activity or null if none active
 */
export const getCurrentActivity = (): ActivitySession | null => {
  try {
    if (currentActivity && !currentActivity.endTime) {
      // Update duration for ongoing activity
      const now = new Date();
      currentActivity.duration = now.getTime() - currentActivity.startTime.getTime();
    }
    return currentActivity ? { ...currentActivity } : null;
  } catch (error) {
    console.error('Error getting current activity:', error);
    return null;
  }
};

/**
 * Retrieves the complete activity history
 * @returns {ActivitySession[]} Array of completed activity sessions
 */
export const getActivityHistory = (): ActivitySession[] => {
  try {
    return [...activityHistory];
  } catch (error) {
    console.error('Error retrieving activity history:', error);
    return [];
  }
};

/**
 * Clears all saved activity history
 */
export const clearActivityHistory = (): void => {
  try {
    activityHistory = [];
    saveActivityState(currentActivity, activityHistory);
    console.info('Activity history cleared successfully');
  } catch (error) {
    console.error('Error clearing activity history:', error);
  }
};
