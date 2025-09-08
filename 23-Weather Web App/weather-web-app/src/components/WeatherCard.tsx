import { WeatherCardProps } from "@/types/weather";

export default function WeatherCard({
  datetime,
  conditions,
  temp,
}: WeatherCardProps) {
  return (
    <div className="bg-[#2c2c2c] p-4 rounded-md w-full h-full">
      <p>{datetime}</p>
      <p>{conditions}</p>
      <p>{temp}°C</p>
    </div>
  );
}
