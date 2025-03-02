
// Re-export all functionality from the individual files
export * from './types';
export * from './trackingCore';
export * from './analytics';
export * from './utils';

// Import and re-export specific functions for backward compatibility
import { formatFocusTime } from './utils';
import { 
  startActivity, 
  endActivity, 
  initializeTimeTracking,
  setupAutoTracking
} from './trackingCore';

export { 
  formatFocusTime,
  startActivity,
  endActivity,
  initializeTimeTracking,
  setupAutoTracking
};
