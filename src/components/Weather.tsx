
import React from 'react';
import { useWeatherData } from './Weather/useWeatherData';
import WeatherDisplay from './Weather/WeatherDisplay';

const Weather = () => {
  const weatherData = useWeatherData();

  return (
    <div className="fixed top-4 right-4 p-3 flex items-center gap-2 z-10 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default Weather;
