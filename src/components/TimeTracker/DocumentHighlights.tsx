
import React from 'react';
import { FileText, TrendingUp } from 'lucide-react';
import { formatTimeDuration } from './utils';
import { ActivityMetrics } from './ActivityMetricsCalculator';

interface DocumentHighlightsProps {
  metrics: ActivityMetrics;
}

const DocumentHighlights: React.FC<DocumentHighlightsProps> = ({ metrics }) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
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
      
      <div className="p-3 bg-green-50 rounded-md border border-green-100">
        <h4 className="text-sm font-medium text-green-800 mb-1 flex items-center">
          <TrendingUp size={14} className="mr-1" />
          Productivity Stats
        </h4>
        <div>
          <p className="text-green-700 font-medium">{metrics.productiveHoursPerDay.toFixed(1)} hours/day</p>
          <p className="text-xs text-green-600">Average over {metrics.totalDaysTracked} days</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentHighlights;
