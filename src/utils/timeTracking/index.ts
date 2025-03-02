
// Re-export all functionality from the individual files
export * from './types';
export * from './trackingCore';
export * from './analytics';
export * from './utils';
export * from './mockData';  // Added export for mockData which contains detectCurrentApp

// Import and re-export specific functions for backward compatibility
import { formatFocusTime } from './utils';
import { 
  startActivity, 
  endActivity, 
  initializeTimeTracking,
  setupAutoTracking
} from './trackingCore';
import { detectCurrentApp } from './mockData';  // Import detectCurrentApp

export { 
  formatFocusTime,
  startActivity,
  endActivity,
  initializeTimeTracking,
  setupAutoTracking,
  detectCurrentApp  // Export detectCurrentApp for use in other files
};
