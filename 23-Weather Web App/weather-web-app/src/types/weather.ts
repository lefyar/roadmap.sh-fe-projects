export interface WeatherData {
  resolvedAddress: string;
  currentConditions: {
    temp: number;
    humidity?: number;
    conditions: string;
  };
  days: {
    datetime: string;
    conditions: string;
    temp: number;
    maxTemp?: number;
    minTemp?: number;
  }[];
}

export interface SearchWeatherProps {
  location: string;
  setLocation: (location: string) => void;
  getWeather: () => void;
  loading: boolean;
}

export interface WeatherCardProps {
  datetime: string;
  conditions: string;
  temp: number;
  high?: number;
  low?: number;
}

export interface WeatherDisplayProps {
  weather: WeatherData | null;
}
