
import { ActivitySession } from '@/utils/timeTracking/types';

export interface ActivityMetrics {
  totalDurationToday: number;
  totalDurationAll: number;
  uniqueDocuments: number;
  avgSessionDuration: number;
  mostActiveDocument: string;
  mostActiveDocumentDuration: number;
  avgDailyTime: number;
  productiveHoursPerDay: number;
  totalDaysTracked: number;
}

export const calculateActivityMetrics = (documentActivities: ActivitySession[]): ActivityMetrics => {
  // Get just today's activities
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayActivities = documentActivities.filter(activity => {
    const activityDate = new Date(activity.startTime);
    return activityDate >= today;
  });
  
  // Calculate total duration today
  const totalDurationToday = todayActivities.reduce((total, activity) => {
    return total + activity.duration;
  }, 0);
  
  // Calculate total duration for all activities
  const totalDurationAll = documentActivities.reduce((total, activity) => {
    return total + activity.duration;
  }, 0);
  
  // Get unique document count
  const uniqueDocuments = new Set(documentActivities.map(a => a.appName)).size;
  
  // Calculate average session duration
  const avgSessionDuration = documentActivities.length > 0 
    ? totalDurationAll / documentActivities.length 
    : 0;
  
  // Get most active document
  const documentCounts: Record<string, number> = {};
  documentActivities.forEach(activity => {
    if (!documentCounts[activity.appName]) {
      documentCounts[activity.appName] = 0;
    }
    documentCounts[activity.appName] += activity.duration;
  });
  
  let mostActiveDocument = '';
  let maxDuration = 0;
  
  Object.entries(documentCounts).forEach(([doc, duration]) => {
    if (duration > maxDuration) {
      maxDuration = duration;
      mostActiveDocument = doc;
    }
  });
  
  // Get average daily document time
  const dateMap: Record<string, number> = {};
  documentActivities.forEach(activity => {
    const date = new Date(activity.startTime).toDateString();
    if (!dateMap[date]) {
      dateMap[date] = 0;
    }
    dateMap[date] += activity.duration;
  });
  
  const uniqueDays = Object.keys(dateMap).length;
  const avgDailyTime = uniqueDays > 0 
    ? totalDurationAll / uniqueDays 
    : 0;
  
  // Get productivity score (ratio of document time to total tracked time)
  const totalDaysTracked = uniqueDays;
  const productiveHoursPerDay = totalDaysTracked > 0 
    ? (totalDurationAll / 1000 / 60 / 60) / totalDaysTracked 
    : 0;
  
  return {
    totalDurationToday,
    totalDurationAll,
    uniqueDocuments,
    avgSessionDuration,
    mostActiveDocument,
    mostActiveDocumentDuration: maxDuration,
    avgDailyTime,
    productiveHoursPerDay,
    totalDaysTracked
  };
};
