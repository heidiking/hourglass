
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

type ArchivedGoal = {
  text: string;
  date: string;
};

const DAILY_MANTRAS = [
  "Start before you're ready. Creativity flows from action.",
  "The world needs your unique creative voice today.",
  "Create without judgment. Edit later.",
  "Small steps daily lead to creative mastery.",
  "Your art matters. Someone needs to experience it.",
  "Doubts are normal. Create anyway.",
  "Perfectionism blocks creativity. Progress over perfection.",
  "Trust the process. The muse rewards consistency.",
  "Your creative work changes lives, including your own.",
  "Today's effort plants seeds for tomorrow's inspiration.",
  "Writer's block is just a signal to play and experiment.",
  "The blank page is possibility, not pressure.",
  "You are at your most powerful when creating authentically.",
  "Creativity is courage made visible.",
  "Your artistic journey is valid exactly as it is."
];

const FocusInput = () => {
  const [goal, setGoal] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('');
  const [dailyMantra, setDailyMantra] = useState<string>('');

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

  // This effect loads the daily mantra
  useEffect(() => {
    const loadMantra = () => {
      const today = new Date();
      const dayOfMonth = today.getDate();
      
      // Check for custom mantras
      const settings = localStorage.getItem('timeTrackerSettings');
      let customMantra = '';
      
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        if (parsedSettings.customMantra) {
          customMantra = parsedSettings.customMantra;
        }
      }
      
      // If there's a custom mantra, use it sometimes (every 5th day)
      if (customMantra && dayOfMonth % 5 === 0) {
        setDailyMantra(customMantra);
      } else {
        // Otherwise use from the regular rotation
        const mantraIndex = (dayOfMonth - 1) % DAILY_MANTRAS.length;
        setDailyMantra(DAILY_MANTRAS[mantraIndex]);
      }
    };
    
    loadMantra();
  }, []);

  // This effect handles the case when a goal is already set and the user revisits the page
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

      // Update the daily mantra for the new day
      const newDay = new Date();
      const newDayOfMonth = newDay.getDate();
      
      // Check for custom mantras
      const settings = localStorage.getItem('timeTrackerSettings');
      let customMantra = '';
      
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        if (parsedSettings.customMantra) {
          customMantra = parsedSettings.customMantra;
        }
      }
      
      // If there's a custom mantra, use it sometimes (every 5th day)
      if (customMantra && newDayOfMonth % 5 === 0) {
        setDailyMantra(customMantra);
      } else {
        // Otherwise use from the regular rotation
        const newMantraIndex = (newDayOfMonth - 1) % DAILY_MANTRAS.length;
        setDailyMantra(DAILY_MANTRAS[newMantraIndex]);
      }
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
    <div className="w-full max-w-2xl mx-auto mt-4 px-4">
      {/* Daily mantra section */}
      <div className="mb-4 text-center animate-fade-in">
        <p className="text-white/90 text-sm md:text-base font-medium italic">
          "{dailyMantra}"
        </p>
      </div>
      
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
    </div>
  );
};

export default FocusInput;
