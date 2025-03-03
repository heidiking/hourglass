
import React from 'react';
import { TimeOfDayData, WeeklyTrend } from './ActivityPatternCalculator';
import { ActivitySession } from '@/utils/timeTracking/types';
import HourlyActivityChart from './Charts/HourlyActivityChart';
import WeeklyActivityChart from './Charts/WeeklyActivityChart';
import DocumentsActivityChart from './Charts/DocumentsActivityChart';

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
    <div className="mt-6 space-y-8">
      <div>
        <h4 className="text-md font-medium mb-2">Daily Activity Patterns</h4>
        <HourlyActivityChart data={timeOfDayData} />
      </div>
      
      <div>
        <h4 className="text-md font-medium mb-2">Weekly Activity Trends</h4>
        <WeeklyActivityChart data={weeklyTrends} />
      </div>
      
      <div>
        <h4 className="text-md font-medium mb-2">Most Used Documents</h4>
        <DocumentsActivityChart documentActivities={documentActivities} />
      </div>
    </div>
  );
};

export default ActivityVisualizations;
