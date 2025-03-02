import React, { useEffect, useState } from 'react';

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

const DailyMantra = () => {
  const [dailyMantra, setDailyMantra] = useState<string>('');

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

  return (
    <div className="mb-4 text-center animate-fade-in">
      <p className="text-white/90 text-sm md:text-base font-medium italic">
        "{dailyMantra}"
      </p>
    </div>
  );
};

export { DAILY_MANTRAS };
export default DailyMantra;
