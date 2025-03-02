export type ArchivedGoal = {
  text: string;
  date: string;
};

export const saveGoalToArchive = (goalText: string): void => {
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
};

export const getSavedGoal = (): string => {
  return localStorage.getItem('dailyGoal') || '';
};

export const saveGoal = (goal: string): void => {
  localStorage.setItem('dailyGoal', goal);
};

export const clearGoal = (): void => {
  localStorage.removeItem('dailyGoal');
};
