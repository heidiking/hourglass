
/**
 * trackingCore.ts
 * 
 * Central module that re-exports functionality from specialized time tracking modules
 * to maintain backward compatibility with existing application code.
 * This architecture allows for better separation of concerns while preserving the public API.
 */

// Import from mockData for compatibility
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
