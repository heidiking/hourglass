
import React from 'react';
import { MapPin, Thermometer } from 'lucide-react';
import { WeatherData } from './types';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (weatherData.loading) {
    return (
      <div className="flex items-center text-white">
        <span className="text-sm animate-pulse">Loading weather...</span>
      </div>
    );
  }
  
  if (weatherData.error) {
    return (
      <div className="flex items-center text-white">
        <span className="text-sm text-black">Weather unavailable</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Thermometer size={18} className="text-black mr-1" />
        <span className="text-lg font-light text-black">{weatherData.temperature}°</span>
        {weatherData.weatherIcon && <span className="ml-1 text-lg">{weatherData.weatherIcon}</span>}
      </div>
      {weatherData.city && (
        <div className="flex items-center">
          <MapPin size={16} className="text-black mr-1" />
          <span className="text-sm text-black">{weatherData.city}</span>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
