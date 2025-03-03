
import React from 'react';
import { useWeatherData } from './Weather/useWeatherData';
import WeatherDisplay from './Weather/WeatherDisplay';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Weather = () => {
  const weatherData = useWeatherData();

  // If there's a location error, show a prompt to enable location
  if (weatherData.error && weatherData.error.includes('Location access denied')) {
    return (
      <div className="fixed top-4 right-4 p-3 flex items-center gap-2 z-10 bg-white backdrop-blur-sm rounded-lg shadow-md">
        <Button 
          size="sm" 
          variant="outline" 
          className="text-black flex items-center gap-1"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.permissions.query({ name: 'geolocation' })
                .then(result => {
                  if (result.state === 'denied') {
                    alert('Please enable location access in your browser settings to view weather information.');
                  } else {
                    window.location.reload();
                  }
                });
            }
          }}
        >
          <MapPin size={16} className="text-black" />
          <span className="text-black">Enable location for weather</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 p-3 flex items-center gap-2 z-10 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default Weather;
