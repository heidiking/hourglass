import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

type ArchivedGoal = {
  text: string;
  date: string;
};

const FocusInput = () => {
  const [goal, setGoal] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('My main goal for today is:');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  const saveGoalToArchive = (goalText: string) => {
    // Save to archive
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const newArchivedGoal: ArchivedGoal = {
      text: goalText,
      date: today
    };
    
    // Get existing archived goals
    const existingGoalsStr = localStorage.getItem('archivedGoals');
    const existingGoals: ArchivedGoal[] = existingGoalsStr ? JSON.parse(existingGoalsStr) : [];
    
    // Add new goal to archive
    const updatedGoals = [newArchivedGoal, ...existingGoals];
    
    // Only keep the 50 most recent goals
    const trimmedGoals = updatedGoals.slice(0, 50);
    
    // Save updated archive
    localStorage.setItem('archivedGoals', JSON.stringify(trimmedGoals));
    
    // Show a toast notification
    toast.success('Goal archived successfully!', {
      duration: 3000,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && goal.trim()) {
      // Save goal to local storage
      localStorage.setItem('dailyGoal', goal);
      
      // Archive the goal
      saveGoalToArchive(goal);
      
      setIsFocused(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    
    // Position the cursor after the placeholder text when empty
    if (inputRef.current && !goal) {
      // Add a space to the input value to allow cursor positioning
      inputRef.current.value = ' ';
      // Set the cursor position to after the space
      inputRef.current.selectionStart = 1;
      inputRef.current.selectionEnd = 1;
    }
  };

  useEffect(() => {
    const savedGoal = localStorage.getItem('dailyGoal');
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
      const currentGoal = localStorage.getItem('dailyGoal');
      
      // Archive the current goal before clearing it
      if (currentGoal) {
        saveGoalToArchive(currentGoal);
      }
      
      // Clear the current goal
      setGoal('');
      localStorage.removeItem('dailyGoal');
      
      toast.info('New day, new goals!', {
        duration: 4000,
      });
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPlaceholder('My main goal today is:');
      } else {
        setPlaceholder('My main goal for today is:');
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
    <div className="w-full max-w-2xl mx-auto mt-4 px-4">
      <div 
        className={`relative border-b-2 ${goal ? 'border-white' : 'border-white/50'} transition-all duration-300 pb-1 text-left`}
      >
        <input
          ref={inputRef}
          type="text"
          value={goal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-white text-xl md:text-2xl font-light text-left placeholder-white/70 outline-none"
          aria-label="Daily goal input"
        />
      </div>
    </div>
  );
};

export default FocusInput;
