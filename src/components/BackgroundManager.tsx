
import React, { useEffect, useState } from 'react';
import { getBackgroundForToday, type Background } from '../utils/backgrounds';

const BackgroundManager = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [backgroundData, setBackgroundData] = useState<Background | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBackground = async () => {
      setIsLoading(true);
      try {
        const todayBackground = await getBackgroundForToday();
        console.log('Loaded background:', todayBackground);
        setBgImage(todayBackground.url);
        setBackgroundData(todayBackground);
      } catch (error) {
        console.error('Failed to load background:', error);
        // Fallback to a default landscape image
        setBgImage('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80');
        setBackgroundData({
          id: 999,
          url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
          author: 'Vincent Guth',
          sourceUrl: 'https://unsplash.com/photos/silhouette-photography-of-mountains-during-sunset-uEcSKKDB1pg',
          location: 'Mountain Range'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBackground();

    // Refresh background at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      loadBackground();
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  // Store the background data in localStorage so other components can access it
  useEffect(() => {
    if (backgroundData) {
      // If there's weather data available, try to update the location
      try {
        const weatherData = localStorage.getItem('currentWeatherData');
        if (weatherData) {
          const parsedWeatherData = JSON.parse(weatherData);
          if (parsedWeatherData && parsedWeatherData.city) {
            backgroundData.location = parsedWeatherData.city;
          }
          if (parsedWeatherData && parsedWeatherData.temperature) {
            backgroundData.temperature = parsedWeatherData.temperature;
          }
        }
      } catch (e) {
        console.error('Error reading weather data:', e);
      }
      
      localStorage.setItem('currentBackgroundData', JSON.stringify(backgroundData));
    }
  }, [backgroundData]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black z-[-1] animate-pulse-soft" />
      )}
      
      {bgImage && (
        <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
          <img
            src={bgImage}
            alt="Daily background"
            className="w-full h-full object-cover transition-opacity duration-500"
            onLoad={() => setIsLoading(false)}
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        </div>
      )}
      
      <div className="fixed inset-0 bg-black/20 z-[-1]" aria-hidden="true" />
      
      {/* Image credit display */}
      {backgroundData && (
        <div className="fixed bottom-2 left-2 text-xs text-white/70 z-10 max-w-[300px] bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
          {backgroundData.author ? (
            <a 
              href={backgroundData.sourceUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white/90 transition-colors text-white"
              onClick={(e) => {
                if (!backgroundData.sourceUrl) {
                  e.preventDefault();
                }
              }}
            >
              Photo: {backgroundData.author}
              {backgroundData.location && ` - ${backgroundData.location}`}
            </a>
          ) : (
            <span>
              {backgroundData.location || 'Background image'}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default BackgroundManager;
