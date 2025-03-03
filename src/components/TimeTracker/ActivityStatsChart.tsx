
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeOfDayData, WeeklyTrend } from './ActivityPatternCalculator';
import { ActivitySession } from '@/utils/timeTracking/types';
import HourlyActivityChart from './Charts/HourlyActivityChart';
import WeeklyActivityChart from './Charts/WeeklyActivityChart';
import DocumentsActivityChart from './Charts/DocumentsActivityChart';

interface ActivityStatsChartProps {
  timeOfDayData: TimeOfDayData[];
  weeklyTrends: WeeklyTrend[];
  documentActivities: ActivitySession[];
}

const ActivityStatsChart: React.FC<ActivityStatsChartProps> = ({ 
  timeOfDayData, 
  weeklyTrends,
  documentActivities 
}) => {
  const [activeTab, setActiveTab] = useState('hourly');
  
  return (
    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="hourly" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">
            Hourly Activity
          </TabsTrigger>
          <TabsTrigger value="weekly" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">
            Weekly Trend
          </TabsTrigger>
          <TabsTrigger value="documents" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">
            Top Documents
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hourly">
          <HourlyActivityChart data={timeOfDayData} />
        </TabsContent>
        
        <TabsContent value="weekly">
          <WeeklyActivityChart data={weeklyTrends} />
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentsActivityChart documentActivities={documentActivities} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivityStatsChart;
