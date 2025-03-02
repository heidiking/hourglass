
export type ActivitySession = {
  id: string;
  appName: string;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in milliseconds
};
