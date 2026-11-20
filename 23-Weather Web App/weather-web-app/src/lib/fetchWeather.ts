import type { WeatherData } from "@/types/weather";

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  const response = await fetch(
    `/api?location=${encodeURIComponent(location.trim())}`,
    { signal: AbortSignal.timeout(10_000) }
  );

  if (!response.ok) {
    try {
      const data = await response.json();
      if (data?.error) throw new Error(data.error);
    } catch (err) {
      if (err instanceof Error && err.message === "Failed to fetch weather data") throw err;
    }
    throw new Error("Failed to fetch weather data");
  }

  return (await response.json()) as WeatherData;
};
