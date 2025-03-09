import { useState } from "react";
import { fetchWeather } from "@/lib/fetchWeather";
import { WeatherData } from "@/types/weather";

export function useWeather() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!location) return;
    setError(null);
    setLoading(true);
    try {
      const data = await fetchWeather(location);
      setWeather(data);
    } catch {
      setError(`Failed to fetch weather for ${location}`);
    } finally {
      setLoading(false);
    }
  };
  return {
    location,
    weather,
    error,
    loading,
    setLocation,
    getWeather,
  };
}
