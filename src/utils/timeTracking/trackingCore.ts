
// This file now just re-exports from the modular files to maintain compatibility
import { detectCurrentApp } from './mockData';

// Re-export from activityManager
export {
  initializeTimeTracking,
  startActivity,
  endActivity,
  getCurrentActivity,
  getActivityHistory,
  clearActivityHistory,
} from './activityManager';

// Re-export from activityStorage
export {
  getTrackerSettings,
} from './activityStorage';

// Re-export from autoTracking
export {
  setupAutoTracking,
} from './autoTracking';

// Export for compatibility
export { detectCurrentApp };
