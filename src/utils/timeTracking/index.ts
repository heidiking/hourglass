
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

// We need to export this utility function that's used by multiple components
export { formatFocusTime } from './utils';
