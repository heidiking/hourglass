
/**
 * types.ts
 * 
 * Type definitions for the time tracking system.
 * Centralizes all types to ensure consistency across modules.
 */

/**
 * Represents a single activity tracking session
 */
export type ActivitySession = {
  /**
   * Unique identifier for the session
   */
  id: string;
  
  /**
   * Name of the application or document being tracked
   */
  appName: string;
  
  /**
   * When the activity started
   */
  startTime: Date;
  
  /**
   * When the activity ended (null if still active)
   */
  endTime: Date | null;
  
  /**
   * Duration in milliseconds
   */
  duration: number;
};

// Additional types can be added here as the system grows
