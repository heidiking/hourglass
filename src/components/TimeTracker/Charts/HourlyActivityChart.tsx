
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeOfDayData } from '../ActivityPatternCalculator';
import { CustomTooltip } from './CustomTooltip';

interface HourlyActivityChartProps {
  data: TimeOfDayData[];
}

const HourlyActivityChart: React.FC<HourlyActivityChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    hour: `${item.hour}:00`,
    durationMinutes: Math.round(item.duration / 1000 / 60)
  }));

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
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
      <p className="text-xs text-center text-gray-500 mt-1">
        Most productive hours based on document activity
      </p>
    </div>
  );
};

export default HourlyActivityChart;
