import { useState } from "react";
import SearchCity from "./components/SearchCity";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";

const api = {
  key: "67750f6daace7049e45faba8b8e6bcb6",
  base: "https://api.openweathermap.org/data/2.5/weather",
  baseForecast: "https://api.openweathermap.org/data/2.5/forecast",
};

function App() {
  const [city, setCity] = useState("");
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col place-items-center">
      <div className="text-5xl text-indigo-600" style={{ fontWeight: 900 }}>
        Weather App
      </div>
      <SearchCity setCity={setCity} />
      {city && <CurrentWeather city={city} base={api.base} apiKey={api.key} />}
      {city && (
        <ForecastWeather city={city} base={api.baseForecast} apiKey={api.key} />
      )}
    </div>
  );
}

export default App;
