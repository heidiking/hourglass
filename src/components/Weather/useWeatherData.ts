
import { useState, useEffect } from 'react';
import { WeatherData, WeatherLocationOptions } from './types';
import { getWeatherIcon, storeWeatherData, getFallbackWeatherData } from './utils';
import { toast } from "sonner";

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

    const checkPermissionAndGetLocation = () => {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then(result => {
          if (result.state === 'granted') {
            getCurrentPosition();
          } else if (result.state === 'prompt') {
            toast.info("Please allow location access to see local weather", {
              duration: 5000,
            });
            getCurrentPosition();
          } else if (result.state === 'denied') {
            setWeatherData(prev => ({
              ...prev,
              loading: false,
              error: 'Location access denied: Please enable location access in your browser settings'
            }));
            tryFallbackData();
          }
          
          result.addEventListener('change', () => {
            if (result.state === 'granted') {
              toast.success("Location access granted. Getting weather data...");
              getCurrentPosition();
            }
          });
        });
      } else if (navigator.geolocation) {
        getCurrentPosition();
      } else {
        setWeatherData(prev => ({
          ...prev,
          loading: false,
          error: 'Geolocation not supported in your browser'
        }));
        tryFallbackData();
      }
    };

    const getCurrentPosition = () => {
      // Get user's location with more precise options
      const geoOptions: WeatherLocationOptions = {
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
          
          tryFallbackData();
        },
        geoOptions
      );
    };

    const tryFallbackData = () => {
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
    };

    // Initialize weather data
    checkPermissionAndGetLocation();

    // Set up interval to refresh weather data every 30 minutes
    const refreshInterval = setInterval(() => {
      checkPermissionAndGetLocation();
    }, 30 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  return weatherData;
};
