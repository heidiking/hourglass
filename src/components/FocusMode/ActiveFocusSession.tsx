
import React from 'react';
import { Button } from "@/components/ui/button";
import { formatFocusTime } from '@/utils/timeTracking';

interface ActiveFocusSessionProps {
  elapsedTime: number;
  endFocusMode: () => void;
}

const ActiveFocusSession = ({ elapsedTime, endFocusMode }: ActiveFocusSessionProps) => {
  return (
    <div className="py-4 flex flex-col items-center">
      <div className="text-3xl font-light mb-4">
        {formatFocusTime(elapsedTime)}
      </div>
      <Button 
        variant="destructive" 
        onClick={endFocusMode}
        className="w-full"
      >
        End Focus Session
      </Button>
    </div>
  );
};

export default ActiveFocusSession;
