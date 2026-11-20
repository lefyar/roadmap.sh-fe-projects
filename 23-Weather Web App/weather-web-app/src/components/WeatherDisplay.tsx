import { WeatherDisplayProps } from "@/types/weather";
import WeatherCard from "./WeatherCard";

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  if (!weather) return null;

  return (
    <div className="flex flex-col items-center w-3/4 space-y-4">
      <h2 className="text-xl font-semibold">{weather.resolvedAddress}</h2>
      <p>{weather.currentConditions.temp}°C · {weather.currentConditions.conditions}</p>
      {weather.currentConditions.humidity !== undefined && (
        <p>Humidity: {weather.currentConditions.humidity}%</p>
      )}
      <div className="flex overflow-x-scroll gap-4 w-full pb-4 bg-[#1b1b1b] p-4 rounded-md">
        {weather.days.map((day, index) => (
          <WeatherCard
            key={index}
            datetime={day.datetime}
            conditions={day.conditions}
            temp={day.temp}
            high={day.maxTemp}
            low={day.minTemp}
          />
        ))}
      </div>
    </div>
  );
}
