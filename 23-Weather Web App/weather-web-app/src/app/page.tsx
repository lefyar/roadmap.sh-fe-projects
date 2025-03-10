"use client";
import { useEffect } from "react";
import SearchWeather from "../components/SearchWeather";
import WeatherDisplay from "@/components/WeatherDisplay";
import getUserLocation from "@/hooks/useLocation";
import { useWeather } from "@/hooks/useWeather";

export default function Home() {
  const { location, weather, error, loading, setLocation, getWeather } =
    useWeather();

  useEffect(() => {
    getUserLocation()
      .then((city) => {
        if (city) {
          setLocation(city);
          getWeather();
        }
      })
      .catch(console.error);
  }, []); // eslint-disable-line

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-4 bg-[#101010] text-[#f1f1f1]">
      <h1 className="font-bold">Weather Web App</h1>
      <SearchWeather
        location={location}
        setLocation={setLocation}
        getWeather={getWeather}
        loading={loading}
      />
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}
