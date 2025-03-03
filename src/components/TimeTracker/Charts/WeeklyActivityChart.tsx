
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WeeklyTrend } from '../ActivityPatternCalculator';
import { CustomTooltip } from './CustomTooltip';

interface WeeklyActivityChartProps {
  data: WeeklyTrend[];
}

const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    date: item.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    totalDuration: item.totalDuration,
    hours: Math.round(item.totalDuration / 1000 / 60 / 60 * 10) / 10
  }));

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
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
      <p className="text-xs text-center text-gray-500 mt-1">
        Your document activity over the past 7 days
      </p>
    </div>
  );
};

export default WeeklyActivityChart;
