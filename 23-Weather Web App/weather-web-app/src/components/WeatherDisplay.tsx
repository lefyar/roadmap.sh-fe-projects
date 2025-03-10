import { WeatherDisplayProps } from "@/types/weather";
import WeatherCard from "./WeatherCard";

export default function WeatherDisplay ({ weather }: WeatherDisplayProps) {
    if (!weather) return null;

    return (
        <div className="flex flex-col items-center w-3/4 space-y-4">
          <h2>{weather.resolvedAddress}</h2>
          <div className="flex flex-wrap gap-4 w-full">
            {weather.days.map((day, index) => (
              <WeatherCard
                key={index}
                datetime={day.datetime}
                conditions={day.conditions}
                temp={day.temp}
              />
            ))}
          </div>
        </div>
    )
}