
import { ActivitySession } from '@/utils/timeTracking/types';

export interface TimeOfDayData {
  hour: number;
  count: number;
  duration: number;
}

export interface WeeklyTrend {
  date: Date;
  totalDuration: number;
}

export const calculateTimeOfDayData = (documentActivities: ActivitySession[]): TimeOfDayData[] => {
  const hourCounts: number[] = Array(24).fill(0);
  const hourDurations: number[] = Array(24).fill(0);
  
  documentActivities.forEach(activity => {
    const hour = new Date(activity.startTime).getHours();
    hourCounts[hour]++;
    hourDurations[hour] += activity.duration;
  });
  
  return hourCounts.map((count, index) => ({
    hour: index,
    count,
    duration: hourDurations[index],
  }));
};

export const calculateWeeklyTrends = (documentActivities: ActivitySession[]): WeeklyTrend[] => {
  const last7Days: { date: Date; totalDuration: number }[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    
    const activitiesOnDay = documentActivities.filter(activity => {
      const activityDate = new Date(activity.startTime);
      return activityDate >= date && activityDate < nextDay;
    });
    
    const totalDuration = activitiesOnDay.reduce((sum, activity) => sum + activity.duration, 0);
    
    last7Days.push({
      date,
      totalDuration,
    });
  }
  
  return last7Days;
};
