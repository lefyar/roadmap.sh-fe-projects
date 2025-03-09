"use client";
import { SearchWeatherProps } from "@/types/weather";

export default function SearchWeather({
  location,
  setLocation,
  getWeather,
  loading,
}: SearchWeatherProps) {

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex space-x-2">
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              getWeather();
            }
          }}
          placeholder="Enter location"
          className="p-3 rounded-md hover:border-[#f1f1f1] bg-[#1b1b1b] text-[#f1f1f1]"
        />
        <button
          onClick={getWeather}
          disabled={loading}
          className={`p-3 rounded-md ${
            loading ? "bg-[#222222] cursor-not-allowed" : "bg-[#2c2c2c] hover:bg-[#222222] cursor-pointer"
          }`}
        >
          Search
        </button>
      </div>
    </div>
  );
}
