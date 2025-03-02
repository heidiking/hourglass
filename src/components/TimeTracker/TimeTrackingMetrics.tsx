
import React from 'react';
import { Clock, FileText, Calendar, Watch, TrendingUp } from 'lucide-react';
import { formatTimeDuration } from './utils';

interface MetricsData {
  totalDurationToday: number;
  totalDurationAll: number;
  uniqueDocuments: number;
  avgSessionDuration: number;
  mostActiveDocument: string;
  mostActiveDocumentDuration: number;
  avgDailyTime: number;
  productiveHoursPerDay: number;
  totalDaysTracked: number;
}

interface TimeTrackingMetricsProps {
  metrics: MetricsData;
}

const TimeTrackingMetrics: React.FC<TimeTrackingMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="p-3 bg-black/10 rounded-md">
        <div className="flex items-center text-black mb-1">
          <Clock size={14} className="mr-1" />
          <h4 className="text-sm font-medium">Today's Time</h4>
        </div>
        <p className="text-black font-medium">{formatTimeDuration(metrics.totalDurationToday)}</p>
      </div>
      
      <div className="p-3 bg-black/10 rounded-md">
        <div className="flex items-center text-black mb-1">
          <Calendar size={14} className="mr-1" />
          <h4 className="text-sm font-medium">Total Time</h4>
        </div>
        <p className="text-black font-medium">{formatTimeDuration(metrics.totalDurationAll)}</p>
      </div>
      
      <div className="p-3 bg-black/10 rounded-md">
        <div className="flex items-center text-black mb-1">
          <FileText size={14} className="mr-1" />
          <h4 className="text-sm font-medium">Unique Documents</h4>
        </div>
        <p className="text-black font-medium">{metrics.uniqueDocuments}</p>
      </div>
      
      <div className="p-3 bg-black/10 rounded-md">
        <div className="flex items-center text-black mb-1">
          <Watch size={14} className="mr-1" />
          <h4 className="text-sm font-medium">Avg Session</h4>
        </div>
        <p className="text-black font-medium">{formatTimeDuration(metrics.avgSessionDuration)}</p>
      </div>
      
      <div className="p-3 bg-black/10 rounded-md">
        <div className="flex items-center text-black mb-1">
          <Calendar size={14} className="mr-1" />
          <h4 className="text-sm font-medium">Avg Daily Time</h4>
        </div>
        <p className="text-black font-medium">{formatTimeDuration(metrics.avgDailyTime)}</p>
      </div>
      
      <div className="p-3 bg-black/10 rounded-md">
        <div className="flex items-center text-black mb-1">
          <TrendingUp size={14} className="mr-1" />
          <h4 className="text-sm font-medium">Days Tracked</h4>
        </div>
        <p className="text-black font-medium">{metrics.totalDaysTracked}</p>
      </div>
    </div>
  );
};

export default TimeTrackingMetrics;
