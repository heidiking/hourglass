
import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState<{
    temperature: number | null;
    city: string | null;
    loading: boolean;
    error: string | null;
    weatherIcon: string | null;
  }>({
    temperature: null,
    city: null,
    loading: true,
    error: null,
    weatherIcon: null
  });

  useEffect(() => {
    const fetchWeatherData = async (latitude: number, longitude: number) => {
      try {
        // Using OpenWeatherMap API (free tier)
        const apiKey = 'dd7473d0af475028dc118929bf35cae9'; // This is a public API key for demo purposes
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        console.log('Weather data fetched successfully:', data);
        
        setWeatherData({
          temperature: Math.round(data.main.temp),
          city: data.name,
          loading: false,
          error: null,
          weatherIcon: getWeatherIcon(data.weather[0].main)
        });

        // Store weather data for other components to access
        localStorage.setItem('currentWeatherData', JSON.stringify({
          city: data.name,
          temperature: Math.round(data.main.temp),
          weatherIcon: getWeatherIcon(data.weather[0].main)
        }));

        // Also store the background weather data if it's available
        const currentBgData = localStorage.getItem('currentBackgroundData');
        if (currentBgData) {
          const bgData = JSON.parse(currentBgData);
          // Update the background data with real weather if possible
          if (bgData && !bgData.isCustom) {
            bgData.temperature = Math.round(data.main.temp);
            bgData.location = data.name;
            bgData.weatherIcon = getWeatherIcon(data.weather[0].main);
            localStorage.setItem('currentBackgroundData', JSON.stringify(bgData));
          }
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeatherData(prev => ({
          ...prev,
          loading: false,
          error: 'Could not fetch weather data'
        }));
      }
    };

    const getWeatherIcon = (condition: string): string => {
      const conditionMap: Record<string, string> = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️'
      };
      
      return conditionMap[condition] || '🌤️';
    };

    // Get user's location with more precise options
    if (navigator.geolocation) {
      const geoOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location detected:', position.coords.latitude, position.coords.longitude);
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setWeatherData(prev => ({
            ...prev,
            loading: false,
            error: `Location access denied: ${error.message}`
          }));
        },
        geoOptions
      );
    } else {
      setWeatherData(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation not supported in your browser'
      }));
    }

    // Set up interval to refresh weather data every 30 minutes
    const refreshInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherData(position.coords.latitude, position.coords.longitude);
          },
          () => {} // Silently fail on refresh
        );
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  // Try to get weather from background data if available
  useEffect(() => {
    if (!weatherData.city && !weatherData.temperature) {
      try {
        const currentBgData = localStorage.getItem('currentBackgroundData');
        if (currentBgData) {
          const bgData = JSON.parse(currentBgData);
          if (bgData && bgData.location && bgData.temperature) {
            setWeatherData(prev => ({
              ...prev,
              city: bgData.location,
              temperature: bgData.temperature,
              weatherIcon: bgData.weatherIcon,
              loading: false
            }));
          }
        }
      } catch (e) {
        console.error('Error reading background data:', e);
      }
    }
  }, [weatherData.city, weatherData.temperature]);

  // Define what to display based on state
  let content;
  if (weatherData.loading) {
    content = (
      <div className="flex items-center text-white">
        <span className="text-lg animate-pulse">Loading weather...</span>
      </div>
    );
  } else if (weatherData.error) {
    // Fallback to background data location if available
    try {
      const currentBgData = localStorage.getItem('currentBackgroundData');
      if (currentBgData) {
        const bgData = JSON.parse(currentBgData);
        if (bgData && bgData.location) {
          content = (
            <div className="flex flex-col items-end">
              <span className="text-sm text-white">{bgData.location}</span>
              {bgData.temperature && (
                <span className="text-3xl font-light text-white">{bgData.temperature}°</span>
              )}
            </div>
          );
        }
      }
    } catch (e) {
      console.error('Error reading background data:', e);
    }
    
    // If still no content, show error state
    if (!content) {
      content = (
        <div className="flex items-center text-white">
          <span className="text-sm">Weather unavailable</span>
        </div>
      );
    }
  } else {
    content = (
      <>
        <div className="flex items-center">
          <span className="text-3xl font-light text-white">{weatherData.temperature}°</span>
          {weatherData.weatherIcon && <span className="ml-1 text-2xl">{weatherData.weatherIcon}</span>}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-white">{weatherData.city}</span>
        </div>
      </>
    );
  }

  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4 text-white z-10 bg-black/30 backdrop-blur-sm rounded-lg">
      {content}
    </div>
  );
};

export default Weather;
