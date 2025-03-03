
export const getWeatherIcon = (condition: string): string => {
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

export const storeWeatherData = (
  city: string, 
  temperature: number, 
  weatherIcon: string
): void => {
  // Store weather data for other components to access
  localStorage.setItem('currentWeatherData', JSON.stringify({
    city,
    temperature,
    weatherIcon
  }));

  // Also update background data if it's available
  try {
    const currentBgData = localStorage.getItem('currentBackgroundData');
    if (currentBgData) {
      const bgData = JSON.parse(currentBgData);
      // Update the background data with real weather if possible
      if (bgData && !bgData.isCustom) {
        bgData.temperature = temperature;
        bgData.location = city;
        bgData.weatherIcon = weatherIcon;
        localStorage.setItem('currentBackgroundData', JSON.stringify(bgData));
      }
    }
  } catch (e) {
    console.error('Error updating background data:', e);
  }
};

export const getFallbackWeatherData = () => {
  try {
    const currentBgData = localStorage.getItem('currentBackgroundData');
    if (currentBgData) {
      const bgData = JSON.parse(currentBgData);
      if (bgData && bgData.location) {
        return {
          city: bgData.location,
          temperature: bgData.temperature,
          weatherIcon: bgData.weatherIcon
        };
      }
    }
    
    const weatherData = localStorage.getItem('currentWeatherData');
    if (weatherData) {
      return JSON.parse(weatherData);
    }
  } catch (e) {
    console.error('Error reading stored weather data:', e);
  }
  return null;
};
