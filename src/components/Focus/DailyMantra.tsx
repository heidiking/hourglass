
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
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

interface MantraState {
  text: string;
  isFavorite: boolean;
}

const DailyMantra = () => {
  const [mantra, setMantra] = useState<MantraState>({ text: '', isFavorite: false });
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

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
      
      // Load favorites from localStorage
      const storedFavorites = localStorage.getItem('favoriteTrackingMantras');
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(parsedFavorites);
      
      // If there's a custom mantra, use it sometimes (every 5th day)
      let selectedMantra = '';
      
      if (customMantra && dayOfMonth % 5 === 0) {
        selectedMantra = customMantra;
      } else {
        // Otherwise use from the regular rotation
        const mantraIndex = (dayOfMonth - 1) % DAILY_MANTRAS.length;
        selectedMantra = DAILY_MANTRAS[mantraIndex];
      }
      
      // Check if this mantra is in favorites
      const isFavorite = parsedFavorites.includes(selectedMantra);
      
      setMantra({
        text: selectedMantra,
        isFavorite
      });
    };
    
    loadMantra();
  }, []);

  const toggleFavorite = () => {
    const newFavorites = [...favorites];
    
    if (mantra.isFavorite) {
      // Remove from favorites
      const index = newFavorites.indexOf(mantra.text);
      if (index >= 0) {
        newFavorites.splice(index, 1);
      }
      toast.success("Removed from favorites");
    } else {
      // Add to favorites
      if (!newFavorites.includes(mantra.text)) {
        newFavorites.push(mantra.text);
      }
      toast.success("Added to favorites");
    }
    
    // Update state and localStorage
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTrackingMantras', JSON.stringify(newFavorites));
    
    // Update current mantra state
    setMantra({
      ...mantra,
      isFavorite: !mantra.isFavorite
    });
  };

  const cycleMantra = () => {
    setIsAnimating(true);
    
    // If we have favorites, cycle through them
    if (favorites.length > 0) {
      const currentIndex = favorites.indexOf(mantra.text);
      let nextIndex = 0;
      
      if (currentIndex === -1 || currentIndex === favorites.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = currentIndex + 1;
      }
      
      setTimeout(() => {
        setMantra({
          text: favorites[nextIndex],
          isFavorite: true
        });
        setIsAnimating(false);
      }, 300);
    } else {
      // If no favorites, just pick a random mantra
      const randomIndex = Math.floor(Math.random() * DAILY_MANTRAS.length);
      
      setTimeout(() => {
        setMantra({
          text: DAILY_MANTRAS[randomIndex],
          isFavorite: false
        });
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="mb-4 text-center">
      <div 
        className={`relative animate-fade-in transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
      >
        <p className="text-white/90 text-sm md:text-base font-medium italic">
          "{mantra.text}"
        </p>
        
        <div className="flex justify-center mt-2 space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleFavorite}
            className="bg-white hover:bg-white/90 rounded-full p-2 h-8 w-8"
            title={mantra.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={16} 
              className={`text-black ${mantra.isFavorite ? 'fill-red-500' : ''}`} 
            />
          </Button>
          
          {favorites.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={cycleMantra}
              className="bg-white hover:bg-white/90 text-xs h-8 px-3"
            >
              <span className="text-black">Next Favorite</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { DAILY_MANTRAS };
export default DailyMantra;
