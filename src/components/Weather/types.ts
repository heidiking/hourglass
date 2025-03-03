
export interface WeatherData {
  temperature: number | null;
  city: string | null;
  loading: boolean;
  error: string | null;
  weatherIcon: string | null;
}

export interface WeatherLocationOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}
