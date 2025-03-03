
// Weather icons mapping based on weather condition
export const getWeatherIcon = (weatherCondition: string): string => {
  const condition = weatherCondition.toLowerCase();
  
  if (condition.includes('clear') || condition.includes('sun')) {
    return '☀️';
  } else if (condition.includes('cloud') && condition.includes('sun')) {
    return '⛅';
  } else if (condition.includes('cloud')) {
    return '☁️';
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    return '🌧️';
  } else if (condition.includes('snow')) {
    return '❄️';
  } else if (condition.includes('thunder') || condition.includes('storm')) {
    return '⛈️';
  } else if (condition.includes('fog') || condition.includes('mist')) {
    return '🌫️';
  } else if (condition.includes('wind')) {
    return '💨';
  } else {
    return '🌡️'; // Default thermometer
  }
};

// Store weather data in localStorage for other components
export const storeWeatherData = (city: string, temperature: number, weatherIcon: string): void => {
  try {
    localStorage.setItem('currentWeatherData', JSON.stringify({
      city,
      temperature,
      weatherIcon,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('Error storing weather data:', e);
  }
};

// Get fallback weather data from localStorage or background data
export const getFallbackWeatherData = () => {
  try {
    // First try to get from localStorage
    const weatherData = localStorage.getItem('currentWeatherData');
    if (weatherData) {
      const parsedData = JSON.parse(weatherData);
      // Only use if less than 24 hours old
      if (Date.now() - parsedData.timestamp < 24 * 60 * 60 * 1000) {
        return parsedData;
      }
    }
    
    // Then try to get from background data
    const backgroundData = localStorage.getItem('currentBackgroundData');
    if (backgroundData) {
      const parsedData = JSON.parse(backgroundData);
      if (parsedData && parsedData.location) {
        return {
          city: parsedData.location,
          temperature: parsedData.temperature || null,
          weatherIcon: null
        };
      }
    }
  } catch (e) {
    console.error('Error getting fallback weather data:', e);
  }
  
  return null;
};
