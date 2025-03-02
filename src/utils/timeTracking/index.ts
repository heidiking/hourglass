
// Re-export everything from the individual files
export * from './types';
export * from './mockData';
export * from './trackingCore';
export * from './analytics';
export * from './utils';

// Initialize automatically when this module is imported
import { initializeTimeTracking } from './trackingCore';
initializeTimeTracking();
