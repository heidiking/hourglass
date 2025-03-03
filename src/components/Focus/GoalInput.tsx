
import React, { useState, useEffect, useCallback, memo } from 'react';
import { toast } from 'sonner';
import { saveGoal, saveGoalToArchive, getSavedGoal, clearGoal } from './goalUtils';

const GoalInput = () => {
  const [goal, setGoal] = useState<string>('');
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Memoize handlers for better performance
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isInputDisabled) {
      setGoal(e.target.value);
    }
  }, [isInputDisabled]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && goal.trim() && !isInputDisabled) {
      // Save goal to local storage
      saveGoal(goal);
      
      // Archive the goal
      saveGoalToArchive(goal);
      
      // Disable the input after submission
      setIsInputDisabled(true);
      
      toast.success('Goal archived successfully!', {
        duration: 3000,
      });
      
      setIsFocused(false);
    }
  }, [goal, isInputDisabled]);

  // This effect handles the case when a goal is already set and the user revisits the page
  useEffect(() => {
    const savedGoal = getSavedGoal();
    if (savedGoal) {
      setGoal(savedGoal);
      setIsInputDisabled(true); // Disable input if goal exists
    } else {
      setIsInputDisabled(false); // Enable input if no goal exists
    }
    
    // Reset goal at midnight
    const scheduleResetAtMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();

      return setTimeout(() => {
        const currentGoal = getSavedGoal();
        
        // Archive the current goal before clearing it
        if (currentGoal) {
          saveGoalToArchive(currentGoal);
        }
        
        // Clear the current goal
        setGoal('');
        setIsInputDisabled(false); // Re-enable input for the new day
        clearGoal();
        
        toast.info('New day, new goals!', {
          duration: 4000,
        });
        
        // Schedule next midnight reset
        scheduleResetAtMidnight();
      }, timeUntilMidnight);
    };

    const midnightTimer = scheduleResetAtMidnight();
    return () => clearTimeout(midnightTimer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full items-center">
        <label className="text-white text-xl md:text-2xl font-light mb-2 text-center">
          Today, success means that I:
        </label>
        <div 
          className={`w-full border-b-2 ${goal ? 'border-white' : 'border-white/50'} transition-all duration-300 pb-1`}
        >
          <input
            type="text"
            value={goal}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            className={`w-full bg-transparent text-white text-xl md:text-2xl font-light outline-none pl-1 ${isInputDisabled ? 'cursor-default' : 'cursor-text'}`}
            aria-label="Daily goal input"
            disabled={isInputDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(GoalInput);
