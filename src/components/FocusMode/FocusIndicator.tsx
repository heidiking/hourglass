
import React, { memo } from 'react';
import { Lock } from 'lucide-react';
import { formatFocusTime } from '@/utils/timeTracking';

interface FocusIndicatorProps {
  isActive: boolean;
  elapsedTime: number;
}

// Memoize this component since it updates frequently (every second)
const FocusIndicator = memo(({ isActive, elapsedTime }: FocusIndicatorProps) => {
  if (!isActive) return null;
  
  return (
    <div 
      className="fixed top-16 sm:top-20 right-4 bg-black/70 text-white py-2 px-3 sm:px-4 rounded-full flex items-center gap-2 animate-pulse-soft z-50 text-sm sm:text-base backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <Lock size={16} />
      <span>Focus: {formatFocusTime(elapsedTime)}</span>
    </div>
  );
});

FocusIndicator.displayName = 'FocusIndicator';

export default FocusIndicator;
