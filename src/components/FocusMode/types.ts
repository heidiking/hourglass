
export type BlockedSite = {
  id: string;
  url: string;
};

export type TimeTrackerSettings = {
  trackDormantActivity: boolean;
  autoTrackEnabled: boolean;
  startTime: string;
  endTime: string;
};

export const defaultSettings: TimeTrackerSettings = {
  trackDormantActivity: true,
  autoTrackEnabled: true,
  startTime: '09:00',
  endTime: '17:00',
};
