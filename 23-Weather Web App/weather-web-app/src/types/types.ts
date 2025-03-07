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