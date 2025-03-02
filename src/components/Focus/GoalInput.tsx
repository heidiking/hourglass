
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { saveGoal, saveGoalToArchive, getSavedGoal, clearGoal } from './goalUtils';

const GoalInput = () => {
  const [goal, setGoal] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && goal.trim()) {
      // Save goal to local storage
      saveGoal(goal);
      
      // Archive the goal
      saveGoalToArchive(goal);
      
      toast.success('Goal archived successfully!', {
        duration: 3000,
      });
      
      setIsFocused(false);
    }
  };

  // This effect handles the case when a goal is already set and the user revisits the page
  useEffect(() => {
    const savedGoal = getSavedGoal();
    if (savedGoal) {
      setGoal(savedGoal);
    }
    
    // Reset goal at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      const currentGoal = getSavedGoal();
      
      // Archive the current goal before clearing it
      if (currentGoal) {
        saveGoalToArchive(currentGoal);
      }
      
      // Clear the current goal
      setGoal('');
      clearGoal();
      
      toast.info('New day, new goals!', {
        duration: 4000,
      });
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  // Adjust placeholder text based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPlaceholder('');
      } else {
        setPlaceholder('');
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
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
            className="w-full bg-transparent text-white text-xl md:text-2xl font-light outline-none pl-1"
            aria-label="Daily goal input"
          />
        </div>
      </div>
    </div>
  );
};

export default GoalInput;
