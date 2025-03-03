
import { useState, useEffect } from 'react';
import { WeatherData, WeatherLocationOptions } from './types';
import { getWeatherIcon, storeWeatherData, getFallbackWeatherData } from './utils';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
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
        
        const temperature = Math.round(data.main.temp);
        const city = data.name;
        const weatherIcon = getWeatherIcon(data.weather[0].main);
        
        setWeatherData({
          temperature,
          city,
          loading: false,
          error: null,
          weatherIcon
        });

        // Store weather data for other components
        storeWeatherData(city, temperature, weatherIcon);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeatherData(prev => ({
          ...prev,
          loading: false,
          error: 'Could not fetch weather data'
        }));
        
        // Try to get fallback data
        const fallbackData = getFallbackWeatherData();
        if (fallbackData) {
          setWeatherData(prev => ({
            ...prev,
            city: fallbackData.city,
            temperature: fallbackData.temperature,
            weatherIcon: fallbackData.weatherIcon
          }));
        }
      }
    };

    // Get user's location with more precise options
    const geoOptions: WeatherLocationOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    if (navigator.geolocation) {
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
          
          // Try to get fallback data
          const fallbackData = getFallbackWeatherData();
          if (fallbackData) {
            setWeatherData(prev => ({
              ...prev,
              city: fallbackData.city,
              temperature: fallbackData.temperature,
              weatherIcon: fallbackData.weatherIcon
            }));
          }
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
      const fallbackData = getFallbackWeatherData();
      if (fallbackData) {
        setWeatherData(prev => ({
          ...prev,
          city: fallbackData.city,
          temperature: fallbackData.temperature,
          weatherIcon: fallbackData.weatherIcon,
          loading: false
        }));
      }
    }
  }, [weatherData.city, weatherData.temperature]);

  return weatherData;
};
