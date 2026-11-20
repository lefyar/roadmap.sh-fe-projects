import { useState, useCallback, useEffect, useRef } from "react";
import { fetchWeather } from "@/lib/fetchWeather";
import type { WeatherData } from "@/types/weather";

const DEBOUNCE_MS = 250;

export function useWeather() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef(0);

  const cancelTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const doFetch = async (city: string) => {
    const seq = ++requestRef.current;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      if (seq === requestRef.current) {
        setWeather(data);
      }
    } catch {
      if (seq === requestRef.current) {
        setError(`Failed to fetch weather for ${city}`);
      }
    } finally {
      if (seq === requestRef.current) {
        setLoading(false);
      }
    }
  };

  const getWeather = useCallback(
    (city: string = location) => {
      const trimmed = city.trim();
      cancelTimer();
      if (!trimmed) {
        setError(null);
        setWeather(null);
        return;
      }
      timerRef.current = setTimeout(() => {
        void doFetch(trimmed);
      }, DEBOUNCE_MS);
    },
    [location, cancelTimer]
  );

  useEffect(() => cancelTimer, [cancelTimer]);

  return {
    location,
    weather,
    error,
    loading,
    setLocation,
    setError,
    getWeather,
  };
}
