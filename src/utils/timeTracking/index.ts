
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

export type { ActivitySession } from './types';
