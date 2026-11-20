"use client";
import { useEffect, useCallback } from "react";
import SearchWeather from "../components/SearchWeather";
import WeatherDisplay from "@/components/WeatherDisplay";
import getUserLocation from "@/hooks/useLocation";
import { useWeather } from "@/hooks/useWeather";

export default function Home() {
  const { location, weather, error, loading, setLocation, setError, getWeather } =
    useWeather();

  const onLocationLoaded = useCallback(
    (city: string | null) => {
      if (city) {
        setLocation(city);
        getWeather(city);
      }
    },
    [getWeather, setLocation]
  );

  useEffect(() => {
    let cancelled = false;
    getUserLocation()
      .then((city) => {
        if (!cancelled) onLocationLoaded(city);
      })
      .catch(() => {
        if (!cancelled) {
          setError("We couldn't get your location. Search manually instead.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full min-h-screen py-8 px-3 flex flex-col items-center justify-center space-y-6 bg-gradient-to-b from-[#181818] to-[#101010] text-[#f1f1f1]">
      <h1 className="font-bold text-3xl tracking-wide text-[#f1f1f1] drop-shadow-lg">Weather Web App</h1>
      <SearchWeather
        location={location}
        setLocation={setLocation}
        getWeather={() => getWeather()}
        loading={loading}
      />
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {loading && !weather && <p className="text-gray-400 text-lg">Loading...</p>}
      {weather && <WeatherDisplay weather={weather} />}
      {!loading && !weather && !error && !location && (
        <p className="text-gray-400 text-sm">
          Search a city or allow location access to see the forecast.
        </p>
      )}
    </div>
  );
}
