export const fetchWeather = async (location: string) => {
  const response = await fetch(`api/weather?location=${location}`);
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
};
