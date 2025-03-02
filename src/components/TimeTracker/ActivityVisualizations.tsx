
import React from 'react';
import { LineChart } from 'lucide-react';
import ActivityStatsChart from './ActivityStatsChart';
import { TimeOfDayData, WeeklyTrend } from './ActivityPatternCalculator';
import { ActivitySession } from '@/utils/timeTracking/types';

interface ActivityVisualizationsProps {
  timeOfDayData: TimeOfDayData[];
  weeklyTrends: WeeklyTrend[];
  documentActivities: ActivitySession[];
}

const ActivityVisualizations: React.FC<ActivityVisualizationsProps> = ({ 
  timeOfDayData,
  weeklyTrends,
  documentActivities
}) => {
  return (
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
  );
};

export default ActivityVisualizations;
