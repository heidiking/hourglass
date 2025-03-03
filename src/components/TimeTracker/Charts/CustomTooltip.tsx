
import React from 'react';
import { formatTimeDuration } from '../utils';

export const CustomTooltip = ({ active, payload, label }: any) => {
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
