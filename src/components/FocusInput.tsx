
import React, { useState, useEffect } from 'react';

const FocusInput = () => {
  const [goal, setGoal] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('What is your main goal for today?');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && goal.trim()) {
      // Save goal to local storage
      localStorage.setItem('dailyGoal', goal);
      setIsFocused(false);
    }
  };

  // Load saved goal from local storage on component mount
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
      setGoal('');
      localStorage.removeItem('dailyGoal');
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 px-4">
      <div 
        className={`relative border-b-2 ${goal ? 'border-white' : 'border-white/50'} transition-all duration-300 pb-1`}
      >
        <input
          type="text"
          value={goal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-white text-2xl font-light text-center placeholder-white/70 outline-none"
        />
      </div>
    </div>
  );
};

export default FocusInput;
