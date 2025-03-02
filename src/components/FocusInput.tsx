
import React from 'react';
import DailyMantra from './Focus/DailyMantra';
import GoalInput from './Focus/GoalInput';

const FocusInput = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-4 px-4">
      {/* Daily mantra section */}
      <DailyMantra />
      
      {/* Goal input section */}
      <GoalInput />
    </div>
  );
};

export default FocusInput;
