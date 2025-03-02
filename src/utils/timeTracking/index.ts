
/**
 * index.ts
 * 
 * Main entry point for the time tracking system.
 * Provides a clean public API for other application modules.
 */

// Re-export core functionality from trackingCore
export {
  startActivity,
  endActivity,
  getCurrentActivity,
  getActivityHistory,
  clearActivityHistory,
  initializeTimeTracking,
  setupAutoTracking,
  getTrackerSettings,
  detectCurrentApp,
} from './trackingCore';

// Type exports
export type { ActivitySession } from './types';

// Utility functions
export { formatFocusTime } from './utils';
