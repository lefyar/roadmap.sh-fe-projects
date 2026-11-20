export interface Place {
  id: number;
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
}

interface Forecast {
  current: { temperature_2m: number | null; relative_humidity_2m: number | null; weather_code: number };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
  };
}

async function get<T>(endpoint: string, params: Record<string, string>, signal: AbortSignal): Promise<T> {
  const response = await fetch(`${endpoint}?${new URLSearchParams(params)}`, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]),
  });
  if (!response.ok) throw new Error("Weather service is unavailable. Try again in a moment.");
  return response.json() as Promise<T>;
}

export async function findPlaces(name: string, signal: AbortSignal): Promise<Place[]> {
  const { results = [] } = await get<{ results?: Place[] }>(
    "https://geocoding-api.open-meteo.com/v1/search", { name, count: "6", language: "en" }, signal);
  return results;
}

export function placeName(place: Place) {
  return [...new Set([place.name, place.admin1, place.country].filter(Boolean))].join(", ");
}

function condition(code: number) {
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code >= 95 && code <= 99) return "Thunderstorms";
  return "Conditions unavailable";
}

export async function fetchWeather(latitude: number, longitude: number, title: string, signal: AbortSignal) {
  const { current, daily } = await get<Forecast>("https://api.open-meteo.com/v1/forecast", {
    latitude: String(latitude),
    longitude: String(longitude),
    timezone: "auto",
    forecast_days: "7",
    current: "temperature_2m,relative_humidity_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
  }, signal);
  return {
    title,
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    conditions: condition(current.weather_code),
    days: daily.time.map((date, i) => ({
      date,
      conditions: condition(daily.weather_code[i]),
      high: daily.temperature_2m_max[i],
      low: daily.temperature_2m_min[i],
    })),
  };
}

export type Weather = Awaited<ReturnType<typeof fetchWeather>>;
