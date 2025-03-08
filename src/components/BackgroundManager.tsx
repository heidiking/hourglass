
import React, { useEffect, useState } from 'react';
import { getBackgroundForToday, type Background } from '../utils/backgrounds';
import { X } from 'lucide-react';

const BackgroundManager = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [backgroundData, setBackgroundData] = useState<Background | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadBackground = async () => {
      setIsLoading(true);
      setHasError(false);
      setImageLoaded(false);
      try {
        const todayBackground = await getBackgroundForToday();
        console.log('Loaded background:', todayBackground);
        
        // Validate the URL before setting it
        if (!todayBackground.url || typeof todayBackground.url !== 'string') {
          throw new Error('Invalid background URL');
        }
        
        setBgImage(todayBackground.url);
        setBackgroundData(todayBackground);
      } catch (error) {
        console.error('Failed to load background:', error);
        setHasError(true);
        // Fallback to a default landscape image
        const fallbackImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80';
        setBgImage(fallbackImage);
        setBackgroundData({
          id: 999,
          url: fallbackImage,
          author: 'Bailey Zindel',
          sourceUrl: 'https://unsplash.com/photos/NRQV-hBF10M',
          location: 'Moraine Lake, Canada',
          type: 'landscape'
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
    if (backgroundData && imageLoaded) {
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
  }, [backgroundData, imageLoaded]);

  // Determine if we need a stronger filter based on the background type
  const getFilterClass = () => {
    if (!backgroundData) return 'bg-black/20';
    
    // Paintings may need a stronger filter for better text visibility
    if (backgroundData.type === 'painting') {
      return 'bg-black/30 backdrop-brightness-90';
    }
    
    return 'bg-black/20';
  };

  // Handle image load error
  const handleImageError = () => {
    console.error('Error loading background image:', bgImage);
    setHasError(true);
    // Set to default fallback if the current image fails
    if (bgImage !== 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80') {
      setBgImage('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80');
      setBackgroundData({
        id: 999,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
        author: 'Bailey Zindel',
        sourceUrl: 'https://unsplash.com/photos/NRQV-hBF10M',
        location: 'Moraine Lake, Canada',
        type: 'landscape'
      });
    }
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
    setImageLoaded(true);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black z-[-2] animate-pulse-soft" />
      )}
      
      {bgImage && (
        <div className="fixed inset-0 w-full h-full overflow-hidden z-[-2]">
          <img
            src={bgImage}
            alt="Daily background"
            className="w-full h-full object-cover transition-opacity duration-500"
            onLoad={handleImageLoaded}
            onError={handleImageError}
            style={{ opacity: isLoading ? 0 : 1 }}
            crossOrigin="anonymous" // Add this to handle CORS issues
          />
        </div>
      )}
      
      {/* Fallback display in case of loading error */}
      {hasError && !isLoading && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-3 py-2 rounded-md z-50 flex items-center">
          <span>Background image failed to load</span>
          <button 
            onClick={() => setHasError(false)} 
            className="ml-2 p-1 rounded-full hover:bg-red-700"
            aria-label="Close error message"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      )}
      
      <div 
        className={`fixed inset-0 ${getFilterClass()} z-[-1]`} 
        aria-hidden="true" 
      />
      
      {/* Only display background info after the image has been successfully loaded */}
      {backgroundData && imageLoaded && (
        <div className="fixed bottom-2 left-2 text-xs text-white z-10 max-w-[300px] bg-black/30 px-2 py-1 rounded backdrop-blur-sm hover:bg-black/40 transition-colors block">
          {backgroundData.type === 'painting' ? (
            <span className="text-white">
              "{backgroundData.title}" ({backgroundData.year}) by {backgroundData.author}
            </span>
          ) : (
            <span className="text-white">
              Photo: {backgroundData.author}
              {backgroundData.location && ` - ${backgroundData.location}`}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default BackgroundManager;
