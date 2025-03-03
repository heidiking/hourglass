
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ActivitySession } from '@/utils/timeTracking/types';
import { CustomTooltip } from './CustomTooltip';

interface DocumentsActivityChartProps {
  documentActivities: ActivitySession[];
}

const DocumentsActivityChart: React.FC<DocumentsActivityChartProps> = ({ documentActivities }) => {
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

  return (
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
      <p className="text-xs text-center text-gray-500 mt-1">
        Top 5 documents by time spent
      </p>
    </div>
  );
};

export default DocumentsActivityChart;
