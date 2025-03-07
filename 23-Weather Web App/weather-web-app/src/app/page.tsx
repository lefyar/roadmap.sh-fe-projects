"use client";
import { useEffect, useState } from "react";
import { fetchWeather } from "../../lib/fetchWeather";
import { WeatherData } from "../types/types";

export default function Home() {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User's Location:", latitude, longitude);

          const locationRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const locationData = await locationRes.json();
          console.log("Location Data:", locationData);

          const city =
            locationData.address.city ||
            locationData.address.town ||
            locationData.address.village;
          setLocation(city);
          fetchWeather(city);
        },
        (geoError) => {
          console.warn("Geolocation error:", geoError);
          setError(
            "Location permission denied. Please enter location manually."
          );
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const getWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(location);
      setWeather(data);
    } catch {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const getLocationSuggestions = async (query: string) => {
    if (query.length > 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setSuggestions(
        data.map((result: { display_name: string }) => result.display_name)
      );
    } catch {
      setError("Failed to fetch suggestions");
    }
  };

  useEffect(() => {
    getLocationSuggestions(location);
  }, [location]);

  console.log("Weather Data:", weather);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-4 bg-[#101010] text-[#f1f1f1]">
      <h1 className="font-bold">Weather Web App</h1>
      <div className="flex space-x-2 items-center">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
          placeholder="Enter location"
          className="p-3 rounded-md hover:border-[#f1f1f1] bg-[#1b1b1b] text-[#f1f1f1]"
        />
        <button
          onClick={getWeather}
          disabled={loading}
          className="p-3 rounded-md bg-[#2c2c2c]"
        >
          {loading ? "Loading..." : "Search"}
        </button>
        {suggestions.length > 0 && !weather && (
          <ul>
            {suggestions.map((suggestions, index) => (
              <li
                key={index}
                onClick={() => {
                  setLocation(suggestions);
                  setSuggestions([]);
                }}
              >
                {suggestions}
              </li>
            ))}
          </ul>
        )}
        {error && <p>{error}</p>}
      </div>
      {weather && (
        <div className="flex flex-col items-center w-3/4 space-y-4">
          <h2>{weather.resolvedAddress}</h2>
          <div className="flex flex-wrap gap-4 w-full">
            {weather.days.map((day, index) => (
              <div key={index} className="bg-[#2c2c2c] p-4 rounded-md w-[120px] h-auto">
                <p>{day.datetime}</p>
                <p>{day.conditions}</p>
                <p>{day.temp}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
