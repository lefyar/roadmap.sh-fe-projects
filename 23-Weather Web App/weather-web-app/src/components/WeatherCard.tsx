import { WeatherCardProps } from "@/types/weather";

export default function WeatherCard({
  datetime,
  conditions,
  temp,
  high,
  low,
}: WeatherCardProps) {
  return (
    <div className="bg-[#2c2c2c] p-4 rounded-md min-w-36">
      <p>{datetime}</p>
      <p>{conditions}</p>
      <p>{temp}°C</p>
      {high !== undefined && <p>High {high}°C</p>}
      {low !== undefined && <p>Low {low}°C</p>}
    </div>
  );
}
