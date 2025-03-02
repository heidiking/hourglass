
import React, { useMemo } from 'react';
import { Clock, Calendar, BarChart3, FileText, LineChart, PieChart, TrendingUp } from 'lucide-react';
import { ActivitySession } from '@/utils/timeTracking/types';
import { formatTimeDuration } from './utils';
import { isDocumentActivity } from './TimeTracker';
import TimeTrackingMetrics from './TimeTrackingMetrics';
import ActivityStatsChart from './ActivityStatsChart';

interface TimeTrackingInsightsProps {
  documentActivities: ActivitySession[];
}

const TimeTrackingInsights: React.FC<TimeTrackingInsightsProps> = ({ documentActivities }) => {
  const metrics = useMemo(() => {
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
  }, [documentActivities]);
  
  // Get activity patterns by time of day
  const timeOfDayData = useMemo(() => {
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
  }, [documentActivities]);
  
  // Get activity trends over time (last 7 days)
  const weeklyTrends = useMemo(() => {
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
  }, [documentActivities]);
  
  if (documentActivities.length === 0) {
    return (
      <div className="mt-4 p-4 bg-black/10 rounded-md text-gray-600 text-center">
        <BarChart3 className="mx-auto mb-2" size={24} />
        <p>No document activity data available yet.</p>
        <p className="text-sm mt-1">Start tracking documents to see insights here.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <BarChart3 size={16} className="mr-2" />
        Document Time Insights
      </h3>
      
      <TimeTrackingMetrics metrics={metrics} />
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
          <h4 className="text-sm font-medium text-blue-800 mb-1 flex items-center">
            <FileText size={14} className="mr-1" />
            Most Active Document
          </h4>
          {metrics.mostActiveDocument ? (
            <div>
              <p className="text-blue-700 font-medium truncate">{metrics.mostActiveDocument}</p>
              <p className="text-xs text-blue-600">{formatTimeDuration(metrics.mostActiveDocumentDuration)} total time</p>
            </div>
          ) : (
            <p className="text-sm text-blue-600">No document activity recorded yet</p>
          )}
        </div>
        
        <div className="p-3 bg-green-50 rounded-md border border-green-100">
          <h4 className="text-sm font-medium text-green-800 mb-1 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            Productivity Stats
          </h4>
          <div>
            <p className="text-green-700 font-medium">{metrics.productiveHoursPerDay.toFixed(1)} hours/day</p>
            <p className="text-xs text-green-600">Average over {metrics.totalDaysTracked} days</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <LineChart size={14} className="mr-1" />
          Your Activity Patterns
        </h4>
        <ActivityStatsChart 
          timeOfDayData={timeOfDayData} 
          weeklyTrends={weeklyTrends}
          documentActivities={documentActivities}
        />
      </div>
    </div>
  );
};

export default TimeTrackingInsights;
