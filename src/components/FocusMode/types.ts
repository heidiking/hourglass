
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

export interface SettingsContentProps {
  settings: TimeTrackerSettings;
  handleSettingChange: (key: keyof TimeTrackerSettings, value: any) => void;
  saveSettings: () => void;
  closeSettings: () => void;
}

export interface FocusSettingsProps {
  closeSettings?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  settings?: TimeTrackerSettings;
  setSettings?: React.Dispatch<React.SetStateAction<TimeTrackerSettings>>;
}
