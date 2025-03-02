
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { formatTimeDuration } from './utils';
import { ActivitySession } from '@/utils/timeTracking/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeOfDayData {
  hour: number;
  count: number;
  duration: number;
}

interface WeeklyTrend {
  date: Date;
  totalDuration: number;
}

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
  
  const formattedHourlyData = timeOfDayData.map(item => ({
    ...item,
    hour: `${item.hour}:00`,
    durationMinutes: Math.round(item.duration / 1000 / 60)
  }));
  
  const formattedWeeklyData = weeklyTrends.map(item => ({
    date: item.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    totalDuration: item.totalDuration,
    hours: Math.round(item.totalDuration / 1000 / 60 / 60 * 10) / 10
  }));
  
  // Document distribution data
  const documentData = React.useMemo(() => {
    const docMap: Record<string, number> = {};
    
    documentActivities.forEach(activity => {
      if (!docMap[activity.appName]) {
        docMap[activity.appName] = 0;
      }
      docMap[activity.appName] += activity.duration;
    });
    
    return Object.entries(docMap)
      .map(([name, duration]) => ({
        name: name.length > 20 ? name.substring(0, 20) + '...' : name,
        duration,
        hours: Math.round(duration / 1000 / 60 / 60 * 10) / 10
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5); // Top 5 documents
  }, [documentActivities]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm text-black">
          <p className="font-medium">{label}</p>
          {payload[0].payload.durationMinutes && (
            <p className="text-sm">{formatTimeDuration(payload[0].payload.duration)}</p>
          )}
          {payload[0].payload.hours !== undefined && (
            <p className="text-sm">{payload[0].payload.hours} hours</p>
          )}
          {payload[0].payload.count !== undefined && (
            <p className="text-sm">{payload[0].payload.count} sessions</p>
          )}
        </div>
      );
    }
    return null;
  };

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
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedHourlyData}>
                <XAxis 
                  dataKey="hour" 
                  tick={{ fontSize: 10 }}
                  interval={3} 
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${Math.round(value / 60)}m`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="durationMinutes" 
                  name="Duration" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-1">
            Most productive hours based on document activity
          </p>
        </TabsContent>
        
        <TabsContent value="weekly">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedWeeklyData}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${value}h`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone"
                  dataKey="hours" 
                  name="Duration" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                  stroke="#10b981"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-1">
            Your document activity over the past 7 days
          </p>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={documentData}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <XAxis 
                  type="number"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${value}h`}
                />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  tick={{ fontSize: 10 }}
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="hours" 
                  name="Hours" 
                  fill="#8b5cf6" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-1">
            Top 5 documents by time spent
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivityStatsChart;
