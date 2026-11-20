import type { Weather } from "@/lib/fetchWeather";

const dateLabel = new Intl.DateTimeFormat("en", {
  weekday: "short", month: "short", day: "numeric", timeZone: "UTC",
});

function degrees(value: number | null) {
  return value === null ? "–" : `${Math.round(value)}°C`;
}

export default function WeatherDisplay({ weather }: { weather: Weather }) {
  const { title, temperature, conditions, humidity, days } = weather;
  return (
    <section className="forecast" aria-label="Forecast" aria-live="polite">
      <div className="current">
        <h2>{title}</h2>
        <p className="temperature">{degrees(temperature)}</p>
        <p>{conditions}{humidity !== null && ` · Humidity ${humidity}%`}</p>
      </div>
      <h3>Seven-day forecast</h3>
      <ol className="forecast-days">
        {days.map(day => <li key={day.date}>
          <time dateTime={day.date}>{dateLabel.format(new Date(day.date))}</time>
          <p>{day.conditions}</p>
          <p>High {degrees(day.high)} · Low {degrees(day.low)}</p>
        </li>)}
      </ol>
    </section>
  );
}
