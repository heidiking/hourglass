
import React from 'react';
import { Lock } from 'lucide-react';
import { formatFocusTime } from '@/utils/timeTracking';

interface FocusIndicatorProps {
  isActive: boolean;
  elapsedTime: number;
}

const FocusIndicator = ({ isActive, elapsedTime }: FocusIndicatorProps) => {
  if (!isActive) return null;
  
  return (
    <div className="fixed top-20 right-4 bg-black/70 text-white py-2 px-4 rounded-full flex items-center gap-2 animate-pulse-soft">
      <Lock size={16} />
      <span>Focus Mode: {formatFocusTime(elapsedTime)}</span>
    </div>
  );
};

export default FocusIndicator;
