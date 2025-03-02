
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ActivitySession } from '@/utils/timeTracking/types';
import TimeTrackingMetrics from './TimeTrackingMetrics';
import EmptyInsightsState from './EmptyInsightsState';
import DocumentHighlights from './DocumentHighlights';
import ActivityVisualizations from './ActivityVisualizations';
import { calculateActivityMetrics } from './ActivityMetricsCalculator';
import { calculateTimeOfDayData, calculateWeeklyTrends } from './ActivityPatternCalculator';

interface TimeTrackingInsightsProps {
  documentActivities: ActivitySession[];
}

const TimeTrackingInsights: React.FC<TimeTrackingInsightsProps> = ({ documentActivities }) => {
  const metrics = React.useMemo(
    () => calculateActivityMetrics(documentActivities),
    [documentActivities]
  );
  
  // Get activity patterns by time of day
  const timeOfDayData = React.useMemo(
    () => calculateTimeOfDayData(documentActivities),
    [documentActivities]
  );
  
  // Get activity trends over time (last 7 days)
  const weeklyTrends = React.useMemo(
    () => calculateWeeklyTrends(documentActivities),
    [documentActivities]
  );
  
  if (documentActivities.length === 0) {
    return <EmptyInsightsState />;
  }
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <BarChart3 size={16} className="mr-2" />
        Document Time Insights
      </h3>
      
      <TimeTrackingMetrics metrics={metrics} />
      
      <DocumentHighlights metrics={metrics} />
      
      <ActivityVisualizations 
        timeOfDayData={timeOfDayData}
        weeklyTrends={weeklyTrends}
        documentActivities={documentActivities}
      />
    </div>
  );
};

export default TimeTrackingInsights;
