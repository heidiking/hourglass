
import React, { useMemo } from 'react';
import { Clock, Calendar, BarChart3, FileText } from 'lucide-react';
import { ActivitySession } from '@/utils/timeTracking/types';
import { formatTimeDuration } from './utils';
import { isDocumentActivity } from './TimeTracker';
import TimeTrackingMetrics from './TimeTrackingMetrics';

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
    
    return {
      totalDurationToday,
      totalDurationAll,
      uniqueDocuments,
      avgSessionDuration,
      mostActiveDocument,
      mostActiveDocumentDuration: maxDuration
    };
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
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
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
    </div>
  );
};

export default TimeTrackingInsights;
