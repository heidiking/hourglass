
import React from 'react';
import { useWeatherData } from './Weather/useWeatherData';
import WeatherDisplay from './Weather/WeatherDisplay';

const Weather = () => {
  const weatherData = useWeatherData();

  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4 text-white z-10 bg-black/30 backdrop-blur-sm rounded-lg">
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default Weather;
