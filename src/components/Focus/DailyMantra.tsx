import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  const [mantra, setMantra] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

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
      let selectedMantra = '';
      
      if (customMantra && dayOfMonth % 5 === 0) {
        selectedMantra = customMantra;
      } else {
        // Otherwise use from the regular rotation
        const mantraIndex = (dayOfMonth - 1) % DAILY_MANTRAS.length;
        selectedMantra = DAILY_MANTRAS[mantraIndex];
      }
      
      setMantra(selectedMantra);
    };
    
    loadMantra();
  }, []);

  const cycleMantra = () => {
    setIsAnimating(true);
    
    // Just pick a random mantra
    const randomIndex = Math.floor(Math.random() * DAILY_MANTRAS.length);
    
    setTimeout(() => {
      setMantra(DAILY_MANTRAS[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="mb-4 text-center">
      <div 
        className={`relative animate-fade-in transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
      >
        <p className="text-white/90 text-sm md:text-base font-medium italic">
          "{mantra}"
        </p>
        
        <div className="flex justify-center mt-2 space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={cycleMantra}
            className="bg-white hover:bg-white/90 text-xs h-8 px-3"
          >
            <span className="text-black">New Mantra</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { DAILY_MANTRAS };
export default DailyMantra;
