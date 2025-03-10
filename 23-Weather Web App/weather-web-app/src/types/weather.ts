export interface WeatherData {
  resolvedAddress: string;
  currentConditions: {
    temp: number;
    conditions: string;
  };
  days: {
    datetime: string;
    conditions: string;
    temp: number;
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
}

export interface WeatherDisplayProps {
  weather: WeatherData | null;
}
