
import React from 'react';
import { WeatherData } from './types';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (weatherData.loading) {
    return (
      <div className="flex items-center text-white">
        <span className="text-lg animate-pulse">Loading weather...</span>
      </div>
    );
  }
  
  if (weatherData.error) {
    return (
      <div className="flex items-center text-white">
        <span className="text-sm">Weather unavailable</span>
      </div>
    );
  }
  
  return (
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
};

export default WeatherDisplay;
