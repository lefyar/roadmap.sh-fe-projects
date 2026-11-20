"use client";

import { useEffect, useRef, useState } from "react";
import WeatherDisplay from "@/components/WeatherDisplay";
import { fetchWeather, findPlaces, placeName, type Place, type Weather } from "@/lib/fetchWeather";

export default function Home() {
  const [query, setQuery] = useState("");
  const [choices, setChoices] = useState<Place[]>([]);
  const [weather, setWeather] = useState<Weather>();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const request = useRef<AbortController>(null);
  useEffect(() => () => request.current?.abort(), []);

  async function run(message: string, load: (signal: AbortSignal) => Promise<Place[] | Weather>) {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setStatus(message);
    setError("");
    setChoices([]);
    try {
      const result = await load(controller.signal);
      if (controller.signal.aborted) return;
      if (Array.isArray(result)) setChoices(result);
      else setWeather(result);
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error instanceof Error && error.name === "Error"
          ? error.message : "Could not load the forecast. Try again.");
      }
    } finally {
      if (request.current === controller) setStatus("");
    }
  }

  function forecast(place: Place, signal: AbortSignal) {
    return fetchWeather(place.latitude, place.longitude, placeName(place), signal);
  }

  function locate() {
    void run("Finding your location…", async signal => {
      if (!navigator.geolocation) throw new Error("Location is unavailable. Try searching for a city.");
      const { coords } = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve,
          () => reject(new Error("Could not get your location. Try searching for a city.")),
          { timeout: 10000, maximumAge: 300000 });
      });
      return fetchWeather(coords.latitude, coords.longitude, "Current location", signal);
    });
  }

  return (
    <main className="weather-shell">
      <header>
        <h1>Weather</h1>
        <p>Current conditions and a seven-day forecast.</p>
      </header>
      <form onSubmit={event => {
        event.preventDefault();
        const city = query.trim();
        if (city.length < 2) return;
        void run("Searching for cities…", async signal => {
          const places = await findPlaces(city, signal);
          if (places.length === 0) throw new Error("No matching cities. Try another name or spelling.");
          return places.length === 1 ? forecast(places[0], signal) : places;
        });
      }}>
        <label htmlFor="city">City</label>
        <div className="search-row">
          <input id="city" type="search" placeholder="e.g. Yogyakarta" value={query}
            onChange={event => setQuery(event.target.value)} />
          <button disabled={query.trim().length < 2}>Search</button>
        </div>
      </form>
      <button type="button" className="location" onClick={locate}>Use my location</button>
      <div role="status" className="message">{status}</div>
      {error && <p role="alert" className="error">{error}</p>}
      {choices.length > 0 && <section className="choices" aria-labelledby="matches">
        <h2 id="matches">Choose a city</h2>
        <ul>{choices.map(place => <li key={place.id}>
          <button onClick={() => void run("Loading forecast…", signal => forecast(place, signal))}>
            {placeName(place)}
          </button>
        </li>)}</ul>
      </section>}
      {weather && <WeatherDisplay weather={weather} />}
      <footer>Forecast data from <a href="https://open-meteo.com/">Open-Meteo</a>.</footer>
    </main>
  );
}
