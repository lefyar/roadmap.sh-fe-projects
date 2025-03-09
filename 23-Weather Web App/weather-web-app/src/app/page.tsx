"use client";
import { useEffect } from "react";
import SearchWeather from "../components/SearchWeather";
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
  }, []);

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
      {weather && (
        <div className="flex flex-col items-center w-3/4 space-y-4">
          <h2>{weather.resolvedAddress}</h2>
          <div className="flex flex-wrap gap-4 w-full">
            {weather.days.map((day, index) => (
              <div
                key={index}
                className="bg-[#2c2c2c] p-4 rounded-md w-[120px] h-auto"
              >
                <p>{day.datetime}</p>
                <p>{day.conditions}</p>
                <p>{day.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
