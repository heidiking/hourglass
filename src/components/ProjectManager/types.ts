
import { ActivitySession } from '@/utils/timeTracking';

export type ProjectTag = {
  id: string;
  name: string;
  color: string;
};

export type Project = {
  id: string;
  name: string;
  tags: ProjectTag[];
  activities: string[]; // IDs of associated activities
  manualActivities: ManualActivity[]; // Manually added activities
  earnings: number; // Total earnings for the project
  totalEarnings?: number; // Total project value
  hourlyRate?: number; // Optional hourly rate for the project
  wordCount?: number; // Field for tracking word count
};

export type ManualActivity = {
  id: string;
  name: string;
  duration: number; // in milliseconds
  date: string; // ISO string
  tags: string[]; // tag IDs
  earnings?: number; // Optional earnings for this specific activity
};

export type ColorOption = {
  name: string;
  value: string;
};

// Color palettes
export const COLOR_PALETTE: ColorOption[] = [
  { name: "Red", value: "bg-red-500" },
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Yellow", value: "bg-yellow-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Teal", value: "bg-teal-500" },
  { name: "Cyan", value: "bg-cyan-500" },
  { name: "Lime", value: "bg-lime-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Violet", value: "bg-violet-500" },
  { name: "Fuchsia", value: "bg-fuchsia-500" },
  { name: "Rose", value: "bg-rose-500" },
  { name: "Amber", value: "bg-amber-500" },
];

export const PASTEL_COLORS: ColorOption[] = [
  { name: "Soft Red", value: "bg-red-200" },
  { name: "Soft Blue", value: "bg-blue-200" },
  { name: "Soft Green", value: "bg-green-200" },
  { name: "Soft Yellow", value: "bg-yellow-200" },
  { name: "Soft Purple", value: "bg-purple-200" },
  { name: "Soft Pink", value: "bg-pink-200" },
  { name: "Soft Indigo", value: "bg-indigo-200" },
  { name: "Soft Orange", value: "bg-orange-200" },
];
